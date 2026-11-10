# AGNAA Design Studio & Constructions (agnaa.in)

> **Interdisciplinary Architectural Practice & Computational Systems**  
> **Directed by:** Ar. M. Sridhar Chauhan (SPA Delhi, Council of Architecture `CA/2023/161405`)  
> **Headquarters:** 469 TNGOS Colony, Financial District, Gachibowli, Hyderabad 500032  
> **Digital HQ:** [https://agnaa.in](https://agnaa.in) | **Localhost Dev:** `http://localhost:3000`

---

## 1. Overview & Practice Philosophy

AGNAA dissolves the artificial boundaries between spatial luxury architecture, turnkey civil execution, bespoke furniture, and digital engineering. We operate under two symbiotic engines:

```
                                 ┌─────────────────────────────────┐
                                 │       AGNAA DESIGN STUDIO       │
                                 └────────────────┬────────────────┘
                                                  │
                 ┌────────────────────────────────┴────────────────────────────────┐
                 ▼                                                                 ▼
┌─────────────────────────────────┐                             ┌──────────────────────────────────┐
│   ENGINE 01: SPATIAL & CIVIL    │                             │   ENGINE 02: COMPUTATION & AI    │
├─────────────────────────────────┤                             ├──────────────────────────────────┤
│ • Ultra-Luxury Private Villas   │                             │ • AGNAA Voice v2.0 (Whisper F8)  │
│ • Turnkey Material Escrow       │                             │ • Checkpoint-250 (Laya AI)       │
│ • GHMC G.O. 168 / TG-bPASS 2026 │                             │ • 12 Precision Byelaw Calculators│
│ • NBC 2026 & IS 456 Structural  │                             │ • Octen.ai Statutory Grounding   │
│ • 114+ Delivered Masterworks    │                             │ • TinyFish Live Commodity Index  │
└─────────────────────────────────┘                             └──────────────────────────────────┘
```

1. **Engine 01 (Spatial Architecture & Turnkey Construction):**
   - High-performance luxury private residences in Hyderabad (Financial District, Kokapet, Jubilee Hills, Gandipet).
   - Heritage and civic commissions (Aga Khan Trust for Culture, state ministerial corridors).
   - Strict statutory adherence to the National Building Code of India 2026 (NBC 2026) and Telangana Building Rules (G.O. Ms. 168 / TG-bPASS).
   - Turnkey construction with zero-markup materials and verified craftsman milestone escrow.

2. **Engine 02 (Computational Systems, AI & Studio Tools):**
   - **AGNAA Voice v2.0:** Sub-0.4s offline Whisper F8 dictation engine for AutoCAD, Revit, and Windows desktop.
   - **Checkpoint-250 (Laya AI):** Fine-tuned 7B architectural reasoning model codifying classical Aayam proportions and statutory byelaw compliance.
   - **12 Precision Engineering Calculators:** Automated setback envelopes, RCC slab/rebar volumes, and FAR/FSI optimization.
   - **Octen.ai Real-Time Search:** Sub-100ms statutory legal grounding for live Telangana building regulations.
   - **TinyFish Web Operator:** Live wholesale commodity spot-rate harvester (Tata Tiscon, JSW, UltraTech).

---

## 2. Technology Stack & Design System

* **Framework:** Next.js 15.5 (App Router with React Server Components)
* **Language & Runtime:** TypeScript 5, Node.js 24+
* **Styling & Tokens:** Tailwind CSS with Google Material 3 / gBreeze tokens (`tokens.css` inspired by `D:\GOOGLE Elephant Goldfish\site`)
* **Icons & Animation:** Lucide React, Framer Motion
* **Database & Auth:** Supabase (`@supabase/ssr`), Firebase Client
* **Document Generation:** `pdf-lib`, `pdfjs-dist` (client docket and structural quote PDFs)
* **Real-Time AI & Web Operations:**
  * **Octen.ai Search API:** Low-latency statutory and gazette retrieval (`/api/zoning-search`)
  * **TinyFish MCP & Cloud Operator:** Wholesale material spot harvesting (`/api/live-rates`)

---

## 3. Directory Layout

```
agnaa_in/
├── docs/
│   └── designs/                  # EGM Living Technical Specifications
│       ├── SITEMAP.md            # Index of all system specifications
│       ├── architecture.md       # Next.js 15 & System Architecture
│       ├── spatial_and_turnkey_spec.md    # Villa Architecture & Construction Spec
│       ├── computational_and_ai_spec.md   # Voice AI, Checkpoint-250 & Real-Time APIs
│       ├── design_system_and_tokens.md    # Google Material 3 / gBreeze Tokens
│       ├── calculators_and_byelaws_spec.md# 12 Civil Engineering Calculators
│       └── geo_research_codex_spec.md     # 50 Research Papers & GEO Strategy
├── src/
│   ├── app/                      # Next.js App Router Pages
│   │   ├── page.tsx              # Monumental Homepage (Dual-Engine Architecture)
│   │   ├── layout.tsx            # Global Layout, Google Fonts & LocalBusiness Schema
│   │   ├── globals.css           # Google Material 3 / gBreeze Base Tokens
│   │   ├── api/
│   │   │   ├── zoning-search/    # Octen.ai Live Statutory Search Route
│   │   │   └── live-rates/       # TinyFish Wholesale Material Escrow Spot Route
│   │   ├── calc/                 # 12 Precision Engineering Calculators
│   │   ├── constructions/        # Turnkey Construction & Material Escrow
│   │   ├── design-studio/        # 114+ Filterable Masterworks Ledger
│   │   ├── blog/                 # 50-Article Architectural Research Codex
│   │   └── voice/                # AGNAA Voice v2.0 Desktop Companion Specs
│   ├── components/
│   │   ├── AgnaaLogo.tsx         # Official Geometric Vector Gradient Logo
│   │   ├── Header.tsx            # Sticky 4-Pillar Navigation Chrome
│   │   └── Footer.tsx            # Studio Ledger & Statutory Contact Footer
│   └── data/
│       ├── studioProjects.ts     # 114+ Master Studio Projects Registry
│       ├── openTools.ts          # Desktop AI Tools & Software Distributions
│       ├── liveRates.json        # Live Hyderabad Wholesale Commodity Index
│       ├── pricingData.ts        # Architectural & Civil Pricing Standards
│       └── agnaa-canon/          # 5 Pillars of Architectural Truth (NBC, Neufert, Ching, Vastu)
├── AGENTS.md                     # Autonomous Coding Agent Protocol
└── README.md                     # Root Architectural Documentation
```

---

## 4. Getting Started

### Prerequisites
* Node.js 20+ (recommended v22 or v24)
* npm or pnpm

### Environment Configuration
Ensure `.env.local` is present in the root directory:
```env
# Real-Time Search & Web Operator APIs
OCTEN_API_KEY=octen-...
TINYFISH_API_KEY=sk-tinyfish-...

# Supabase & Firebase
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Type Check & Build
```bash
npx tsc --noEmit    # Verify strict TypeScript safety (0 errors)
npm run build       # Build optimized production bundle
```

---

## 5. Architectural Licensing & Accreditation
* **Principal Architect:** Ar. M. Sridhar Chauhan
* **Alumnus:** School of Planning & Architecture, New Delhi (SPA Delhi)
* **Statutory Body:** Council of Architecture (CoA) Registration `CA/2023/161405`
* **Governing Standards:** National Building Code of India 2026 (NBC 2026), IS 456:2000, GHMC G.O. Ms. 168, TG-bPASS 2026
