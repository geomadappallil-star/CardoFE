import React, { useMemo } from 'react';
import { 
  ResponsiveContainer, ComposedChart, Line, Bar, Area, XAxis, YAxis, 
  Tooltip, CartesianGrid, Legend 
} from 'recharts';
import { PriceSeriesPoint } from '../../types/index.js';
import { TrendingUp, Scale, ArrowDown, ArrowUp, BarChart3 } from 'lucide-react';

interface PricesTabProps {
  priceSeries: PriceSeriesPoint[];
  spice: string;
  frequency: string;
  loading: boolean;
}

export const PricesTab: React.FC<PricesTabProps> = ({
  priceSeries,
  spice,
  frequency,
  loading
}) => {
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
          <span className="text-xs text-slate-400">Period Peak (Max Price)</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-xl font-bold text-emerald-400">₹{stats?.high.toLocaleString()}</span>
            <span className="text-xs text-slate-500">/ kg</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Historic peak during 2019 flood recovery</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400">Period Low (Min Price)</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-xl font-bold text-amber-400">₹{stats?.low.toLocaleString()}</span>
            <span className="text-xs text-slate-500">/ kg</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Low band floor during harvest peaks</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400">Volume-Weighted Average</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-xl font-bold text-white">₹{stats?.avg.toLocaleString()}</span>
            <span className="text-xs text-slate-500">/ kg</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Σ(Price × Qty) / Σ(Qty) weighted metric</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400">Total Cleared Volume</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-xl font-bold text-cyan-400">{stats?.totalVolumeTonnes.toLocaleString()}</span>
            <span className="text-xs text-slate-500">MT</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Cumulative auction clearance</span>
        </div>
      </div>

      {/* Main Chart: Multi-Series Price Envelope */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-sm font-semibold text-white">
              Price Dynamics Envelope & Auction Volumes ({frequency.toUpperCase()})
            </h3>
            <p className="text-xs text-slate-400">
              Shaded band captures Min-Max daily spreads; Green line tracks Quantity-Weighted mean price
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-3 h-3 rounded bg-emerald-500/20 border border-emerald-500 inline-block" />
            <span>Price Spread Envelope</span>
          </div>
        </div>

        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={priceSeries}>
              <defs>
                <linearGradient id="priceSpreadGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 11 }} minTickGap={30} />
              <YAxis yAxisId="price" stroke="#64748b" tick={{ fontSize: 11 }} domain={['dataMin - 100', 'dataMax + 100']} />
              <YAxis yAxisId="volume" orientation="right" stroke="#64748b" tick={{ fontSize: 11 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                formatter={(val: any, name: string) => [
                  name.includes('Price') || name.includes('Mean') ? `₹${Number(val).toLocaleString()}` : `${Number(val).toLocaleString()} kg`, 
                  name
                ]}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />

              <Area yAxisId="price" type="monotone" dataKey="max_price" stroke="#059669" fill="url(#priceSpreadGradient)" name="Max Price (₹)" />
              <Area yAxisId="price" type="monotone" dataKey="min_price" stroke="#047857" fill="#090d16" name="Min Price (₹)" />
              <Line yAxisId="price" type="monotone" dataKey="weighted_mean" stroke="#34d399" strokeWidth={2.5} dot={false} name="Weighted Mean (₹)" />
              <Line yAxisId="price" type="monotone" dataKey="unweighted_mean" stroke="#38bdf8" strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="Unweighted Mean (₹)" />
              <Bar yAxisId="volume" dataKey="total_arrived_kg" fill="#475569" opacity={0.4} name="Arrivals (kg)" />
              <Bar yAxisId="volume" dataKey="total_sold_kg" fill="#3b82f6" opacity={0.6} name="Sold (kg)" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Auction Structure & Trust Architecture Note */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
        <div className="p-2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 shrink-0">
          <BarChart3 className="w-4 h-4" />
        </div>
        <div>
          <h4 className="font-semibold text-slate-200">Analytical Trust Principle: Weighted vs Unweighted Aggregations</h4>
          <p className="mt-1 text-slate-400 leading-relaxed">
            In accordance with the project development charter, raw daily auctions from the four certified auctioneers 
            (MAS Enterprises, SIGC, CPMC, SPCL) are preserved without distortion. The quantity-weighted mean:
            <code className="mx-1 px-1 py-0.5 rounded bg-slate-800 text-emerald-300">Σ(Price × Sold_Quantity) / Σ(Sold_Quantity)</code>
            accurately factors market liquidity rather than giving equal weight to thin or illiquid auction lots.
          </p>
        </div>
      </div>
    </div>
  );
};
