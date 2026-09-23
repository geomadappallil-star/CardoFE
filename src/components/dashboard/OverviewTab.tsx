import React, { useMemo } from 'react';
import { 
  TrendingUp, TrendingDown, CloudRain, AlertTriangle, CheckCircle2, 
  Layers, DollarSign, Scale, ArrowUpRight, MoveHorizontal, Calendar
} from 'lucide-react';
import { ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, Brush } from 'recharts';
import { DashboardSummary, PriceSeriesPoint, WeatherPoint } from '../../types/index.js';

interface OverviewTabProps {
  summary: DashboardSummary | null;
  priceSeries: PriceSeriesPoint[];
  weatherData?: WeatherPoint[];
  dateRangePreset?: string;
  scope?: string;
  frequency?: string;
  loading: boolean;
  onNavigateTab: (tab: string) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  summary,
  priceSeries,
  weatherData = [],
  dateRangePreset = 'ALL',
  scope = 'all',
  frequency = 'monthly',
  loading,
  onNavigateTab
}) => {
  const chartMinWidth = useMemo(() => {
    if (!priceSeries || priceSeries.length === 0) return 1000;
    const perPoint = frequency === 'daily' ? 14 : (frequency === 'annual' ? 60 : 18);
    return Math.max(1000, priceSeries.length * perPoint);
  }, [priceSeries, frequency]);

  const rangeBadge = useMemo(() => {
    switch (dateRangePreset) {
      case '1Y': return 'Past 1 Year';
      case '3Y': return 'Past 3 Years';
      case '5Y': return 'Past 5 Years';
      case 'ALL': return 'Max 10 Years';
      default: return 'Selected Period';
    }
  }, [dateRangePreset]);

  const scopeLabel = useMemo(() => {
    switch (scope) {
      case 'idukki': return 'Idukki (Vandanmettu)';
      case 'bodinayakanur': return 'Bodinayakanur (TN)';
      case 'kerala': return 'Kerala Composite';
      case 'india': return 'India (National)';
      case 'world': return 'World / Global';
      default: return 'All Markets';
    }
  }, [scope]);

  const freqLabel = useMemo(() => {
    switch (frequency) {
      case 'daily': return 'Daily';
      case 'annual': return 'Annual';
      default: return 'Monthly';
    }
  }, [frequency]);

  // Recalculate metrics dynamically based on the active timeframe
  const periodPriceStats = useMemo(() => {
    if (!priceSeries || priceSeries.length === 0) {
      return {
        avgPrice: summary?.latest_price?.avg_price || 0,
        changePct: summary?.latest_price?.change_30d_pct || 0,
        minPrice: summary?.latest_price?.min_price || 0,
        maxPrice: summary?.latest_price?.max_price || 0,
        totalArrivedTonnes: summary?.latest_arrival?.arrived_kg ? Math.round(summary.latest_arrival.arrived_kg / 1000) : 0,
        totalSoldTonnes: summary?.latest_arrival?.sold_kg ? Math.round(summary.latest_arrival.sold_kg / 1000) : 0,
        clearancePct: 92,
      };
    }

    let min = Infinity;
    let max = -Infinity;
    let weightedSum = 0;
    let totalSoldKg = 0;
    let totalArrivedKg = 0;

    priceSeries.forEach(p => {
      if (p.min_price < min && p.min_price > 0) min = p.min_price;
      if (p.max_price > max) max = p.max_price;
      weightedSum += (p.weighted_mean * p.total_sold_kg);
      totalSoldKg += p.total_sold_kg;
      totalArrivedKg += p.total_arrived_kg;
    });

    const firstPt = priceSeries[0];
    const lastPt = priceSeries[priceSeries.length - 1];
    let changePct = 0;
    if (firstPt && lastPt && firstPt.weighted_mean > 0) {
      changePct = Math.round(((lastPt.weighted_mean - firstPt.weighted_mean) / firstPt.weighted_mean) * 1000) / 10;
    }

    const avg = totalSoldKg > 0 ? Math.round(weightedSum / totalSoldKg) : Math.round(lastPt?.weighted_mean || 0);
    const clearance = totalArrivedKg > 0 ? Math.round((totalSoldKg / totalArrivedKg) * 100) : 92;

    return {
      avgPrice: avg,
      changePct,
      minPrice: min === Infinity ? Math.round(avg * 0.8) : min,
      maxPrice: max === -Infinity ? Math.round(avg * 1.2) : max,
      totalArrivedTonnes: Math.round(totalArrivedKg / 1000),
      totalSoldTonnes: Math.round(totalSoldKg / 1000),
      clearancePct: clearance,
    };
  }, [priceSeries, summary]);

  // Dynamic Weather metrics for the active timeframe and region
  const periodWeatherStats = useMemo(() => {
    if (!weatherData || weatherData.length === 0) {
      return summary?.weather_status;
    }
    let rainSum = 0;
    let baseSum = 0;
    weatherData.forEach(w => {
      rainSum += (w.rainfall_mm || 0);
      baseSum += (w.baseline_rainfall_mm || 0);
    });

    const diff = Math.round((rainSum - baseSum) * 10) / 10;
    const pct = baseSum > 0 ? Math.round((diff / baseSum) * 1000) / 10 : 0;
    let status: 'NORMAL' | 'DEFICIT' | 'EXCESS' = 'NORMAL';
    if (pct < -15) status = 'DEFICIT';
    else if (pct > 15) status = 'EXCESS';

    return {
      region: scopeLabel,
      month: `${rangeBadge} (${freqLabel})`,
      rainfall_actual_mm: Math.round(rainSum),
      rainfall_baseline_mm: Math.round(baseSum),
      anomaly_pct: pct,
      status,
    };
  }, [weatherData, rangeBadge, freqLabel, scopeLabel, summary]);

  const prod = summary?.production_overview;
  const isUp = periodPriceStats.changePct >= 0;

  if (loading && !summary && priceSeries.length === 0) {
    return (
      <div className="py-24 flex flex-col items-center justify-center text-slate-400">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm">Connecting to Supabase Cloud Telemetry...</p>
      </div>
    );
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Dynamic Filters Banner - Mobile Friendly */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-slate-300">
          <span className="font-semibold text-white flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-emerald-400" /> Active Filters:
          </span>
          <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/60 font-medium">
            Place: {scopeLabel}
          </span>
          <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800/60 font-medium">
            Freq: {freqLabel}
          </span>
          <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800/60 font-medium">
            Range: {rangeBadge}
          </span>
          <span className="hidden sm:inline text-slate-400 font-mono text-[11px]">({priceSeries.length} points aggregated)</span>
        </div>
        <span className="text-[11px] text-slate-400">
          All metrics update dynamically
        </span>
      </div>

      {/* KPI Cards Grid - Responsive: 2 cols on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {/* Card 1: Benchmark Mean Price */}
        <div className="p-3.5 sm:p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <span className="text-[11px] sm:text-xs font-medium text-slate-400">Benchmark Mean</span>
              <div className="p-1.5 sm:p-2 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                ₹{periodPriceStats.avgPrice.toLocaleString('en-IN') || '—'}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400">/ kg</span>
            </div>
          </div>
          <div className="mt-2.5 pt-2 border-t border-slate-800/60 text-[10px] sm:text-xs space-y-1">
            <div className={`flex items-center gap-1 font-semibold ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
              {isUp ? <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <TrendingDown className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
              <span>{isUp ? '+' : ''}{periodPriceStats.changePct}% in {rangeBadge}</span>
            </div>
            <div className="text-slate-500 truncate">
              Spread: ₹{periodPriceStats.minPrice} - ₹{periodPriceStats.maxPrice}
            </div>
          </div>
        </div>

        {/* Card 2: Period Auction Arrivals & Sales */}
        <div className="p-3.5 sm:p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <span className="text-[11px] sm:text-xs font-medium text-slate-400">Volume Turnover</span>
              <div className="p-1.5 sm:p-2 rounded-lg bg-blue-950/60 text-blue-400 border border-blue-800/40">
                <Scale className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                {periodPriceStats.totalArrivedTonnes ? periodPriceStats.totalArrivedTonnes.toLocaleString() : '—'}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400">Tonnes</span>
            </div>
          </div>
          <div className="mt-2.5 pt-2 border-t border-slate-800/60 text-[10px] sm:text-xs space-y-1">
            <div className="text-slate-300">
              Sold: <span className="font-semibold text-white">{periodPriceStats.totalSoldTonnes.toLocaleString()} MT</span>
            </div>
            <div className="text-emerald-400 font-medium">
              {periodPriceStats.clearancePct}% Clearance Rate
            </div>
          </div>
        </div>

        {/* Card 3: Idukki Weather & Rainfall Regime */}
        <div className="p-3.5 sm:p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <span className="text-[11px] sm:text-xs font-medium text-slate-400">Rainfall Regime</span>
              <div className="p-1.5 sm:p-2 rounded-lg bg-cyan-950/60 text-cyan-400 border border-cyan-800/40">
                <CloudRain className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                {periodWeatherStats?.rainfall_actual_mm ? periodWeatherStats.rainfall_actual_mm.toLocaleString() : '—'}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400">mm total</span>
            </div>
          </div>
          <div className="mt-2.5 pt-2 border-t border-slate-800/60 text-[10px] sm:text-xs flex items-center justify-between">
            <span className={`px-1.5 py-0.5 rounded font-medium ${
              periodWeatherStats?.status === 'NORMAL' 
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/50' 
                : periodWeatherStats?.status === 'DEFICIT' 
                  ? 'bg-amber-950 text-amber-400 border border-amber-800/50' 
                  : 'bg-blue-950 text-blue-400 border border-blue-800/50'
            }`}>
              {periodWeatherStats?.status || 'NORMAL'}
            </span>
            <span className="text-slate-400">
              {periodWeatherStats && periodWeatherStats.anomaly_pct >= 0 ? '+' : ''}{periodWeatherStats?.anomaly_pct}% vs Norm
            </span>
          </div>
        </div>

        {/* Card 4: Regional Production Dominance */}
        <div className="p-3.5 sm:p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <span className="text-[11px] sm:text-xs font-medium text-slate-400">Regional Share</span>
              <div className="p-1.5 sm:p-2 rounded-lg bg-amber-950/60 text-amber-400 border border-amber-800/40">
                <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                {prod?.idukki_share_pct || '78'}%
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400">of Kerala</span>
            </div>
          </div>
          <div className="mt-2.5 pt-2 border-t border-slate-800/60 text-[10px] sm:text-xs flex items-center justify-between text-slate-400">
            <span>{prod?.idukki_production_tonnes ? prod.idukki_production_tonnes.toLocaleString() : '14,500'} MT</span>
            <span className="text-slate-300 font-medium">Harvest '26</span>
          </div>
        </div>
      </div>

      {/* Main Chart: Horizontally Scrollable Price & Volume Trajectory */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-900 border border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div>
            <h3 className="text-sm font-semibold text-white">Price Trajectory & Volume Dynamics</h3>
            <p className="text-xs text-slate-400">
              Historical price envelope & market arrivals ({scopeLabel} • {freqLabel} • {rangeBadge})
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 text-slate-300 text-xs font-mono">
              <MoveHorizontal className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>{priceSeries.length} points</span>
            </span>
            <button 
              onClick={() => onNavigateTab('prices')}
              className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 transition-colors font-medium ml-1"
            >
              <span>Full Analytics</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Mobile Swipe Cue */}
        <div className="flex sm:hidden items-center justify-center gap-1.5 py-1 px-2 mb-2 rounded bg-slate-800/60 text-slate-400 text-[11px]">
          <MoveHorizontal className="w-3 h-3 text-emerald-400" />
          <span>Swipe horizontally to navigate full timeline</span>
        </div>

        {/* Scrollable Chart Container */}
        <div className="w-full overflow-x-auto overflow-y-hidden pb-3 border border-slate-800/80 rounded-xl bg-slate-950/70">
          <div style={{ minWidth: `${chartMinWidth}px`, height: '360px' }} className="p-2 sm:p-3">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={priceSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 11 }} minTickGap={20} />
                <YAxis yAxisId="left" stroke="#64748b" tick={{ fontSize: 11 }} domain={['auto', 'auto']} />
                <YAxis yAxisId="right" orientation="right" stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(val: any, name: string) => [
                    name.includes('Price') ? `₹${Number(val).toLocaleString()}` : `${Number(val).toLocaleString()} kg`, 
                    name
                  ]}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                <Bar yAxisId="right" dataKey="total_arrived_kg" fill="#334155" name="Arrivals (kg)" opacity={0.6} />
                <Line yAxisId="left" type="monotone" dataKey="weighted_mean" stroke="#10b981" strokeWidth={2.2} dot={false} name="Weighted Mean Price (₹)" />
                <Line yAxisId="left" type="monotone" dataKey="unweighted_mean" stroke="#38bdf8" strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="Unweighted Mean (₹)" />

                {/* Timeline slider navigator */}
                <Brush 
                  dataKey="date" 
                  height={24} 
                  stroke="#38bdf8" 
                  fill="#090d16" 
                  tickFormatter={(v) => v}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Verified E-Auctions Table */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-900 border border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div>
            <h3 className="text-sm font-semibold text-white">Recent Verified Auctions (Spices Board of India)</h3>
            <p className="text-xs text-slate-400">Live authoritative e-auction telemetry from Supabase Cloud</p>
          </div>
          <span className="px-2.5 py-1 rounded text-xs font-medium bg-emerald-950 text-emerald-400 border border-emerald-800/60 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>100% Observed Data</span>
          </span>
        </div>

        <div className="overflow-x-auto border border-slate-800/80 rounded-lg">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3 font-medium">Date</th>
                <th className="py-2.5 px-3 font-medium">Auctioneer</th>
                <th className="py-2.5 px-3 font-medium">Market Hub</th>
                <th className="py-2.5 px-3 font-medium text-right">Arrivals (kg)</th>
                <th className="py-2.5 px-3 font-medium text-right">Sold (kg)</th>
                <th className="py-2.5 px-3 font-medium text-right">Min (₹)</th>
                <th className="py-2.5 px-3 font-medium text-right">Max (₹)</th>
                <th className="py-2.5 px-3 font-medium text-right">Avg Price (₹)</th>
                <th className="py-2.5 px-3 font-medium text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {summary?.recent_auctions.map((auc) => (
                <tr key={auc.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-slate-400">{auc.date}</td>
                  <td className="py-2.5 px-3 font-medium text-white">{auc.seller_or_auctioneer}</td>
                  <td className="py-2.5 px-3 text-slate-400">{auc.market_name || 'Vandanmettu'}</td>
                  <td className="py-2.5 px-3 text-right">{auc.quantity_arrived?.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right text-emerald-400 font-medium">{auc.quantity_sold?.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right text-slate-400">₹{auc.min_price}</td>
                  <td className="py-2.5 px-3 text-right text-slate-400">₹{auc.max_price}</td>
                  <td className="py-2.5 px-3 text-right font-bold text-white">₹{auc.avg_price}</td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800/50">
                      {auc.quality_status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
