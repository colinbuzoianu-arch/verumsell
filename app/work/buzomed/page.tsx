import type { Metadata } from "next";
import { bySlug } from "../../../lib/products";
import BuzomedContent from "./BuzomedContent";

const product = bySlug("buzomed")!;
const seo = product.seo!;

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  alternates: { canonical: seo.canonical },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: seo.canonical,
    type: "website",
    locale: seo.ogLocale ?? "ro_RO",
  },
};

// JSON-LD: Buzomed as a SoftwareApplication published by Verumsell SRL.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Buzomed",
  url: "https://www.buzomed.com/",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  inLanguage: "ro",
  publisher: {
    "@type": "Organization",
    name: "Verumsell SRL",
    url: "https://www.verumsell.com",
  },
};

export default function BuzomedPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BuzomedContent />
    </>
  );
}
