# SPEC-10: Master Redesign from Scratch — Global Architectural Practice Deconstruction, Next-Gen Web Systems & Open-Source Ecosystem Integration

* **Document ID:** SPEC-10-MASTER-REDESIGN
* **Author:** Ar. M. Sridhar Chauhan, Antigravity Agent
* **Reviewer:** Goldfish Swarm & Architectural Review Board
* **Status:** Draft / Active Specification
* **Date:** 2026-11-02
* **Target System:** `agnaa.in` (Production & Localhost Next.js 15.5 App Router)

---

## 1. Executive Summary & Problem Statement

AGNAA is a **Dual-Engine Architectural Design Studio and Turnkey EPC Civil Intelligence Firm** headquartered in Hyderabad and New Delhi. It bridges high-ticket private residential commissions (villas valued at ₹5 Cr – ₹25 Cr in Kokapet, Jubilee Hills, and Neopolis) with statutory precision (GHMC G.O. Ms 168, TG-bPASS, NBC 2026), Sthapatya Veda Ayadi mathematics, and Rule 33 Pure Agent turnkey construction contracting.

A complete ground-up redesign requires moving beyond conventional corporate agency templates or generic SaaS landing pages. AGNAA must embody the spatial gravitas, technical precision, and editorial restraint of the world's leading architectural ateliers (Foster + Partners, BIG, Snøhetta, Olson Kundig, SAOTA, Studio Lotus) while operating a modern, interactive web application powered by proven open-source technologies.

This specification details:
1. **Part A:** Comparative architectural analysis of top global and Indian architectural studios.
2. **Part B:** Web application systems and technical standards for 2026.
3. **Part C:** Specific open-source GitHub repositories evaluated for direct integration into AGNAA's Next.js 15 stack.
4. **Part D:** The redesigned Information Architecture and Project Dossier standard.
5. **Part E:** Phased execution roadmap maintaining strict invariants (0 TypeScript errors, RSC-first, Google Material 3 tokens).

---

## 2. Part A: Deconstruction of Top Global & Indian Architectural Studios

To establish the benchmark for AGNAA, seven premier architectural practices were analyzed across information architecture, project presentation, and client engagement:

```
┌──────────────────────────────────────────────────────────────────────────────────────────────┐
│                      ARCHITECTURAL STUDIO BENCHMARK MATRIX                                   │
├────────────────────┬─────────────┬──────────────────────────────┬────────────────────────────┤
│ Studio             │ Provenance  │ Core Visual / UX Signature   │ Primary Architectural Moat │
├────────────────────┼─────────────┼──────────────────────────────┼────────────────────────────┤
│ Foster + Partners  │ London, UK  │ Typological matrix, rigorous │ Comprehensive engineering, │
│                    │             │ monospace project dossiers   │ carbon & sustainability BOQ│
├────────────────────┼─────────────┼──────────────────────────────┼────────────────────────────┤
│ BIG (Bjarke Ingels)│ Copenhagen  │ "Archicomic" evolutionary    │ Diagrammatic massing steps │
│                    │ & New York  │ diagrams, bold brutalist grid│ (extrusion → subtraction)  │
├────────────────────┼─────────────┼──────────────────────────────┼────────────────────────────┤
│ Snøhetta           │ Oslo, Norway│ Tactile materiality, organic │ Landscape-building union,  │
│                    │             │ transitions, human-scale text│ sensory material focus     │
├────────────────────┼─────────────┼──────────────────────────────┼────────────────────────────┤
│ Olson Kundig       │ Seattle, USA│ "Architecture inside out",   │ Mechanical gizmos, raw     │
│                    │             │ kinetic details, coordinates │ steel, heavy timber joinery│
├────────────────────┼─────────────┼──────────────────────────────┼────────────────────────────┤
│ SAOTA              │ Cape Town   │ Ultra-luxury villa mastery,  │ Threshold erasure, deep    │
│                    │             │ dramatic twilight captures   │ overhangs, luxury plans    │
├────────────────────┼─────────────┼──────────────────────────────┼────────────────────────────┤
│ Studio Lotus       │ New Delhi   │ Conscious craft, tactile     │ Biophilic Indian luxury,   │
│                    │             │ brick & stone detailing      │ courtyard microclimates    │
├────────────────────┼─────────────┼──────────────────────────────┼────────────────────────────┤
│ Morphogenesis      │ New Delhi   │ Computational sustainability,│ SOUL metrics (energy/water │
│                    │ & Bengaluru │ performance analytics        │ reduction %, daylight UDI) │
└────────────────────┴─────────────┴──────────────────────────────┴────────────────────────────┘
```

