# SPEC-09: Roadmap from Grade A- (88%) to Grade A+ (98%+)

* **Document ID:** SPEC-09-A-PLUS-ROADMAP
* **Author:** Ar. M. Sridhar Chauhan, Antigravity Agent
* **Reviewer:** Goldfish Design Critic (`egm-design`)
* **Status:** Complete (Verified Grade A+ / 99.2%)
* **Date:** 2026-11-02

---

## 1. Executive Summary & Deficit Analysis

In the latest EGM comparative audit between live production (`https://agnaa.in`, Grade F / 44%), the initial redesigned local environment (`http://localhost:3000`, Grade A- / 88.0%), and the intermediate build (Grade A / 95.2%), this roadmap targeted crossing the threshold into **Grade A+ (98%+)**.

All tasks have been executed and validated:
1. **Interactive BOQ & Material Specification Dossier** deployed on `/constructions`.
2. **Interactive Ayadi Shadvarga Precision Calculator** deployed inside Checkpoint-250 (`ZoningSearchIsland.tsx`) with odd-residue cardinal Yoni canon.
3. **Single Sovereign Action Pill** layout standardized in `Header.tsx`.
4. **Pure Agent GST & Escrow Simulator** running live on `/constructions`.
5. **Next/Script migration** placed inside `<body>` in `layout.tsx`, resolving all DOM hydration warnings.
6. **Zero broken assets**: Fixed 404 path on `/constructions` (`double-height-sculptural-atrium-lobby.webp`).
7. **0 TypeScript Errors** confirmed via `npx tsc --noEmit`.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                   FINAL AUDIT TO GRADE A+ (99.2%)                           │
├─────────┬──────────────────────┬─────────┬─────────┬────────────────────────┤
│ Rubric  │ Name                 │ Initial │ Target  │ Final Verified Score   │
├─────────┼──────────────────────┼─────────┼─────────┼────────────────────────┤
│ 1       │ Spatial Authority    │ 9.0/10  │ 10.0/10 │ 10.0/10 (100%)         │
│ 2       │ AI & Computation     │ 9.0/10  │ 10.0/10 │ 10.0/10 (100%)         │
│ 3       │ Design Restraint     │ 8.5/10  │ 10.0/10 │ 10.0/10 (100%)         │
│ 4       │ Statutory/Contracts  │ 9.0/10  │ 10.0/10 │ 10.0/10 (100%)         │
│ 5       │ Codebase Reliability │ 8.5/10  │ 9.8/10  │ 9.6/10  (96.0%)        │
├─────────┼──────────────────────┼─────────┼─────────┼────────────────────────┤
│ TOTAL   │ 50-Point Standard    │ 44.0/50 │ 49.8/50 │ 49.6/50 (99.2% - A+)   │
└─────────┴──────────────────────┴─────────┴─────────┴────────────────────────┘
```

---

## 2. Engineering Tasks by Rubric

### 2.1 Rubric 1: Interactive Turnkey Specification Dossier (Target: 10/10)
* **Problem:** HNWIs commissioning ₹5 Cr – ₹15 Cr luxury villas need transparent material specifications before scheduling an architectural consultation.
* **Solution:** Create an interactive **Sample Villa Specification & BOQ Dossier Drawer** featuring:
  * Structural: M30/M35 Design Mix Concrete, Tata Tiscon Fe 500D TMT Steel, NABL test certificates.
  * Thermal Envelope: Porotherm hollow clay masonry, double-glazed Low-E Saint-Gobain insulated glass units (IGU).
  * Finishes: 20mm Italian Statuario/Bottochino marble slabs, solid Burma teak joinery with concealed acoustic seals.
  * MEP & Climate: Daikin VRV IV climate control, concealed Viega plumbing, and 100% copper wiring (Finolex/Polycab).

### 2.2 Rubric 2: Real-Time Ayadi Shadvarga Calculator in Checkpoint-250 (Target: 10/10)
* **Problem:** Checkpoint-250 displays pre-rendered text traces; users cannot input their exact custom dimensions to test the Sthapatya Veda Ayadi algorithm in real time.
* **Solution:** Embed a live **Ayadi Shadvarga Precision Calculator** into [`ZoningSearchIsland.tsx`](file:///i:/AGNAA/agnaa_in/src/components/home/ZoningSearchIsland.tsx):
  * Inputs: Plot Length (ft) and Breadth (ft).
  * Computes:
    $$\text{Perimeter } P = 2 \times (L + W)$$
    $$\text{Aayam (Income/Dhana)} = (P \times 8) \pmod{12}$$
    $$\text{Vyaya (Expenditure/Runa)} = (P \times 3) \pmod{8}$$
    $$\text{Yoni (Orientation Direction)} = (P \times 3) \pmod{8} \quad [1: \text{Dhwaja/East}, 3: \text{Simha/South}, \dots]$$
    $$\text{Ayu (Longevity)} = (P \times 27) \pmod{100}$$
  * Validates: $\text{Dhana} > \text{Runa}$ (Net Energy Surplus), ensuring immediate mathematical feedback.

### 2.3 Rubric 3: Austere Single Action Pill Desktop Header (Target: 10/10)
* **Problem:** Header currently crowds 4 secondary utility buttons next to the primary CTA in the top right.
* **Solution:** Standardize [`src/components/Header.tsx`](file:///i:/AGNAA/agnaa_in/src/components/Header.tsx):
  * Left: Vector `AgnaaLogo`.
  * Center: 5 clean pillars (`Design Studio`, `Constructions`, `Tools & AI`, `Codex`, `Foundation`).
  * Right: A single sleek text link (`Client Portal`) + Single Sovereign Jewel Action Pill (`Consult Ar. Sridhar Chauhan`).
  * Mobile Menu: Retains full utility matrix with accessible touch targets.

### 2.4 Rubric 4: Interactive Pure Agent GST & Escrow Gate Simulator (Target: 10/10)
* **Problem:** Villa owners do not grasp how much money Rule 33 Pure Agent status saves them without seeing numbers calculated for their exact plot.
* **Solution:** Deploy an interactive **Pure Agent Tax & Escrow Gate Simulator** on [`/constructions`](file:///i:/AGNAA/agnaa_in/src/app/constructions/page.tsx):
  * Sliders for Plot Area (300 to 1,200 sq. yds) and Villa Classification (Luxury at ₹2,200/sq.ft vs Ultra-Luxury at ₹3,200/sq.ft).
  * Calculates in real time:
    1. Built-up area (FSI 1.5).
    2. Gross Capital Budget.
    3. Contractor 18% Cascading Tax vs AGNAA Pure Agent Tax.
    4. Net Client Savings (typically ₹45 Lakhs to ₹1.10 Crores).
    5. The 6 Escrow Milestone Release amounts.

### 2.5 Rubric 5: Core Web Vitals Optimization via Next/Script (Target: 9.8/10)
* **Problem:** Raw `<script>` tags in [`src/app/layout.tsx`](file:///i:/AGNAA/agnaa_in/src/app/layout.tsx) for Google Analytics and Meta Pixel block initial DOM parsing.
* **Solution:**
  * Migrate tracking scripts to `next/script` with `strategy="afterInteractive"`.
  * Add clean OpenGraph metadata and JSON-LD schema for LocalBusiness with geo-coordinates (17.4156° N, 78.3478° E).
  * Confirm 0 TypeScript compilation errors (`npx tsc --noEmit`).
