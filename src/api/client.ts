const API_BASE = '/api/v1';

export async function fetchSummary(spice: string = 'small_cardamom') {
  const res = await fetch(`${API_BASE}/dashboard/summary?spice=${encodeURIComponent(spice)}`);
  if (!res.ok) throw new Error(`Failed to fetch summary: ${res.statusText}`);
  return res.json();
}

export async function fetchPrices(params: { spice: string; from: string; to: string; frequency: string }) {
  const query = new URLSearchParams({
    spice: params.spice,
    from: params.from,
    to: params.to,
    frequency: params.frequency
  });
  const res = await fetch(`${API_BASE}/prices?${query.toString()}`);
  if (!res.ok) throw new Error(`Failed to fetch prices: ${res.statusText}`);
  return res.json();
}

export async function fetchWeather(params: { from: string; to: string; frequency: string }) {
  const query = new URLSearchParams({
    from: params.from,
    to: params.to,
    frequency: params.frequency
  });
  const res = await fetch(`${API_BASE}/weather?${query.toString()}`);
  if (!res.ok) throw new Error(`Failed to fetch weather: ${res.statusText}`);
  return res.json();
}

export async function fetchProduction(spice: string) {
  const res = await fetch(`${API_BASE}/production?spice=${encodeURIComponent(spice)}`);
  if (!res.ok) throw new Error(`Failed to fetch production: ${res.statusText}`);
  return res.json();
}

export async function fetchTrade(spice: string) {
  const res = await fetch(`${API_BASE}/trade?spice=${encodeURIComponent(spice)}`);
  if (!res.ok) throw new Error(`Failed to fetch trade: ${res.statusText}`);
  return res.json();
}

export async function fetchConsumption(spice: string) {
  const res = await fetch(`${API_BASE}/consumption?spice=${encodeURIComponent(spice)}`);
  if (!res.ok) throw new Error(`Failed to fetch consumption: ${res.statusText}`);
  return res.json();
}

export async function fetchSources() {
  const res = await fetch(`${API_BASE}/sources`);
  if (!res.ok) throw new Error(`Failed to fetch sources: ${res.statusText}`);
  return res.json();
}

export async function fetchQuality() {
  const res = await fetch(`${API_BASE}/quality`);
  if (!res.ok) throw new Error(`Failed to fetch quality: ${res.statusText}`);
  return res.json();
}

export async function fetchExtrapolation(payload: {
  spice: string;
  horizon_months: number;
  weather_shock_pct: number;
  supply_shock_pct: number;
  demand_shock_pct: number;
  inflation_pct?: number;
}) {
  const res = await fetch(`${API_BASE}/extrapolate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Failed to fetch extrapolation: ${res.statusText}`);
  return res.json();
}
