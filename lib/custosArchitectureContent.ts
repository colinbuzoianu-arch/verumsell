export type Lang = "en" | "de";

export type Block =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

export type Section = {
  id: string;
  title: string;
  blocks: Block[];
};

export type StackRow = { layer: string; choice: string; why: string };

export type ArchitectureCopy = {
  panelLabel: string;
  panelSub: string;
  quote: string;
  sections: Section[];
  stackIndexLabel: string;
  statusIndexLabel: string;
  stackHeading: string;
  stackHeaders: { layer: string; choice: string; why: string };
  stack: StackRow[];
  statusHeading: string;
  builtTodayLabel: string;
  roadmapLabel: string;
  builtToday: string[];
  roadmap: string[];
  tocStackLabel: string;
  tocStatusLabel: string;
};

const sectionsEn: Section[] = [
  {
    id: "deep-gateway",
    title: "The gateway — the enforcement point",
    blocks: [
      {
        type: "ul",
        items: [
          "Written in Rust (Tokio, axum, reqwest): a single static binary, no runtime, no garbage-collector pauses on the request path — because this sits inline on every tool call an agent makes, so latency has to be predictable.",
          "Speaks MCP's streamable-HTTP transport directly and proxies raw JSON-RPC bytes rather than implementing a full MCP SDK. It only needs to read the call's method and tool name to decide — which keeps it compatible as the MCP spec evolves underneath it.",
          "Session binding: MCP sessions are tied to the agent that opened them. A second agent presenting the same session id gets rejected and is logged as a reuse attempt — it is never forwarded. Idle sessions expire and the session table is capped with LRU eviction, so a hostile client can't exhaust memory by opening sessions forever.",
          "Tool-list filtering: an agent only ever sees the tools its policy would actually allow it to call — the tool list is rewritten before it reaches the agent. A response shape the gateway doesn't recognise fails closed rather than passing through unfiltered.",
          "Credential isolation: only headers on an explicit allow-list go upstream. The agent's own bearer token never reaches the MCP server — upstream credentials come from the gateway's own config, set once by the operator.",
        ],
      },
    ],
  },
  {
    id: "deep-policy",
    title: "Policy: Cedar, not a hand-rolled rules engine",
    blocks: [
      {
        type: "ul",
        items: [
          "Policies are written in Cedar, AWS's open-source authorization language — chosen over something like OPA/Rego because it's purpose-built for authorization and designed for formal analysis. A roadmap item is answering \"can any agent ever reach payroll?\" by mathematical proof, not just by testing.",
          "Default deny, structurally: a call is allowed only if some permit rule matches and no forbid rule does. There is no code path that defaults to allow.",
          "Schema-validated: policies are checked against a schema on load and on every reload. An unknown attribute in a policy is a validation error, not a silent no-op.",
          "Hot reload without dropping connections: a reload is fully validated before it replaces the running policy set. A bad reload leaves the previous, known-good set in charge, and a request already in flight finishes under the policy version it started with.",
          "Every decision names the specific policy that made it, including \"default deny\" when nothing matched — so a blocked call always comes back with a reason, not a bare rejection.",
        ],
      },
    ],
  },
  {
    id: "deep-inspection",
    title: "Content inspection — looking inside the call",
    blocks: [
      {
        type: "ul",
        items: [
          "A dependency-free module walks a tool call's arguments and flags what it finds, so policy can act on content, not just on which tool was named.",
          "Detectors use real checksums, not just pattern matching: IBAN (mod-97), card numbers (Luhn), national ID formats, plus email addresses, API-key and secret patterns, and bulk-size signals such as argument size and array length.",
          "Bounded walk: nested JSON is walked depth- and byte-capped by config, so an oversized or hostile payload fails closed instead of slowing the gateway down.",
          "Findings never carry the matched value — only kind, count and location. A finding that an argument \"looks like an IBAN\" never stores which IBAN.",
          "Findings feed back into policy as context, so a rule can say \"forbid any call whose findings contain a card number or secret\" or \"forbid CRM exports over 500 rows\" — behavioural policy, not just allow-lists.",
        ],
      },
    ],
  },
  {
    id: "deep-audit",
    title: "The audit log — tamper-evident, not just a log file",
    blocks: [
      {
        type: "ul",
        items: [
          "Append-only, SHA-256 hash-chained: every record's hash covers the previous record's hash, so an edit, insertion or deletion anywhere in the file breaks the chain from that point forward. A verify command walks the whole file and proves — or disproves — integrity in one pass.",
          "Audit-before-act: the decision record is written and flushed to disk before the call is forwarded. If the write fails, the call is blocked — there is no path where a call proceeds without a durable record of why.",
          "Three privacy modes, one gateway-wide setting: hash (HMAC-SHA256 of the arguments, the default), redacted (same shape, every value replaced by its type and length), or full (arguments as-is, with a startup warning since this may store personal data).",
          "Hash mode uses HMAC rather than a plain hash deliberately — a plain hash of a short, guessable value like an IBAN or national ID can be brute-forced offline. HMAC mixes in a secret key, so a guess is useless without it. If hash mode is selected and the key is missing, the gateway refuses to start rather than silently falling back to something weaker.",
          "Each record also carries the agent's configured owner, the gateway instance, and the exact policy version that made the decision — enough to answer \"who owned this agent, which gateway, under which policy\" for any single row, months later.",
        ],
      },
    ],
  },
  {
    id: "deep-tokens",
    title: "Tokens and identity",
    blocks: [
      {
        type: "ul",
        items: [
          "Two auth modes, operator's choice: static hashed tokens (SHA-256, simple setups) or signed, short-lived tokens (Ed25519, carrying agent id, issued-at, expiry and key id).",
          "Key rotation is built in — the gateway accepts a list of verifying keys by key id, so an old key keeps validating already-issued tokens while a new one takes over issuing.",
          "Negative cases are tested explicitly: an expired token, a wrong key and a tampered payload are each rejected.",
          "Plain tokens are never held anywhere, by design — only hashes, or signed tokens that are verified, never decrypted back into something secret.",
        ],
      },
    ],
  },
  {
    id: "deep-control",
    title: "Custos Control — the management plane",
    blocks: [
      {
        type: "ul",
        items: [
          "Self-hosted first: Control and its database run entirely inside the customer's own network — a direct answer to the question security buyers raise first, \"where does our audit data live.\" Every table carries a tenant id from day one, so a future hosted option is the same schema, not a rewrite.",
          "Gateways connect out to Control, never the other way — a customer opens zero inbound ports to make this work.",
          "Control never holds agent tokens in plaintext and never sees raw tool arguments beyond whatever the gateway's own privacy mode already allows through.",
          "Policy bundles are signed, not just transmitted: publishing a policy version produces one signed bundle — policy text, schema, and the exact active-agent set at publish time. A tampered bundle fails signature verification and is rejected outright.",
          "A gateway that loses contact with Control keeps enforcing its last known-good policy — it never falls back to \"allow all.\" Connecting to Control is optional: no configuration means zero outbound calls and identical behaviour to a standalone gateway.",
          "Audit logs round-trip too: gateways ship their hash-chained log to Control in batches, idempotent by sequence number so a retried batch is a no-op, not a duplicate. Control checks chain continuity per gateway and flags gaps — a flag never silently clears itself.",
        ],
      },
    ],
  },
  {
    id: "deep-approvals",
    title: "Human-in-the-loop: hold and four-eyes approval",
    blocks: [
      {
        type: "ul",
        items: [
          "A policy can mark a rule as requiring hold: matching calls become a pending approval instead of an automatic allow.",
          "The gateway raises the approval in Control and polls for a decision up to a timeout. Approved means forward; rejected, timed out, or Control unreachable all mean block. Every step — the hold, the eventual allow or block — is written to the audit log before it's acted on.",
          "Four-eyes: the person who approves a held call can't be the same person who owns the agent that made it, enforced at resolution time — and it fails closed (blocks) if Control has no record of the agent at all, rather than silently skipping the check.",
          "Approvals are role-gated to designated approvers, enforced server-side, not just hidden in the dashboard UI.",
        ],
      },
    ],
  },
  {
    id: "deep-evidence",
    title: "Evidence export — audit trail to compliance artifact",
    blocks: [
      {
        type: "ul",
        items: [
          "One export gathers a time-ranged pack — agent inventory, published policy versions, decision statistics, resolved approvals with approver identities, per-gateway chain-integrity status — and produces both a signed JSON bundle and a human-readable PDF, generated without a headless browser or external binary.",
          "Localised in English, German and Romanian, including the diacritics each language needs.",
          "Maps specific controls to named articles — EU AI Act Art. 12 & 14, NIS2 Art. 21(2)(a)/(e), GDPR Art. 5(1)(c)/(f) — worded as the control \"supports\" the requirement, never that it \"satisfies\" or \"complies with\" one. It's our own reading of the regulations: useful groundwork for your legal and compliance team, not a substitute for their review.",
        ],
      },
    ],
  },
  {
    id: "deep-invariants",
    title: "Security invariants",
    blocks: [
      {
        type: "p",
        text: "The rules the whole system is built around — each enforced in code, and each with a test that proves the negative case, that a blocked call never reaches the upstream tool, not just that the log says it was blocked.",
      },
      {
        type: "ul",
        items: [
          "Fail closed. Anything unparseable, unauthenticated, unevaluated or unauditable is rejected — there is no \"allow on error\" path anywhere.",
          "Default deny. Allowed only with a matching permit and no matching forbid.",
          "Audit before acting. The decision is durably written before the call is forwarded; a failed write blocks the call.",
          "Credentials never cross the boundary. Only an explicit header allow-list goes upstream; the agent's own token never does.",
          "No plaintext tokens, anywhere, ever — SHA-256 hash or verified signature only.",
          "Hostile input is the default assumption. Tool names, arguments, request ids, upstream responses and config values are all treated as untrusted.",
          "No unsafe code paths outside tests — enforced at the workspace level, not left to code review.",
          "Every security behaviour has a test, including its failure mode.",
        ],
      },
    ],
  },
];

