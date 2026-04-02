# AGNAA Calculator Improvement Levers

## Core Direction

The calculator should evolve from a large service selector into a guided decision system.
Its job is not just to add prices, but to control complexity, protect margins, and improve client clarity.

## 1. Build the Rules Layer Next

The next major upgrade is a rules engine.
Without it, the calculator may still produce attractive outputs, but it will remain commercially fragile.

### The rules layer should include:
- Dependency rules, for example: some services cannot be selected unless prerequisite services are already chosen.
- Pricing modifiers, including rush factor, travel factor, city/outstation factor, and management complexity factor.
- Package eligibility rules, so only relevant packages appear based on the user’s chosen vertical, scope, and seriousness.
- Discount control rules, including maximum public discount caps and admin-only override permissions.
- Minimum project value rules, to prevent very small combinations from generating weak quotes.
- Tax and exclusion rules, such as GST applicability, third-party tool costs, printing, consultant fees, approval fees, hosting, and production exclusions.
- Cadence rules, to decide whether a service is best sold one-time, weekly, monthly, quarterly, or yearly.

### Why this matters:
- It reduces underquoting.
- It prevents unrealistic package combinations.
- It makes the calculator operational, not just visual.
- It protects premium positioning.

## 2. Show Only Recommended Packages Publicly

Do not expose the full package universe at the start.
That creates choice overload and lowers conversion quality.

### Public-facing behavior should be:
- Show a small set of recommended packages first.
- Reveal more packages only after the user selects a vertical, goal, budget comfort level, or cadence.
- Keep advanced, unusual, or admin-sensitive packages hidden unless triggered.

### Recommended public pattern:
- Show 3 to 5 package recommendations per path.
- Mark Standard as the recommended default in most cases.
- Reveal premium upsells only after the user has shown intent.
- Keep internal-only or complex hybrid packages out of the public UI.

### Why this matters:
- Less confusion.
- Better decision clarity.
- Higher trust.
- Better conversion behavior.

## 3. Split the Calculator into Four Entry Paths

Do not use one giant selector for everything.
That is structurally weak.

The calculator should begin by asking what kind of help the user needs.
Then it should branch into one of four entry paths:

### A. Design
For architecture, interiors, drawings, 3D visualization, landscape, and presentation-related services.

### B. Build
For inspections, site supervision, contractor coordination, BOQ review, tender support, execution planning, and construction-stage guidance.

### C. Digital
For website strategy, UX, UI, conversion flows, WhatsApp inquiry systems, SEO-ready structure, design systems, and automation support.

### D. Advisory
For monthly guidance, critique sessions, design audits, brand roadmaps, content direction, review calls, and founder-level decision support.

### Why this structure is better:
- It matches how clients think.
- It reduces form fatigue.
- It improves package relevance.
- It makes the UI feel premium and intelligent.

## 4. Keep Quotations Public, Proposals Semi-Structured, and Invoices Internal

Do not let the calculator jump directly to invoices.
That is premature and commercially risky.

### Recommended output architecture:

#### Public Output — Quotation
- Clean estimate summary.
- Package name.
- Selected services.
- Price range or tier-based estimate.
- Basic exclusions and scope assumptions.
- Downloadable PDF.
- WhatsApp handoff.

#### Semi-Structured Output — Proposal
- Internally reviewed before sending.
- Can include phased scope, milestones, deliverables, and optional add-ons.
- Should feel more formal than the public quote, but still flexible.

#### Internal Output — Invoice
- Only generated after scope, pricing, tax treatment, and payment structure are approved.
- Should remain an internal/commercial document, not a casual calculator output.

### Why this matters:
- Quotations create low-friction entry.
- Proposals create negotiation clarity.
- Invoices require commitment and must stay controlled.

## Recommended Final Architecture

1. User selects one of four paths: Design, Build, Digital, or Advisory.
2. Calculator shows only the most relevant recommended packages.
3. Rules engine filters what is allowed, recommended, hidden, or blocked.
4. User receives a quotation PDF.
5. Internal team can then convert the result into a structured proposal.
6. Invoice is generated only after commercial approval.

## Final Standard

A premium calculator is not a price list.
It is a guided decision system with pricing intelligence, package strategy, and commercial control.

For Agnaa, the correct direction is:
- Smart entry path selection.
- Controlled package visibility.
- Strong rules engine.
- Public quotation, semi-structured proposal, internal invoice.
