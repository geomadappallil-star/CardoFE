import React, { useState, useEffect } from 'react';
import { 
  ResponsiveContainer, ComposedChart, Line, Area, XAxis, YAxis, 
  Tooltip, CartesianGrid, Legend 
} from 'recharts';
import { fetchExtrapolation } from '../../api/client.js';
import { 
  Sparkles, Sliders, TrendingUp, TrendingDown, CloudRain, 
  Package, DollarSign, AlertCircle, RefreshCw 
} from 'lucide-react';

interface ExtrapolationTabProps {
  spice: string;
}

export const ExtrapolationTab: React.FC<ExtrapolationTabProps> = ({ spice }) => {
  // Scenario Parameters
  const [horizonMonths, setHorizonMonths] = useState(12);
  const [weatherShockPct, setWeatherShockPct] = useState(0);
  const [supplyShockPct, setSupplyShockPct] = useState(0);
  const [demandShockPct, setDemandShockPct] = useState(0);
  const [inflationPct, setInflationPct] = useState(4.0);

  const [activePreset, setActivePreset] = useState('baseline');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const presets = [
    {
      id: 'baseline',
      label: 'Baseline Trend',
      desc: 'Neutral weather & steady historical supply',
      params: { horizonMonths: 12, weatherShockPct: 0, supplyShockPct: 0, demandShockPct: 0, inflationPct: 4.0 },
    },
    {
      id: 'drought',
      label: 'Severe Drought Squeeze',
      desc: '-30% monsoon rainfall, -12% supply contraction',
      params: { horizonMonths: 12, weatherShockPct: -30, supplyShockPct: -12, demandShockPct: 5, inflationPct: 5.0 },
    },
    {
      id: 'bumper',
      label: 'Bumper Harvest',
      desc: '+15% supply expansion, favorable weather',
      params: { horizonMonths: 12, weatherShockPct: 10, supplyShockPct: 15, demandShockPct: 0, inflationPct: 3.5 },
    },
    {
      id: 'export_surge',
      label: 'Gulf Export Surge',
      desc: '+25% Middle East demand inquiry growth',
      params: { horizonMonths: 12, weatherShockPct: 0, supplyShockPct: -5, demandShockPct: 25, inflationPct: 4.5 },
    },
  ];

  const applyPreset = (p: typeof presets[0]) => {
    setActivePreset(p.id);
    setHorizonMonths(p.params.horizonMonths);
    setWeatherShockPct(p.params.weatherShockPct);
    setSupplyShockPct(p.params.supplyShockPct);
    setDemandShockPct(p.params.demandShockPct);
    setInflationPct(p.params.inflationPct);
  };

  const runExtrapolation = async () => {
    setLoading(true);
    try {
      const res = await fetchExtrapolation({
        spice,
        horizon_months: horizonMonths,
        weather_shock_pct: weatherShockPct,
        supply_shock_pct: supplyShockPct,
        demand_shock_pct: demandShockPct,
        inflation_pct: inflationPct,
      });
      setData(res);
    } catch (err) {
      console.error('Extrapolation failed:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runExtrapolation();
  }, [spice, horizonMonths, weatherShockPct, supplyShockPct, demandShockPct, inflationPct]);

  // Combine historical and projected data for continuous chart
  const combinedChartData = React.useMemo(() => {
    if (!data) return [];
    const hist = data.historical.map((h: any) => ({
      date: h.date,
      historical_price: h.price,
      baseline_price: null,
      bullish_price: null,
      bearish_price: null,
    }));

    // Bridge point so line connects
    if (hist.length > 0) {
      const lastHist = hist[hist.length - 1];
      lastHist.baseline_price = lastHist.historical_price;
      lastHist.bullish_price = lastHist.historical_price;
      lastHist.bearish_price = lastHist.historical_price;
    }

    const proj = data.projections.map((p: any) => ({
      date: p.date,
      historical_price: null,
      baseline_price: p.baseline_price,
      bullish_price: p.bullish_price,
      bearish_price: p.bearish_price,
      projected_arrivals_kg: p.projected_arrivals_kg,
    }));

    return [...hist, ...proj];
  }, [data]);

  const summary = data?.summary;
  const isGain = (summary?.projected_change_pct || 0) >= 0;

  return (
    <div className="space-y-6">
      {/* Presets Bar */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-slate-300">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Quick Scenario Presets:</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {presets.map(p => (
            <button
              key={p.id}
              onClick={() => applyPreset(p)}
              className={`p-3 rounded-lg text-left transition-all border ${
                activePreset === p.id
                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-950'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <div className="font-semibold text-xs text-white">{p.label}</div>
              <div className="text-[10px] text-slate-400 mt-1">{p.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Controls & Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Sliders */}
        <div className="lg:col-span-1 p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-5">
          <div className="flex items-center gap-2 text-xs font-semibold text-white border-b border-slate-800 pb-3">
            <Sliders className="w-4 h-4 text-emerald-400" />
            <span>Extrapolation Parameters</span>
          </div>

          {/* Horizon Slider */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-slate-400">Projection Horizon:</span>
              <span className="font-bold text-white font-mono">{horizonMonths} Months</span>
            </div>
            <input
              type="range"
              min={6}
              max={24}
              step={6}
              value={horizonMonths}
              onChange={(e) => {
                setHorizonMonths(parseInt(e.target.value));
                setActivePreset('custom');
              }}
              className="w-full accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>6 mo (H1)</span>
              <span>12 mo (1 Year)</span>
              <span>24 mo (2 Years)</span>
            </div>
          </div>

          {/* Weather Shock */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-slate-400">Monsoon Rainfall Anomaly:</span>
              <span className={`font-bold font-mono ${weatherShockPct < 0 ? 'text-amber-400' : 'text-blue-400'}`}>
                {weatherShockPct > 0 ? '+' : ''}{weatherShockPct}%
              </span>
            </div>
            <input
              type="range"
              min={-40}
              max={40}
              step={5}
              value={weatherShockPct}
              onChange={(e) => {
                setWeatherShockPct(parseInt(e.target.value));
                setActivePreset('custom');
              }}
              className="w-full accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>-40% (Drought)</span>
              <span>0% (Normal)</span>
              <span>+40% (Flooding)</span>
            </div>
          </div>

          {/* Supply Shock */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-slate-400">Harvest Supply Shift:</span>
              <span className={`font-bold font-mono ${supplyShockPct < 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {supplyShockPct > 0 ? '+' : ''}{supplyShockPct}%
              </span>
            </div>
            <input
              type="range"
              min={-25}
              max={25}
              step={5}
              value={supplyShockPct}
              onChange={(e) => {
                setSupplyShockPct(parseInt(e.target.value));
                setActivePreset('custom');
              }}
              className="w-full accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>-25% (Deficit)</span>
              <span>0% (Baseline)</span>
              <span>+25% (Bumper)</span>
            </div>
          </div>

          {/* Demand Shock */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-slate-400">Export & Domestic Demand:</span>
              <span className={`font-bold font-mono ${demandShockPct < 0 ? 'text-slate-400' : 'text-cyan-400'}`}>
                {demandShockPct > 0 ? '+' : ''}{demandShockPct}%
              </span>
            </div>
            <input
              type="range"
              min={-20}
              max={30}
              step={5}
              value={demandShockPct}
              onChange={(e) => {
                setDemandShockPct(parseInt(e.target.value));
                setActivePreset('custom');
              }}
              className="w-full accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>-20% (Slowdown)</span>
              <span>0% (Steady)</span>
              <span>+30% (Boom)</span>
            </div>
          </div>

          {/* Inflation Rate */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-slate-400">Annual Baseline Drift:</span>
              <span className="font-bold text-white font-mono">{inflationPct}% / yr</span>
            </div>
            <input
              type="range"
              min={2}
              max={10}
              step={0.5}
              value={inflationPct}
              onChange={(e) => {
                setInflationPct(parseFloat(e.target.value));
                setActivePreset('custom');
              }}
              className="w-full accent-emerald-500"
            />
          </div>
        </div>

        {/* Right Column: Key Outputs & Narrative */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400">Current Base Price</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-xl font-bold text-white">
                  ₹{data?.current_metrics?.base_price?.toLocaleString() || '—'}
                </span>
                <span className="text-xs text-slate-500">/ kg</span>
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                Latest actual observed month ({data?.current_metrics?.latest_historical_month})
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400">Projected End Price</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className={`text-xl font-bold ${isGain ? 'text-emerald-400' : 'text-rose-400'}`}>
                  ₹{summary?.projected_end_price?.toLocaleString() || '—'}
                </span>
                <span className="text-xs text-slate-500">/ kg</span>
              </div>
              <div className={`flex items-center gap-1 text-[11px] mt-1 font-semibold ${isGain ? 'text-emerald-400' : 'text-rose-400'}`}>
                {isGain ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                <span>{isGain ? '+' : ''}{summary?.projected_change_pct}% over {horizonMonths} mo</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400">Projected Average Price</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-xl font-bold text-white">
                  ₹{summary?.avg_projected_price?.toLocaleString() || '—'}
                </span>
                <span className="text-xs text-slate-500">/ kg</span>
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">Weighted projection baseline</span>
            </div>
          </div>

          {/* Narrative Card */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800 shrink-0">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <span className="font-semibold text-white block">Analytical Scenario Assessment:</span>
              <p className="text-slate-300 mt-1 leading-relaxed">{summary?.narrative}</p>
            </div>
          </div>

          {/* Fan Chart */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-sm font-semibold text-white">Scenario Projection Cone & Fan Chart</h4>
                <p className="text-xs text-slate-400">Historical actuals transition into Bullish (+1σ), Baseline, and Bearish (-1σ) bounds</p>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={combinedChartData}>
                  <defs>
                    <linearGradient id="coneGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 10 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 10 }} domain={['auto', 'auto']} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                    formatter={(val: any, name: string) => [val ? `₹${Number(val).toLocaleString()}` : '—', name]}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />

                  {/* Historical actual */}
                  <Line type="monotone" dataKey="historical_price" stroke="#94a3b8" strokeWidth={2} dot={{ r: 2 }} name="Historical Actual (₹)" />
                  
                  {/* Projections */}
                  <Area type="monotone" dataKey="bullish_price" stroke="#38bdf8" fill="url(#coneGradient)" strokeDasharray="3 3" strokeWidth={1.5} name="Bullish Boundary (₹)" />
                  <Line type="monotone" dataKey="baseline_price" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3 }} name="Projected Baseline (₹)" />
                  <Area type="monotone" dataKey="bearish_price" stroke="#f59e0b" fill="#090d16" strokeDasharray="3 3" strokeWidth={1.5} name="Bearish Boundary (₹)" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Projected Monthly Schedule Table */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-white">Projected Forward Output Schedule</h4>
          <p className="text-xs text-slate-400">Monthly breakdown of expected central price, scenario range, and projected market volume</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3 font-medium">Month</th>
                <th className="py-2.5 px-3 font-medium text-right">Bearish Bound (₹)</th>
                <th className="py-2.5 px-3 font-medium text-right">Baseline Price (₹)</th>
                <th className="py-2.5 px-3 font-medium text-right">Bullish Bound (₹)</th>
                <th className="py-2.5 px-3 font-medium text-right">Uncertainty Spread</th>
                <th className="py-2.5 px-3 font-medium text-right">Projected Volume (MT)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {data?.projections?.map((p: any) => (
                <tr key={p.date} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-emerald-400 font-semibold">{p.date}</td>
                  <td className="py-2.5 px-3 text-right text-amber-400 font-mono">₹{p.bearish_price?.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right text-white font-bold font-mono">₹{p.baseline_price?.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right text-cyan-400 font-mono">₹{p.bullish_price?.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right text-slate-400 font-mono">±{p.uncertainty_spread_pct}%</td>
                  <td className="py-2.5 px-3 text-right text-slate-300 font-mono">{(p.projected_arrivals_kg / 1000).toFixed(1)} MT</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
