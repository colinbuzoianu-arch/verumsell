import type { MetadataRoute } from "next";
import { PRODUCTS } from "../lib/products";

const BASE = "https://www.verumsell.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static top-level pages.
  const staticPaths = [
    "",
    "/work",
    "/about",
    "/journal",
    "/contact",
    "/privacy",
    "/cookies",
    "/terms",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
  }));

  // One entry per internal /work case-study page (external products link out,
  // so they have no /work/<slug> page of their own).
  const workEntries: MetadataRoute.Sitemap = PRODUCTS.filter(
    (p) => !p.external,
  ).map((p) => ({
    url: `${BASE}/work/${p.slug}`,
    lastModified: now,
  }));

  return [...staticEntries, ...workEntries];
}