const sectionsDe: Section[] = [
  {
    id: "deep-gateway",
    title: "Das Gateway — der Durchsetzungspunkt",
    blocks: [
      {
        type: "ul",
        items: [
          "Geschrieben in Rust (Tokio, axum, reqwest): eine einzelne statische Binärdatei, keine Laufzeitumgebung, keine Garbage-Collector-Pausen im Anfragepfad — denn das Gateway liegt inline auf jedem Tool-Aufruf eines Agenten, weshalb die Latenz vorhersehbar sein muss.",
          "Spricht MCPs Streamable-HTTP-Transport direkt und leitet rohe JSON-RPC-Bytes weiter, anstatt ein vollständiges MCP-SDK zu implementieren. Es muss nur Methode und Tool-Namen des Aufrufs lesen, um zu entscheiden — das hält es kompatibel, während sich die MCP-Spezifikation weiterentwickelt.",
          "Sitzungsbindung: MCP-Sitzungen sind an den Agenten gebunden, der sie geöffnet hat. Ein zweiter Agent, der dieselbe Sitzungs-ID vorlegt, wird abgewiesen und als Wiederverwendungsversuch protokolliert — er wird niemals weitergeleitet. Inaktive Sitzungen laufen ab, und die Sitzungstabelle ist durch LRU-Verdrängung begrenzt, sodass ein böswilliger Client den Arbeitsspeicher nicht durch endloses Öffnen von Sitzungen erschöpfen kann.",
          "Filterung der Tool-Liste: Ein Agent sieht ausschließlich die Tools, die seine Richtlinie ihm tatsächlich erlauben würde aufzurufen — die Tool-Liste wird umgeschrieben, bevor sie den Agenten erreicht. Ein Antwortformat, das das Gateway nicht erkennt, schlägt sicherheitshalber fehl (fail closed), anstatt ungefiltert durchgelassen zu werden.",
          "Trennung der Zugangsdaten: Nur Header auf einer expliziten Positivliste werden weitergeleitet. Das eigene Bearer-Token des Agenten erreicht den MCP-Server nie — die Zugangsdaten für vorgelagerte Dienste stammen aus der eigenen Konfiguration des Gateways, einmalig vom Betreiber festgelegt.",
        ],
      },
    ],
  },
  {
    id: "deep-policy",
    title: "Richtlinien: Cedar statt einer selbstgebauten Regel-Engine",
    blocks: [
      {
        type: "ul",
        items: [
          "Richtlinien werden in Cedar geschrieben, AWS' Open-Source-Sprache für Autorisierung — gewählt gegenüber Alternativen wie OPA/Rego, weil sie speziell für Autorisierung entwickelt wurde und für formale Analyse ausgelegt ist. Ein Punkt auf der Roadmap ist, die Frage „Kann irgendein Agent jemals auf die Gehaltsabrechnung zugreifen?\" per mathematischem Beweis zu beantworten, nicht nur durch Tests.",
          "Strukturell standardmäßig verweigert: Ein Aufruf wird nur erlaubt, wenn eine permit-Regel zutrifft und keine forbid-Regel. Es gibt keinen Codepfad, der standardmäßig erlaubt.",
          "Schema-validiert: Richtlinien werden beim Laden und bei jedem Neuladen gegen ein Schema geprüft. Ein unbekanntes Attribut in einer Richtlinie ist ein Validierungsfehler, keine stille Nichtanwendung.",
          "Hot Reload ohne Verbindungsabbrüche: Ein Neuladen wird vollständig validiert, bevor es das laufende Regelwerk ersetzt. Ein fehlerhaftes Neuladen belässt das vorherige, bekanntermaßen funktionierende Regelwerk in Kraft, und eine bereits laufende Anfrage wird mit der Richtlinienversion abgeschlossen, mit der sie begonnen hat.",
          "Jede Entscheidung nennt die konkrete Richtlinie, die sie getroffen hat — einschließlich „Standard verweigert\", wenn nichts zutraf. Ein blockierter Aufruf kommt also immer mit einer Begründung zurück, nicht als bloße Ablehnung.",
        ],
      },
    ],
  },
  {
    id: "deep-inspection",
    title: "Inhaltsprüfung — ein Blick in den Aufruf hinein",
    blocks: [
      {
        type: "ul",
        items: [
          "Ein abhängigkeitsfreies Modul durchläuft die Argumente eines Tool-Aufrufs und markiert Funde, sodass Richtlinien auf den Inhalt reagieren können — nicht nur darauf, welches Tool genannt wurde.",
          "Die Erkennung nutzt echte Prüfsummen, nicht nur Mustererkennung: IBAN (Modulo 97), Kartennummern (Luhn-Algorithmus), nationale ID-Formate sowie E-Mail-Adressen, API-Key- und Secret-Muster und Signale für Massendaten wie Argumentgröße und Array-Länge.",
          "Begrenzter Durchlauf: Verschachteltes JSON wird tiefen- und bytebegrenzt nach Konfiguration durchlaufen, sodass eine überdimensionierte oder böswillige Nutzlast sicherheitshalber abgelehnt wird, statt das Gateway auszubremsen.",
          "Funde enthalten nie den gefundenen Wert selbst — nur Art, Anzahl und Fundort. Ein Fund, dass ein Argument „wie eine IBAN aussieht\", speichert nie, um welche IBAN es sich handelt.",
          "Funde fließen als Kontext in die Richtlinien zurück, sodass eine Regel lauten kann: „Verbiete jeden Aufruf, dessen Funde eine Kartennummer oder ein Secret enthalten\" oder „Verbiete CRM-Exporte über 500 Zeilen\" — verhaltensbasierte Richtlinien statt reiner Positivlisten.",
        ],
      },
    ],
  },
  {
    id: "deep-audit",
    title: "Das Audit-Protokoll — manipulationssicher, nicht nur eine Logdatei",
    blocks: [
      {
        type: "ul",
        items: [
          "Nur anfügend, SHA-256-hash-verkettet: Der Hash jedes Eintrags umfasst den Hash des vorherigen Eintrags, sodass eine Änderung, Einfügung oder Löschung an beliebiger Stelle in der Datei die Kette ab diesem Punkt bricht. Ein Prüfbefehl durchläuft die gesamte Datei und weist die Integrität in einem Durchgang nach — oder widerlegt sie.",
          "Audit-vor-Aktion: Der Entscheidungseintrag wird geschrieben und auf die Festplatte übertragen, bevor der Aufruf weitergeleitet wird. Schlägt das Schreiben fehl, wird der Aufruf blockiert — es gibt keinen Weg, auf dem ein Aufruf ohne dauerhaften Nachweis des Grundes fortgesetzt wird.",
          "Drei Datenschutzmodi, eine gatewayweite Einstellung: hash (HMAC-SHA256 der Argumente, Standard), redacted (gleiche Struktur, jeder Wert durch Typ und Länge ersetzt) oder full (Argumente im Original, mit einer Warnung beim Start, da dies personenbezogene Daten speichern kann).",
          "Der Hash-Modus verwendet bewusst HMAC statt eines einfachen Hashes — ein einfacher Hash eines kurzen, erratbaren Werts wie einer IBAN oder einer nationalen ID lässt sich offline per Brute Force knacken. HMAC mischt einen geheimen Schlüssel ein, sodass ein Rateversuch ohne diesen Schlüssel nutzlos ist. Ist der Hash-Modus gewählt und fehlt der Schlüssel, verweigert das Gateway den Start, statt stillschweigend auf etwas Schwächeres zurückzufallen.",
          "Jeder Eintrag enthält zudem den konfigurierten Owner des Agenten, die Gateway-Instanz und die exakte Richtlinienversion, die die Entscheidung getroffen hat — genug, um Monate später für jede einzelne Zeile zu beantworten, wem der Agent gehörte, über welches Gateway und unter welcher Richtlinie.",
        ],
      },
    ],
  },
  {
    id: "deep-tokens",
    title: "Tokens und Identität",
    blocks: [
      {
        type: "ul",
        items: [
          "Zwei Authentifizierungsmodi, nach Wahl des Betreibers: statische gehashte Tokens (SHA-256, für einfache Setups) oder signierte, kurzlebige Tokens (Ed25519, mit Agenten-ID, Ausstellungszeit, Ablauf und Schlüssel-ID).",
          "Schlüsselrotation ist eingebaut — das Gateway akzeptiert eine Liste von Prüfschlüsseln nach Schlüssel-ID, sodass ein alter Schlüssel bereits ausgestellte Tokens weiter validiert, während ein neuer die Ausstellung übernimmt.",
          "Negativfälle werden explizit getestet: ein abgelaufenes Token, ein falscher Schlüssel und eine manipulierte Nutzlast werden jeweils abgelehnt.",
          "Tokens im Klartext werden grundsätzlich nirgendwo gespeichert — nur Hashes oder signierte Tokens, die verifiziert, aber nie zurück in ein Geheimnis entschlüsselt werden.",
        ],
      },
    ],
  },
  {
    id: "deep-control",
    title: "Custos Control — die Verwaltungsebene",
    blocks: [
      {
        type: "ul",
        items: [
          "Self-Hosted zuerst: Control und seine Datenbank laufen vollständig im eigenen Netzwerk des Kunden — eine direkte Antwort auf die Frage, die Sicherheitsverantwortliche zuerst stellen: „Wo liegen unsere Audit-Daten?\" Jede Tabelle trägt von Anfang an eine Mandanten-ID, sodass eine künftige gehostete Option dasselbe Schema nutzt, statt neu geschrieben werden zu müssen.",
          "Gateways bauen die Verbindung zu Control auf, nie umgekehrt — ein Kunde muss dafür keinen einzigen eingehenden Port öffnen.",
          "Control speichert Agenten-Tokens nie im Klartext und sieht niemals rohe Tool-Argumente, außer dem, was der Datenschutzmodus des Gateways ohnehin bereits durchlässt.",
          "Richtlinienpakete werden signiert, nicht nur übertragen: Das Veröffentlichen einer Richtlinienversion erzeugt ein signiertes Paket — Richtlinientext, Schema und den exakten Bestand aktiver Agenten zum Zeitpunkt der Veröffentlichung. Ein manipuliertes Paket scheitert an der Signaturprüfung und wird rundweg abgelehnt.",
          "Ein Gateway, das den Kontakt zu Control verliert, setzt weiterhin seine letzte bekanntermaßen gültige Richtlinie durch — es fällt niemals auf „alles erlauben\" zurück. Die Verbindung zu Control ist optional: Ohne Konfiguration gibt es keine ausgehenden Aufrufe, und das Verhalten entspricht exakt einem eigenständigen Gateway.",
          "Auch Audit-Protokolle gehen in beide Richtungen: Gateways senden ihr hash-verkettetes Protokoll in Batches an Control, idempotent nach Sequenznummer, sodass ein wiederholter Batch folgenlos bleibt statt zu duplizieren. Control prüft die Kettenintegrität je Gateway und markiert Lücken — eine Markierung verschwindet nie von selbst.",
        ],
      },
    ],
  },
  {
    id: "deep-approvals",
    title: "Mensch im Prozess: Hold und Vier-Augen-Freigabe",
    blocks: [
      {
        type: "ul",
        items: [
          "Eine Richtlinie kann eine Regel als freigabepflichtig (hold) markieren: Passende Aufrufe werden zu einer ausstehenden Freigabe statt zu einer automatischen Erlaubnis.",
          "Das Gateway stellt die Freigabeanfrage in Control und fragt bis zu einem Timeout wiederholt nach einer Entscheidung. Genehmigt bedeutet Weiterleitung; abgelehnt, abgelaufen oder Control nicht erreichbar bedeuten jeweils Blockierung. Jeder Schritt — der Hold, die endgültige Erlaubnis oder Blockierung — wird protokolliert, bevor er wirksam wird.",
          "Vier-Augen-Prinzip: Die Person, die einen zurückgehaltenen Aufruf freigibt, darf nicht dieselbe Person sein, der der auslösende Agent gehört — durchgesetzt im Moment der Entscheidung. Hat Control gar keinen Datensatz zum Agenten, schlägt die Prüfung sicherheitshalber fehl (Blockierung), statt stillschweigend übersprungen zu werden.",
          "Freigaben sind serverseitig auf dafür vorgesehene Rollen beschränkt — nicht nur in der Dashboard-Oberfläche ausgeblendet.",
        ],
      },
    ],
  },
  {
    id: "deep-evidence",
    title: "Nachweisexport — vom Audit-Trail zum Compliance-Dokument",
    blocks: [
      {
        type: "ul",
        items: [
          "Ein Export sammelt ein Paket für einen Zeitraum — Agenteninventar, veröffentlichte Richtlinienversionen, Entscheidungsstatistiken, abgeschlossene Freigaben mit Identität der genehmigenden Person, Kettenintegritätsstatus je Gateway — und erzeugt daraus sowohl ein signiertes JSON-Paket als auch ein für Menschen lesbares PDF, erzeugt ohne Headless-Browser oder externe Programme.",
          "Lokalisiert in Englisch, Deutsch und Rumänisch, einschließlich der diakritischen Zeichen, die jede Sprache benötigt.",
          "Ordnet konkrete Kontrollen benannten Artikeln zu — EU-KI-Verordnung Art. 12 & 14, NIS2 Art. 21 Abs. 2 (a)/(e), DSGVO Art. 5 Abs. 1 (c)/(f) — formuliert als „unterstützt\" die Anforderung, niemals als „erfüllt\" oder „entspricht\". Dies ist unsere eigene Lesart der Vorschriften: eine nützliche Vorarbeit für Ihr Rechts- und Compliance-Team, kein Ersatz für deren Prüfung.",
        ],
      },
    ],
  },
  {
    id: "deep-invariants",
    title: "Sicherheits-Invarianten",
    blocks: [
      {
        type: "p",
        text: "Die Regeln, auf denen das gesamte System aufbaut — jede im Code durchgesetzt und jede mit einem Test belegt, der den Negativfall beweist: dass ein blockierter Aufruf das nachgelagerte Tool nie erreicht, nicht nur, dass das Protokoll eine Blockierung behauptet.",
      },
      {
        type: "ul",
        items: [
          "Fail closed. Alles Unparsbare, Unauthentifizierte, Unbewertete oder nicht Auditierbare wird abgelehnt — es gibt nirgendwo einen „Bei Fehler erlauben\"-Pfad.",
          "Standardmäßig verweigert. Erlaubt nur bei einer passenden permit-Regel und keiner passenden forbid-Regel.",
          "Audit vor Aktion. Die Entscheidung wird dauerhaft geschrieben, bevor der Aufruf weitergeleitet wird; ein fehlgeschlagenes Schreiben blockiert den Aufruf.",
          "Zugangsdaten überschreiten nie die Grenze. Nur eine explizite Positivliste von Headern wird weitergeleitet; das eigene Token des Agenten nie.",
          "Keine Klartext-Tokens, nirgendwo, niemals — nur SHA-256-Hash oder verifizierte Signatur.",
          "Böswillige Eingaben sind die Standardannahme. Tool-Namen, Argumente, Anfrage-IDs, Antworten nachgelagerter Dienste und Konfigurationswerte gelten allesamt als nicht vertrauenswürdig.",
          "Keine unsicheren Codepfade außerhalb von Tests — auf Ebene des gesamten Workspace erzwungen, nicht dem Code-Review überlassen.",
          "Jedes sicherheitsrelevante Verhalten hat einen Test — einschließlich seines Fehlerfalls.",
        ],
      },
    ],
  },
];

