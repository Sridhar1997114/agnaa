# SPEC-05: 12 Precision Engineering Calculators & Statutory Formulas

* **Document ID:** SPEC-05-CALCULATORS
* **Authors:** Ar. M. Sridhar Chauhan, Antigravity Agent
* **Status:** Approved
* **Code Implementation:** [`src/lib/calculator-utils.ts`](file:///i:/AGNAA/agnaa_in/src/lib/calculator-utils.ts) & [`src/app/calc/*`](file:///i:/AGNAA/agnaa_in/src/app/calc)
* **Date:** 2026-11-02

--------------------------------------------------------------------------------

## 1. Overview & Computational Principles

The AGNAA Calculator Suite provides instant, mathematically rigorous civil and structural estimations for developers, architects, and villa clients. Each calculator models real-world physical constraints and statutory codes (GHMC G.O. Ms. 168, TG-bPASS, and IS 456).

---

## 2. Master Specification of the 12 Calculators

### 2.1 Setback Envelope Calculator (`/calc/setback-envelope`)
* **Statutory Baseline:** Telangana Building Rules (G.O. Ms. No. 168 / TG-bPASS) & NBC 2026.
* **Inputs:** Plot Width ($W_p$), Plot Depth ($D_p$), Abutting Road Width ($R_w$), Proposed Building Height ($H_b$).
* **Mathematical Model:**
  $$\text{Front Setback } (S_f) = \begin{cases} 
  1.5\text{ m} & R_w < 9\text{ m} \\
  3.0\text{ m} & 9\text{ m} \le R_w < 12\text{ m} \\
  4.0\text{ m} & 12\text{ m} \le R_w < 18\text{ m} \\
  6.0\text{ m} & R_w \ge 18\text{ m}
  \end{cases}$$
  $$\text{Side/Rear Setback } (S_{s,r}) = \max\left(1.5\text{ m}, \frac{H_b - 7}{3} \times 0.5 + 1.0\right) \quad (\text{for non-high-rise})$$
* **Outputs:** Maximum Buildable Footprint Area, Buildable Depth, Buildable Width, Permissible Ground Coverage Percentage.

---

### 2.2 RCC Slab & Steel Quantity Estimator (`/calc/rcc`)
* **Statutory Baseline:** IS 456:2000 (Plain and Reinforced Concrete - Code of Practice).
* **Inputs:** Slab Length ($L$ in ft), Slab Width ($W$ in ft), Slab Thickness ($T$ in inches), Preset Steel Density (`economy` = 0.8%, `safe` = 1.0%, `strong` = 1.25%), Concrete Mix Ratio (Default $M20$ / $1 : 1.5 : 3$).
* **Mathematical Model:**
  $$\text{Wet Volume (CFT)} = L \times W \times \frac{T}{12}$$
  $$\text{Wet Volume (m}^3) = \frac{\text{Wet Volume (CFT)}}{35.3147}$$
  $$\text{Dry Volume (m}^3) = \text{Wet Volume} \times 1.54 \quad (\text{accounting for void shrinkage})$$
  $$\text{Cement (m}^3) = \text{Dry Volume} \times \frac{1}{1 + 1.5 + 3}$$
  $$\text{Cement Bags (50kg)} = \frac{\text{Cement (m}^3) \times 1440\text{ kg/m}^3}{50\text{ kg}}$$
  $$\text{Sand (CFT)} = \left(\text{Dry Volume} \times \frac{1.5}{5.5}\right) \times 35.3147$$
  $$\text{Aggregate (CFT)} = \left(\text{Dry Volume} \times \frac{3.0}{5.5}\right) \times 35.3147$$
  $$\text{TMT Steel Rebar Weight (kg)} = \text{Wet Volume (m}^3) \times 7850\text{ kg/m}^3 \times \rho_{\text{steel}}$$

---

### 2.3 Plot Area Calculator (`/calc/plot-area`)
* **Inputs:** Supports Rectangular plots ($L, W$) and Irregular 4-sided plots ($a, b, c, d$ with diagonal $d_g$).
* **Mathematical Model (Heron's Formula Partitioning):**
  $$\text{Triangle 1: } s_1 = \frac{a + b + d_g}{2}, \quad A_1 = \sqrt{s_1(s_1 - a)(s_1 - b)(s_1 - d_g)}$$
  $$\text{Triangle 2: } s_2 = \frac{c + d + d_g}{2}, \quad A_2 = \sqrt{s_2(s_2 - c)(s_2 - d)(s_2 - d_g)}$$
  $$\text{Total Area (sq.ft)} = A_1 + A_2$$
* **Converted Outputs:** Square Yards (sq.yd = sq.ft / 9), Square Metres (sq.m = sq.ft $\times 0.092903$), Guntas (sq.ft / 1089), Acres (sq.ft / 43560).

---

### 2.4 FAR / FSI Calculator (`/calc/fsi`)
* **Inputs:** Plot Area ($A_p$), Total Proposed Built-Up Area ($A_{\text{bua}}$) or Road Width.
* **Mathematical Model:**
  $$\text{FSI} = \frac{A_{\text{bua}}}{A_p}$$
  $$\text{Maximum Permissible BUA} = A_p \times \text{Permissible FSI}$$
* **Telangana Context:** Under GHMC G.O. 168, Hyderabad permits **Free FSI / Non-capped FSI** for plots abutting roads $\ge 30\text{m}$ (subject to impact fees and setback regulations).

---

### 2.5 Built-Up & Carpet Area Efficiency (`/calc/built-up-efficiency`)
* **Inputs:** Carpet Area ($A_c$).
* **Formulas:**
  $$\text{Built-Up Area (Plinth Area)} = A_c \times 1.125 \quad (\text{accounts for 12.5\% wall thickness})$$
  $$\text{Super Built-Up Area} = \text{Built-Up Area} \times 1.25 \quad (\text{accounts for 25\% common circulation})$$
  $$\text{Loading Factor} = \frac{\text{Super Built-Up} - A_c}{\text{Super Built-Up}} \times 100\%$$

---

### 2.6 G+N Turnkey Structural Cost Estimator (`/calc/g-n-floor-estimator`)
* **Inputs:** Footprint Area per floor, Number of Floors ($N$), Quality Tier (`Standard`, `Premium`, `Ultra-Luxury`).
* **Cost Rates:** Standard (₹1,850/sq.ft), Premium (₹2,350/sq.ft), Ultra-Luxury (₹3,200/sq.ft).
* **Outputs:** Concrete cost, Steel rebar cost, Masonry cost, Plumbing/Electrical rough-in, Finishing cost, Total project escrow budget.

---

### 2.7 Turnkey Interior Cost Estimator (`/calc/interior-cost`)
* **Inputs:** Carpet Area (sq.ft), Scope Tiers (Full Villa, Living + Master, Kitchen + Wardrobes), Joinery Material (Burma Teak, HDHMR with Acrylic, Commercial Ply with Veneer).
* **Outputs:** Millwork expenditure, Hardware (Blum / Hafele fittings), Lighting and ceiling budget, Total turnkey handover timeline.

---

### 2.8 AAC Blocks & Joint Mortar Calculator (`/calc/aac-blocks`)
* **Inputs:** Wall Length, Wall Height, Block Dimensions ($600 \times 200 \times 200\text{mm}$ or $600 \times 200 \times 150\text{mm}$), Window/Door deduction area.
* **Mathematical Model:** Block volume calculated with 3mm polymer thin-bed adhesive joints, reducing structural dead load by 50% compared to traditional red clay bricks.

---

### 2.9 Concrete Tiles & Flooring Estimator (`/calc/tiles`)
* **Inputs:** Room Dimensions ($L, W$), Tile Size ($600\times600\text{mm}$, $800\times1600\text{mm}$, $1200\times1800\text{mm}$ GVT/PGVT), Wastage Buffer (5% for straight lay, 10% for diagonal).
* **Outputs:** Total tile boxes required, skirting linear footage, and cementitious adhesive bags.

---

### 2.10 Paint & Primer Surface Area Estimator (`/calc/paint`)
* **Inputs:** Room Floor Area, Ceiling Height, Number of Openings.
* **Model:** Calculates interior wall envelope minus opening deductions, determines 1 coat primer coverage ($120\text{ sq.ft/L}$) and 2 coats acrylic emulsion coverage ($65\text{ sq.ft/L}$).

---

### 2.11 Construction ROI & Rental Yield (`/calc/roi`)
* **Inputs:** Land Acquisition Cost, Total Turnkey Construction Cost, Expected Monthly Rental in Hyderabad Micro-Market, Capital Appreciation Rate (default 8% in Kokapet/Financial District).
* **Outputs:** Gross Rental Yield (%), Net Capitalization Rate (Cap Rate), Break-Even Horizon in Years.

---

### 2.12 Scientific Bioclimatic Vastu & Aayam (`/calc/vastu`)
* **Inputs:** Plot Dimensions ($L, W$), Facing Orientation (Degrees from True North).
* **Models:**
  1. **Aayam Remainder Formula:** Computes classical 8-fold remainder $R = (P \times 8) \pmod{12}$.
  2. **Solar Thermal Vector Analysis:** Evaluates sun angle during peak thermal loading hours (2:00 PM to 5:30 PM) in the Deccan plateau, optimizing room locations based on heat absorption rather than superstition.