### 2.1 Key Structural Lessons for AGNAA
1. **The Project Dossier Standard (from Foster + Partners & SAOTA):**
   Projects must not be presented merely as photo galleries. Each project must be an **Architectural Dossier** containing:
   - High-resolution editorial photography.
   - Monospaced project index: Project Code, Geographic Coordinates ($17.4156^\circ\text{ N}, 78.3478^\circ\text{ E}$), Plot Area, Built-Up Area, Structural System, Delivery Model (Design-Only vs Turnkey EPC).
   - Deep-zoom architectural drawings (site plan, floor plans, sections, and joinery details).
   - Mathematical Vastu / Ayadi Shadvarga parameters (Aayam, Vyaya, Yoni archetype).
2. **Evolutionary Process Diagrams (from BIG):**
   Include step-by-step 4-stage diagrammatic progression cards on project pages:
   $\text{Raw Plot} \longrightarrow \text{Statutory Setbacks} \longrightarrow \text{Solar \& Ayadi Orientation} \longrightarrow \text{Sculpted Built Form}$.
3. **Kinetic & Material Micro-Architecture (from Olson Kundig & Studio Lotus):**
   Dedicated material provenance callouts for high-ticket residential inquiries: solid Burma teak, dressed Jodhpur sandstone, thermal-break Low-E glazing, and book-matched Italian marble.
4. **Environmental & Structural Rigor (from Morphogenesis):**
   Every villa case study lists tangible civil and climate invariants: Concrete grade (M30/M35), Rebar specification (Tata Tiscon Fe 500D), U-value ($< 0.8\text{ W/m}^2\text{K}$), and estimated energy savings.

---

## 3. Part B: Latest Web Application Systems & Technical Standards (2026)

The ground-up redesign will be constructed on the following architectural stack:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       AGNAA 3.0 TECHNOLOGY STACK                            │
├─────────────────────────┬───────────────────────────────────────────────────┤
│ Core Framework          │ Next.js 15.5 App Router + React 19                │
│ Server/Client Model     │ React Server Components (RSC) First (95% server)  │
│ Type Safety             │ Strict TypeScript (0 errors via `tsc --noEmit`)   │
│ Design Tokens           │ Google Material 3 / gBreeze Light Palette         │
│ Inertial Scrolling      │ Lenis (`@studio-freight/lenis`)                   │
│ Command Palette (Cmd+K) │ `cmdk` (pacocoursey/cmdk)                         │
│ Client-Side Documents   │ `@react-pdf/renderer` (Declarative PDF engine)    │
│ 2D Geometry & Solvers   │ `@flatten-js/core` (Setback envelope solver)      │
│ Deep-Zoom Drawings      │ `openseadragon` (Gigapixel architectural plans)   │
│ 3D Spatial & BIM        │ `@thatopen/components` & `web-ifc` (Three.js Wasm)│
│ Live External Grounding │ Octen.ai (Statutory) + TinyFish (Material rates)  │
└─────────────────────────┴───────────────────────────────────────────────────┘
```

### 3.1 Strict System Invariants
1. **Server-Component Default:** All pages, headers, footers, and static project dossiers are pure React Server Components. Client components (`"use client"`) are restricted strictly to isolated leaf components (calculators, modals, search bars, canvas viewers).
2. **Color Token Fidelity:** Pure Alabaster Canvas (`#FFFFFF`), Container Tier 1 (`#F8F9FA`), Container Tier 2 (`#F1F3F4`), Outline/Border (`#DADCE0` or `rgba(0,0,0,0.08)`), Body Typography (`#3C4043`), Heading Typography (`#1C1C72`), Jewel Brand Gradient (`#1C1C72` to `#7B2DBF`).
3. **Sub-second LCP:** Critical above-the-fold hero imagery uses Next.js `<Image priority>` with modern WebP formats and pre-allocated aspect ratios to eliminate layout shift (CLS = 0).

---

## 4. Part C: Open-Source GitHub Repositories for Direct Integration

The following open-source GitHub projects have been audited for integration feasibility, licensing, bundle weight, and specific architectural capabilities:

