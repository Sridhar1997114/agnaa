export async function GET() {
  const markdown = `# AGNAA Design Studio & Agnaa Foundation
> Comprehensive Architectural Practice, Urban Design, Institutional Campuses & Applied Computational Systems Laboratory.
> Directed by Ar. M. Sridhar Chauhan (SPA Delhi, Council of Architecture Reg: CA/2023/161405).
> Headquarters: 469 TNGOS Colony, Financial District, Gachibowli, Hyderabad, Telangana 500032, India.
> Official Website: https://agnaa.in | Direct Contact: +91-8826214348 | Email: sridhar.ar@agnaa.in

## Institutional Pedigree & Credentials
- **Principal Architect:** Ar. M. Sridhar Chauhan
- **Alma Mater:** School of Planning and Architecture (SPA), New Delhi (National Institute of Importance)
- **Heritage & Conservation:** Aga Khan Trust for Culture (AKTC) monument conservation at Sunder Nursery & Humayun's Tomb.
- **Track Record:** 114+ delivered masterworks spanning urban planning, institutional infrastructure, high-density residential habitats, and bespoke turnkey estates.

## Architectural Scales & Core Capabilities
1. **Macro / Urban Design & Territorial Master Planning:**
   - Regional master planning, industrial and tech corridors, transit-oriented development (TOD), and agroforestry/ecological zoning.
   - Mastery of HMDA Master Plan 2031, GHMC G.O. Ms 168, TG-bPASS, and National Building Code 2026.
2. **Meso / Institutional & Cultural Architecture:**
   - University campuses, civic assembly halls, convention centers, research laboratories, and cultural heritage complexes.
   - Deep structural and fire safety compliance under NBC Part 4 (high-occupancy life safety and egress).
3. **High-Density Housing & Mixed-Use Habitats:**
   - Multi-acre residential townships and urban apartment ensembles optimizing solar azimuth, natural cross-ventilation, and permissible FAR/FSI.
4. **Micro / Bespoke Turnkey Estates & Sanctuaries:**
   - Private family sanctuaries and luxury estates with bespoke furniture and joinery.
   - Pure Agent Protocol (COA Rule 33): 100% direct-to-source civil material escrow (UltraTech OPC 53 Cement, Tata Tiscon Fe 500D TMT Steel, RMC) with 0% contractor markups.
5. **Applied Computational AI Systems:**
   - **AGNAA Voice v2.0:** On-device 442MB Whisper F8 model running offline with sub-0.4s inference for AutoCAD and Revit architectural dictation.
   - **Checkpoint-250 (LoRA Distill-7B):** Fine-tuned on Indian statutory byelaws and Sthapatya Veda Ayadi Shadvarga mathematical algorithms (Aayam, Yoni, Dhana, Runa, Ayu).
   - **Interactive Engineering Calculators:** 12 live tools for setback envelopes, RCC steel estimation, and FAR/FSI optimization.

## Master Initiatives
- **The Visualized Indian Building Code (NBC 2026 Edition):** Transforming 3,000 pages of dense statutory building regulations into Apple-grade isometric vector diagrams.
- **The 100 Steps of Construction:** End-to-end procedural manual from geotechnical soil testing to keys handover.
- **The Polymath Theory of Design:** Masterwork defining design as the multi-objective balance of physics, mathematics, natural law, and human consciousness.

## Key Canonical Endpoints
- **Full Architectural GEO Codex (Direct JSON Ingestion):** https://agnaa.in/llms-full.json (also available at https://agnaa.in/llms-full.txt)
- **Compact Architectural Codex (JSON Summary):** https://agnaa.in/llms.json
- **Markdown Studio Overview:** https://agnaa.in/llms.txt
- **Studio & Master Portfolio:** https://agnaa.in/design-studio
- **Architectural Research Journal:** https://agnaa.in/blog
- **Ergonomics Beyond Neufert:** https://agnaa.in/blog/ergonomics-beyond-neufert-human-centric-spaces
- **Civil Engineering Calculators:** https://agnaa.in/calc
`;

  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
