import React from 'react';
import { 
  ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, 
  Tooltip, CartesianGrid, Legend 
} from 'recharts';
import { TradeRecord, ConsumptionRecord } from '../../types/index.js';
import { Globe, ArrowUpRight, Coffee, ShieldCheck } from 'lucide-react';

interface TradeTabProps {
  tradeData: TradeRecord[];
  consumptionData: ConsumptionRecord[];
  loading: boolean;
}

export const TradeTab: React.FC<TradeTabProps> = ({
  tradeData,
  consumptionData,
  loading
}) => {
  if (loading) {
    return (
      <div className="py-24 flex justify-center text-slate-400">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <Globe className="w-4 h-4" />
            <span>Primary Export Corridors</span>
          </div>
          <p className="mt-2 text-lg font-bold text-white">India → Saudi Arabia & UAE</p>
          <span className="text-xs text-slate-400">Premium Alleppey Green Extra Bold (AGEB) Cardamom</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
            <Coffee className="w-4 h-4" />
            <span>High Per Capita Consumption</span>
          </div>
          <p className="mt-2 text-lg font-bold text-white">Saudi Arabia (~0.38 kg/capita)</p>
          <span className="text-xs text-slate-400">Gahwa traditional cardamom coffee cultural staple</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
            <ArrowUpRight className="w-4 h-4" />
            <span>Export Unit Value</span>
          </div>
          <p className="mt-2 text-lg font-bold text-white">$22.00 - $26.00 / kg</p>
          <span className="text-xs text-slate-400">UN Comtrade FOB Export Value Realization</span>
        </div>
      </div>

      {/* Trade Flows Chart */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-white">Annual Export Volumes by Country Pair (UN Comtrade)</h3>
          <p className="text-xs text-slate-400">Direct trade flows between major exporting and importing destinations</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3 font-medium">Year</th>
                <th className="py-2.5 px-3 font-medium">Exporter</th>
                <th className="py-2.5 px-3 font-medium">Destination Partner</th>
                <th className="py-2.5 px-3 font-medium text-right">Volume (Tonnes)</th>
                <th className="py-2.5 px-3 font-medium text-right">Trade Value (USD)</th>
                <th className="py-2.5 px-3 font-medium text-right">Unit Value ($/kg)</th>
                <th className="py-2.5 px-3 font-medium">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {tradeData.map((t) => (
                <tr key={t.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-2 px-3 font-mono text-slate-400">{t.year}</td>
                  <td className="py-2 px-3 font-medium text-white">{t.reporter_country}</td>
                  <td className="py-2 px-3 text-emerald-400 font-medium">{t.partner_country}</td>
                  <td className="py-2 px-3 text-right font-semibold text-white">{t.quantity_tonnes?.toLocaleString()} MT</td>
                  <td className="py-2 px-3 text-right text-slate-300">${t.trade_value_usd?.toLocaleString()}</td>
                  <td className="py-2 px-3 text-right text-emerald-400 font-bold">${t.unit_value_usd_per_kg}</td>
                  <td className="py-2 px-3 text-slate-400 text-[11px]">{t.source_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAOSTAT Food Supply / Consumption */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-white">Apparent Food Supply & Per Capita Consumption (FAOSTAT)</h3>
          <p className="text-xs text-slate-400">Strictly reported without turning missing values into zero</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3 font-medium">Year</th>
                <th className="py-2.5 px-3 font-medium">Country</th>
                <th className="py-2.5 px-3 font-medium text-right">Total Food Supply (Tonnes)</th>
                <th className="py-2.5 px-3 font-medium text-right">Per Capita Supply (kg/year)</th>
                <th className="py-2.5 px-3 font-medium text-center">Quality Status</th>
                <th className="py-2.5 px-3 font-medium">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {consumptionData.map((c) => (
                <tr key={c.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-2 px-3 font-mono text-slate-400">{c.year}</td>
                  <td className="py-2 px-3 font-medium text-white">{c.country_name}</td>
                  <td className="py-2 px-3 text-right font-semibold text-white">{c.food_supply_tonnes?.toLocaleString()} MT</td>
                  <td className="py-2 px-3 text-right text-amber-400 font-bold">{c.per_capita_quantity} kg</td>
                  <td className="py-2 px-3 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-950 text-blue-400 border border-blue-800/50">
                      {c.quality_status}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-slate-400 text-[11px]">{c.source_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
