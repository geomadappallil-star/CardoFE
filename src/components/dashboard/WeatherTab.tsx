import React from 'react';
import { 
  ResponsiveContainer, ComposedChart, Bar, Line, Area, XAxis, YAxis, 
  Tooltip, CartesianGrid, Legend 
} from 'recharts';
import { WeatherPoint } from '../../types/index.js';
import { CloudRain, Thermometer, Droplets, AlertOctagon, Sun } from 'lucide-react';

interface WeatherTabProps {
  weatherData: WeatherPoint[];
  loading: boolean;
}

export const WeatherTab: React.FC<WeatherTabProps> = ({
  weatherData,
  loading
}) => {
  if (loading) {
    return (
      <div className="py-24 flex justify-center text-slate-400">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Calculate annual rainfall totals for summary
  const latestPoints = weatherData.slice(-36); // last 3 years monthly

  return (
    <div className="space-y-6">
      {/* Weather Header Callouts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold">
            <CloudRain className="w-4 h-4" />
            <span>Idukki Western Ghats Climatology</span>
          </div>
          <p className="mt-2 text-xl font-bold text-white">~3,050 mm</p>
          <span className="text-xs text-slate-400">1991-2020 Climatological Annual Normal</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
            <AlertOctagon className="w-4 h-4" />
            <span>Extreme Climatological Events</span>
          </div>
          <p className="mt-2 text-xl font-bold text-white">Aug 2018 Flood & 2023 Drought</p>
          <span className="text-xs text-slate-400">Directly drove cardamom price volatility</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
            <Thermometer className="w-4 h-4" />
            <span>High Range Temperature Regime</span>
          </div>
          <p className="mt-2 text-xl font-bold text-white">14.5°C — 28.5°C</p>
          <span className="text-xs text-slate-400">Cardamom Hill Reserve (1,000m - 1,400m MSL)</span>
        </div>
      </div>

      {/* Monthly Rainfall vs 1991-2020 Baseline */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-white">
              Observed Precipitation vs 1991–2020 Normal Baseline (Monthly)
            </h3>
            <p className="text-xs text-slate-400">
              Blue bars represent observed rainfall (mm); Dashed yellow line indicates long-term climatological baseline
            </p>
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={latestPoints}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 11 }} label={{ value: 'Rainfall (mm)', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 11 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                formatter={(val: any, name: string) => [`${val} mm`, name]}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="rainfall_mm" fill="#0284c7" name="Observed Rainfall (mm)" />
              <Line type="monotone" dataKey="baseline_rainfall_mm" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" dot={false} name="1991-2020 Baseline (mm)" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Rainfall Anomaly (% Deviation) */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-white">Rainfall Anomaly (% Deviation from Normal)</h3>
          <p className="text-xs text-slate-400">
            Positive values indicate excess precipitation / flood conditions; negative values indicate dry spells / drought stress
          </p>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={latestPoints}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 11 }} label={{ value: '% Anomaly', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 11 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                formatter={(val: any, name: string) => [`${val}%`, name]}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="anomaly_pct" fill="#10b981" name="Precipitation Anomaly (%)" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Temperature & Soil Moisture Range */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
          <h3 className="text-sm font-semibold text-white mb-2">High Range Temperature Bands (°C)</h3>
          <p className="text-xs text-slate-400 mb-4">Minimum, maximum, and mean daily temperatures in Idukki</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={latestPoints}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10 }} domain={[10, 35]} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }} />
                <Line type="monotone" dataKey="tmax_c" stroke="#f87171" strokeWidth={1.5} dot={false} name="Max Temp (°C)" />
                <Line type="monotone" dataKey="tmean_c" stroke="#fbbf24" strokeWidth={1.5} dot={false} name="Mean Temp (°C)" />
                <Line type="monotone" dataKey="tmin_c" stroke="#60a5fa" strokeWidth={1.5} dot={false} name="Min Temp (°C)" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
          <h3 className="text-sm font-semibold text-white mb-2">Volumetric Soil Moisture Index</h3>
          <p className="text-xs text-slate-400 mb-4">Topsoil moisture (0-7cm) vital for cardamom root systems</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={latestPoints}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10 }} domain={[0.1, 0.55]} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }} />
                <Area type="monotone" dataKey="soil_moisture" stroke="#10b981" fill="#047857" fillOpacity={0.3} name="Soil Moisture (m³/m³)" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