const stackEn: StackRow[] = [
  { layer: "Gateway, Control API", choice: "Rust, Tokio, axum, reqwest", why: "memory safety, no GC pause, single static binary" },
  { layer: "Policy", choice: "Cedar (cedar-policy)", why: "built for authorization, fast, analyzable" },
  { layer: "Tokens", choice: "SHA-256 (static) / Ed25519 (signed, short-lived)", why: "no reversible secret storage" },
  { layer: "Audit", choice: "Hash-chained JSON Lines + HMAC-SHA256", why: "tamper-evident, brute-force-resistant" },
  { layer: "Config / tenants (Control)", choice: "PostgreSQL", why: "self-hostable, well-understood, tenant id from day one" },
  { layer: "Dashboard", choice: "Vite + React + TypeScript, embedded in the binary", why: "one process to run, not a constellation of services" },
  { layer: "PDF generation", choice: "Pure-Rust PDF rendering", why: "no headless browser, no outbound dependency" },
  { layer: "Deploy", choice: "Distroless, non-root image; EU (Frankfurt) hosted option", why: "small attack surface; self-hosted-first for data residency" },
];

const stackDe: StackRow[] = [
  { layer: "Gateway, Control-API", choice: "Rust, Tokio, axum, reqwest", why: "Speichersicherheit, keine GC-Pausen, eine einzelne statische Binärdatei" },
  { layer: "Richtlinien", choice: "Cedar (cedar-policy)", why: "für Autorisierung entwickelt, schnell, analysierbar" },
  { layer: "Tokens", choice: "SHA-256 (statisch) / Ed25519 (signiert, kurzlebig)", why: "keine umkehrbare Speicherung von Geheimnissen" },
  { layer: "Audit", choice: "Hash-verkettete JSON Lines + HMAC-SHA256", why: "manipulationssicher, resistent gegen Brute Force" },
  { layer: "Konfiguration / Mandanten (Control)", choice: "PostgreSQL", why: "selbst hostbar, bewährt, Mandanten-ID von Anfang an" },
  { layer: "Dashboard", choice: "Vite + React + TypeScript, eingebettet in die Binärdatei", why: "ein einziger Prozess statt einer Ansammlung von Diensten" },
  { layer: "PDF-Erzeugung", choice: "PDF-Rendering in reinem Rust", why: "kein Headless-Browser, keine ausgehende Abhängigkeit" },
  { layer: "Deployment", choice: "Distroless-Image ohne Root-Rechte; gehostete EU-Option (Frankfurt)", why: "kleine Angriffsfläche; Self-Hosted zuerst für Datenresidenz" },
];

