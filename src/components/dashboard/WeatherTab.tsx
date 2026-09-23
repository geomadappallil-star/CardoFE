import React, { useMemo } from 'react';
import { 
  ResponsiveContainer, ComposedChart, Bar, Line, Area, XAxis, YAxis, 
  Tooltip, CartesianGrid, Legend, Brush 
} from 'recharts';
import { WeatherPoint } from '../../types/index.js';
import { CloudRain, Thermometer, Droplets, AlertOctagon, Sun, MoveHorizontal } from 'lucide-react';

interface WeatherTabProps {
  weatherData: WeatherPoint[];
  scope?: string;
  frequency?: string;
  loading: boolean;
}

export const WeatherTab: React.FC<WeatherTabProps> = ({
  weatherData,
  scope = 'all',
  frequency = 'monthly',
  loading
}) => {
  const climateMeta = useMemo(() => {
    switch (scope) {
      case 'bodinayakanur':
        return {
          name: 'Bodinayakanur (Tamil Nadu Leeward)',
          normal: '~850 mm',
          normalSub: 'Rain-Shadow East Slope Climatological Normal',
          events: 'Severe Heat Spells & Rain-Shadow Deficit',
          eventsSub: 'Low humidity increases estate borehole reliance',
          temp: '21.0°C — 36.5°C',
          tempSub: 'Theni Basin & Leeward Foot-hill Microclimate',
        };
      case 'kerala':
        return {
          name: 'Kerala Statewide Composite',
          normal: '~2,800 mm',
          normalSub: 'Statewide Climatological Precipitation Normal',
          events: 'SW & NE Monsoon Dual System Volatility',
          eventsSub: 'Statewide hydrology regulates spice output',
          temp: '22.0°C — 33.0°C',
          tempSub: 'Humid Tropical Coastal & Mid-Elevation Regime',
        };
      case 'world':
        return {
          name: 'Alta Verapaz (Guatemala Belt)',
          normal: '~2,200 mm',
          normalSub: 'Central American Cloud Forest Climatology',
          events: 'Atlantic Tropical Storms & Dry El Niño',
          eventsSub: 'Impacts international export competition',
          temp: '16.0°C — 27.0°C',
          tempSub: 'Subtropical Highland Rain-Forest Microclimate',
        };
      case 'idukki':
      default:
        return {
          name: 'Idukki Western Ghats High Ranges',
          normal: '~3,050 mm',
          normalSub: '1991-2020 Climatological Annual Normal',
          events: 'Aug 2018 Flood & 2023 Drought Stress',
          eventsSub: 'Directly drove cardamom price volatility',
          temp: '14.5°C — 28.5°C',
          tempSub: 'Cardamom Hill Reserve (1,000m - 1,400m MSL)',
        };
    }
  }, [scope]);

  const chartMinWidth = useMemo(() => {
    if (!weatherData || weatherData.length === 0) return 1000;
    const perPoint = frequency === 'daily' ? 14 : (frequency === 'annual' ? 65 : 20);
    return Math.max(900, weatherData.length * perPoint);
  }, [weatherData, frequency]);

  const subChartMinWidth = useMemo(() => {
    if (!weatherData || weatherData.length === 0) return 600;
    const perPoint = frequency === 'daily' ? 8 : (frequency === 'annual' ? 45 : 14);
    return Math.max(600, weatherData.length * perPoint);
  }, [weatherData, frequency]);

  if (loading) {
    return (
      <div className="py-24 flex justify-center text-slate-400">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Weather Header Callouts - Dynamic to Scope */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold">
            <CloudRain className="w-4 h-4" />
            <span>{climateMeta.name}</span>
          </div>
          <p className="mt-2 text-xl font-bold text-white">{climateMeta.normal}</p>
          <span className="text-xs text-slate-400">{climateMeta.normalSub}</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
            <AlertOctagon className="w-4 h-4" />
            <span>{climateMeta.events}</span>
          </div>
          <p className="mt-2 text-xl font-bold text-white">Climatic Shocks</p>
          <span className="text-xs text-slate-400">{climateMeta.eventsSub}</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
            <Thermometer className="w-4 h-4" />
            <span>Temperature Regime ({frequency.toUpperCase()})</span>
          </div>
          <p className="mt-2 text-xl font-bold text-white">{climateMeta.temp}</p>
          <span className="text-xs text-slate-400">{climateMeta.tempSub}</span>
        </div>
      </div>

      {/* Rainfall vs Baseline */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-sm font-semibold text-white">
              Observed Precipitation vs Normal Baseline ({climateMeta.name} • {frequency.toUpperCase()})
            </h3>
            <p className="text-xs text-slate-400">
              Scroll horizontally (left ↔ right) or drag the timeline slider below to inspect weather history across all years
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 px-3 py-1 rounded-lg bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 text-xs font-medium">
              <MoveHorizontal className="w-3.5 h-3.5 animate-pulse" />
              <span>Scrollable: {weatherData.length} records</span>
            </span>
          </div>
        </div>

        {/* Scrollable Container from Left to Right */}
        <div className="w-full overflow-x-auto overflow-y-hidden pb-4 border border-slate-800/80 rounded-xl bg-slate-950/70">
          <div style={{ minWidth: `${chartMinWidth}px`, height: '390px' }} className="p-3">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={weatherData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 11 }} minTickGap={20} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} label={{ value: 'Rainfall (mm)', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(val: any, name: string) => [`${val} mm`, name]}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                <Bar dataKey="rainfall_mm" fill="#0284c7" name="Observed Rainfall (mm)" />
                <Line type="monotone" dataKey="baseline_rainfall_mm" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" dot={false} name="1991-2020 Baseline (mm)" />
                
                {/* Timeline slider navigator */}
                <Brush 
                  dataKey="date" 
                  height={26} 
                  stroke="#0284c7" 
                  fill="#090d16" 
                  tickFormatter={(v) => v}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Rainfall Anomaly (% Deviation) */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Rainfall Anomaly (% Deviation from Normal)</h3>
            <p className="text-xs text-slate-400">
              Positive values indicate excess precipitation / flood conditions; negative values indicate dry spells / drought stress
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 text-xs font-medium">
              <MoveHorizontal className="w-3.5 h-3.5 animate-pulse" />
              <span>Scrollable: {weatherData.length} records</span>
            </span>
          </div>
        </div>

        {/* Scrollable Container */}
        <div className="w-full overflow-x-auto overflow-y-hidden pb-4 border border-slate-800/80 rounded-xl bg-slate-950/70">
          <div style={{ minWidth: `${chartMinWidth}px`, height: '340px' }} className="p-3">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={weatherData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 11 }} minTickGap={20} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} label={{ value: '% Anomaly', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(val: any, name: string) => [`${val}%`, name]}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                <Bar dataKey="anomaly_pct" fill="#10b981" name="Precipitation Anomaly (%)" />
                
                {/* Timeline slider navigator */}
                <Brush 
                  dataKey="date" 
                  height={26} 
                  stroke="#10b981" 
                  fill="#090d16" 
                  tickFormatter={(v) => v}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Temperature & Soil Moisture Range */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-white">High Range Temperature Bands (°C)</h3>
            <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
              <MoveHorizontal className="w-3 h-3 text-rose-400" /> Scrollable
            </span>
          </div>
          <p className="text-xs text-slate-400 mb-4">Minimum, maximum, and mean daily temperatures in Idukki</p>
          <div className="w-full overflow-x-auto overflow-y-hidden pb-3 border border-slate-800/80 rounded-xl bg-slate-950/70">
            <div style={{ minWidth: `${subChartMinWidth}px`, height: '280px' }} className="p-2">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={weatherData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 10 }} minTickGap={20} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 10 }} domain={[10, 35]} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }} />
                  <Line type="monotone" dataKey="tmax_c" stroke="#f87171" strokeWidth={1.5} dot={false} name="Max Temp (°C)" />
                  <Line type="monotone" dataKey="tmean_c" stroke="#fbbf24" strokeWidth={1.5} dot={false} name="Mean Temp (°C)" />
                  <Line type="monotone" dataKey="tmin_c" stroke="#60a5fa" strokeWidth={1.5} dot={false} name="Min Temp (°C)" />
                  <Brush dataKey="date" height={22} stroke="#f87171" fill="#090d16" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-white">Volumetric Soil Moisture Index</h3>
            <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
              <MoveHorizontal className="w-3 h-3 text-emerald-400" /> Scrollable
            </span>
          </div>
          <p className="text-xs text-slate-400 mb-4">Topsoil moisture (0-7cm) vital for cardamom root systems</p>
          <div className="w-full overflow-x-auto overflow-y-hidden pb-3 border border-slate-800/80 rounded-xl bg-slate-950/70">
            <div style={{ minWidth: `${subChartMinWidth}px`, height: '280px' }} className="p-2">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={weatherData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 10 }} minTickGap={20} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 10 }} domain={[0.1, 0.55]} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }} />
                  <Area type="monotone" dataKey="soil_moisture" stroke="#10b981" fill="#047857" fillOpacity={0.3} name="Soil Moisture (m³/m³)" />
                  <Brush dataKey="date" height={22} stroke="#10b981" fill="#090d16" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
