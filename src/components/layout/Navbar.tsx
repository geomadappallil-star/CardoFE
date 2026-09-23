import React from 'react';
import { Download, RefreshCw, Layers, MapPin, Calendar, Sparkles, Languages } from 'lucide-react';
import { Language, translations } from '../../i18n/translations.js';

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
  language: Language;
  setLanguage: (l: Language) => void;
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
  onRefresh,
  language,
  setLanguage
}) => {
  const t = translations[language];

  const spices = [
    { code: 'small_cardamom', name: t.spices.small_cardamom },
    { code: 'black_pepper', name: t.spices.black_pepper },
    { code: 'nutmeg', name: t.spices.nutmeg },
    { code: 'cloves', name: t.spices.cloves },
  ];

  const scopes = [
    { code: 'all', label: t.scopes.all },
    { code: 'idukki', label: t.scopes.idukki },
    { code: 'bodinayakanur', label: t.scopes.bodinayakanur },
    { code: 'kerala', label: t.scopes.kerala },
    { code: 'india', label: t.scopes.india },
    { code: 'world', label: t.scopes.world },
  ];

  const presets = [
    { code: '1Y', label: t.ranges['1Y'] },
    { code: '3Y', label: t.ranges['3Y'] },
    { code: '5Y', label: t.ranges['5Y'] },
    { code: 'ALL', label: t.ranges['ALL'] },
  ];

  const frequencies = [
    { code: 'daily', label: t.frequencies.daily },
    { code: 'monthly', label: t.frequencies.monthly },
    { code: 'annual', label: t.frequencies.annual },
  ];

  const tabs = [
    { id: 'overview', label: t.tabs.overview },
    { id: 'prices', label: t.tabs.prices },
    { id: 'weather', label: t.tabs.weather },
    { id: 'production', label: t.tabs.production },
    { id: 'trade', label: t.tabs.trade },
    { id: 'extrapolations', label: t.tabs.extrapolations, highlight: true },
    { id: 'provenance', label: t.tabs.provenance },
  ];

  return (
    <header className="border-b border-slate-800 bg-slate-900/95 backdrop-blur sticky top-0 z-50">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white text-sm sm:text-base shadow-lg shadow-emerald-600/30 shrink-0">
              CB
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-bold text-base sm:text-lg tracking-tight text-white">{t.appName}</span>
                <span className="px-1.5 py-0.5 text-[10px] sm:text-xs font-semibold rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                  v1.3
                </span>
              </div>
              <p className="hidden sm:block text-xs text-slate-400">{t.appSubtitle}</p>
            </div>
          </div>

          {/* Quick Actions & Language Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Seamless Language Toggle */}
            <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-xs font-medium">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded transition-all flex items-center gap-1 ${
                  language === 'en'
                    ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="English"
              >
                <span>EN</span>
              </button>
              <button
                onClick={() => setLanguage('ml')}
                className={`px-2.5 py-1 rounded transition-all flex items-center gap-1 ${
                  language === 'ml'
                    ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="മലയാളം (Malayalam)"
              >
                <span>മലയാളം</span>
              </button>
            </div>

            <button
              onClick={onRefresh}
              className={`p-1.5 sm:p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors ${
                refreshing ? 'animate-spin text-emerald-400' : ''
              }`}
              title={t.refresh}
            >
              <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <button
              onClick={onExport}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{t.export}</span>
            </button>
          </div>
        </div>

        {/* Global Filter Bar - Mobile Horizontally Scrollable without multi-row wrap */}
        <div className="py-2 border-t border-slate-800/80 overflow-x-auto no-scrollbar flex items-center gap-3 sm:gap-4 text-xs whitespace-nowrap">
          {/* Spice Selector */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-slate-400 flex items-center gap-1 font-medium text-[11px] sm:text-xs">
              <Layers className="w-3.5 h-3.5 text-emerald-400" /> {language === 'ml' ? 'ഇനം:' : 'Spice:'}
            </span>
            <div className="flex bg-slate-950 p-0.5 rounded-lg border border-slate-800">
              {spices.map(s => (
                <button
                  key={s.code}
                  onClick={() => setSpice(s.code)}
                  className={`px-2 sm:px-2.5 py-1 rounded-md text-[11px] sm:text-xs transition-all ${
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
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-slate-400 flex items-center gap-1 font-medium text-[11px] sm:text-xs">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" /> {language === 'ml' ? 'മേഖല:' : 'Scope:'}
            </span>
            <div className="flex bg-slate-950 p-0.5 rounded-lg border border-slate-800">
              {scopes.map(sc => (
                <button
                  key={sc.code}
                  onClick={() => setScope(sc.code)}
                  className={`px-2 sm:px-2.5 py-1 rounded-md text-[11px] sm:text-xs transition-all ${
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

          {/* Date Presets (Timeframe) */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-slate-400 flex items-center gap-1 font-medium text-[11px] sm:text-xs">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" /> {language === 'ml' ? 'കാലയളവ്:' : 'Range:'}
            </span>
            <div className="flex bg-slate-950 p-0.5 rounded-lg border border-slate-800">
              {presets.map(p => (
                <button
                  key={p.code}
                  onClick={() => setDateRangePreset(p.code)}
                  className={`px-2 sm:px-2.5 py-1 rounded-md text-[11px] sm:text-xs transition-all ${
                    dateRangePreset === p.code
                      ? 'bg-slate-700 text-white font-medium shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Frequency */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-slate-400 font-medium text-[11px] sm:text-xs">{language === 'ml' ? 'തരം:' : 'Freq:'}</span>
            <div className="flex bg-slate-950 p-0.5 rounded-lg border border-slate-800">
              {frequencies.map(f => (
                <button
                  key={f.code}
                  onClick={() => setFrequency(f.code)}
                  className={`px-2 sm:px-2.5 py-1 rounded-md text-[11px] sm:text-xs transition-all ${
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

        {/* Navigation Tabs - Horizontally scrollable on mobile */}
        <div className="flex border-t border-slate-800 overflow-x-auto no-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2.5 sm:py-3 px-3 sm:px-4 font-medium text-xs sm:text-sm whitespace-nowrap border-b-2 flex items-center gap-1.5 transition-colors shrink-0 ${
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
