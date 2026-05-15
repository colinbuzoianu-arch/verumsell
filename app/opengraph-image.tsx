import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Verumsell — AI-powered apps built on real expertise";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#F2EFE9",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "serif",
        }}
      >
        {/* top bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: 2, color: "#0A0A0A" }}>
            VERUM
          </div>
          <div style={{ width: 48, height: 4, background: "#0A0A0A", marginTop: -6 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ width: 48, height: 4, background: "#0A0A0A" }} />
            <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: 2, color: "#0A0A0A" }}>
              SELL
            </div>
          </div>
        </div>

        {/* main text */}
        <div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 300,
              color: "#0A0A0A",
              lineHeight: 1,
              marginBottom: 24,
            }}
          >
            AI-powered apps,
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 500,
              fontStyle: "italic",
              color: "#0A0A0A",
              lineHeight: 1,
            }}
          >
            built on real expertise.
          </div>
        </div>

        {/* bottom strip */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #C9C2B3",
            paddingTop: 24,
          }}
        >
          <div style={{ fontSize: 16, color: "#6B6660", letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace" }}>
            verumsell.com
          </div>
          <div style={{ display: "flex", gap: 32 }}>
            {["Health", "Occupational", "Education", "Relationships", "Sales"].map((cat) => (
              <div key={cat} style={{ fontSize: 13, color: "#6B6660", letterSpacing: 1, textTransform: "uppercase", fontFamily: "monospace" }}>
                {cat}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