const builtTodayEn = [
  "Full gateway enforcement path, end to end",
  "Cedar policy with schema validation and hot reload",
  "Content inspection feeding live policy context",
  "Hash-chained audit log with all three privacy modes",
  "Both token schemes, with key rotation",
  "The full Control plane: agents, signed policy bundles, gateway sync, audit ingestion with chain flagging, hold/four-eyes approval",
  "The dashboard and its main pages",
  "Evidence export via API (a dashboard button is next)",
];

const builtTodayDe = [
  "Vollständiger Durchsetzungspfad im Gateway, Ende-zu-Ende",
  "Cedar-Richtlinien mit Schema-Validierung und Hot Reload",
  "Inhaltsprüfung, die Richtlinien live mit Kontext versorgt",
  "Hash-verkettetes Audit-Protokoll mit allen drei Datenschutzmodi",
  "Beide Token-Schemata, inklusive Schlüsselrotation",
  "Die vollständige Control-Ebene: Agenten, signierte Richtlinienpakete, Gateway-Synchronisation, Audit-Aufnahme mit Kettenprüfung, Hold-/Vier-Augen-Freigabe",
  "Das Dashboard und seine Hauptseiten",
  "Nachweisexport über API (ein Dashboard-Button folgt als Nächstes)",
];

const roadmapEn = [
  "OIDC login for the dashboard",
  "A hosted, multi-tenant EU Control option",
  "An LLM API egress proxy",
  "Formal policy analysis — provable reachability questions, not just tests",
  "Approval notifications (Slack, Teams, email)",
];

