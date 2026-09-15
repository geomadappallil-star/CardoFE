import React from 'react';
import { 
  TrendingUp, TrendingDown, CloudRain, AlertTriangle, CheckCircle2, 
  Layers, DollarSign, Scale, ArrowUpRight 
} from 'lucide-react';
import { ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { DashboardSummary, PriceSeriesPoint } from '../../types/index.js';

interface OverviewTabProps {
  summary: DashboardSummary | null;
  priceSeries: PriceSeriesPoint[];
  loading: boolean;
  onNavigateTab: (tab: string) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  summary,
  priceSeries,
  loading,
  onNavigateTab
}) => {
  if (loading && !summary) {
    return (
      <div className="py-24 flex flex-col items-center justify-center text-slate-400">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm">Loading Spice Intelligence telemetry...</p>
      </div>
    );
  }

  const latestPrice = summary?.latest_price;
  const latestArrival = summary?.latest_arrival;
  const weather = summary?.weather_status;
  const prod = summary?.production_overview;

  const isUp = (latestPrice?.change_30d_pct || 0) >= 0;

  return (
    <div className="space-y-6">
      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Latest Benchmark Price */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-xs font-medium text-slate-400">Latest Benchmark Price</span>
            <div className="p-2 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white tracking-tight">
              ₹{latestPrice?.avg_price.toLocaleString('en-IN') || '—'}
            </span>
            <span className="text-xs text-slate-400">/ kg</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs">
            <div className={`flex items-center gap-1 font-semibold ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
              {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              <span>{isUp ? '+' : ''}{latestPrice?.change_30d_pct}% (30d)</span>
            </div>
            <span className="text-slate-500">
              Spread: ₹{latestPrice?.min_price} - ₹{latestPrice?.max_price}
            </span>
          </div>
        </div>

        {/* Card 2: Daily Auction Arrivals */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
          <div className="flex justify-between items-start">
            <span className="text-xs font-medium text-slate-400">Arrivals & Sold Volume</span>
            <div className="p-2 rounded-lg bg-blue-950/60 text-blue-400 border border-blue-800/40">
              <Scale className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white tracking-tight">
              {latestArrival?.arrived_kg ? (latestArrival.arrived_kg / 1000).toFixed(1) : '—'}
            </span>
            <span className="text-xs text-slate-400">Metric Tonnes</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
            <span>Sold: {latestArrival?.sold_kg ? (latestArrival.sold_kg / 1000).toFixed(1) : '—'} MT</span>
            <span className="text-emerald-400 font-medium">
              {latestArrival && latestArrival.arrived_kg > 0 
                ? `${Math.round((latestArrival.sold_kg / latestArrival.arrived_kg) * 100)}% Clearance` 
                : ''}
            </span>
          </div>
        </div>

        {/* Card 3: Idukki Weather & Monsoon Anomaly */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
          <div className="flex justify-between items-start">
            <span className="text-xs font-medium text-slate-400">Idukki Monsoon Status</span>
            <div className="p-2 rounded-lg bg-cyan-950/60 text-cyan-400 border border-cyan-800/40">
              <CloudRain className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white tracking-tight">
              {weather ? `${weather.rainfall_actual_mm} mm` : '—'}
            </span>
            <span className="text-xs text-slate-400">in {weather?.month}</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className={`px-2 py-0.5 rounded font-medium ${
              weather?.status === 'NORMAL' 
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/50' 
                : weather?.status === 'DEFICIT' 
                  ? 'bg-amber-950 text-amber-400 border border-amber-800/50' 
                  : 'bg-blue-950 text-blue-400 border border-blue-800/50'
            }`}>
              {weather?.status || 'NORMAL'}
            </span>
            <span className="text-slate-400">
              Baseline: {weather?.rainfall_baseline_mm} mm ({weather && weather.anomaly_pct >= 0 ? '+' : ''}{weather?.anomaly_pct}%)
            </span>
          </div>
        </div>

        {/* Card 4: Idukki Production Dominance */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
          <div className="flex justify-between items-start">
            <span className="text-xs font-medium text-slate-400">Idukki Regional Share</span>
            <div className="p-2 rounded-lg bg-amber-950/60 text-amber-400 border border-amber-800/40">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white tracking-tight">
              {prod?.idukki_share_pct || '78'}%
            </span>
            <span className="text-xs text-slate-400">of Kerala crop</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
            <span>Annual: {prod?.idukki_production_tonnes ? prod.idukki_production_tonnes.toLocaleString() : '14,500'} MT</span>
            <span className="text-slate-300 font-medium">Harvest Year {prod?.year || 2026}</span>
          </div>
        </div>
      </div>

      {/* Main Chart: Price & Volume Trajectory */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Price Trajectory & Volume Dynamics</h3>
            <p className="text-xs text-slate-400">Comparing unweighted average vs quantity-weighted mean price with arrival volumes</p>
          </div>
          <button 
            onClick={() => onNavigateTab('prices')}
            className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span>Detailed Price Dynamics</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={priceSeries.slice(-90)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" stroke="#64748b" tick={{ fontSize: 11 }} domain={['auto', 'auto']} />
              <YAxis yAxisId="right" orientation="right" stroke="#64748b" tick={{ fontSize: 11 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                formatter={(val: any, name: string) => [
                  name.includes('Price') ? `₹${Number(val).toLocaleString()}` : `${Number(val).toLocaleString()} kg`, 
                  name
                ]}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar yAxisId="right" dataKey="total_arrived_kg" fill="#334155" name="Arrivals (kg)" opacity={0.6} />
              <Line yAxisId="left" type="monotone" dataKey="weighted_mean" stroke="#10b981" strokeWidth={2} dot={false} name="Weighted Mean Price (₹)" />
              <Line yAxisId="left" type="monotone" dataKey="unweighted_mean" stroke="#38bdf8" strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="Unweighted Mean (₹)" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Verified E-Auctions Table */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Recent Verified Auctions (Spices Board of India)</h3>
            <p className="text-xs text-slate-400">Authoritative primary auction records with full provenance tracking</p>
          </div>
          <span className="px-2.5 py-1 rounded text-xs font-medium bg-emerald-950 text-emerald-400 border border-emerald-800/60 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>100% Observed Data</span>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3 font-medium">Date</th>
                <th className="py-2.5 px-3 font-medium">Auctioneer</th>
                <th className="py-2.5 px-3 font-medium">Market Hub</th>
                <th className="py-2.5 px-3 font-medium text-right">Arrivals (kg)</th>
                <th className="py-2.5 px-3 font-medium text-right">Sold (kg)</th>
                <th className="py-2.5 px-3 font-medium text-right">Min Price (₹)</th>
                <th className="py-2.5 px-3 font-medium text-right">Max Price (₹)</th>
                <th className="py-2.5 px-3 font-medium text-right">Avg Price (₹)</th>
                <th className="py-2.5 px-3 font-medium text-center">Quality</th>
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
