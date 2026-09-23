import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/layout/Navbar.js';
import { OverviewTab } from './components/dashboard/OverviewTab.js';
import { PricesTab } from './components/dashboard/PricesTab.js';
import { WeatherTab } from './components/dashboard/WeatherTab.js';
import { ProductionTab } from './components/dashboard/ProductionTab.js';
import { TradeTab } from './components/dashboard/TradeTab.js';
import { ExtrapolationTab } from './components/dashboard/ExtrapolationTab.js';
import { ProvenanceTab } from './components/dashboard/ProvenanceTab.js';
import { ExportModal } from './components/modals/ExportModal.js';
import { 
  fetchSummary, fetchPrices, fetchWeather, 
  fetchProduction, fetchTrade, fetchConsumption 
} from './api/client.js';
import { 
  DashboardSummary, PriceSeriesPoint, WeatherPoint, 
  ProductionRecord, TradeRecord, ConsumptionRecord 
} from './types/index.js';
import { logVisitorEvent } from './api/visitorTracker.js';

export function App() {
  const searchParams = new URLSearchParams(window.location.search);
  const [spice, setSpice] = useState(searchParams.get('spice') || 'small_cardamom');
  const [scope, setScope] = useState(searchParams.get('scope') || 'idukki');
  const [dateRangePreset, setDateRangePreset] = useState(searchParams.get('range') || 'ALL');
  const [frequency, setFrequency] = useState(searchParams.get('frequency') || 'monthly');
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'overview');
  
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Data states
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [priceSeries, setPriceSeries] = useState<PriceSeriesPoint[]>([]);
  const [weatherData, setWeatherData] = useState<WeatherPoint[]>([]);
  const [productionData, setProductionData] = useState<ProductionRecord[]>([]);
  const [tradeData, setTradeData] = useState<TradeRecord[]>([]);
  const [consumptionData, setConsumptionData] = useState<ConsumptionRecord[]>([]);

  // Update URL whenever filters change
  useEffect(() => {
    const params = new URLSearchParams();
    params.set('spice', spice);
    params.set('scope', scope);
    params.set('range', dateRangePreset);
    params.set('frequency', frequency);
    params.set('tab', activeTab);
    window.history.replaceState(null, '', `?${params.toString()}`);
  }, [spice, scope, dateRangePreset, frequency, activeTab]);

  const getDateBounds = useCallback(() => {
    const to = '2026-09-15';
    let from = '2016-01-01';
    if (dateRangePreset === '1Y') from = '2025-09-15';
    else if (dateRangePreset === '3Y') from = '2023-09-15';
    else if (dateRangePreset === '5Y') from = '2021-09-15';
    else if (dateRangePreset === 'ALL') from = '2016-01-01';
    return { from, to };
  }, [dateRangePreset]);

  const loadData = useCallback(async () => {
    setLoading(true);
    const { from, to } = getDateBounds();

    try {
      const [sumRes, priceRes, weatherRes, prodRes, tradeRes, consRes] = await Promise.all([
        fetchSummary(spice),
        fetchPrices({ spice, from, to, frequency }),
        fetchWeather({ from, to, frequency }),
        fetchProduction(spice),
        fetchTrade(spice),
        fetchConsumption(spice),
      ]);

      setSummary(sumRes);
      setPriceSeries(priceRes.data || []);
      setWeatherData(weatherRes.data || []);
      setProductionData(prodRes.data || []);
      setTradeData(tradeRes.data || []);
      setConsumptionData(consRes.data || []);
    } catch (err) {
      console.error('Failed to load dashboard telemetry:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [spice, frequency, getDateBounds]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    logVisitorEvent(activeTab);
  }, [activeTab]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar
        spice={spice}
        setSpice={setSpice}
        scope={scope}
        setScope={setScope}
        dateRangePreset={dateRangePreset}
        setDateRangePreset={setDateRangePreset}
        frequency={frequency}
        setFrequency={setFrequency}
        onExport={() => setIsExportOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
        {activeTab === 'overview' && (
          <OverviewTab
            summary={summary}
            priceSeries={priceSeries}
            weatherData={weatherData}
            dateRangePreset={dateRangePreset}
            loading={loading}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'prices' && (
          <PricesTab
            priceSeries={priceSeries}
            spice={spice}
            frequency={frequency}
            loading={loading}
          />
        )}

        {activeTab === 'weather' && (
          <WeatherTab
            weatherData={weatherData}
            loading={loading}
          />
        )}

        {activeTab === 'production' && (
          <ProductionTab
            productionData={productionData}
            loading={loading}
          />
        )}

        {activeTab === 'trade' && (
          <TradeTab
            tradeData={tradeData}
            consumptionData={consumptionData}
            loading={loading}
          />
        )}

        {activeTab === 'extrapolations' && (
          <ExtrapolationTab
            spice={spice}
          />
        )}

        {activeTab === 'provenance' && (
          <ProvenanceTab />
        )}
      </main>

      <footer className="border-t border-slate-800/80 py-4 text-center text-xs text-slate-500">
        <p>Cardo Board — Global Spice Intelligence & Parameterized Extrapolations • Western Ghats & Global Telemetry</p>
      </footer>

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        priceSeries={priceSeries}
        spice={spice}
      />
    </div>
  );
}
