import { ImageResponse } from "next/og";
import { bySlug } from "../../../lib/products";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const product = bySlug(params.slug);

  const name = product?.name ?? "Verumsell";
  const tagline = product?.tagline ?? "AI-powered apps built on real expertise";
  const category = product?.category ?? "";
  const status = product?.status ?? "live";

  // Background colours per product
  const bgMap: Record<string, [string, string, string]> = {
    vivo:            ["#E8EDD9", "#DDD3B8", "#1F3A1A"],
    "studiu-en2026": ["#FCE5E1", "#D6E3EE", "#3A0E07"],
    splitornot:      ["#F5EBD8", "#E8C9BA", "#3A1208"],
    "expiration-date":["#F0DCC8", "#D9A892", "#3A1208"],
    "buzomed":       ["#DCEAF5", "#B8D8DA", "#0A1F3A"],
    "studiu-bac":    ["#D6E3EE", "#A8C5D9", "#0A1F2E"],
    "sales-trainer": ["#D6E0DA", "#A8B8B0", "#0F1F1A"],
  };

  const [bg1, bg2, ink] = bgMap[params.slug] ?? ["#F2EFE9", "#E0DAC8", "#0A0A0A"];

  return new ImageResponse(
    (
      <div
        style={{
          background: `linear-gradient(135deg, ${bg1} 0%, ${bg2} 100%)`,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
        }}
      >
        {/* top: category + status */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 14, color: ink, letterSpacing: 3, textTransform: "uppercase", fontFamily: "monospace", opacity: 0.7 }}>
            {category}
          </div>
          <div style={{
            fontSize: 12, color: ink, letterSpacing: 2, textTransform: "uppercase",
            fontFamily: "monospace", padding: "8px 14px",
            border: `1px solid ${ink}`, opacity: 0.7,
          }}>
            {status === "live" ? "● Live" : status === "beta" ? "○ Beta" : "◌ In dev"}
          </div>
        </div>

        {/* main: product name */}
        <div>
          <div
            style={{
              fontSize: name.length > 12 ? 80 : 104,
              fontWeight: 400,
              fontStyle: "italic",
              color: ink,
              lineHeight: 0.9,
              fontFamily: "serif",
              marginBottom: 24,
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 300,
              color: ink,
              opacity: 0.8,
              fontFamily: "serif",
              fontStyle: "italic",
            }}
          >
            {tagline}
          </div>
        </div>

        {/* bottom: verumsell attribution */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `1px solid ${ink}`,
            paddingTop: 24,
            opacity: 0.6,
          }}
        >
          <div style={{ fontSize: 14, color: ink, letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace" }}>
            verumsell.com
          </div>
          <div style={{ fontSize: 14, color: ink, letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace" }}>
            A Verumsell product
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
