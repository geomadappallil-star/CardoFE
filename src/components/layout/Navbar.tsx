import React from 'react';
import { Download, RefreshCw, Layers, MapPin, Calendar, Activity, ChevronDown, Sparkles } from 'lucide-react';

interface NavbarProps {
  spice: string;
  setSpice: (s: string) => void;
  scope: string;
  setScope: (sc: string) => void;
  dateRangePreset: string;
  setDateRangePreset: (p: string) => void;
  frequency: string;
  setFrequency: (f: string) => void;
  onExport: () => void;
  activeTab: string;
  setActiveTab: (t: string) => void;
  refreshing: boolean;
  onRefresh: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  spice,
  setSpice,
  scope,
  setScope,
  dateRangePreset,
  setDateRangePreset,
  frequency,
  setFrequency,
  onExport,
  activeTab,
  setActiveTab,
  refreshing,
  onRefresh
}) => {
  const spices = [
    { code: 'small_cardamom', name: 'Small Cardamom' },
    { code: 'black_pepper', name: 'Black Pepper' },
    { code: 'nutmeg', name: 'Nutmeg' },
    { code: 'cloves', name: 'Cloves' },
  ];

  const scopes = [
    { code: 'idukki', label: 'Idukki' },
    { code: 'kerala', label: 'Kerala' },
    { code: 'india', label: 'India' },
    { code: 'world', label: 'World' },
  ];

  const presets = [
    { code: '1Y', label: '1Y' },
    { code: '3Y', label: '3Y' },
    { code: '5Y', label: '5Y' },
    { code: 'ALL', label: 'Max (10Y)' },
  ];

  const frequencies = [
    { code: 'daily', label: 'Daily' },
    { code: 'monthly', label: 'Monthly' },
    { code: 'annual', label: 'Annual' },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'prices', label: 'Prices & Auctions' },
    { id: 'weather', label: 'Weather & Climate' },
    { id: 'production', label: 'Production & Yield' },
    { id: 'trade', label: 'Trade & Consumption' },
    { id: 'extrapolations', label: 'Extrapolations & Scenarios', highlight: true },
    { id: 'provenance', label: 'Provenance & Quality' },
  ];

  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-50">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white shadow-lg shadow-emerald-600/30">
              CB
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-white">Cardo Board</span>
                <span className="px-2 py-0.5 text-xs font-semibold rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                  v1.2 Active
                </span>
              </div>
              <p className="text-xs text-slate-400">Global Spice Intelligence & Scenario Extrapolations • Western Ghats & Global</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onRefresh}
              className={`p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors ${
                refreshing ? 'animate-spin text-emerald-400' : ''
              }`}
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onExport}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Global Filter Bar */}
        <div className="py-2.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Spice Selector */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 flex items-center gap-1 font-medium">
              <Layers className="w-3.5 h-3.5 text-emerald-400" /> Spice:
            </span>
            <div className="flex bg-slate-950 p-0.5 rounded-lg border border-slate-800">
              {spices.map(s => (
                <button
                  key={s.code}
                  onClick={() => setSpice(s.code)}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    spice === s.code
                      ? 'bg-emerald-600 text-white font-medium shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          {/* Geography Scope */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 flex items-center gap-1 font-medium">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Scope:
            </span>
            <div className="flex bg-slate-950 p-0.5 rounded-lg border border-slate-800">
              {scopes.map(sc => (
                <button
                  key={sc.code}
                  onClick={() => setScope(sc.code)}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    scope === sc.code
                      ? 'bg-slate-700 text-emerald-300 font-medium'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {sc.label}
                </button>
              ))}
            </div>
          </div>

          {/* Date Presets */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 flex items-center gap-1 font-medium">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" /> Range:
            </span>
            <div className="flex bg-slate-950 p-0.5 rounded-lg border border-slate-800">
              {presets.map(p => (
                <button
                  key={p.code}
                  onClick={() => setDateRangePreset(p.code)}
                  className={`px-2 py-1 rounded-md transition-all ${
                    dateRangePreset === p.code
                      ? 'bg-slate-700 text-white font-medium'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Frequency */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Freq:</span>
            <div className="flex bg-slate-950 p-0.5 rounded-lg border border-slate-800">
              {frequencies.map(f => (
                <button
                  key={f.code}
                  onClick={() => setFrequency(f.code)}
                  className={`px-2 py-1 rounded-md transition-all ${
                    frequency === f.code
                      ? 'bg-slate-700 text-white font-medium'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-t border-slate-800 overflow-x-auto no-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-4 font-medium text-xs sm:text-sm whitespace-nowrap border-b-2 flex items-center gap-1.5 transition-colors ${
                activeTab === tab.id
                  ? 'border-emerald-500 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {tab.highlight && <Sparkles className="w-3.5 h-3.5 text-amber-400" />}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
