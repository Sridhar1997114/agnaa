# SPEC-04: Google Material 3 / gBreeze Design Tokens & Visual System

* **Document ID:** SPEC-04-DESIGN-SYSTEM
* **Authors:** Antigravity Agent, Ar. M. Sridhar Chauhan
* **Status:** Approved
* **Reference:** `D:\GOOGLE Elephant Goldfish\site\src\styles\tokens.css`
* **Date:** 2026-11-02

--------------------------------------------------------------------------------

## 1. Design Philosophy & Google Standards

AGNAA adopts the disciplined, austere design language established in Google's **Elephant-Goldfish Model (EGM)** web platform (`egm.dev`):

* **Neutral Canvas Primacy:** High-contrast, clean surfaces replace loud background gradients and visual clutter.
* **Tonal Hierarchy:** Subtle, mathematically proportional surface container depths replace heavy drop shadows.
* **Jewel Accent Rule:** The AGNAA brand gradient (`#1C1C72` to `#7B2DBF`) is treated as a rare, precious accent reserved strictly for the official vector logo, active indicators, and the single primary action pill on each view.

---

## 2. Token Architecture (`tokens.css`)

### 2.1 Surfaces & Depth Tiers
```css
:root {
  /* Canvas Surfaces (Alabaster Light Neutral) */
  --md-sys-color-surface: #ffffff;
  --md-sys-color-surface-container-low: #f8f9fa;  /* Subtle structural section bands */
  --md-sys-color-surface-container: #f1f3f4;      /* Card containers, input backings */
  --md-sys-color-surface-container-high: #e9ebee; /* Modal surfaces, interactive wells */

  /* Text & Glyphs */
  --md-sys-color-on-surface: #1f1f1f;             /* Primary high-contrast text */
  --md-sys-color-on-surface-variant: #5f6368;     /* Secondary subtitles, dates, specs */

  /* Outlines & Hairlines */
  --md-sys-color-outline: #80868b;
  --md-sys-color-outline-variant: #dadce0;        /* 1px clean architectural border */

  /* AGNAA Brand Tonal Duo */
  --agn-navy: #1C1C72;                           /* Deep Indigo (Structural foundation) */
  --agn-violet: #7B2DBF;                         /* Imperial Violet (Creative accent) */
  --agn-blue: #2563EB;                           /* Technical blue (Statutory indicators) */
}
```

### 2.2 Typography Scale & Tracking
Tightened display tracking provides architectural precision:

| Level | Size | Weight | Line Height | Tracking | Recommended Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display LG** | `52px – 84px` | Bold (`700`) | `1.04` | `-0.035em` | Monumental hero headlines |
| **Headline LG** | `32px – 40px` | Bold (`700`) | `1.15` | `-0.025em` | Section headings, dual engines |
| **Title LG** | `22px – 28px` | Bold (`700`) | `1.25` | `-0.015em` | Bento card titles, project headers |
| **Body LG** | `18px – 20px` | Normal (`400`) | `1.6` | `-0.010em` | Hero lead paragraph, practice bio |
| **Body MD** | `14px – 16px` | Normal (`400`) | `1.55` | `0` | Standard copy, feature descriptions |
| **Mono Label** | `11px` | SemiBold (`600`)| `1.2` | `+0.20em` | Eyebrow badges, code clauses, stats |

---

## 3. Component Invariants

### 3.1 The Single Primary Action Pill
* Strictly **one primary filled action pill per view**.
* Finished with the brand gradient: `background: linear-gradient(to right, #1C1C72, #7B2DBF)`.
* Tactile micro-interactions: `transition: all 0.2s; hover:scale-[1.02]; active:scale-[0.98]`.
* White glyph with 8px horizontal icon gap.

### 3.2 Eyebrow Badges
* Rounded pill shape: `rounded-full`.
* Light surface container low: `bg-[#F8F9FA]`.
* Hairline border: `border border-black/[0.08]`.
* Monospaced text with pulse indicator: `text-[11px] font-mono tracking-[0.2em] uppercase`.

### 3.3 Continuous Line Stepper (The Continuum Loop)
* Modeled directly after EGM's `Loop.astro`.
* Horizontal multi-column layout on desktop, stacked on mobile.
* Continuous horizontal line (`border-t-2 border-[#1C1C72]` or `border-[#7B2DBF]`).
* Step number anchored directly on the line with bold monospaced label.

### 3.4 Hardware Dark Panels (Engineering & AI)
* When displaying terminal outputs, code snippets, or audio waveforms, use the dark hardware surface:
  * Background: `#0A0D1A` or `#0D0D14`.
  * Border: `border border-white/10`.
  * Text: `text-white` with monospaced accents in `text-purple-400` or `text-emerald-400`.
