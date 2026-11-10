# AGNAA.IN Redesign Specification (EGM Spec-Driven Architecture)

* **Document ID:** SPEC-AGNAA-2026-01
* **Authors:** Ar. M. Sridhar Chauhan (SPA Delhi, CA/2023/161405), Antigravity Agent (Elephant)
* **Status:** Draft / In Review
* **Target Environment:** Next.js 15.5 (App Router), Tailwind CSS, TypeScript, Localhost:3000
* **Design System Reference:** `D:\GOOGLE Elephant Goldfish\site` (Google Material 3 / gBreeze Tokens)

--------------------------------------------------------------------------------

## 1. Executive Summary & Vision

AGNAA is an interdisciplinary architectural and computational design practice based in Hyderabad (Financial District, Gachibowli). 
The purpose of the redesign is to eliminate narrative dilution, unify branding, and present AGNAA's two symbiotic engines with mathematical clarity:

1. **Engine 1: Spatial Architecture & Turnkey Villa Construction** (Commercial Engine)
   - Luxury private villas (Kokapet, Financial District, Jubilee Hills).
   - Heritage, civic, and state corridors (Aga Khan Trust for Culture, ministerial chambers).
   - Strict adherence to NBC 2026, IS 456, and GHMC G.O. 168 / TG-bPASS byelaws.
   - Turnkey construction with zero-markup materials and verified craftsman escrow.

2. **Engine 2: Computational Design, AI & Studio Tools** (R&D & Innovation Engine)
   - Custom-trained reasoning models (Fine-tuned Checkpoint-250, Aayam spatial proportioning, Laya Architectural AI).
   - AGNAA Voice v2.0 (Whisper F8 zero-latency offline dictation for AutoCAD/Revit).
   - 12 precision engineering calculators (Setbacks, RCC steel, FSI/FAR).
   - 50-article Architectural Codex & Research Journal.

--------------------------------------------------------------------------------

## 2. Design System Architecture (Google Material 3 / gBreeze Tokens)

Adopt the design discipline from `D:\GOOGLE Elephant Goldfish\site\src\styles\tokens.css`:

### 2.1 Color & Surface Tokens
* **Canvas Surface (Light):** `#FFFFFF` (serene alabaster)
* **Surface Container Low:** `#F8F9FA` (subtle structural cards)
* **Surface Container:** `#F1F3F4` (tactile bento panels)
* **Surface Container High:** `#E9EBEE` (input frames and modal surfaces)
* **Outline & Hairline Borders:** `#DADCE0` (1px clean geometric grid)
* **Primary Brand Tonal Duo:**
  - AGNAA Deep Indigo: `#1C1C72`
  - AGNAA Imperial Violet: `#7B2DBF`
  - Primary Action Pill: Gradient from `#1C1C72` to `#7B2DBF` with high-contrast white glyphs.

### 2.2 Typography Scale
* **Display LG:** Tight tracking (`-0.03em`), line-height 1.05. Clean architectural geometry.
* **Headline LG:** Tracking (`-0.02em`), line-height 1.15.
* **Mono / Label:** Google Sans / Space Grotesk uppercase (`tracking: 0.15em`, `text-[11px]`).

--------------------------------------------------------------------------------

## 3. Information Architecture & Homepage Structure

The redesigned homepage at `src/app/page.tsx` will follow a 6-tier progression:

### Tier 1: Restrained Monumental Hero
* Minimalist brand badge: `SPA Delhi • CA/2023/161405 • Financial District, Hyderabad`.
* Authoritative headline: **"From Code to Concrete. Spatial Luxury Villas & Computational Architecture."**
* Single primary action pill: **[ Schedule Architectural Consultation ]** + secondary anchor: **[ Explore 114+ Works ]**.
* Cinematic spatial showcase frame featuring Sunder Nursery Garden House / Balinese Villa with live project coordinates.

### Tier 2: The Dual-Engine Matrix (Elephant & Goldfish Model)
Two balanced, high-contrast articles:
* **Left: Spatial Architecture & Turnkey Execution**
  - Scope: ₹1,750 – ₹3,500/sq.ft turnkey luxury villas, structural sanctions, NBC 2026.
  - Deliverables: Architectural blueprints, 3D structural physics, milestone escrow.
* **Right: Computational Systems & AI**
  - Scope: In-house trained Checkpoint-250 (Aayam calculations & zoning AI), AGNAA Voice v2.0 offline CAD dictation, 12 live calculators.
  - Deliverables: Local zero-cloud tools, open-weights, architectural automation.

### Tier 3: The Architectural Execution Continuum (Loop Stepper)
A continuous line stepper (modeled after EGM `Loop.astro`):
* `01. Zoning & Sanction:` TG-bPASS & GHMC G.O. 168 algorithmic envelope calculation.
* `02. Spatial Physics & BIM:` Solar path orientation, IS 456 structural load analysis.
* `03. Turnkey Material Escrow:` Transparent procurement, verified master masons, daily logs.
* `04. Micro-Architecture:` Custom Burma teak joinery, brass fixtures, and final handover.

### Tier 4: Live Interactive Tools & AI Terminal
* Live test preview of AGNAA Voice v2.0 (CAD dictation toggle).
* Instant GHMC Setback & RCC steel calculator launcher.
* Preview of Checkpoint-250 (Aayam proportioning & zoning intelligence).

### Tier 5: Filterable Masterworks Ledger (114+ Projects)
* Instant client-side filter: *All (114+)* | *Luxury Villas* | *Heritage & Civic* | *Software & AI* | *Bespoke Joinery*.
* Interactive project preview card with direct WhatsApp consultation generator.

### Tier 6: Executive Concierge
* Direct contact channel with Ar. M. Sridhar Chauhan (WhatsApp, email, studio location in TNGOS Colony, Financial District).

--------------------------------------------------------------------------------

## 4. Verification & Readiness Criteria
* Zero build errors (`npm run build` green).
* Fast First Contentful Paint (<1.2s on localhost).
* Strict type safety (0 TypeScript errors).
* Fully responsive across mobile (375px), tablet (768px), and 4K desktop (1920px).
