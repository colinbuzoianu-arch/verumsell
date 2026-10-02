# Custos — technical overview (source material for the deck)

This is a working document, not customer-facing copy: pull sentences/bullets
from here into slides, but check docs/PLAN.md and the ADRs for anything that
may have moved on before you quote a specific detail. Organized by layer,
each with the detail that's actually defensible in front of a technical
buyer (not marketing language) — the kind of specificity that makes a
security product credible: named algorithms, named failure modes, named
tests.

## 1. What it is, in one sentence

Custos sits inline between an AI agent and the MCP tools it calls: it
identifies the agent, checks the call against policy, writes a
tamper-evident record, and only then lets it through — or doesn't.

Five steps, every single call, no exceptions:

```
agent ──HTTP (MCP)──▶  CUSTOS GATEWAY  ──HTTP (MCP)──▶ MCP server ──▶ tools / data
                         │
                         ├─ 1 identify   bearer token → SHA-256 → AgentId      (401 if unknown)
                         ├─ 2 parse      single JSON-RPC object only           (400 otherwise)
                         ├─ 3 decide     tools/call → Cedar → Allow / Block / Hold
                         ├─ 4 record     append + fsync hash-chained record    (503 if it fails)
                         └─ 5 forward    allow-listed headers, upstream creds, stream body back
```

