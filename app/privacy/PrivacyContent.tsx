"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { EntityBlock, LangToggle, LegalHero, LegalSection } from "../../components/Legal";

const LANG_KEY = "verumsell-legal-lang";

const T = {
  en: {
    title: "Privacy Policy.",
    updated: "June 2026",
    intro: (
      <>
        This Privacy Policy explains how <strong>Verumsell SRL</strong> (&quot;Verumsell&quot;,
        &quot;we&quot;, &quot;us&quot;) handles personal data in connection with this website,{" "}
        <strong>verumsell.com</strong>. It does not cover the individual products we build —
        Buzomed, Vivo, EN26 and the rest each publish their own privacy policy on their own
        domain, linked from their respective pages.
      </>
    ),
    s1_title: "Who we are",
    s1_lead: "The data controller for this website is:",
    s1_body:
      "Verumsell is a software studio based in Timișoara, Romania, building expert-driven AI applications across health, education, and professional training.",
    s2_title: "What this site collects",
    s2_p1: "verumsell.com is an informational portfolio site. It has no account creation, no forms, and no newsletter sign-up — the only way to reach us is by email, which is your choice to send. As a result, the data this site itself collects is limited to two sources:",
    s2_p2: (
      <>
        <strong>Standard server logs.</strong> Like virtually every website, our hosting provider
        (Vercel Inc.) automatically logs basic technical information for every request — IP
        address, browser type, the page requested, and a timestamp. This is used only for
        security, abuse prevention, and keeping the site running, and is retained for a short
        period before being deleted.
      </>
    ),
    s2_p3: (
      <>
        <strong>Analytics cookies — only if you opt in.</strong> We use Google Analytics (GA4) to
        understand how visitors use the site. The Google Analytics script is not loaded at all
        until you actively accept analytics cookies in the consent banner. If you reject or ignore
        the banner, no analytics request is ever made and no analytics cookie is ever set. See our{" "}
        <Link href="/cookies" style={{ textDecoration: "underline" }}>
          Cookie Policy
        </Link>{" "}
        for the full list of cookies and what each one does.
      </>
    ),
    s3_title: "Legal basis for processing",
    s3_p1: (
      <>
        Where we rely on cookies that are not strictly necessary (analytics), the legal basis is
        your <strong>consent</strong> (Article 6(1)(a) GDPR, and Law 506/2004 on the processing of
        personal data in electronic communications, which implements the EU ePrivacy Directive in
        Romania). You can withdraw that consent at any time — see Section 8.
      </>
    ),
    s3_p2: (
      <>
        Basic server logs that are strictly necessary to operate and secure the site are processed
        on the basis of our <strong>legitimate interest</strong> (Article 6(1)(f) GDPR) in keeping
        the site available, fast, and free of abuse.
      </>
    ),
    s4_title: "Who we share data with",
    s4_p1: "We don't sell or rent personal data. A small number of service providers process data on our behalf, strictly to operate this site:",
    s4_p2: (
      <>
        <strong>Vercel Inc.</strong> — hosting and content delivery for verumsell.com. Processes
        server logs as described above.
      </>
    ),
    s4_p3: (
      <>
        <strong>Google Ireland Limited / Google LLC</strong> — provides Google Analytics, and only
        processes data from visitors who have actively consented to analytics cookies.
      </>
    ),
    s5_title: "International data transfers",
    s5_p1:
      "Some of the providers above may process data outside the European Economic Area, including in the United States. Where that happens, the transfer relies on an appropriate safeguard recognised under GDPR — such as the European Commission's Standard Contractual Clauses and/or the provider's certification under the EU-U.S. Data Privacy Framework, depending on the provider's current arrangement at the time of the transfer.",
    s6_title: "How long we keep data",
    s6_p1: "Server logs are kept only as long as needed for security and operational purposes, typically a matter of weeks, and are then deleted or anonymised.",
    s6_p2: "Analytics data, if you've consented to it, is retained according to the retention window configured in our Google Analytics property (no longer than 14 months), after which Google automatically deletes it. You can withdraw consent at any point before that, which stops further collection immediately.",
    s7_title: "Your rights",
    s7_p1:
      "Under GDPR, you have the right to: access the personal data we hold about you; request correction of inaccurate data; request erasure; restrict or object to processing; receive your data in a portable format; and withdraw consent at any time, without affecting the lawfulness of processing carried out before the withdrawal.",
    s7_p2: (
      <>
        To exercise any of these rights, email us at{" "}
        <Link href="mailto:legal@verumsell.com" style={{ textDecoration: "underline" }}>
          legal@verumsell.com
        </Link>
        . We&apos;ll respond within one month, as required by law.
      </>
    ),
    s7_p3: (
      <>
        You also have the right to lodge a complaint with the Romanian data protection authority,
        ANSPDCP (Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter
        Personal), at{" "}
        <a href="https://www.dataprotection.ro" target="_blank" rel="noreferrer" style={{ textDecoration: "underline" }}>
          dataprotection.ro
        </a>
        , or with the supervisory authority in your own EU member state if you live elsewhere in
        the EU.
      </>
    ),
    s8_title: "Managing or withdrawing consent",
    s8_p1: (
      <>
        You can change your cookie preferences at any time using the &quot;Cookie settings&quot;
        link in the footer of this site, which reopens the same preference panel shown on your
        first visit. Withdrawing analytics consent stops further analytics collection and removes
        any analytics cookies already set in your browser.
      </>
    ),
    s9_title: "Children's privacy",
    s9_p1:
      "This site is not directed at children, and we do not knowingly collect personal data from anyone under the age of 16 (the age of consent for information-society services under Romanian and EU law). If you believe a child has provided us with personal data, contact us and we'll delete it.",
    s10_title: "Security",
    s10_p1:
      "We apply reasonable technical and organisational measures to protect the limited data this site processes, including using a reputable hosting provider with encryption in transit (HTTPS) across the site.",
    s11_title: "Changes to this policy",
    s11_p1: (
      <>
        We may update this policy as the site or applicable law changes. The &quot;Last
        updated&quot; date at the top reflects the most recent revision. Material changes will be
        reflected here; we encourage you to check back periodically.
      </>
    ),
    s12_title: "Contact",
    s12_p1: (
      <>
        Questions about this policy or how your data is handled? Reach us at{" "}
        <Link href="mailto:legal@verumsell.com" style={{ textDecoration: "underline" }}>
          legal@verumsell.com
        </Link>{" "}
        or via the{" "}
        <Link href="/contact" style={{ textDecoration: "underline" }}>
          contact page
        </Link>
        .
      </>
    ),
  },
  ro: {
    title: "Politica de confidențialitate.",
    updated: "Iunie 2026",
    intro: (
      <>
        Această Politică de confidențialitate explică modul în care <strong>Verumsell SRL</strong>{" "}
        („Verumsell”, „noi”) prelucrează datele cu caracter personal în legătură cu acest site,{" "}
        <strong>verumsell.com</strong>. Nu acoperă produsele individuale pe care le construim —
        Buzomed, Vivo, EN26 și celelalte au fiecare propria politică de confidențialitate,
        publicată pe domeniul propriu, accesibilă din paginile lor dedicate.
      </>
    ),
    s1_title: "Cine suntem",
    s1_lead: "Operatorul de date pentru acest site este:",
    s1_body:
      "Verumsell este un studio de software cu sediul în Timișoara, România, care construiește aplicații AI ghidate de expertiză în domeniile sănătate, educație și formare profesională.",
    s2_title: "Ce colectează acest site",
    s2_p1: "verumsell.com este un site informativ de tip portofoliu. Nu există creare de cont, formulare sau înscriere la newsletter — singura modalitate de a ne contacta este prin email, la alegerea dumneavoastră. Ca rezultat, datele colectate de acest site sunt limitate la două surse:",
    s2_p2: (
      <>
        <strong>Loguri standard de server.</strong> Ca aproape orice site web, furnizorul nostru de
        hosting (Vercel Inc.) înregistrează automat informații tehnice de bază pentru fiecare
        cerere — adresa IP, tipul de browser, pagina solicitată și data/ora. Acestea sunt folosite
        exclusiv pentru securitate, prevenirea abuzurilor și funcționarea site-ului, și sunt
        păstrate o perioadă scurtă înainte de a fi șterse.
      </>
    ),
    s2_p3: (
      <>
        <strong>Cookie-uri de analiză — doar dacă alegeți să le acceptați.</strong> Folosim Google
        Analytics (GA4) pentru a înțelege cum este folosit site-ul. Scriptul Google Analytics nu se
        încarcă deloc până când nu acceptați activ cookie-urile de analiză din bannerul de
        consimțământ. Dacă respingeți sau ignorați bannerul, nu se face nicio cerere de analiză și
        nu se setează niciun cookie de analiză. Consultați{" "}
        <Link href="/cookies" style={{ textDecoration: "underline" }}>
          Politica de cookie-uri
        </Link>{" "}
        pentru lista completă a cookie-urilor și a rolului fiecăruia.
      </>
    ),
    s3_title: "Temeiul juridic al prelucrării",
    s3_p1: (
      <>
        Atunci când ne bazăm pe cookie-uri care nu sunt strict necesare (analiza), temeiul juridic
        este <strong>consimțământul</strong> dumneavoastră (Articolul 6(1)(a) GDPR, și Legea
        506/2004 privind prelucrarea datelor cu caracter personal în sectorul comunicațiilor
        electronice, care transpune Directiva ePrivacy a UE în România). Puteți retrage acest
        consimțământ în orice moment — vezi Secțiunea 8.
      </>
    ),
    s3_p2: (
      <>
        Logurile de server strict necesare pentru funcționarea și securizarea site-ului sunt
        prelucrate pe baza <strong>interesului nostru legitim</strong> (Articolul 6(1)(f) GDPR) de
        a păstra site-ul disponibil, rapid și fără abuzuri.
      </>
    ),
    s4_title: "Cu cine partajăm datele",
    s4_p1: "Nu vindem și nu închiriem date cu caracter personal. Un număr restrâns de furnizori de servicii prelucrează date în numele nostru, strict pentru funcționarea acestui site:",
    s4_p2: (
      <>
        <strong>Vercel Inc.</strong> — hosting și livrare de conținut pentru verumsell.com.
        Prelucrează logurile de server descrise mai sus.
      </>
    ),
    s4_p3: (
      <>
        <strong>Google Ireland Limited / Google LLC</strong> — furnizează Google Analytics și
        prelucrează date doar de la vizitatorii care au consimțit activ la cookie-urile de
        analiză.
      </>
    ),
    s5_title: "Transferuri internaționale de date",
    s5_p1:
      "Unii dintre furnizorii de mai sus pot prelucra date în afara Spațiului Economic European, inclusiv în Statele Unite. În aceste cazuri, transferul se bazează pe o garanție corespunzătoare recunoscută conform GDPR — precum Clauzele Contractuale Standard ale Comisiei Europene și/sau certificarea furnizorului în cadrul Data Privacy Framework UE-SUA, în funcție de mecanismul aplicabil furnizorului respectiv la momentul transferului.",
    s6_title: "Cât timp păstrăm datele",
    s6_p1: "Logurile de server sunt păstrate doar atât timp cât este necesar din motive de securitate și operaționale, de regulă câteva săptămâni, după care sunt șterse sau anonimizate.",
    s6_p2: "Datele de analiză, dacă ați consimțit, sunt păstrate conform perioadei de retenție configurate în proprietatea noastră Google Analytics (cel mult 14 luni), după care Google le șterge automat. Puteți retrage consimțământul în orice moment înainte de acest termen, ceea ce oprește imediat colectarea ulterioară.",
    s7_title: "Drepturile dumneavoastră",
    s7_p1:
      "Conform GDPR, aveți dreptul de a: accesa datele cu caracter personal pe care le deținem despre dumneavoastră; solicita corectarea datelor inexacte; solicita ștergerea; restricționa sau vă opune prelucrării; primi datele într-un format portabil; și retrage consimțământul în orice moment, fără a afecta legalitatea prelucrării efectuate înainte de retragere.",
    s7_p2: (
      <>
        Pentru a exercita orice dintre aceste drepturi, scrieți-ne la{" "}
        <Link href="mailto:legal@verumsell.com" style={{ textDecoration: "underline" }}>
          legal@verumsell.com
        </Link>
        . Vă vom răspunde în termen de o lună, conform legii.
      </>
    ),
    s7_p3: (
      <>
        Aveți, de asemenea, dreptul de a depune o plângere la autoritatea română de supraveghere a
        protecției datelor, ANSPDCP (Autoritatea Națională de Supraveghere a Prelucrării Datelor cu
        Caracter Personal), la{" "}
        <a href="https://www.dataprotection.ro" target="_blank" rel="noreferrer" style={{ textDecoration: "underline" }}>
          dataprotection.ro
        </a>
        , sau la autoritatea de supraveghere din statul membru UE în care locuiți, dacă vă aflați
        în altă parte a UE.
      </>
    ),
    s8_title: "Gestionarea sau retragerea consimțământului",
    s8_p1: (
      <>
        Puteți modifica preferințele de cookie-uri în orice moment folosind linkul „Cookie
        settings” din subsolul site-ului, care redeschide același panou de preferințe afișat la
        prima vizită. Retragerea consimțământului pentru analiză oprește colectarea ulterioară de
        date de analiză și elimină cookie-urile de analiză deja setate în browser.
      </>
    ),
    s9_title: "Confidențialitatea minorilor",
    s9_p1:
      "Acest site nu se adresează copiilor și nu colectăm cu intenție date cu caracter personal de la persoane sub 16 ani (vârsta de consimțământ pentru serviciile societății informaționale conform legii române și europene). Dacă considerați că un minor ne-a furnizat date cu caracter personal, contactați-ne și le vom șterge.",
    s10_title: "Securitate",
    s10_p1:
      "Aplicăm măsuri tehnice și organizatorice rezonabile pentru a proteja datele limitate prelucrate de acest site, inclusiv folosirea unui furnizor de hosting de încredere, cu criptare în tranzit (HTTPS) pe tot site-ul.",
    s11_title: "Modificări ale acestei politici",
    s11_p1: (
      <>
        Putem actualiza această politică pe măsură ce site-ul sau legislația aplicabilă se
        schimbă. Data „Ultima actualizare” de la începutul paginii reflectă cea mai recentă
        revizuire. Modificările importante vor fi reflectate aici; vă recomandăm să verificați
        periodic.
      </>
    ),
    s12_title: "Contact",
    s12_p1: (
      <>
        Aveți întrebări despre această politică sau despre modul în care vă sunt gestionate
        datele? Scrieți-ne la{" "}
        <Link href="mailto:legal@verumsell.com" style={{ textDecoration: "underline" }}>
          legal@verumsell.com
        </Link>{" "}
        sau prin{" "}
        <Link href="/contact" style={{ textDecoration: "underline" }}>
          pagina de contact
        </Link>
        .
      </>
    ),
  },
} as const;

