export interface PriceFact {
  id: number;
  date: string;
  spice_code: string;
  spice_name: string;
  market_name: string;
  seller_or_auctioneer: string;
  price_type: string;
  min_price: number;
  max_price: number;
  avg_price: number;
  currency: string;
  unit: string;
  quantity_arrived: number;
  quantity_sold: number;
  quality_status: string;
  source_name: string;
}

export interface PriceSeriesPoint {
  date: string;
  unweighted_mean: number;
  weighted_mean: number;
  min_price: number;
  max_price: number;
  total_arrived_kg: number;
  total_sold_kg: number;
  auction_count: number;
}

export interface WeatherPoint {
  date: string;
  rainfall_mm: number;
  baseline_rainfall_mm: number;
  anomaly_mm: number;
  anomaly_pct: number;
  tmin_c: number;
  tmax_c: number;
  tmean_c: number;
  humidity_pct?: number;
  soil_moisture?: number;
}

export interface ProductionRecord {
  id: number;
  spice_code: string;
  spice_name: string;
  geography_name: string;
  region_type?: string;
  country_iso3?: string;
  year: string;
  production_value: number;
  production_unit: string;
  area_value: number;
  area_unit: string;
  yield_value: number;
  yield_unit: string;
  source_name: string;
  quality_status: string;
}

export interface TradeRecord {
  id: number;
  spice_code: string;
  flow: 'IMPORT' | 'EXPORT';
  reporter_country: string;
  reporter_iso3: string;
  partner_country: string;
  partner_iso3: string;
  year: string;
  quantity_tonnes: number;
  trade_value_usd: number;
  unit_value_usd_per_kg: number;
  source_name: string;
  quality_status: string;
}

export interface ConsumptionRecord {
  id: number;
  spice_code: string;
  country_name: string;
  country_iso3: string;
  year: number;
  food_supply_tonnes: number;
  per_capita_quantity: number;
  per_capita_unit: string;
  source_name: string;
  quality_status: string;
}

export interface DashboardSummary {
  latest_price: {
    spice_code: string;
    spice_name: string;
    date: string;
    avg_price: number;
    min_price: number;
    max_price: number;
    currency: string;
    unit: string;
    change_30d_pct: number;
  } | null;
  latest_arrival: {
    date: string;
    arrived_kg: number;
    sold_kg: number;
    market: string;
  } | null;
  weather_status: {
    region: string;
    month: string;
    rainfall_actual_mm: number;
    rainfall_baseline_mm: number;
    anomaly_mm: number;
    anomaly_pct: number;
    status: 'NORMAL' | 'DEFICIT' | 'EXCESS';
  } | null;
  production_overview: {
    year: number;
    idukki_production_tonnes: number;
    kerala_production_tonnes: number;
    india_production_tonnes: number;
    idukki_share_pct: number;
  } | null;
  recent_auctions: PriceFact[];
  data_quality: {
    quality_breakdown: { quality_status: string; count: number }[];
    total_records: number;
    runs: any[];
  };
}
