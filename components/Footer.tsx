import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        position: "relative",
        zIndex: 2,
        background: "var(--ink)",
        color: "var(--paper)",
        marginTop: 120,
      }}
    >
      <div className="footer-inner" style={{ maxWidth: 1440, margin: "0 auto", padding: "80px 32px 40px" }}>
        <div
          className="footer-grid"
          style={{
            paddingBottom: 64,
            borderBottom: "1px solid #2A2A2A",
          }}
        >
          <div>
            <img
              src="/brand/verumsell-flat.png"
              alt="Verumsell"
              style={{
                height: 28,
                width: "auto",
                display: "block",
                marginBottom: 20,
                filter: "invert(1)",
              }}
            />
            <p style={{ color: "#9C968B", fontSize: 14, lineHeight: 1.7, maxWidth: 320 }}>
              An independent product studio building expert-driven AI applications. Founded in
              Timișoara, Romania.
            </p>
          </div>

          <FooterCol title="Studio">
            <Link href="/work">Work</Link>
            <Link href="/about">About</Link>
            <Link href="/journal">Journal</Link>
            <Link href="/contact">Contact</Link>
          </FooterCol>

          <FooterCol title="Live products">
            <a href="https://vivo.verumsell.com" target="_blank" rel="noreferrer">Vivo</a>
            <a href="https://en26.verumsell.com" target="_blank" rel="noreferrer">Studiu EN26</a>
            <a href="https://splitornot.com" target="_blank" rel="noreferrer">SplitOrNot</a>
            <a href="https://getexpirationdate.com" target="_blank" rel="noreferrer">Expiration Date</a>
            <a href="https://project-qdb1y.vercel.app" target="_blank" rel="noreferrer">Anima Mundi</a>
          </FooterCol>

          <FooterCol title="Sub-brands">
            <Link href="/work/coupleiq">CoupleIQ</Link>
            <Link href="/work/anima-mundi">Anima Mundi</Link>
            <a href="mailto:colinbuzoianu@verumsell.com" style={{ marginTop: 16, display: "block", color: "#9C968B", fontSize: 13 }}>
              colinbuzoianu@verumsell.com
            </a>
          </FooterCol>
        </div>

        <div
          className="footer-bottom"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 32,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.1em",
            color: "#6B6660",
            textTransform: "uppercase",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <span>© {new Date().getFullYear()} Verumsell — All rights reserved</span>
          <span>Built in Timișoara · Deployed on Vercel</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#6B6660",
          marginBottom: 18,
        }}
      >
        {title}
      </div>
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
        {Array.isArray(children) ? (
          children.map((child, i) => <li key={i}>{child}</li>)
        ) : (
          <li>{children}</li>
        )}
      </ul>
    </div>
  );
}