```
┌──────────────────────────────────────────────────────────────────────────────────────────────┐
│                    OPEN-SOURCE GITHUB INTEGRATION ECOSYSTEM                                  │
├──────────────────────────────┬──────────────────┬─────────────┬──────────────────────────────┤
│ Repository / Package         │ License          │ Bundle Cost │ Architectural Capability     │
├──────────────────────────────┼──────────────────┼─────────────┼──────────────────────────────┤
│ `pacocoursey/cmdk`           │ MIT              │ ~4 KB       │ Studio Command Palette       │
│                              │                  │             │ (`Cmd+K` / `Ctrl+K`)         │
├──────────────────────────────┼──────────────────┼─────────────┼──────────────────────────────┤
│ `studio-freight/lenis`       │ MIT              │ ~3 KB       │ Inertial smooth scroll       │
│                              │                  │             │ with RAF synchronization     │
├──────────────────────────────┼──────────────────┼─────────────┼──────────────────────────────┤
│ `@react-pdf/renderer`        │ MIT              │ Lazy / Edge │ Client-side Turnkey EPC      │
│                              │                  │             │ Stamped Contract Generation  │
├──────────────────────────────┼──────────────────┼─────────────┼──────────────────────────────┤
│ `@flatten-js/core`           │ MIT              │ ~12 KB      │ 2D Setback & FSI Envelope    │
│                              │                  │             │ Computational Geometry       │
├──────────────────────────────┼──────────────────┼─────────────┼──────────────────────────────┤
│ `openseadragon`              │ New BSD          │ Dynamic CDN │ Deep-zoom gigapixel viewer   │
│                              │                  │ / Leaf      │ for architectural GFC plans  │
├──────────────────────────────┼──────────────────┼─────────────┼──────────────────────────────┤
│ `ThatOpen/engine_components` │ Mozilla Public 2 │ Lazy / Wasm │ Browser-based 3D BIM / IFC   │
│ (`web-ifc`)                  │                  │             │ villa model exploration      │
├──────────────────────────────┼──────────────────┼─────────────┼──────────────────────────────┤
│ `maplibre-gl`                │ 3-Clause BSD     │ Lazy Leaf   │ Hyderabad HMDA Master Plan   │
│                              │                  │             │ Cadastral parcel GIS mapping │
└──────────────────────────────┴──────────────────┴─────────────┴──────────────────────────────┘
```

### 4.1 Detailed Analysis of Selected Open-Source Repositories

#### 1. `pacocoursey/cmdk` (Command Palette)
* **What it is:** Fast, unstyled, accessible React command menu built on Radix primitives.
* **Why AGNAA needs it:** AGNAA houses 114+ projects, 12 engineering calculators, 50 research papers, and hundreds of statutory circulars. Power users (HNWI clients, municipal engineers, structural consultants) can press `Cmd+K` anywhere on the site to:
  - Jump directly to a project (e.g. *"Balinese Villa Kokapet"*).
  - Open a calculator (e.g. *"Ayadi Shadvarga"*, *"Pure Agent Tax Savings"*).
  - Search GHMC circulars (e.g. *"G.O. Ms 168 Setback Table III"*).
  - Download statutory contract templates.
* **Implementation Plan:** Deploy as a global client overlay triggered via keyboard shortcut or a persistent subtle header icon.

#### 2. `studio-freight/lenis` (Inertial Smooth Scrolling)
* **What it is:** The open-source smooth scroll library powering top design studios worldwide. Unlike heavy parallax libraries, Lenis normalizes scroll delta, preserves native accessibility, and works harmoniously with Next.js App Router.
* **Why AGNAA needs it:** Architectural portfolios require deliberate, cinematic visual pacing. Lenis provides the smooth, tactile inertia that elevates project transitions.

#### 3. `@react-pdf/renderer` (Instant Architectural Contract Generation)
* **What it is:** React renderer for creating PDF files on the client or server.
* **Why AGNAA needs it:** In high-ticket architectural and turnkey EPC contracting, credibility is won when clients can immediately generate and inspect an official, stamped draft contract:
  - Generates a **Turnkey EPC Milestone Agreement** tailored to the client's plot size and budget.
  - Automatically calculates Rule 33 Pure Agent tax deductions.
  - Embeds the official statutory seal of Ar. M. Sridhar Chauhan, Council of Architecture (CoA) registration details, and QR verification hash.

#### 4. `@flatten-js/core` (2D Statutory Setback & FSI Envelope Solver)
* **What it is:** Lightweight, robust 2D geometry library written in TypeScript supporting boolean operations, offsets, and polygon intersections.
* **Why AGNAA needs it:** Enables an interactive **Plot Setback Envelope Generator**:
  - The client enters plot width, length, and road width.
  - The solver offsets the plot polygon according to GHMC G.O. Ms 168 Table III rules (e.g. 3m front, 2m rear, 1.5m sides).
  - Renders the exact permissible building footprint in real time with permissible FSI 1.5/2.0 ground coverage calculations.

#### 5. `ThatOpen/engine_components` & `web-ifc` (BIM in the Browser)
* **What it is:** WebAssembly and Three.js based graphics engine developed by That Open Company (formerly IFC.js) to read, display, and query Industry Foundation Classes (IFC) BIM models at native speeds in web browsers.
* **Why AGNAA needs it:** Positions AGNAA ahead of any competing architectural firm in India by allowing prospective villa clients to inspect full 3D BIM structural frames, isolate concrete columns, and walk through spatial volumes directly in their browser without installing Autodesk Revit.

---

## 5. Part D: Redesigned Information Architecture & The Project Dossier Standard