const roadmapDe = [
  "OIDC-Login für das Dashboard",
  "Eine gehostete, mandantenfähige EU-Control-Option",
  "Ein Egress-Proxy für LLM-APIs",
  "Formale Richtlinienanalyse — beweisbare Erreichbarkeitsfragen, nicht nur Tests",
  "Benachrichtigungen für Freigaben (Slack, Teams, E-Mail)",
];

export const ARCHITECTURE_COPY: Record<Lang, ArchitectureCopy> = {
  en: {
    panelLabel: "custos — technical architecture",
    panelSub: "for technical reviewers",
    quote:
      "Every decision the gateway makes is written and flushed to a tamper-evident, hash-chained log before the call is allowed through — not after.",
    sections: sectionsEn,
    stackIndexLabel: String(sectionsEn.length + 1).padStart(2, "0"),
    statusIndexLabel: String(sectionsEn.length + 2).padStart(2, "0"),
    stackHeading: "The stack, end to end",
    stackHeaders: { layer: "Layer", choice: "Choice", why: "Why" },
    stack: stackEn,
    statusHeading: "Built today, and what's next",
    builtTodayLabel: "Built today",
    roadmapLabel: "On the roadmap",
    builtToday: builtTodayEn,
    roadmap: roadmapEn,
    tocStackLabel: "Stack",
    tocStatusLabel: "Built vs. roadmap",
  },
  de: {
    panelLabel: "custos — technische Architektur",
    panelSub: "für technische Prüfer",
    quote:
      "Jede Entscheidung des Gateways wird geschrieben und in ein manipulationssicheres, hash-verkettetes Protokoll übertragen, bevor der Aufruf durchgelassen wird — nicht danach.",
    sections: sectionsDe,
    stackIndexLabel: String(sectionsDe.length + 1).padStart(2, "0"),
    statusIndexLabel: String(sectionsDe.length + 2).padStart(2, "0"),
    stackHeading: "Der Stack, von Anfang bis Ende",
    stackHeaders: { layer: "Ebene", choice: "Wahl", why: "Warum" },
    stack: stackDe,
    statusHeading: "Heute gebaut — und was als Nächstes kommt",
    builtTodayLabel: "Heute bereits gebaut",
    roadmapLabel: "Auf der Roadmap",
    builtToday: builtTodayDe,
    roadmap: roadmapDe,
    tocStackLabel: "Stack",
    tocStatusLabel: "Stand & Roadmap",
  },
};
