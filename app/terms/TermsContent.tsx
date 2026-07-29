"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { EntityBlock, LangToggle, LegalHero, LegalSection } from "../../components/Legal";

const LANG_KEY = "verumsell-legal-lang";

const T = {
  en: {
    title: "Terms of Use.",
    updated: "June 2026",
    intro: (
      <>
        These terms govern your use of <strong>verumsell.com</strong>. By browsing this site, you
        accept them. They cover the studio site only — each product we build (Buzomed, Vivo,
        GED, and others) has its own terms of service on its own domain.
      </>
    ),
    s1_title: "Who operates this site",
    s1_lead: "verumsell.com is operated by:",
    s2_title: "What this site is",
    s2_p1:
      "verumsell.com is an informational portfolio site for Verumsell, a software studio. It presents the studio's work and provides a way to get in touch. It does not process payments, create accounts, or store any of your content — there's nothing transactional here. Individual products linked from this site are separate web applications, each governed by their own terms.",
    s3_title: "Intellectual property",
    s3_p1:
      "The Verumsell name, logo, and the text, images, and design of this site are owned by Verumsell SRL unless otherwise credited, and are protected by copyright and trademark law. You may view and share pages of this site for personal, non-commercial purposes. You may not copy, reproduce, republish, or create derivative works from this site's content for commercial purposes without our prior written permission.",
    s4_title: "Acceptable use",
    s4_lead: "When using this site, you agree not to:",
    s4_li1: "— attempt to gain unauthorised access to any part of the site or its underlying infrastructure;",
    s4_li2: "— use automated means (scraping, crawling, bots) to extract content at a scale or frequency that burdens the site, outside of standard search-engine indexing;",
    s4_li3: "— use the site for any unlawful purpose, or in a way that could damage, disable, or impair it.",
    s5_title: "Third-party links",
    s5_p1:
      "This site links to products and services we've built (Buzomed, Vivo, GED, SplitOrNot, and others), each hosted on its own domain with its own terms and privacy policy. We're not responsible for the content, terms, or data practices of any third-party site we link to, including those.",
    s6_title: "No warranty",
    s6_p1:
      "This site is provided \"as is\", without warranties of any kind, express or implied, including as to accuracy, completeness, or fitness for a particular purpose. We make reasonable efforts to keep information on this site current, but descriptions of products, features, or pricing may lag behind what's actually shipped — check the product's own site for the current state.",
    s7_title: "Limitation of liability",
    s7_p1:
      "To the maximum extent permitted by Romanian law, Verumsell SRL is not liable for any indirect, incidental, or consequential damages arising from your use of, or inability to use, this site. Nothing in these terms excludes liability that cannot be excluded under mandatory Romanian or EU law.",
    s8_title: "Governing law and jurisdiction",
    s8_p1:
      "These terms are governed by Romanian law. Any dispute arising from your use of this site falls under the jurisdiction of the competent Romanian courts, without prejudice to any mandatory consumer-protection rights you may have under the law of your own country of residence if you are an EU consumer.",
    s9_title: "Changes to these terms",
    s9_p1:
      "We may update these terms from time to time. The \"Last updated\" date above reflects the latest revision. Continued use of the site after a change constitutes acceptance of the updated terms.",
    s10_title: "Contact",
    s10_p1: (
      <>
        Questions about these terms? Reach us at{" "}
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
    title: "Termeni și condiții de utilizare.",
    updated: "Iunie 2026",
    intro: (
      <>
        Acești termeni reglementează utilizarea de către dumneavoastră a{" "}
        <strong>verumsell.com</strong>. Prin navigarea pe acest site, îi acceptați. Aceștia vizează
        exclusiv site-ul studioului — fiecare produs pe care îl construim (Buzomed, Vivo, GED și
        altele) are propriii termeni de utilizare pe domeniul propriu.
      </>
    ),
    s1_title: "Cine operează acest site",
    s1_lead: "verumsell.com este operat de:",
    s2_title: "Ce este acest site",
    s2_p1:
      "verumsell.com este un site informativ de tip portofoliu pentru Verumsell, un studio de software. Prezintă activitatea studioului și oferă o modalitate de a ne contacta. Nu procesează plăți, nu creează conturi și nu stochează niciun conținut al dumneavoastră — nu există nimic tranzacțional aici. Produsele individuale către care trimite acest site sunt aplicații web separate, fiecare guvernată de propriii termeni.",
    s3_title: "Proprietate intelectuală",
    s3_p1:
      "Denumirea Verumsell, logo-ul, precum și textul, imaginile și designul acestui site sunt deținute de Verumsell SRL, dacă nu se specifică altfel, și sunt protejate prin legislația privind drepturile de autor și mărcile. Puteți vizualiza și distribui pagini ale acestui site în scopuri personale, necomerciale. Nu aveți dreptul să copiați, reproduceți, republicați sau creați opere derivate din conținutul acestui site în scopuri comerciale fără permisiunea noastră scrisă, prealabilă.",
    s4_title: "Utilizare acceptabilă",
    s4_lead: "Atunci când folosiți acest site, sunteți de acord să nu:",
    s4_li1: "— încercați să obțineți acces neautorizat la nicio parte a site-ului sau a infrastructurii sale;",
    s4_li2: "— folosiți mijloace automatizate (scraping, crawling, boți) pentru a extrage conținut la o scară sau frecvență care împovărează site-ul, în afara indexării standard a motoarelor de căutare;",
    s4_li3: "— folosiți site-ul în scopuri ilegale sau într-un mod care ar putea să-l deterioreze, dezactiveze sau afecteze.",
    s5_title: "Linkuri către terți",
    s5_p1:
      "Acest site face trimitere către produse și servicii pe care le-am construit (Buzomed, Vivo, GED, SplitOrNot și altele), fiecare găzduit pe propriul domeniu, cu proprii termeni și politică de confidențialitate. Nu suntem responsabili pentru conținutul, termenii sau practicile de date ale niciunui site terț către care facem trimitere, inclusiv ale acestora.",
    s6_title: "Fără garanții",
    s6_p1:
      "Acest site este oferit „ca atare”, fără garanții de niciun fel, explicite sau implicite, inclusiv în privința acurateței, integralității sau adecvării pentru un anumit scop. Facem eforturi rezonabile pentru a păstra informațiile de pe acest site actuale, dar descrierile produselor, funcționalităților sau prețurilor pot rămâne în urma a ceea ce este efectiv livrat — verificați site-ul propriu al produsului pentru starea actuală.",
    s7_title: "Limitarea răspunderii",
    s7_p1:
      "În limita maximă permisă de legea română, Verumsell SRL nu este responsabilă pentru niciun fel de daune indirecte, incidentale sau subsecvente rezultate din utilizarea sau imposibilitatea de utilizare a acestui site. Nimic din acești termeni nu exclude răspunderea care nu poate fi exclusă conform legislației imperative române sau europene.",
    s8_title: "Legea aplicabilă și jurisdicția",
    s8_p1:
      "Acești termeni sunt guvernați de legea română. Orice litigiu rezultat din utilizarea acestui site este de competența instanțelor române competente, fără a prejudicia drepturile imperative de protecție a consumatorilor de care puteți beneficia conform legii din țara dumneavoastră de reședință, dacă sunteți consumator UE.",
    s9_title: "Modificări ale acestor termeni",
    s9_p1:
      "Putem actualiza acești termeni periodic. Data „Ultima actualizare” de mai sus reflectă cea mai recentă revizuire. Continuarea utilizării site-ului după o modificare constituie acceptarea termenilor actualizați.",
    s10_title: "Contact",
    s10_p1: (
      <>
        Aveți întrebări despre acești termeni? Scrieți-ne la{" "}
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

export default function TermsContent() {
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
      </LegalSection>

      <LegalSection index={2} title={t.s2_title}>
        <p>{t.s2_p1}</p>
      </LegalSection>

      <LegalSection index={3} title={t.s3_title}>
        <p>{t.s3_p1}</p>
      </LegalSection>

      <LegalSection index={4} title={t.s4_title}>
        <p style={{ marginBottom: 16 }}>{t.s4_lead}</p>
        <p style={{ marginBottom: 8 }}>{t.s4_li1}</p>
        <p style={{ marginBottom: 8 }}>{t.s4_li2}</p>
        <p>{t.s4_li3}</p>
      </LegalSection>

      <LegalSection index={5} title={t.s5_title}>
        <p>{t.s5_p1}</p>
      </LegalSection>

      <LegalSection index={6} title={t.s6_title}>
        <p>{t.s6_p1}</p>
      </LegalSection>

      <LegalSection index={7} title={t.s7_title}>
        <p>{t.s7_p1}</p>
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

      <div style={{ height: 80 }} />
    </>
  );
}
