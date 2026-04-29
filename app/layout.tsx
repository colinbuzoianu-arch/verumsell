import type { Metadata } from "next";
import "../styles/globals.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Verumsell — AI-powered apps built on real expertise",
  description:
    "An independent product studio building expert-driven AI applications across health, education, relationships, and professional training.",
  metadataBase: new URL("https://verumsell.com"),
  openGraph: {
    title: "Verumsell — AI-powered apps built on real expertise",
    description:
      "An independent product studio building expert-driven AI applications.",
    url: "https://verumsell.com",
    siteName: "Verumsell",
    type: "website",
  },
  icons: { icon: "/brand/verumsell-square.jpg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
            <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-ECZX9M80RG" />
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-ECZX9M80RG');
        `}} />
      </head>
      <body>
        <Nav />
        <main style={{ position: "relative", zIndex: 2 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