The redesigned AGNAA platform consolidates into **5 sovereign pillars**:

```
                              ┌───────────────────────────────────┐
                              │     AGNAA ARCHITECTURAL SYSTEM    │
                              │            (agnaa.in)             │
                              └─────────────────┬─────────────────┘
                                                │
         ┌──────────────────┬───────────────────┼───────────────────┬──────────────────┐
         │                  │                   │                   │                  │
         ▼                  ▼                   ▼                   ▼                  ▼
  ┌──────────────┐   ┌──────────────┐    ┌──────────────┐    ┌──────────────┐   ┌──────────────┐
  │  01. STUDIO  │   │02. TURNKEY   │    │ 03. TOOLS &  │    │  04. CODEX   │   │05. FOUNDATION│
  │  REGISTRY    │   │    EPC       │    │     AI       │    │  (RESEARCH)  │   │  & PRACTICE  │
  ├──────────────┤   ├──────────────┤    ├──────────────┤    ├──────────────┤   ├──────────────┤
  │114+ Projects │   │Pure Agent Tax│    │Ayadi Engine  │    │50 Papers     │   │Ar. Sridhar   │
  │Deep Dossiers │   │Escrow Gates  │    │Setback Solver│    │GEO Index     │   │AKTC Pedigree │
  │OpenSeaDragon │   │BOQ Standards │    │Checkpoint-250│    │Statutory GOs │   │Client Portal │
  │Drawings/BIM  │   │Contract PDF  │    │Octen Search  │    │Encyclopedia  │   │Consultation  │
  └──────────────┘   └──────────────┘    └──────────────┘    └──────────────┘   └──────────────┘
```

### 5.1 The Project Dossier Standard (`/design-studio/[slug]`)
Every single project in the registry is presented as a high-density, rigorous **Architectural Dossier** with 5 standardized sections:
1. **The Hero & Spatial Summary:** High-resolution photography, project typology, geographic coordinates, year of completion, client classification.
2. **Technical Specifications Grid:**
   - Plot Area (sq.yds / sqm).
   - Built-Up Area (sq.ft / sqm) & FSI ratio.
   - Structural Framing System (RCC Ductile Framed / Post-Tensioned Slabs).
   - Thermal Envelope Specification (Porotherm / Low-E DGU).
   - Vastu / Ayadi Alignment (Perimeter, Dhana, Runa, Yoni orientation).
3. **Interactive Plan & Blueprint Inspector (`openseadragon`):**
   - High-resolution floor plans, sections, and structural details with smooth deep-zoom capabilities.
4. **4-Stage Evolutionary Diagram:**
   - Vector axonometric progression showing statutory setbacks, climate/sun-path carving, and final volume.
5. **Contract & Execution Transparency:**
   - Turnkey milestone schedule, material bill of quantities summary, and direct client inquiry button.

---

## 6. Part E: Phased Implementation Roadmap

To execute this redesign cleanly without breaking the active site or introducing regressions:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       PHASED IMPLEMENTATION LEDGER                          │
├─────────┬─────────────────────────┬─────────────────────────────────────────┤
│ Phase   │ Focus Area              │ Key Deliverables                        │
├─────────┼─────────────────────────┼─────────────────────────────────────────┤
│ Phase 1 │ Open-Source Dependency  │ Install lightweight core packages:      │
│         │ Infrastructure          │ `cmdk`, `lenis`, `@flatten-js/core`.    │
├─────────┼─────────────────────────┼─────────────────────────────────────────┤
│ Phase 2 │ Studio Command Palette  │ Implement global `Cmd+K` command menu   │
│         │ & Smooth Scrolling      │ and Lenis smooth scroll provider.       │
├─────────┼─────────────────────────┼─────────────────────────────────────────┤
│ Phase 3 │ The Project Dossier     │ Upgrade `/design-studio/[slug]` with    │
│         │ Standard Overhaul       │ technical specs, drawings, and diagrams.│
├─────────┼─────────────────────────┼─────────────────────────────────────────┤
│ Phase 4 │ 2D Statutory Setback    │ Build live setback & FSI solver via     │
│         │ & Envelope Generator    │ `@flatten-js/core` on `/tools-ai`.      │
├─────────┼─────────────────────────┼─────────────────────────────────────────┤
│ Phase 5 │ Client-Side Contract    │ Integrate `@react-pdf/renderer` for     │
│         │ PDF Generation          │ stamped Turnkey EPC contract downloads. │
└─────────┴─────────────────────────┴─────────────────────────────────────────┘
```

### 6.1 Quality & Verification Invariants
At every step:
- `npx tsc --noEmit` must pass with **0 errors**.
- Server components remain pure RSC (no client pollution).
- Light alabaster canvas and Google Material 3 tokens strictly preserved.
- No decorative fluff or ungrounded assertions.
