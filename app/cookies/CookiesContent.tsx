"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LangToggle, LegalHero, LegalSection } from "../../components/Legal";

const LANG_KEY = "verumsell-legal-lang";

function CookieTable({ lang }: { lang: "en" | "ro" }) {
  const th: React.CSSProperties = {
    textAlign: "left",
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "var(--ink-muted)",
    padding: "10px 12px",
    borderBottom: "1px solid var(--ink)",
  };
  const td: React.CSSProperties = {
    padding: "12px 12px",
    borderBottom: "1px solid var(--line-soft)",
    fontSize: 14,
    verticalAlign: "top",
  };

  const headers =
    lang === "ro"
      ? { name: "Nume", provider: "Furnizor", purpose: "Scop", type: "Tip", duration: "Durată" }
      : { name: "Name", provider: "Provider", purpose: "Purpose", type: "Type", duration: "Duration" };

  const rows =
    lang === "ro"
      ? [
          {
            name: "_ga",
            provider: "Google Analytics",
            purpose: "Diferențiază vizitatorii unici.",
            type: "Cookie HTTP",
            duration: "2 ani",
          },
          {
            name: "_ga_ECZX9M80RG",
            provider: "Google Analytics",
            purpose: "Persistă starea sesiunii pentru proprietatea noastră GA4.",
            type: "Cookie HTTP",
            duration: "2 ani",
          },
          {
            name: "verumsell-cookie-consent",
            provider: "Verumsell (proprietar)",
            purpose: "Reține alegerea dvs. privind cookie-urile, astfel încât să nu vă întrebăm la fiecare vizită.",
            type: "Stocare locală browser (nu este cookie)",
            duration: "Până la ștergerea datelor browserului",
          },
        ]
      : [
          {
            name: "_ga",
            provider: "Google Analytics",
            purpose: "Distinguishes unique visitors.",
            type: "HTTP cookie",
            duration: "2 years",
          },
          {
            name: "_ga_ECZX9M80RG",
            provider: "Google Analytics",
            purpose: "Persists session state for our GA4 property.",
            type: "HTTP cookie",
            duration: "2 years",
          },
          {
            name: "verumsell-cookie-consent",
            provider: "Verumsell (first-party)",
            purpose: "Remembers the cookie choice you made, so we don't ask every visit.",
            type: "Browser local storage (not a cookie)",
            duration: "Until you clear your browser data",
          },
        ];

  return (
    <div style={{ overflowX: "auto", margin: "8px 0 0" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 560 }}>
        <thead>
          <tr>
            <th style={th}>{headers.name}</th>
            <th style={th}>{headers.provider}</th>
            <th style={th}>{headers.purpose}</th>
            <th style={th}>{headers.type}</th>
            <th style={th}>{headers.duration}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name}>
              <td style={{ ...td, fontFamily: "var(--font-mono)", fontSize: 13 }}>{r.name}</td>
              <td style={td}>{r.provider}</td>
              <td style={{ ...td, color: "var(--ink-soft)" }}>{r.purpose}</td>
              <td style={td}>{r.type}</td>
              <td style={td}>{r.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const T = {
  en: {
    title: "Cookie Policy.",
    updated: "June 2026",
    intro: (
      <>
        This page explains every cookie verumsell.com can set, who sets it, and how long it
        lasts. For how we handle the data behind those cookies, see our{" "}
        <Link href="/privacy" style={{ textDecoration: "underline" }}>
          Privacy Policy
        </Link>
        .
      </>
    ),
    s1_title: "What cookies are",
    s1_p1:
      "Cookies are small text files placed on your device when you visit a website. They can be used to remember preferences, recognise returning visitors, or track behaviour across sites. Some sites also use similar technologies that aren't strictly cookies, like browser local storage — we use one of those too, noted below.",
    s2_title: "The two categories we use",
    s2_p1: (
      <>
        <strong>Strictly necessary.</strong> Nothing on this list requires consent because nothing
        optional is set automatically. The only thing we store without asking is your cookie
        preference itself — and that&apos;s kept in your browser&apos;s local storage, not a
        cookie, purely so we can remember your choice.
      </>
    ),
    s2_p2: (
      <>
        <strong>Analytics — off by default.</strong> We use Google Analytics (GA4) to understand
        aggregate traffic patterns: which pages get visited, roughly where from, and how people
        move through the site. The Google Analytics script is not loaded, and no analytics cookie
        is set, until you actively choose &quot;Accept all&quot; or enable analytics in
        &quot;Customize&quot; on the consent banner.
      </>
    ),
    s3_title: "Cookies in detail",
    s4_title: "Managing your preferences",
    s4_p1:
      "Use the \"Cookie settings\" link in the footer at any time to reopen the preference panel and change your choice — accepting, rejecting, or switching analytics on or off. Withdrawing consent removes the Google Analytics cookies already set in your browser, not just future ones.",
    s5_title: "Browser-level controls",
    s5_p1:
      "Most browsers also let you block or delete cookies directly in their settings, and to browse in a mode that doesn't retain cookies between sessions. Doing so may affect how some third-party sites behave, though it won't affect your ability to use verumsell.com — this site doesn't require any cookie to function.",
    s6_title: "Changes to this policy",
    s6_p1: "If the cookies we use change — for example, if we add a new analytics or marketing tool — we'll update this page and the \"Last updated\" date above.",
  },
  ro: {
    title: "Politica de cookie-uri.",
    updated: "Iunie 2026",
    intro: (
      <>
        Această pagină explică fiecare cookie pe care verumsell.com îl poate seta, cine îl
        setează și cât timp este valabil. Pentru modul în care gestionăm datele din spatele
        acestor cookie-uri, consultați{" "}
        <Link href="/privacy" style={{ textDecoration: "underline" }}>
          Politica de confidențialitate
        </Link>
        .
      </>
    ),
    s1_title: "Ce sunt cookie-urile",
    s1_p1:
      "Cookie-urile sunt fișiere text mici plasate pe dispozitivul dumneavoastră atunci când vizitați un site web. Pot fi folosite pentru a reține preferințe, a recunoaște vizitatorii care revin sau a urmări comportamentul pe mai multe site-uri. Unele site-uri folosesc și tehnologii similare care nu sunt, strict vorbind, cookie-uri, precum stocarea locală a browserului — folosim și noi una dintre acestea, menționată mai jos.",
    s2_title: "Cele două categorii pe care le folosim",
    s2_p1: (
      <>
        <strong>Strict necesare.</strong> Niciun element din această listă nu necesită
        consimțământ, pentru că nimic opțional nu este setat automat. Singurul lucru pe care îl
        stocăm fără să întrebăm este chiar preferința dumneavoastră privind cookie-urile — și
        aceasta este păstrată în stocarea locală a browserului, nu într-un cookie, exclusiv pentru
        a vă reține alegerea.
      </>
    ),
    s2_p2: (
      <>
        <strong>Analiză — dezactivată implicit.</strong> Folosim Google Analytics (GA4) pentru a
        înțelege modele agregate de trafic: ce pagini sunt vizitate, aproximativ de unde și cum se
        deplasează vizitatorii prin site. Scriptul Google Analytics nu este încărcat, și niciun
        cookie de analiză nu este setat, până când nu alegeți activ „Accept all” sau activați
        analiza din „Customize” în bannerul de consimțământ.
      </>
    ),
    s3_title: "Cookie-uri în detaliu",
    s4_title: "Gestionarea preferințelor",
    s4_p1:
      "Folosiți linkul „Cookie settings” din subsol în orice moment pentru a redeschide panoul de preferințe și a vă schimba alegerea — acceptând, respingând sau comutând analiza. Retragerea consimțământului elimină cookie-urile Google Analytics deja setate în browser, nu doar pe cele viitoare.",
    s5_title: "Controale la nivel de browser",
    s5_p1:
      "Majoritatea browserelor vă permit, de asemenea, să blocați sau să ștergeți cookie-urile direct din setări și să navigați într-un mod care nu reține cookie-uri între sesiuni. Acest lucru poate afecta comportamentul unor site-uri terțe, dar nu va afecta capacitatea dumneavoastră de a folosi verumsell.com — acest site nu necesită niciun cookie pentru a funcționa.",
    s6_title: "Modificări ale acestei politici",
    s6_p1:
      "Dacă cookie-urile pe care le folosim se schimbă — de exemplu, dacă adăugăm un nou instrument de analiză sau de marketing — vom actualiza această pagină și data „Ultima actualizare” de mai sus.",
  },
} as const;

type Lang = keyof typeof T;

export default function CookiesContent() {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem(LANG_KEY) as Lang | null;
    if (saved === "en" || saved === "ro") setLang(saved);
  }, []);

  const switchLang = (l: Lang) => {
    setLang(l);
    localStorage.setItem(LANG_KEY, l);
  };

  const t = T[lang];

  return (
    <>
      <LegalHero
        eyebrow="Legal"
        title={t.title}
        updated={t.updated}
        intro={t.intro}
        langToggle={<LangToggle lang={lang} onChange={switchLang} />}
      />

      <LegalSection index={1} title={t.s1_title}>
        <p>{t.s1_p1}</p>
      </LegalSection>

      <LegalSection index={2} title={t.s2_title}>
        <p style={{ marginBottom: 16 }}>{t.s2_p1}</p>
        <p>{t.s2_p2}</p>
      </LegalSection>

      <LegalSection index={3} title={t.s3_title}>
        <CookieTable lang={lang} />
      </LegalSection>

      <LegalSection index={4} title={t.s4_title}>
        <p>{t.s4_p1}</p>
      </LegalSection>

      <LegalSection index={5} title={t.s5_title}>
        <p>{t.s5_p1}</p>
      </LegalSection>

      <LegalSection index={6} title={t.s6_title}>
        <p>{t.s6_p1}</p>
      </LegalSection>

      <div style={{ height: 80 }} />
    </>
  );
}
