"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? "rgba(242, 239, 233, 0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--line-soft)" : "1px solid transparent",
        transition: "all 0.35s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "18px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <Link href="/" aria-label="Verumsell — home" style={{ display: "flex", alignItems: "center" }}>
          <Wordmark />
        </Link>

        <nav style={{ display: "flex", gap: 32, alignItems: "center" }}>
          <NavLink href="/work">Work</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/journal">Journal</NavLink>
          <Link
            href="/contact"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "10px 18px",
              background: "var(--ink)",
              color: "var(--paper)",
              borderRadius: 0,
            }}
          >
            Get in touch →
          </Link>
        </nav>
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "var(--ink-soft)",
        position: "relative",
        paddingBottom: 2,
      }}
    >
      {children}
    </Link>
  );
}

/* ── wordmark — uses the actual uploaded logo PNG ─────── */
function Wordmark() {
  return (
    <img
      src="/brand/verumsell-flat.png"
      alt="Verumsell"
      style={{ height: 28, width: "auto", display: "block" }}
    />
  );
}