The product has two halves, split by license: the **gateway** (Apache-2.0,
open source, runs on every customer's own infrastructure) and **Custos
Control** (commercial, self-hosted first) — the management plane that gives
one UI and one policy source across every gateway a customer runs.

## 2. Layer 1 — the gateway: the enforcement point

- Rust, Tokio, axum, reqwest. A single static binary, no runtime, no garbage
  collector pauses on the request path — latency is predictable, which
  matters because this sits inline on *every* tool call an agent makes.
- Speaks MCP's streamable-HTTP transport (`POST`/`GET`/`DELETE /mcp`) and
  proxies raw JSON-RPC bytes rather than implementing a full MCP SDK — it
  only needs to read `method` and `params.name` to make a decision, which
  keeps it compatible as the MCP spec evolves underneath it.
- **Session binding**: MCP sessions are tied to the agent that opened them.
  A second agent presenting the same session id gets `403` and is logged as
  a reuse attempt — it is never forwarded. An unknown session id gets `404`.
  Idle sessions expire (24h default) and the session table is capped
  (10,000, LRU eviction) so a hostile client can't exhaust memory by opening
  sessions forever.
- **Tool-list filtering**: an agent only ever sees the tools its policy
  would actually allow it to call — `tools/list` responses are rewritten
  before they reach the agent, for both plain JSON and server-sent-event
  upstream replies. A response shape or content-type the gateway doesn't
  recognize fails closed rather than passing it through unfiltered.
- **Credential isolation**: only headers on an explicit allow-list
  (`FORWARD_REQUEST_HEADERS`) go upstream. The agent's own bearer token
  never reaches the MCP server; upstream credentials come from the
  gateway's own config, configured once by the operator.

## 3. Layer 2 — policy: Cedar, not a hand-rolled rules engine

- **Cedar** (`cedar-policy`, AWS's open-source authorization language) was
  chosen over something like OPA/Rego specifically because it's built for
  authorization — fast to evaluate, and designed from the ground up for
  formal analysis (a roadmap item: "can any agent ever reach payroll?" is a
  question Cedar's model can eventually answer by analysis, not just by
  testing).
- Model: principal `Agent::"<id>"`, action `Action::"call_tool"`, resource
  `Tool::"<name>"`. Later versions add entity hierarchies (a tool living
  inside `Domain::"finance"`), request context, and `@hold`/`@four_eyes`
  annotations — covered below.
- **Default deny, structurally**: a call is allowed only if some `permit`
  matches *and* no `forbid` does. There is no code path that defaults to
  allow.
- **Schema-validated policy**: a Cedar schema file defines the entity types
  and context attributes; policies are checked against it on load and on
  reload (`check-policy`, `SIGHUP`). An unknown attribute in a policy is a
  validation error, not a silent no-op.
- **Hot reload without dropping connections**: `SIGHUP` on Unix, or a
  debounced file watcher cross-platform. A reload is fully validated
  *before* it replaces the running policy set — a bad reload leaves the
  previous, known-good set deciding calls. A request already in flight
  finishes under the policy version it started with.
- **Every decision names the policy that made it** (`@id` annotation),
  including "default deny" when nothing matched — so a blocked call always
  comes back with a reason a human (or the agent's own model) can read, not
  a bare rejection.

## 4. Layer 3 — content inspection: looking inside the call, not just at its name

A separate, dependency-free crate (`custos-inspect`: pure functions, no
I/O) walks a tool call's arguments and flags what it finds, so policy can
act on *content*, not just on which tool was named:

- **Detectors with real checksums**, not just regexes: IBAN (mod-97), card
  numbers (Luhn), Romanian CNP (checksum), German Steuer-ID (checksum),
  plus email addresses, API-key/secret patterns (`sk-`, `ghp_`, `AKIA`,
  high-entropy strings), and bulk-size signals (argument byte count, array
  length).
- **Bounded walk**: nested JSON is walked depth- and byte-capped by config,
  so a hostile, deeply-nested or huge payload can't be used to slow the
  gateway down — it fails closed on an oversized input instead.
- **Findings never carry the matched value** — only kind, count, and JSON
  path. A finding that an argument "looks like an IBAN" never stores *which*
  IBAN, in memory, in policy context, or in the audit log.
- Findings feed back into Cedar as context (`findings`, `args_bytes`,
  `array_max_len`, `hour_utc`, `weekday`), so a policy can say things like
  "forbid any call whose findings contain `card` or `secret`" or "forbid
  `crm.*` exports with more than 500 rows" — behavioral policy, not just
  allow-lists.

## 5. Layer 4 — the audit log: tamper-evident, not just a log file

- Append-only JSON Lines, **SHA-256 hash-chained**: every record's hash
  covers the previous record's hash, so an edit, insertion, or deletion
  anywhere in the file breaks the chain from that point forward. `custos
  verify-audit <path>` walks the whole file and proves (or disproves)
  integrity in one command — this is the artifact a customer's auditor or
  insurer actually gets to check, not a claim they have to trust.
- **Audit-before-act, enforced at the type level, not by convention**: the
  decision record is written and *fsync'd* before the call is forwarded. If
  the write fails, the call is blocked — there is no path where a call
  proceeds without a durable record of why.
- **Privacy-aware by default**, three explicit modes (`audit_arguments`,
  one gateway-wide setting):
  | Mode | What's stored | Needs a key? |
  |---|---|---|
  | `hash` (default) | `{"args_hmac", "args_bytes", "key_id"}` | yes |
  | `redacted` | same JSON shape, every value replaced by its type+length (e.g. `"iban": "<string:22>"`) | no |
  | `full` | arguments as-is | no — logs a startup warning, since this may store personal data |
  - `hash` mode uses **HMAC-SHA256, not plain SHA-256**, deliberately: a
    plain hash of a short, guessable value (an IBAN, a national ID, an
    email) can be brute-forced offline by hashing candidates and comparing.
    HMAC mixes in a secret key (`CUSTOS_AUDIT_KEY`, env var only, never in
    config) so a guess is useless without that key. If `hash` mode is
    selected and the key is missing or too short, **the gateway refuses to
    start** rather than silently falling back to a weaker mode.
    Arguments are canonicalized (object keys sorted recursively) before
    hashing, so the same logical call always produces the same hash
    regardless of key order.
- Each record also carries the agent's configured `owner`, a
  `gateway_instance` id, and the exact `policy_version` (a hash of the
  policy source) that made the decision — enough to answer "who owned this
  agent, which gateway, and under which policy" for any single row, months
  later.
- **Schema evolution without breaking old evidence**: four record versions
  (v1–v4) exist so far; `verify()` understands all of them, so a log that
  started before a format change still verifies end-to-end.

## 6. Layer 5 — tokens: short-lived and never stored in the clear

- Two auth modes, operator's choice: **static hashed tokens** (SHA-256,
  simple setups) or **signed, short-lived tokens** (Ed25519, compact format
  carrying agent id, issued-at, expiry, key id) — `custos issue-token
  --agent <id> --ttl 1h`.
- **Key rotation built in**: the gateway accepts a list of verifying public
  keys by key id, so an old key can keep validating already-issued tokens
  while a new one takes over issuing.
- Negative cases are tested explicitly: expired token → 401, wrong key →
  401, tampered payload → 401.
- Plain tokens are never held anywhere, by design (invariant, not a
  convention) — only hashes, or signed tokens that are verified, never
  decrypted back into something secret.

## 7. Layer 6 — Custos Control: the management plane

Control is the commercial piece: one place to manage every gateway a
customer runs, instead of hand-editing config files and `.cedar` files
per-instance.

- **Self-hosted first** — `docker-compose.control.yml` runs Control +
  Postgres entirely inside the customer's own network. This directly
  answers the sales objection security buyers raise first ("where does our
  audit data live"): nowhere but their own infrastructure, unless they
  choose the hosted option. Every table carries `tenant_id` from day one,
  so the later hosted EU (Frankfurt) version is the *same* schema serving
  multiple tenants, not a rewrite.
- **One binary**: Rust, axum, sqlx, Postgres (`custos-control`), with the
  dashboard (Vite + React + TypeScript) built and embedded into it via
  `rust-embed` — a customer runs one process, not a constellation of
  services.
- **Gateways connect out to Control, never the other way** — a customer
  opens zero inbound ports to make this work.
- **Control never holds agent tokens in plaintext and never sees raw tool
  arguments** beyond whatever the gateway's own `audit_arguments` mode
  already allows through. The management plane inherits the gateway's
  privacy guarantees rather than creating a second, weaker copy of the
  data.
- **Policy bundles are signed, not just transmitted.** Publishing a policy
  version produces one Ed25519-signed bundle: policy text + schema + the
  exact list of active agents (and their token hashes) at publish time. The
  signed bytes are kept verbatim and never re-serialized to verify — a
  deliberate design choice, because re-encoding parsed JSON isn't
  guaranteed to reproduce the same bytes, which could make a genuine bundle
  look tampered or (worse) mask a real one. A tampered bundle fails
  signature verification and is rejected outright.
- **A gateway that loses contact with Control keeps enforcing its last
  known-good bundle — it never falls back to "allow all."** Sync is
  additive and optional: no `[control]` section means zero outbound calls
  and identical behavior to a standalone gateway.
- **Agent provisioning round-trips for real**: creating an agent and
  issuing it a token in Control takes effect on every synced gateway at its
  next poll, with no manual config edit — and a revoked or rotated token
  stops working the moment the next sync lands, because each sync replaces
  the gateway's synced agent set wholesale rather than merging into it (so
  a disabled agent's old hash can't linger).
- **Audit round-trips too**: gateways ship their local hash-chained log to
  Control in batches (idempotent by `(gateway_id, seq)`, so a retried batch
  is a no-op, not a duplicate). Control checks chain continuity per gateway
  — flags gaps or broken links — without re-deriving the cryptographic hash
  itself, keeping that logic in exactly one place (the gateway's own
  `custos-audit` crate). A flag never silently clears itself; a real
  discontinuity stays visible until someone looks at it.

## 8. Layer 7 — human-in-the-loop: hold and four-eyes approval

- A Cedar policy can annotate a `permit` with `@hold("reason")`: matching
  calls become `Hold` instead of an automatic `Allow`.
- The gateway creates an approval request in Control and polls for a
  decision (every 2s by default) up to a timeout (120s default). Approved
  → forward. Rejected, timed out, **or Control unreachable at all → block.**
  Every step of this — the hold, the eventual allow or block — is written
  to the audit log before it's acted on, same guarantee as every other
  decision.
- **Four-eyes**: `@four_eyes` on a policy means the person who approves a
  held call can't be the same person who owns the agent that made it,
  enforced at resolution time against the agent's recorded owner — and
  fixed during the pre-release security pass to fail *closed* (block) when
  Control has no record of the agent at all, rather than silently skipping
  the check.
- The Approvals page in the dashboard is role-gated (`approver`/`admin`
  only), enforced server-side, not just hidden in the UI.

## 9. Layer 8 — evidence export: audit trail → compliance artifact

- One function gathers a time-ranged pack — agent inventory, published
  policy versions, decision statistics, resolved approvals with approver
  identities, per-gateway chain-integrity status — and serves it two ways:
  a **signed JSON bundle** (same Ed25519 key as policy bundles) and a
  **human-readable PDF** generated in pure Rust (`genpdf`/`printpdf`, no
  headless browser or external binary — consistent with the self-hosted,
  no-outbound-dependency posture of the whole product).
- **Localized**: the PDF renders in EN/DE/RO, with a vendored font covering
  the German and Romanian diacritics (ü, ß, ă, â, î, ș, ț) — tested by
  actually rendering and validating the output in all three languages.
- **A compliance mapping, explicitly labeled as drafted, not certified**:
  specific articles named — EU AI Act Art. 12 & 14, NIS2 Art. 21(2)(a)/(e),
  GDPR Art. 5(1)(c)/(f) — with wording that says a feature *supports* a
  requirement, never that it *satisfies* or *complies with* one. This is
  useful groundwork for a customer's own legal/compliance team, not a
  substitute for their review.

## 10. The dashboard

- Vite + React + TypeScript SPA, `react-router` + `react-i18next`,
  EN/DE/RO from the start (i18n keys throughout, no hard-coded UI strings).
- Pages: Overview (decisions today, blocked %, top blocked agents/tools,
  gateway health), Agents (full CRUD, token issuance shown once — same
  "shown once" guarantee as the CLI), Live Decisions (an SSE stream,
  pause/filter, last 200 events — a window onto what's happening *right
  now*, not a second source of truth; the searchable audit table underneath
  is where real history lookups belong), Audit Search (filter + CSV/JSON
  export), Policy Editor (Cedar syntax highlighting, validate-as-you-type,
  version history with diff, publish gated to admins both client- and
  server-side), Approvals (role-gated pending queue).
- Auth state is never trusted from client storage: the dashboard always
  asks Control "am I logged in" via session cookie on load, not
  `localStorage`.

## 11. Security invariants — the rules the whole system is built around

These aren't aspirational; they're enforced in code and each has a test
that proves the *negative* case (a blocked call never reaches the
upstream, not just "the log says blocked"):

1. **Fail closed.** Anything unparseable, unauthenticated, unevaluated or
   unauditable is rejected — there is no "allow on error" path anywhere.
2. **Default deny.** Allowed only with a matching `permit` and no matching
   `forbid`.
3. **Audit before acting.** The decision is durably written before the
   call is forwarded; a failed write blocks the call.
4. **Credentials never cross the boundary.** Only an explicit header
   allow-list goes upstream; the agent's own token never does.
5. **No plaintext tokens, anywhere, ever** — SHA-256 hash or verified
   signature only.
6. **Hostile input is the default assumption** — tool names, arguments,
   JSON-RPC ids, upstream responses, config values are all treated as
   untrusted; Cedar identifiers are built through a JSON-escaping
   constructor, never string concatenation.
7. **No `unsafe`, no `unwrap()`/`expect()` outside tests** — enforced by
   `#![forbid(unsafe_code)]` at the workspace level and `clippy` lints that
   warn on `unwrap`/`expect` in non-test code.
8. **Every security behavior has a test, including its failure mode.**

## 12. The stack, end to end

| Layer | Choice | Why (short) |
|---|---|---|
| Gateway, Control API | Rust, Tokio, axum, reqwest | memory safety, no GC pause, single static binary |
| Policy | Cedar (`cedar-policy`) | built for authorization, fast, analyzable |
| Tokens | SHA-256 (static) / Ed25519 (signed, short-lived) | no reversible secret storage |
| Audit | Hash-chained JSON Lines + HMAC-SHA256 | tamper-evident, brute-force-resistant |
| Config / tenants (Control) | PostgreSQL | self-hostable, well-understood, `tenant_id` from day one |
| Audit search at scale | Postgres today; ClickHouse planned if volume needs it | gateway's file stays the tamper-evident source of truth either way |
| Dashboard | Vite + React + TypeScript, embedded via `rust-embed` | one binary to run, not two services |
| PDF generation | `genpdf`/`printpdf` (pure Rust) | no headless browser, no outbound dependency |
| Deploy | Distroless, non-root Docker image; EU (Frankfurt) hosted option | small attack surface; self-hosted-first for data residency |

## 13. What's actually built vs. what's roadmap (be accurate in the deck)

Built and tested as of the last planning pass (`docs/PLAN.md`): the full
gateway enforcement path, Cedar policy with schema validation and hot
reload, content inspection feeding policy context, hash-chained audit with
three privacy modes, both token schemes, the full Control plane (agents,
signed policy bundles, gateway enrollment/sync, audit ingestion with chain
flagging, hold/four-eyes approval), the dashboard shell and its main pages,
and evidence export (API only — no dashboard button yet).

Known gaps worth stating plainly rather than glossing over: the dashboard
hasn't been checked in a real browser yet (build/lint only); the end-to-end
Docker demo hasn't been run against a live Docker daemon in this
environment; the compliance-mapping wording in the evidence export has not
had legal review; OIDC login, a hosted multi-tenant EU Control, an LLM API
egress proxy, formal policy analysis, and approval notifications are all
still on the roadmap, not built.

## 14. Lines worth lifting directly into slides

- "Every decision the gateway makes is written and flushed to a
  tamper-evident, hash-chained log *before* the call is allowed through —
  not after."
- "A blocked call never reaches the upstream tool. That's not a log
  message — it's the thing the test suite actually proves."
- "Argument values that look like an IBAN, a card number, or an API key
  are detected by checksum, not guesswork — and the match itself is never
  stored, only that it was found."
- "Audit data can stay entirely inside the customer's own network — gateway
  and Control both self-host, Postgres and all."
- "A policy change is a signed, Ed25519-verified artifact. A gateway that
  can't reach Control keeps enforcing the last one it verified — it never
  opens up."
- "Two-person approval for sensitive calls, enforced at the database level
  by name, not just a UI checkbox."
