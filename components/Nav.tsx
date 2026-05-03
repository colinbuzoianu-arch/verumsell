"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
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
          className="nav-inner"
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
          <Link href="/" aria-label="Verumsell — home" style={{ display: "flex", alignItems: "center", zIndex: 200, position: "relative" }}>
            <Wordmark />
          </Link>

          {/* Desktop nav */}
          <nav className="nav-links">
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

          {/* Hamburger button (mobile only) */}
          <button
            className={`nav-toggle${menuOpen ? " open" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            style={{ position: "relative", zIndex: 200 }}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`nav-mobile-overlay${menuOpen ? " open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <Link href="/work" onClick={close}>Work</Link>
        <Link href="/about" onClick={close}>About</Link>
        <Link href="/journal" onClick={close}>Journal</Link>
        <Link href="/contact" className="cta-link" onClick={close}>
          Get in touch →
        </Link>
      </div>
    </>
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

function Wordmark() {
  return (
    <img
      src="/brand/verumsell-flat.png"
      alt="Verumsell"
      style={{ height: 28, width: "auto", display: "block" }}
    />
  );
}
