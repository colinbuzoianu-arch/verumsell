"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { CONSENT_EVENT, GA_MEASUREMENT_ID, getConsent } from "../lib/consent";

export default function Analytics() {
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);

  useEffect(() => {
    setAnalyticsAllowed(getConsent().analytics);

    const handleChange = () => setAnalyticsAllowed(getConsent().analytics);
    window.addEventListener(CONSENT_EVENT, handleChange);
    return () => window.removeEventListener(CONSENT_EVENT, handleChange);
  }, []);

  // Nothing is rendered — and so nothing is requested from Google — until
  // the visitor has explicitly opted in to analytics cookies.
  if (!analyticsAllowed) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