type Lang = keyof typeof T;

export default function PrivacyContent() {
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
        <p style={{ marginBottom: 16 }}>{t.s1_lead}</p>
        <EntityBlock lang={lang} />
        <p style={{ marginTop: 16 }}>{t.s1_body}</p>
      </LegalSection>

      <LegalSection index={2} title={t.s2_title}>
        <p style={{ marginBottom: 16 }}>{t.s2_p1}</p>
        <p style={{ marginBottom: 16 }}>{t.s2_p2}</p>
        <p>{t.s2_p3}</p>
      </LegalSection>

      <LegalSection index={3} title={t.s3_title}>
        <p style={{ marginBottom: 16 }}>{t.s3_p1}</p>
        <p>{t.s3_p2}</p>
      </LegalSection>

      <LegalSection index={4} title={t.s4_title}>
        <p style={{ marginBottom: 16 }}>{t.s4_p1}</p>
        <p style={{ marginBottom: 16 }}>{t.s4_p2}</p>
        <p>{t.s4_p3}</p>
      </LegalSection>

      <LegalSection index={5} title={t.s5_title}>
        <p>{t.s5_p1}</p>
      </LegalSection>

      <LegalSection index={6} title={t.s6_title}>
        <p style={{ marginBottom: 16 }}>{t.s6_p1}</p>
        <p>{t.s6_p2}</p>
      </LegalSection>

      <LegalSection index={7} title={t.s7_title}>
        <p style={{ marginBottom: 16 }}>{t.s7_p1}</p>
        <p style={{ marginBottom: 16 }}>{t.s7_p2}</p>
        <p>{t.s7_p3}</p>
      </LegalSection>

      <LegalSection index={8} title={t.s8_title}>
        <p>{t.s8_p1}</p>
      </LegalSection>

      <LegalSection index={9} title={t.s9_title}>
        <p>{t.s9_p1}</p>
      </LegalSection>

      <LegalSection index={10} title={t.s10_title}>
        <p>{t.s10_p1}</p>
      </LegalSection>

      <LegalSection index={11} title={t.s11_title}>
        <p>{t.s11_p1}</p>
      </LegalSection>

      <LegalSection index={12} title={t.s12_title}>
        <p>{t.s12_p1}</p>
      </LegalSection>

      <div style={{ height: 80 }} />
    </>
  );
}
