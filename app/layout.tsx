import type { Metadata } from "next";
import { headers } from "next/headers";
import "../styles/globals.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Analytics from "../components/Analytics";
import CookieConsent from "../components/CookieConsent";

export const metadata: Metadata = {
  title: "Verumsell — AI-powered apps built on real expertise",
  description:
    "An independent product studio building expert-driven AI applications across health, education, relationships, and professional training.",
  metadataBase: new URL("https://www.verumsell.com"),
  openGraph: {
    title: "Verumsell — AI-powered apps built on real expertise",
    description:
      "An independent product studio building expert-driven AI applications.",
    url: "https://www.verumsell.com",
    siteName: "Verumsell",
    type: "website",
  },
  icons: { icon: "/brand/verumsell-square.jpg" },
};

// Routes whose primary content is Romanian, so the server-rendered <html lang>
// must be "ro" rather than the site default of "en".
const RO_PATHS = new Set(["/work/buzomed"]);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = headers().get("x-pathname") ?? "";
  const lang = RO_PATHS.has(pathname) ? "ro" : "en";

  return (
    <html lang={lang}>
      <body>
        {/* Google Analytics is only ever injected client-side, and only once
            the visitor has opted in via the cookie banner. Nothing is
            requested from Google before that. See components/Analytics.tsx
            and lib/consent.ts. */}
        <Analytics />
        <Nav />
        <main style={{ position: "relative", zIndex: 2 }}>{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
