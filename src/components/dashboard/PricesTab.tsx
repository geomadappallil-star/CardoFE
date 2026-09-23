import React, { useMemo } from 'react';
import { 
  ResponsiveContainer, ComposedChart, Line, Bar, Area, XAxis, YAxis, 
  Tooltip, CartesianGrid, Legend, Brush 
} from 'recharts';
import { PriceSeriesPoint } from '../../types/index.js';
import { TrendingUp, Scale, ArrowDown, ArrowUp, MoveHorizontal } from 'lucide-react';
import { Language, translations } from '../../i18n/translations.js';

interface PricesTabProps {
  priceSeries: PriceSeriesPoint[];
  spice: string;
  scope?: string;
  frequency: string;
  language?: Language;
  loading: boolean;
}

export const PricesTab: React.FC<PricesTabProps> = ({
  priceSeries,
  spice,
  scope = 'all',
  frequency,
  language = 'en',
  loading
}) => {
  const t = translations[language] || translations.en;

  const scopeLabel = useMemo(() => {
    return t.scopes[scope as keyof typeof t.scopes] || scope;
  }, [scope, t]);

  const stats = useMemo(() => {
    if (!priceSeries || priceSeries.length === 0) return null;
    let high = 0;
    let low = Infinity;
    let sumWeighted = 0;
    let totalVolume = 0;

    priceSeries.forEach(pt => {
      if (pt.max_price > high) high = pt.max_price;
      if (pt.min_price < low && pt.min_price > 0) low = pt.min_price;
      sumWeighted += pt.weighted_mean * pt.total_sold_kg;
      totalVolume += pt.total_sold_kg;
    });

    const avg = totalVolume > 0 ? Math.round((sumWeighted / totalVolume) * 100) / 100 : 0;

    return {
      high,
      low: low === Infinity ? 0 : low,
      avg,
      totalVolumeTonnes: Math.round(totalVolume / 1000)
    };
  }, [priceSeries]);

  // Calculate dynamic width so data is never squeezed and scrolls smoothly from left to right
  const chartMinWidth = useMemo(() => {
    if (!priceSeries || priceSeries.length === 0) return 1000;
    const perPoint = frequency === 'daily' ? 14 : (frequency === 'annual' ? 65 : 22);
    return Math.max(900, priceSeries.length * perPoint);
  }, [priceSeries, frequency]);

  if (loading) {
    return (
      <div className="py-24 flex justify-center text-slate-400">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Price Statistics Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400">{t.prices.periodPeak} ({scopeLabel})</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-xl font-bold text-emerald-400">₹{stats?.high.toLocaleString()}</span>
            <span className="text-xs text-slate-500">/ kg</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">{t.prices.periodPeakSub}</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400">{t.prices.periodFloor} ({scopeLabel})</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-xl font-bold text-amber-400">₹{stats?.low.toLocaleString()}</span>
            <span className="text-xs text-slate-500">/ kg</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">{t.prices.periodFloorSub}</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400">{t.prices.avgPriceTitle} ({t.frequencies[frequency as keyof typeof t.frequencies] || frequency})</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-xl font-bold text-white">₹{stats?.avg.toLocaleString()}</span>
            <span className="text-xs text-slate-500">/ kg</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">{t.prices.avgPriceSub}</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400">{t.prices.totalCleared}</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-xl font-bold text-cyan-400">{stats?.totalVolumeTonnes.toLocaleString()}</span>
            <span className="text-xs text-slate-500">MT</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">{t.prices.totalClearedSub}</span>
        </div>
      </div>

      {/* Main Chart: Multi-Series Price Envelope with Horizontal Scroll & Timeline Navigator */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-sm font-semibold text-white">
              {t.prices.chartTitle} ({scopeLabel} • {t.frequencies[frequency as keyof typeof t.frequencies] || frequency})
            </h3>
            <p className="text-xs text-slate-400">
              {t.prices.chartSubtitle}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 text-xs font-medium">
              <MoveHorizontal className="w-3.5 h-3.5 animate-pulse" />
              <span>{priceSeries.length} points</span>
            </span>
          </div>
        </div>

        {/* Scrollable Container from Left to Right */}
        <div className="w-full overflow-x-auto overflow-y-hidden pb-4 border border-slate-800/80 rounded-xl bg-slate-950/70">
          <div style={{ minWidth: `${chartMinWidth}px`, height: '430px' }} className="p-3">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={priceSeries}>
                <defs>
                  <linearGradient id="priceSpreadGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 11 }} minTickGap={20} />
                <YAxis yAxisId="price" stroke="#64748b" tick={{ fontSize: 11 }} domain={['dataMin - 100', 'dataMax + 100']} />
                <YAxis yAxisId="volume" orientation="right" stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(val: any, name: string) => [
                    name.includes('Price') || name.includes('Mean') ? `₹${Number(val).toLocaleString()}` : `${Number(val).toLocaleString()} kg`, 
                    name
                  ]}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />

                <Area yAxisId="price" type="monotone" dataKey="max_price" stroke="#059669" fill="url(#priceSpreadGradient)" name="Max Price (₹)" />
                <Area yAxisId="price" type="monotone" dataKey="min_price" stroke="#047857" fill="#090d16" name="Min Price (₹)" />
                <Line yAxisId="price" type="monotone" dataKey="weighted_mean" stroke="#34d399" strokeWidth={2.5} dot={false} name="Weighted Mean (₹)" />
                <Line yAxisId="price" type="monotone" dataKey="unweighted_mean" stroke="#38bdf8" strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="Unweighted Mean (₹)" />
                <Bar yAxisId="volume" dataKey="total_arrived_kg" fill="#475569" opacity={0.4} name="Arrivals (kg)" />
                <Bar yAxisId="volume" dataKey="total_sold_kg" fill="#3b82f6" opacity={0.6} name="Sold (kg)" />

                {/* Timeline slider navigator */}
                <Brush 
                  dataKey="date" 
                  height={28} 
                  stroke="#10b981" 
                  fill="#090d16" 
                  tickFormatter={(v) => v}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
