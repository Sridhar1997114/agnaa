# CLAUDE.md — Claude Code Instructions for AGNAA.IN

This repository hosts **AGNAA.IN** (Architectural Intelligence Platform, Neuro-Symbolic CAD, and Computational Design Studio).

For core engineering rules, design tokens, and the Elephant-Goldfish Model (EGM), see [AGENTS.md](./AGENTS.md).

---

## 1. Computational Design Skills Suite (.claude/skills/)

The project is equipped with 18 specialized computational design skills located in `.claude/skills/`:

| Skill | Invocation | Core Domain & Focus |
| :--- | :--- | :--- |
| **cd-foundations** | *Auto-activates* | Theoretical foundations, 25+ pioneers, 12 paradigms, tool taxonomies, routing. |
| **parametric-modeling** | `/parametric-modeling` | Grasshopper data trees, Dynamo node graphs, DAG dependencies, associative geometry. |
| **computational-geometry** | `/computational-geometry` | NURBS curves/surfaces, B-splines, subdivision surfaces, Voronoi/Delaunay tessellations. |
| **algorithmic-patterns** | `/algorithmic-patterns` | L-systems, cellular automata, swarm intelligence, reaction-diffusion, packing logic. |
| **generative-design** | `/generative-design` | Evolutionary algorithms (NSGA-II), multi-objective optimization, design space exploration. |
| **structural-computation** | `/structural-computation` | FEA fundamentals, funicular form-finding, gridshells, Karamba3D / Kangaroo patterns. |
| **environmental-simulation** | `/environmental-simulation` | Solar radiation, daylight autonomy (sDA / ASE), CFD natural ventilation, Ladybug Tools. |
| **facade-computation** | `/facade-computation` | Panel rationalization, cold-bent glass, developable surfaces, curtain wall systems. |
| **digital-fabrication** | `/digital-fabrication` | CNC 3-axis/5-axis toolpaths, robotic fabrication (RAPID), timber joinery, 3D printing. |
| **bim-scripting** | `/bim-scripting` | Autodesk Revit API, pyRevit scripts, Dynamo for Revit, openBIM IFC4x3 schema. |
| **interoperability** | `/interoperability` | Data pipelines across Rhino, Revit, Blender, IFC, gbXML, Speckle, and Rhino.Inside. |
| **mesh-processing** | `/mesh-processing` | Half-edge data structures, remeshing, quad meshing, UV unrolling, mesh repair. |
| **optimization-methods** | `/optimization-methods` | Genetic algorithms, simulated annealing, PSO, gradient descent, topology optimization. |
| **data-driven-design** | `/data-driven-design` | GIS integration, space syntax (axial/segment analysis), IoT sensor streams, urban analytics. |
| **design-automation** | `/design-automation` | Rule-based space planning, automated floorplan layouts, regulatory compliance checking. |
| **ml-for-aec** | `/ml-for-aec` | Computer vision for drawings, diffusion layout generation, surrogate performance ML models. |
| **scripting-reference** | `/scripting-reference` | RhinoCommon (Python/C#), rhinoscriptsyntax, pyRevit, Three.js web graphics. |
| **cd-calculator** | `/cd-calculator` | 7 standalone CLI Python calculators for deterministic structural, solar, and geometry math. |

### Built-in Python Calculators (`.claude/skills/cd-calculator/scripts/`)
* `geometry_calculator.py`: Section properties ($I_x, I_y, S_x, r_x, r_y$) for standard and arbitrary AEC shapes.
* `structural_checker.py`: Euler buckling, beam deflection ($L/240, L/360$), and stress limit states.
* `solar_calculator.py`: Solar azimuth, elevation, declination, and incidence angle across coordinates.
* `panel_optimizer.py`: Planarity verification, quad deviation, and cold-bending stress estimation.
* `mesh_analyzer.py`: Non-manifold edge detection, aspect ratios, normal consistency, face areas.
* `material_estimator.py`: Concrete, steel, and timber volume/mass and embodied carbon estimations.
* `fabrication_calculator.py`: CNC machining time, sheet nesting efficiency, and cutting path metrics.

---

## 2. Integrated AEC Model Bridges & MCP Servers (`integrations/`)

The repository includes four full upstream integrations in `integrations/`:

1. **`integrations/computational-design-skills/`**: Upstream repository for the 18-skill suite by Abhinav Bhardwaj.
2. **`integrations/aec-model-bridge/`**: Model Context Protocol (MCP) server connecting Claude to Autodesk Revit 2024–2027 sessions and standalone IFC files (100+ BIM inspection and authoring tools with human-in-the-loop confirmation).
3. **`integrations/speckle-mcp/`**: MCP server interfacing Claude with Speckle data hubs for versioned 3D geometry queries and property graphs across Revit, Rhino, and Archicad.
4. **`integrations/grasshopper-mcp/`**: MCP bridge connecting Claude to active Rhino and Grasshopper canvases to place and wire components.

---

## 3. General Development Commands

```bash
# Type check (mandatory 0 errors)
npx tsc --noEmit

# Run Next.js App Router local dev server
npm run dev

# Run Python calculator example
python .claude/skills/cd-calculator/scripts/geometry_calculator.py --shape i-beam --width 200 --height 400 --flange-thickness 20 --web-thickness 12 --json
```
