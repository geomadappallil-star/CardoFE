/**
 * Cardo Board Anonymous Visitor Tracker
 * Tracks unique visits and page interactions with zero PII.
 */

const SUPABASE_URL = 'https://thgczdlokjrxzakncgwd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRoZ2N6ZGxva2pyeHpha25jZ3dkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0OTcwMTAsImV4cCI6MjEwNTA3MzAxMH0.dVg7vSUacM9vs8qn3XNC7fK9WaWQbEdlY0l95Arj1FY';

const HEADERS = {
  'apikey': SUPABASE_ANON_KEY,
  'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json',
};

const VISITOR_KEY = 'cardo_visitor_id';
const SESSION_KEY = 'cardo_session_id';

function generateId(prefix: string): string {
  const rand = Math.random().toString(36).substring(2, 10);
  const time = Date.now().toString(36);
  return `${prefix}_${time}_${rand}`;
}

export function getOrCreateVisitorId(): string {
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id = generateId('usr');
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    return generateId('usr_tmp');
  }
}

export function getOrCreateSessionId(): string {
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = generateId('sess');
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return generateId('sess_tmp');
  }
}

export function getDeviceType(): 'Mobile' | 'Tablet' | 'Desktop' {
  if (typeof window === 'undefined') return 'Desktop';
  const width = window.innerWidth;
  const ua = navigator.userAgent.toLowerCase();

  if (/ipad|tablet|(android(?!.*mobile))/.test(ua) || (width >= 640 && width < 1024)) {
    return 'Tablet';
  }
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile|wpdesktop/.test(ua) || width < 640) {
    return 'Mobile';
  }
  return 'Desktop';
}

let lastLoggedTab = '';
let hasLoggedInitial = false;

export async function logVisitorEvent(tab: string = 'overview'): Promise<void> {
  // Prevent duplicate consecutive logs for the same tab in one render
  if (hasLoggedInitial && lastLoggedTab === tab) return;
  lastLoggedTab = tab;
  hasLoggedInitial = true;

  try {
    const visitor_id = getOrCreateVisitorId();
    const session_id = getOrCreateSessionId();
    const device_type = getDeviceType();

    await fetch(`${SUPABASE_URL}/rest/v1/visitor_logs`, {
      method: 'POST',
      headers: {
        ...HEADERS,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({
        visitor_id,
        session_id,
        page_path: window.location.pathname || '/',
        active_tab: tab,
        device_type,
        user_agent: navigator.userAgent.substring(0, 200),
        referrer: document.referrer ? document.referrer.substring(0, 200) : null,
      }),
    });
  } catch (err) {
    // Silent fail so telemetry never impacts user experience
    console.debug('Visitor log silently failed:', err);
  }
}

export async function fetchVisitorStats(): Promise<any> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_visitor_summary`, {
      method: 'POST',
      headers: HEADERS,
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.error('Failed to fetch visitor stats:', err);
  }
  return null;
}
