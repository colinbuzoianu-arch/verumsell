"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ConsentPrefs,
  OPEN_PREFERENCES_EVENT,
  getConsent,
  hasDecided,
  setConsent,
} from "../lib/consent";

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [draft, setDraft] = useState<ConsentPrefs>({ necessary: true, analytics: false });

  useEffect(() => {
    setMounted(true);
    setDraft(getConsent());
    if (!hasDecided()) setBannerVisible(true);

    const openHandler = () => {
      setDraft(getConsent());
      setModalOpen(true);
    };
    window.addEventListener(OPEN_PREFERENCES_EVENT, openHandler);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, openHandler);
  }, []);

  if (!mounted || (!bannerVisible && !modalOpen)) return null;

  const acceptAll = () => {
    setConsent({ analytics: true });
    setBannerVisible(false);
    setModalOpen(false);
  };

  const rejectNonEssential = () => {
    setConsent({ analytics: false });
    setBannerVisible(false);
    setModalOpen(false);
  };

  const savePrefs = () => {
    setConsent({ analytics: draft.analytics });
    setBannerVisible(false);
    setModalOpen(false);
  };

  return (
    <>
      {bannerVisible && !modalOpen && (
        <div className="cookie-banner" role="dialog" aria-label="Cookie consent" aria-live="polite">
          <div className="cookie-banner-inner">
            <p className="cookie-banner-text">
              We use cookies to understand how visitors use this site. Strictly necessary
              functionality is always on; analytics cookies (Google Analytics) stay off until you
              say otherwise. See our{" "}
              <Link href="/cookies" style={{ textDecoration: "underline" }}>
                Cookie Policy
              </Link>{" "}
              and{" "}
              <Link href="/privacy" style={{ textDecoration: "underline" }}>
                Privacy Policy
              </Link>
              .
            </p>
            <div className="cookie-banner-actions">
              <button className="cookie-btn cookie-btn-ghost" onClick={rejectNonEssential}>
                Reject non-essential
              </button>
              <button
                className="cookie-btn cookie-btn-ghost"
                onClick={() => {
                  setDraft(getConsent());
                  setModalOpen(true);
                }}
              >
                Customize
              </button>
              <button className="cookie-btn cookie-btn-solid" onClick={acceptAll}>
                Accept all
              </button>
            </div>
          </div>
        </div>
      )}

      {modalOpen && (
        <div
          className="cookie-modal-scrim"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
        >
          <div className="cookie-modal" role="dialog" aria-modal="true" aria-label="Cookie preferences">
            <div className="cookie-modal-header">
              <span className="eyebrow">Cookie preferences</span>
              <button
                className="cookie-modal-close"
                aria-label="Close"
                onClick={() => setModalOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="cookie-row">
              <div className="cookie-row-text">
                <div className="cookie-row-title">Strictly necessary</div>
                <p className="cookie-row-desc">
                  Lets the site remember this cookie preference. No tracking, can&apos;t be turned
                  off.
                </p>
              </div>
              <span className="cookie-row-locked">Always on</span>
            </div>

            <div className="cookie-row">
              <div className="cookie-row-text">
                <div className="cookie-row-title">Analytics — Google Analytics</div>
                <p className="cookie-row-desc">
                  Helps us understand traffic and which pages are useful. Off until you switch it
                  on. See the{" "}
                  <Link href="/cookies" style={{ textDecoration: "underline" }}>
                    Cookie Policy
                  </Link>{" "}
                  for the full list of cookies this sets.
                </p>
              </div>
              <button
                role="switch"
                aria-checked={draft.analytics}
                aria-label="Toggle analytics cookies"
                className={`cookie-switch${draft.analytics ? " on" : ""}`}
                onClick={() => setDraft((d) => ({ ...d, analytics: !d.analytics }))}
              >
                <span className="cookie-switch-knob" />
              </button>
            </div>

            <div className="cookie-modal-actions">
              <button className="cookie-btn cookie-btn-ghost" onClick={rejectNonEssential}>
                Reject non-essential
              </button>
              <button className="cookie-btn cookie-btn-solid-ink" onClick={savePrefs}>
                Save preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
