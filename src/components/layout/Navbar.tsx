import React, { useState, useRef, useEffect } from 'react';
import { Download, RefreshCw, Layers, MapPin, Calendar, Sparkles, Languages, ChevronDown, Check } from 'lucide-react';
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

  const [isSpiceOpen, setIsSpiceOpen] = useState(false);
  const [isScopeOpen, setIsScopeOpen] = useState(false);
  const spiceRef = useRef<HTMLDivElement>(null);
  const scopeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (spiceRef.current && !spiceRef.current.contains(e.target as Node)) {
        setIsSpiceOpen(false);
      }
      if (scopeRef.current && !scopeRef.current.contains(e.target as Node)) {
        setIsScopeOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSpiceOpen(false);
        setIsScopeOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const spices = [
    { code: 'small_cardamom', name: t.spices.small_cardamom, badge: 'Live E-Auctions' },
    { code: 'black_pepper', name: t.spices.black_pepper, badge: 'Kochi Terminal' },
    { code: 'nutmeg', name: t.spices.nutmeg, badge: 'Kalpetta Spot' },
    { code: 'cloves', name: t.spices.cloves, badge: 'Domestic Mandi' },
  ];

  const scopes = [
    { code: 'all', label: t.scopes.all, badge: 'All Hubs' },
    { code: 'idukki', label: t.scopes.idukki, badge: 'High Ranges' },
    { code: 'bodinayakanur', label: t.scopes.bodinayakanur, badge: 'TN Mandi' },
    { code: 'kerala', label: t.scopes.kerala, badge: 'State Wide' },
    { code: 'india', label: t.scopes.india, badge: 'National' },
    { code: 'world', label: t.scopes.world, badge: 'Guatemala' },
  ];

  const currentSpice = spices.find(s => s.code === spice) || spices[0];
  const currentScope = scopes.find(sc => sc.code === scope) || scopes[0];

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

  const isAuctionSpice = spice === 'small_cardamom';
  const dailyTabLabel = isAuctionSpice ? t.tabs.dailyAuction : t.tabs.dailyMarket;

  const tabs = [
    { id: 'daily_auction', label: dailyTabLabel, highlight: true },
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

        {/* Global Filter Bar - Sleek Custom Dropdowns */}
        <div className="py-2 border-t border-slate-800/80 overflow-visible flex flex-wrap sm:flex-nowrap items-center gap-2.5 sm:gap-4 text-xs whitespace-nowrap">
          {/* Custom Spice Selector Dropdown */}
          <div className="relative shrink-0" ref={spiceRef}>
            <button
              type="button"
              onClick={() => {
                setIsSpiceOpen(!isSpiceOpen);
                setIsScopeOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white border border-slate-700/80 hover:border-emerald-500/60 transition-all text-xs font-medium shadow-sm group focus:outline-none focus:ring-1 focus:ring-emerald-500"
              aria-expanded={isSpiceOpen}
            >
              <div className="p-1 rounded-md bg-emerald-950 text-emerald-400 border border-emerald-800/60 group-hover:scale-105 transition-transform">
                <Layers className="w-3.5 h-3.5" />
              </div>
              <span className="text-slate-400 hidden xs:inline">{language === 'ml' ? 'ഇനം:' : 'Spice:'}</span>
              <span className="font-semibold text-emerald-300">{currentSpice.name}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isSpiceOpen ? 'rotate-180 text-emerald-400' : ''}`} />
            </button>

            {isSpiceOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-64 rounded-xl bg-slate-900 border border-slate-700/90 shadow-2xl shadow-black/90 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 backdrop-blur-lg">
                <div className="px-3 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800 mb-1">
                  {language === 'ml' ? 'സുഗന്ധവ്യഞ്ജനം തിരഞ്ഞെടുക്കുക' : 'Select Spice'}
                </div>
                {spices.map(s => (
                  <button
                    key={s.code}
                    type="button"
                    onClick={() => {
                      setSpice(s.code);
                      setIsSpiceOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between text-xs transition-colors ${
                      spice === s.code
                        ? 'bg-emerald-950/70 text-emerald-300 font-semibold border-l-2 border-emerald-500'
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`}
                  >
                    <div>
                      <div className="font-medium text-white">{s.name}</div>
                      {s.badge && (
                        <div className="text-[10px] text-slate-400 font-normal">
                          {s.badge}
                        </div>
                      )}
                    </div>
                    {spice === s.code && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-2" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Custom Scope Selector Dropdown */}
          <div className="relative shrink-0" ref={scopeRef}>
            <button
              type="button"
              onClick={() => {
                setIsScopeOpen(!isScopeOpen);
                setIsSpiceOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white border border-slate-700/80 hover:border-sky-500/60 transition-all text-xs font-medium shadow-sm group focus:outline-none focus:ring-1 focus:ring-sky-500"
              aria-expanded={isScopeOpen}
            >
              <div className="p-1 rounded-md bg-sky-950 text-sky-400 border border-sky-800/60 group-hover:scale-105 transition-transform">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <span className="text-slate-400 hidden xs:inline">{language === 'ml' ? 'മേഖല:' : 'Scope:'}</span>
              <span className="font-semibold text-sky-300">{currentScope.label}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isScopeOpen ? 'rotate-180 text-sky-400' : ''}`} />
            </button>

            {isScopeOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-60 rounded-xl bg-slate-900 border border-slate-700/90 shadow-2xl shadow-black/90 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 backdrop-blur-lg">
                <div className="px-3 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800 mb-1">
                  {language === 'ml' ? 'മേഖല തിരഞ്ഞെടുക്കുക' : 'Select Geographic Scope'}
                </div>
                {scopes.map(sc => (
                  <button
                    key={sc.code}
                    type="button"
                    onClick={() => {
                      setScope(sc.code);
                      setIsScopeOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between text-xs transition-colors ${
                      scope === sc.code
                        ? 'bg-sky-950/70 text-sky-300 font-semibold border-l-2 border-sky-500'
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`}
                  >
                    <div>
                      <div className="font-medium text-white">{sc.label}</div>
                      {sc.badge && (
                        <div className="text-[10px] text-slate-400 font-normal">
                          {sc.badge}
                        </div>
                      )}
                    </div>
                    {scope === sc.code && <Check className="w-3.5 h-3.5 text-sky-400 shrink-0 ml-2" />}
                  </button>
                ))}
              </div>
            )}
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
