import React, { useState, useMemo } from 'react';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, 
  CartesianGrid, Legend 
} from 'recharts';
import { ProductionRecord } from '../../types/index.js';
import { Sprout, MapPin, Award, Layers } from 'lucide-react';
import { Language, translations } from '../../i18n/translations.js';

interface ProductionTabProps {
  productionData: ProductionRecord[];
  scope?: string;
  language?: Language;
  loading: boolean;
}

export const ProductionTab: React.FC<ProductionTabProps> = ({
  productionData,
  scope = 'all',
  language = 'en',
  loading
}) => {
  const [selectedMetric, setSelectedMetric] = useState<'production' | 'area' | 'yield'>('production');
  const t = translations[language] || translations.en;

  const scopeLabel = useMemo(() => {
    return t.scopes[scope as keyof typeof t.scopes] || scope;
  }, [scope, t]);

  if (loading) {
    return (
      <div className="py-24 flex justify-center text-slate-400">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Pivot data by year and geography
  const years = Array.from(new Set(productionData.map(p => p.year))).sort();
  const geographies = Array.from(new Set(productionData.map(p => p.geography_name)));

  const chartData = years.map(y => {
    const pt: any = { year: y };
    geographies.forEach(g => {
      const match = productionData.find(p => p.year === y && p.geography_name === g);
      if (match) {
        if (selectedMetric === 'production') pt[g] = match.production_value;
        else if (selectedMetric === 'area') pt[g] = match.area_value;
        else pt[g] = match.yield_value;
      }
    });
    return pt;
  });

  const colors = ['#10b981', '#38bdf8', '#f59e0b', '#ec4899', '#a855f7'];

  return (
    <div className="space-y-6">
      {/* Metric Selector & Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800">
        <div>
          <h3 className="text-sm font-semibold text-white">
            {t.production.title} ({scopeLabel})
          </h3>
          <p className="text-xs text-slate-400">{t.production.subtitle}</p>
        </div>
        <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => setSelectedMetric('production')}
            className={`px-3 py-1 rounded-md transition-colors ${
              selectedMetric === 'production' ? 'bg-emerald-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.production.metricProduction}
          </button>
          <button
            onClick={() => setSelectedMetric('area')}
            className={`px-3 py-1 rounded-md transition-colors ${
              selectedMetric === 'area' ? 'bg-emerald-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.production.metricArea}
          </button>
          <button
            onClick={() => setSelectedMetric('yield')}
            className={`px-3 py-1 rounded-md transition-colors ${
              selectedMetric === 'yield' ? 'bg-emerald-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.production.metricYield}
          </button>
        </div>
      </div>

      {/* Main Chart */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="year" stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                formatter={(val: any, name: string) => [
                  selectedMetric === 'yield' ? `${val} kg/ha` : `${Number(val).toLocaleString()} ${selectedMetric === 'production' ? 'tonnes' : 'ha'}`,
                  name
                ]}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              {geographies.map((g, idx) => (
                <Bar key={g} dataKey={g} fill={colors[idx % colors.length]} name={g} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Production Hierarchy Table */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-white">{t.production.hierarchyTitle}</h3>
          <p className="text-xs text-slate-400">{t.production.hierarchySubtitle}</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3 font-medium">Year</th>
                <th className="py-2.5 px-3 font-medium">Geography</th>
                <th className="py-2.5 px-3 font-medium">Region Type</th>
                <th className="py-2.5 px-3 font-medium text-right">Production (Tonnes)</th>
                <th className="py-2.5 px-3 font-medium text-right">Area (Hectares)</th>
                <th className="py-2.5 px-3 font-medium text-right">Yield (kg/ha)</th>
                <th className="py-2.5 px-3 font-medium text-center">Quality</th>
                <th className="py-2.5 px-3 font-medium">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {productionData.map((row) => (
                <tr key={row.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-2 px-3 font-mono text-slate-400">{row.year}</td>
                  <td className="py-2 px-3 font-medium text-white">{row.geography_name}</td>
                  <td className="py-2 px-3 text-slate-400">{row.region_type || 'COUNTRY'}</td>
                  <td className="py-2 px-3 text-right font-semibold text-emerald-400">{row.production_value?.toLocaleString()}</td>
                  <td className="py-2 px-3 text-right text-slate-300">{row.area_value?.toLocaleString()}</td>
                  <td className="py-2 px-3 text-right text-white">{row.yield_value}</td>
                  <td className="py-2 px-3 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-950 text-blue-400 border border-blue-800/50">
                      {row.quality_status}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-slate-400 text-[11px]">{row.source_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
