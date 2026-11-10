# AGENTS.md — Agent System Protocol for AGNAA.IN

This document defines mandatory operating rules, architectural invariants, and behavioral guidelines for all AI agents, subagents, and automated workflows interacting with the `agnaa.in` codebase.

---

## 1. Core Operating Philosophy: The Elephant-Goldfish Model (EGM)

AGNAA follows the **Elephant-Goldfish Model (EGM)** for Spec-Driven Development:
* **The Elephant (Deep Context):** Holds project requirements, system history, codebase maps, and architectural invariants. Drafts technical specifications and coordinates multi-turn problem exploration.
* **The Goldfish (Zero Context):** Isolated, fresh subagents evaluate designs, documents, and code against specific quality rubrics without conversation bias or sycophancy.
* **Human Approval:** Ar. M. Sridhar Chauhan makes all architectural trade-offs and approves specifications before implementation.

### Agent Behavioral Invariants
1. **Artifact-First Delivery:** Major proposals, architectural specifications, or audit reports must be written to disk in `docs/designs/` or the conversation artifact directory rather than dumped in chat.
2. **No Sycophancy (No Glazing):** Banned validating adjectives (*"brilliant"*, *"great"*, *"smart"*, *"perfect"*). Do not validate assertions reflexively; critique first.
3. **No Decorative Adjectives:** Avoid fluff words like *"seamless"*, *"blazingly fast"*, *"cutting-edge"*, *"robust"*. State exact technical mechanisms, numbers, and latencies.
4. **Banned Apologies:** Never apologize when challenged or corrected; state the corrected logic or technical trade-off directly.

---

## 2. Technical Stack Invariants

* **Framework:** Next.js 15.5 App Router.
* **RSC First:** Default to React Server Components (RSC). Use `"use client"` **only** on isolated interactive leaf islands (e.g. calculator sliders, audio waveforms, live search forms, modals). Never mark entire layout trees or static display pages as client components.
* **Design Token Compliance:**
  * All surfaces, borders, and colors must adhere to the Google Material 3 / gBreeze tokens established in [`src/app/globals.css`](file:///i:/AGNAA/agnaa_in/src/app/globals.css) and [`tokens.css`](file:///i:/AGNAA/agnaa_in/docs/designs/design_system_and_tokens.md).
  * Canvas is light alabaster (`#FFFFFF`) with container tiers (`#F8F9FA`, `#F1F3F4`).
  * Accent jewel color is the AGNAA gradient (`#1C1C72` to `#7B2DBF`).
  * Never introduce random ungrounded tailwind color classes (e.g. `bg-emerald-800`, `text-orange-400`, random gradients) without token justification.
* **Type Safety & Build Cleanliness:**
  * Strict TypeScript compliance: every PR or edit must maintain `npx tsc --noEmit` at **0 errors**.
  * Use safe optional chaining (`?.`) on all nested data models (e.g., `entry.layaRule?.relevanceKeywords`).

---

## 3. External Tooling & Real-Time APIs

### Octen.ai (`OCTEN_API_KEY`)
* **Purpose:** Real-time AI-native search and statutory gazette retrieval.
* **Usage:** Use via [`src/app/api/zoning-search/route.ts`](file:///i:/AGNAA/agnaa_in/src/app/api/zoning-search/route.ts) or direct HTTP POST to `https://api.octen.ai/search`.
* **When to use:** Whenever the user or agent needs live legal grounding on Telangana Government Orders (GHMC G.O. Ms. 168), TG-bPASS circulars, HMDA zoning amendments, or NBC 2026 clauses.

### TinyFish (`TINYFISH_API_KEY` / MCP Server `tinyfish`)
* **Purpose:** Cloud web browser automation and stealth scraping for complex dynamic portals.
* **Usage:**
  * Free Search: `tinyfish:search` (live web queries, commodity pricing).
  * Clean Fetch: `tinyfish:fetch_content` (clean markdown parsing).
  * Web Automation: `tinyfish:run_web_automation` (for TG-bPASS and HMDA municipal portals behind dynamic forms or session states).
* **When to use:** Daily wholesale commodity price harvesting (TMT steel, cement, RMC, sand) across Hyderabad distributor sites to keep [`src/data/liveRates.json`](file:///i:/AGNAA/agnaa_in/src/data/liveRates.json) synchronized.

---

## 4. Verification Checklist Before Committing Changes

Before reporting any task complete:
1. `npx tsc --noEmit` passes with **0 errors**.
2. Dev server compiles routes cleanly without 404 or 500 regressions.
3. Mobile responsiveness verified (responsive layout from 375px mobile to 1920px desktop).
4. Any new architectural feature is documented in `docs/designs/`.
