// ─────────────────────────────────────────────────────────────────────────
// Cookie consent state — single source of truth.
//
// Storage: browser localStorage (not a cookie). Storing the *preference
// itself* does not require consent (it's strictly necessary to operate the
// consent mechanism), but it never leaves the browser and nothing is sent
// to a server.
//
// Categories:
//   necessary  — always on, nothing to opt out of (no optional cookies are
//                set by this site outside of analytics)
//   analytics  — Google Analytics (GA4). Off by default. The GA script is
//                never injected into the page until this is true.
// ─────────────────────────────────────────────────────────────────────────

export const CONSENT_STORAGE_KEY = "verumsell-cookie-consent";
export const CONSENT_EVENT = "verumsell:consent-changed";
export const OPEN_PREFERENCES_EVENT = "verumsell:open-cookie-preferences";

export const GA_MEASUREMENT_ID = "G-ECZX9M80RG";

export interface ConsentPrefs {
  necessary: true;
  analytics: boolean;
}

export interface StoredConsent extends ConsentPrefs {
  decidedAt: string; // ISO timestamp, so we know when consent was given
  version: 1;
}

const DEFAULT_PREFS: ConsentPrefs = {
  necessary: true,
  analytics: false,
};

export function getStoredConsent(): StoredConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed?.analytics !== "boolean") return null;
    return parsed as StoredConsent;
  } catch {
    return null;
  }
}

export function getConsent(): ConsentPrefs {
  const stored = getStoredConsent();
  if (!stored) return DEFAULT_PREFS;
  return { necessary: true, analytics: stored.analytics };
}

export function hasDecided(): boolean {
  return getStoredConsent() !== null;
}

export function setConsent(prefs: { analytics: boolean }): void {
  if (typeof window === "undefined") return;
  const toStore: StoredConsent = {
    necessary: true,
    analytics: prefs.analytics,
    decidedAt: new Date().toISOString(),
    version: 1,
  };
  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(toStore));
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: toStore }));

  if (!prefs.analytics) {
    purgeAnalyticsCookies();
  }
}

export function openPreferences(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT));
}

// Removes any Google Analytics cookies already set in the browser. Used
// when a visitor accepts analytics and later changes their mind — consent
// must be as easy to withdraw as it was to give, and that includes
// cleaning up cookies already on disk, not just blocking future ones.
export function purgeAnalyticsCookies(): void {
  if (typeof document === "undefined") return;
  const names = document.cookie
    .split(";")
    .map((c) => c.split("=")[0].trim())
    .filter((name) => name === "_ga" || name.startsWith("_ga_") || name === "_gid" || name === "_gat");

  const host = window.location.hostname;
  const domains = [host, `.${host}`, host.replace(/^www\./, ""), `.${host.replace(/^www\./, "")}`];

  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}`;
    }
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }
}
