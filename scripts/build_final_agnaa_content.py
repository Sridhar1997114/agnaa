"""
AGNAA DESIGN STUDIO • MASTER CONTENT FACTORY
Reads NBC 2026/2016 structure, scans the canonical books library using Laya semantic routing,
extracts matching reference pages using PyMuPDF, and generates topic-by-topic Guiding Canon PDFs.
"""

import os
import sys
import re
import json
from pathlib import Path
import fitz  # PyMuPDF

# Ensure UTF-8 output on Windows
if sys.platform.startswith('win'):
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

ROOT_DIR = Path(r"I:\AGNAA\agnaa_in")
BOOKS_DIR = ROOT_DIR / "Architectural Books"
OUTPUT_ROOT = BOOKS_DIR / "Final_AGNAA_Content"
OUTPUT_ROOT.mkdir(parents=True, exist_ok=True)

print(f"[+] Output directory created: {OUTPUT_ROOT}")

# Define the Master Canonical Blueprint across NBC 2026 Parts
CANON_MODULES = [
    # -------------------------------------------------------------------------
    # PART 03: DEVELOPMENT CONTROL & GENERAL BUILDING REQUIREMENTS
    # -------------------------------------------------------------------------
    {
        "part_id": "PART_03_DEVELOPMENT_CONTROL_AND_GENERAL_BUILDING",
        "subsections": [
            {
                "sub_id": "Sub_01_Habitable_Rooms_Headroom_and_Volume",
                "title": "Habitable Rooms: Volumetric Clearances, Proportions & Anthropometrics",
                "nbc_clause": "NBC 2026, Vol. 1, Part 3, Clause 12.2 (Habitable Rooms)",
                "statutory_mandate": (
                    "Minimum floor area: 9.5 m² (single room), 13.5 m² (with dining). "
                    "Minimum clear lateral width: 2.4 m. Minimum clear finished ceiling height: 2.75 m "
                    "(reducible to 2.4 m in air-conditioned spaces). Minimum exterior natural fenestration: >= 1/10th of floor area. "
                    "Avoid deep narrow geometries exceeding 2:1 length-to-width ratio."
                ),
                "neufert_rules": [
                    "900 mm (3 ft) clear perimeter aisle on all 3 sides of king bed (1800x2000mm)",
                    "1200 mm (4 ft) clearance between bed footboard and wardrobe shutters for comfortable dressing",
                    "800 mm window sill datum aligns seated bed eye-level (1150 mm) directly with garden foliage"
                ],
                "ching_theory": (
                    "Francis D.K. Ching (Form, Space & Order Ch. 4): Rooms exceeding 25 m² choked at statutory 2.75 m "
                    "induce horizontal visual compression. Maintain 1:1.25 to 1:1.40 height-to-width volumetric proportion."
                ),
                "vastu_citation": (
                    "Mayamata Vol. 1 Ch. 26 (Padavinyasa) Verses 12-15 & Samarāṅgaṇa Sūtradhāra Ch. 38: "
                    "Nairutya Sthira Pada (South-West Heavy Earth Quad). The South-West absorbs the harshest afternoon "
                    "solar infrared loading (2 PM - 5:30 PM). Thick wardrobe buffer walls in the SW protect the internal villa."
                ),
                "agnaa_standard": (
                    "Slab cast at 3.35 m to 3.50 m (11.0 to 11.5 ft). A 350 mm dropped ceiling accommodates concealed "
                    "ducted VRF air conditioning and architectural magnetic track lighting while leaving a full 3.0 m finished headroom. "
                    "Induces stack-effect thermal buoyancy to flush warm air through high clerestory louvers."
                ),
                "search_queries": [
                    {"book_pattern": "neufert", "keywords": ["bedroom", "bed", "habitable", "wardrobe"], "max_pages": 2},
                    {"book_pattern": "ching", "keywords": ["proportion", "scale", "enclosure", "datum"], "max_pages": 2}
                ],
                "laya_intent": "habitable_room_dimensions_and_height",
                "laya_expected_checks": {"min_height_m": 2.75, "min_area_sqm": 9.5, "min_width_m": 2.4}
            },
            {
                "sub_id": "Sub_02_Kitchens_Sculleries_and_Work_Triangles",
                "title": "The Culinary Machine: Work Triangles, Sculleries & Agni Exhaust Physics",
                "nbc_clause": "NBC 2026, Vol. 1, Part 3, Clause 12.3 (Kitchens)",
                "statutory_mandate": (
                    "Standalone kitchen minimum floor area: 5.0 m² with minimum width 1.8 m. Combined kitchen and dining "
                    "requires minimum 7.5 m² and 2.1 m width. Minimum clear height 2.75 m. Exterior window opening >= 1.0 m². "
                    "Strict prohibition: No kitchen may open directly into a water closet or urinal without a ventilated lobby buffer."
                ),
                "neufert_rules": [
                    "1200 mm (4 ft) clear aisle between opposing parallel counters for simultaneous oven swing and walking passage",
                    "900 mm (3 ft) prep buffer between sink and hob for hygienic wet-to-cook transition",
                    "Culinary work triangle total perimeter must measure between 4.0 m and 7.9 m for zero ergonomic fatigue"
                ],
                "ching_theory": (
                    "Francis D.K. Ching: Space within a space. The modern luxury kitchen requires segregating public social entertaining "
                    "from high-smoke Indian culinary operations through an architectural threshold: the Show Island Datum backed by a concealed Wet Scullery."
                ),
                "vastu_citation": (
                    "Samarāṅgaṇa Sūtradhāra (King Bhoja) Ch. 38 & Vishwakarma Prakash Ch. 2: Agni Kona (South-East Fire Energy Sector). "
                    "Prevailing South-Westerly winds in peninsular India draw culinary exhaust fumes outward and away from northern living quarters."
                ),
                "agnaa_standard": (
                    "Dual-Kitchen Architectural Protocol: 3.0 m seamless quartz Show Kitchen island anchored to dining, backed by a "
                    "concealed heavy-duty Wet Scullery with direct service yard access and dedicated 1200-cfm external ducting."
                ),
                "search_queries": [
                    {"book_pattern": "neufert", "keywords": ["kitchen", "cooking", "work triangle"], "max_pages": 2},
                    {"book_pattern": "chudley", "keywords": ["kitchen", "ventilation", "drainage"], "max_pages": 1}
                ],
                "laya_intent": "kitchen_dimensions_and_ventilation",
                "laya_expected_checks": {"min_area_sqm": 5.0, "min_width_m": 1.8, "min_window_sqm": 1.0}
            },
            {
                "sub_id": "Sub_03_Bathrooms_Sanitation_and_Shaft_Clearances",
                "title": "Sanctuary of Water: Wet-Dry Zoning, Acoustic Traps & Hydraulic Shafts",
                "nbc_clause": "NBC 2026, Vol. 1, Part 3, Clause 12.4 & Part 9 (Plumbing & Sanitation)",
                "statutory_mandate": (
                    "Minimum floor area for standalone water closet: 1.1 m² (min width 0.9 m). Combined bathroom and water closet: "
                    "minimum 2.8 m² (min width 1.2 m). Clear height >= 2.1 m. Must have an exterior window or ventilation shaft "
                    "with clear area >= 0.3 m². Direct opening into dining or kitchen strictly prohibited."
                ),
                "neufert_rules": [
                    "WC front clearance: Minimum 600 mm clear space in front of commode for comfortable kneeling/standing",
                    "Shower enclosure: Minimum 900x900 mm clear wet zone with 50 mm recessed threshold to prevent capillary leakage",
                    "Vanity basin counter: Height 850 mm to 900 mm from finished floor with 900 mm lateral shoulder buffer"
                ],
                "ching_theory": (
                    "Ching: Articulated Boundaries and Layered Thresholds. Sanitary spaces should not open abruptly into private quarters. "
                    "They must be accessed through a transitional grooming vestibule or dressing corridor."
                ),
                "vastu_citation": (
                    "Manuṣyālaya Candrikā Ch. 4 & Mayamata Ch. 26: Water drainage assigned to North-West (Vayu Kona) or East-North-East. "
                    "Toilets strictly prohibited in North-East (Ishanya) to preserve the primary magnetic and hydraulic purity axis."
                ),
                "agnaa_standard": (
                    "3-Zone Wet-Dry Hierarchy: Dry Vanity Zone -> Semi-Wet WC Zone (concealed wall-hung cistern) -> Wet Rain Shower Zone. "
                    "Concealed linear trench drains and cast-iron acoustic insulated soil stacks eliminating flushing reverberations."
                ),
                "search_queries": [
                    {"book_pattern": "neufert", "keywords": ["bathroom", "toilet", "wash basin", "sanitary"], "max_pages": 2},
                    {"book_pattern": "chudley", "keywords": ["sanitary", "drainage", "pipe"], "max_pages": 1}
                ],
                "laya_intent": "bathroom_dimensions_and_sanitation",
                "laya_expected_checks": {"min_combined_area_sqm": 2.8, "min_width_m": 1.2, "min_height_m": 2.1}
            },
            {
                "sub_id": "Sub_04_Setbacks_Open_Spaces_and_Daylight_Angles",
                "title": "Setbacks, Sky Exposure Plane & Deccan Solar Orientation",
                "nbc_clause": "NBC 2026, Vol. 1, Part 3, Clause 8 & GHMC G.O. 168 (Telangana Building Rules)",
                "statutory_mandate": (
                    "Mandatory front, rear, and side setbacks determined by plot size and building height. For buildings up to 10m height, "
                    "minimum rear setback is 2.0m to 3.0m; side setbacks 1.5m to 2.0m. Front setback minimum 3.0m on roads up to 12m wide. "
                    "No structural cantilever or overhang may encroach more than 1.0m into mandatory setbacks."
                ),
                "neufert_rules": [
                    "45-degree daylight cone: Building height must not exceed the line drawn at 45 degrees from the opposing site boundary",
                    "Visual privacy distance: Minimum 6.0 m between facing habitable windows across side setbacks"
                ],
                "ching_theory": (
                    "Francis D.K. Ching: Edges and Transitional Buffers. Setbacks should not be sterile concrete gaps; they must act "
                    "as microclimate green moats that capture prevailing summer breezes and filter acoustic street noise."
                ),
                "vastu_citation": (
                    "Surya Siddhānta Ch. 3 (Tripraśnādhikāra) & Matsya Purana Ch. 252: Mandatory open space must be largest in North and East, "
                    "allowing low-angle morning solar ultraviolet radiation to flood the ground, while South and West maintain higher boundary mass."
                ),
                "agnaa_standard": (
                    "Setback landscapes transformed into private sunken gravel courts, perimeter bamboo bioswales, and permeable granite paving "
                    "that recharge local borewells while fully compliant with GHMC G.O. 168 and TG-bPASS mandates."
                ),
                "search_queries": [
                    {"book_pattern": "168", "keywords": ["setback", "road width", "height", "front"], "max_pages": 2},
                    {"book_pattern": "dekay", "keywords": ["solar", "daylight", "setback"], "max_pages": 1}
                ],
                "laya_intent": "building_setbacks_and_open_spaces",
                "laya_expected_checks": {"min_front_setback_m": 3.0, "min_rear_setback_m": 2.0}
            },
            {
                "sub_id": "Sub_05_Vehicular_Parking_Driveways_and_Swept_Paths",
                "title": "Vehicular Envelopes: Turning Sweeps, Ramp Gradients & Parking Bays",
                "nbc_clause": "NBC 2026, Vol. 1, Part 3, Clause 10 & GHMC G.O. 168 (Parking Provisions)",
                "statutory_mandate": (
                    "Standard passenger car parking bay minimum: 2.5 m width x 5.0 m length. Two-wheeler bay: 1.0 m x 2.0 m. "
                    "Minimum clear driveway width: 3.0 m (one-way), 6.0 m (two-way). Maximum vehicular ramp gradient: 1:8 (12.5%) for cars, "
                    "with 1:10 (10%) transition ramps at top and bottom. Minimum clear headroom in parking basements: 2.4 m."
                ),
                "neufert_rules": [
                    "Vehicle door swing envelope: 750 mm clearance required between parked cars to allow door opening without paint damage",
                    "Turning radius swept path: Minimum 6.0 m outer turning radius for luxury SUVs and executive sedans"
                ],
                "ching_theory": (
                    "Ching: Gateway and Vehicular Approach. The arrival sequence must celebrate the vehicle threshold without turning "
                    "the ground level into a dead, gasoline-smelling cavern. Screen parking behind fluted architectural louvers."
                ),
                "vastu_citation": (
                    "Manasara Ch. 11 (Vāhana Śālā) & Mayamata Ch. 24: Vehicular stalls (Ratha) assigned to North-West (Vayu Kona - dynamic movement) "
                    "or South-East. Parking directly in North-East is prohibited to preserve open energetic catchment."
                ),
                "agnaa_standard": (
                    "AGNAA luxury villas engineer 3.0 m x 6.0 m oversized bays to accommodate luxury SUVs (Defender, Range Rover, S-Class), "
                    "integrated with 22kW EV high-speed charging pedestals and silent epoxy quartz screed flooring."
                ),
                "search_queries": [
                    {"book_pattern": "neufert", "keywords": ["car", "parking", "garage", "turning radius"], "max_pages": 2},
                    {"book_pattern": "168", "keywords": ["parking", "driveway", "ramp"], "max_pages": 1}
                ],
                "laya_intent": "parking_dimensions_and_ramps",
                "laya_expected_checks": {"min_bay_width_m": 2.5, "min_bay_length_m": 5.0, "max_ramp_slope": 0.125}
            }
        ]
    },

    # -------------------------------------------------------------------------
    # PART 04: FIRE & LIFE SAFETY
    # -------------------------------------------------------------------------
    {
        "part_id": "PART_04_FIRE_AND_LIFE_SAFETY",
        "subsections": [
            {
                "sub_id": "Sub_01_Exit_Corridors_and_Travel_Distances",
                "title": "Egress Geometries: Travel Distances, Corridor Capacities & Panic Hardware",
                "nbc_clause": "NBC 2026, Vol. 1, Part 4, Clause 4.4.2 & Table 5 (Travel Distances)",
                "statutory_mandate": (
                    "Maximum travel distance from any point in a residential building to an enclosed fire exit staircase: "
                    "30 metres (un-sprinklered), extendable to 45 metres in fully automated sprinklered buildings. "
                    "Dead-end corridor limit: Maximum 6.0 m (un-sprinklered), 15.0 m (sprinklered). "
                    "Minimum clear corridor width: 1.0 m (residential), 1.5 m (commercial), 2.0 m (assembly/hospital)."
                ),
                "neufert_rules": [
                    "Evacuation flow rate: 45 persons per minute per 500 mm unit exit width",
                    "Opposing person corridor clearance: Minimum 1200 mm for two people to pass comfortably without touching shoulders"
                ],
                "ching_theory": (
                    "Francis D.K. Ching: Circulation Paths and Terminating Vistas. Corridors must not feel like claustrophobic escape tubes; "
                    "they should terminate upon natural daylight apertures, framed views, or focal artwork niches."
                ),
                "vastu_citation": (
                    "Brihat Samhitā (Varahamihira) Ch. 53 & Vishwakarma Prakash Ch. 3: Mahamarma Egress Purity. "
                    "The primary East-West and North-South circulation spines (Sutra) must remain unblocked by structural columns."
                ),
                "agnaa_standard": (
                    "In AGNAA high-density luxury residential projects, egress geometries are engineered with dual independent escape routes "
                    "restricted to 22 metres max travel distance (far safer than the statutory 30m baseline), fitted with flush 2-hour fire-rated doors."
                ),
                "search_queries": [
                    {"book_pattern": "chudley", "keywords": ["fire", "escape", "staircase", "travel distance"], "max_pages": 2},
                    {"book_pattern": "neufert", "keywords": ["corridor", "escape route", "doors"], "max_pages": 1}
                ],
                "laya_intent": "fire_travel_distance_and_corridors",
                "laya_expected_checks": {"max_travel_dist_m": 30.0, "max_dead_end_m": 6.0, "min_corridor_width_m": 1.0}
            },
            {
                "sub_id": "Sub_02_Fire_Exit_Staircase_Geometries_and_Headroom",
                "title": "Vertical Escape: Staircase Tread-Riser Cadence, Enclosures & Pressurization",
                "nbc_clause": "NBC 2026, Vol. 1, Part 4, Clause 4.4.3 (Exit Staircases)",
                "statutory_mandate": (
                    "Minimum clear flight width: 1.0 m (residential), 1.5 m (commercial). Maximum riser: 150 mm (recommended public) / 190 mm (residential cap). "
                    "Minimum tread: 250 mm (residential) / 300 mm (public). Minimum continuous clear vertical headroom: 2.2 m (2200 mm). "
                    "Maximum 15 risers per flight without intermediate landing. Spiral stairs strictly prohibited as mandatory fire exits."
                ),
                "neufert_rules": [
                    "Blondel harmonic formula: 2R + T = 600 mm to 640 mm",
                    "150 mm riser + 300 mm tread = 2(150) + 300 = 600 mm (Optimal human locomotive biomechanics)"
                ],
                "ching_theory": (
                    "Ching: Vertical Movement Datum. The staircase is a vertical armature that connects spatial volumes, "
                    "celebrating vertical light through skylit shafts."
                ),
                "vastu_citation": (
                    "Vishwakarma Prakash Ch. 6 Verses 34-38: Dakshinavarta (Clockwise Ascent). Ascent must turn right matching natural "
                    "centrifugal balance, with heavy structural mass anchored in South or West."
                ),
                "agnaa_standard": (
                    "AGNAA 1200 mm wide cantilevered treads emerging seamlessly from a reinforced shear wall, clad in flamed leathered granite "
                    "with zero visible stringers and continuous recessed brass LED handrails."
                ),
                "search_queries": [
                    {"book_pattern": "neufert", "keywords": ["staircase", "riser", "tread", "flight"], "max_pages": 2},
                    {"book_pattern": "chudley", "keywords": ["stair", "headroom", "balustrade"], "max_pages": 1}
                ],
                "laya_intent": "fire_staircase_specifications",
                "laya_expected_checks": {"min_stair_width_m": 1.0, "min_headroom_m": 2.2, "max_riser_mm": 190}
            }
        ]
    },

    # -------------------------------------------------------------------------
    # PART 06: STRUCTURAL DESIGN & SEISMIC RESILIENCE
    # -------------------------------------------------------------------------
    {
        "part_id": "PART_06_STRUCTURAL_DESIGN_AND_SEISMIC_RESILIENCE",
        "subsections": [
            {
                "sub_id": "Sub_01_Seismic_Criteria_IS_1893_and_Soft_Storey_Stilts",
                "title": "Earthquake Resilience: IS 1893:2016, Ductile Detailing & Soft-Storey Hardening",
                "nbc_clause": "NBC 2026, Vol. 1, Part 6 (Structural Design) & IS 1893:2016 (Criteria for Earthquake Resistant Design)",
                "statutory_mandate": (
                    "All RCC structures must comply with IS 1893 (Seismic Zones II to V) and IS 13920 (Ductile Detailing). "
                    "Buildings with open ground stilt parking (Soft Storey) are strictly legally mandated to have columns and beams "
                    "designed for 2.5 times the normal calculated seismic shear forces and moments, or incorporate concrete shear walls."
                ),
                "neufert_rules": [
                    "Structural bay grids: 6.0 m to 8.4 m column grids optimize both underground parking efficiency and upper residential room divisions"
                ],
                "ching_theory": (
                    "Ching & Salvadori: Structural Rationalism. Structure must not be arbitrarily concealed; structural columns should "
                    "define spatial rhythm, creating an order of bays, thresholds, and openings."
                ),
                "vastu_citation": (
                    "Samarāṅgaṇa Sūtradhāra Ch. 49 (Stambha Nirmana) & Brihat Samhita Ch. 53: Pillars must follow proportionate tapering ratios "
                    "and avoid intersecting Mahamarma diagonal nodes across the site footprint."
                ),
                "agnaa_standard": (
                    "AGNAA structural engineering mandates continuous full-height shear wall cores flanking elevator and stair shafts, "
                    "completely eliminating soft-storey collapse risks on stilt villa levels while maintaining slender 200 mm facade columns."
                ),
                "search_queries": [
                    {"book_pattern": "is-1893", "keywords": ["soft storey", "zone", "shear", "ductile"], "max_pages": 2},
                    {"book_pattern": "salvadori", "keywords": ["earthquake", "column", "beam", "load"], "max_pages": 2}
                ],
                "laya_intent": "structural_seismic_and_soft_storey",
                "laya_expected_checks": {"seismic_multiplier_soft_storey": 2.5, "is_13920_ductile_compliance": True}
            }
        ]
    },

    # -------------------------------------------------------------------------
    # PART 08 & 11: BUILDING SERVICES & BIOCLIMATICS
    # -------------------------------------------------------------------------
    {
        "part_id": "PART_08_AND_11_BUILDING_SERVICES_AND_BIOCLIMATICS",
        "subsections": [
            {
                "sub_id": "Sub_01_Natural_Ventilation_Stack_Buoyancy_and_Louvers",
                "title": "Bioclimatic Physics: Stack-Effect Buoyancy, Thermal Mass & Deccan Wind Physics",
                "nbc_clause": "NBC 2026, Vol. 2, Part 8 (Building Services - Lighting & Ventilation) & Part 11 (Approach to Sustainability)",
                "statutory_mandate": (
                    "Habitable spaces require aggregate opening area >= 1/10th of floor area. Natural cross-ventilation requires "
                    "inlet and outlet openings located in opposing or adjacent walls. Buildings must adhere to Energy Conservation Building Code (ECBC) "
                    "prescribing envelope maximum U-values and solar heat gain coefficients (SHGC <= 0.25 for fenestration in warm climates)."
                ),
                "neufert_rules": [
                    "Air change rates: Minimum 3 to 6 air changes per hour (ACH) in residential living zones for indoor air quality",
                    "Daylight penetration depth: Effective natural daylight penetrates up to 2.5 times the window head height from the exterior wall"
                ],
                "ching_theory": (
                    "Francis D.K. Ching & Mark DeKay: Openings in Planes. Windows placed near room corners wash adjacent perpendicular walls "
                    "with soft reflected daylight, eliminating harsh glare."
                ),
                "vastu_citation": (
                    "Matsya Purana Ch. 252 & Mayamata Ch. 26: The central courtyard (Chatushala / Brahmasthan) creates an open celestial void. "
                    "Physics: Acts as a central thermal chimney that pulls cooler air across ground verandahs and exhausts hot air upward."
                ),
                "agnaa_standard": (
                    "AGNAA luxury villas integrate central double-height rain atriums with automated high-level motorized louvers, "
                    "inducing thermal siphon cooling that drops internal ambient temperatures by 4°C to 6°C compared to exterior Hyderabad summer heat."
                ),
                "search_queries": [
                    {"book_pattern": "dekay", "keywords": ["stack ventilation", "solar", "cross ventilation", "shading"], "max_pages": 2},
                    {"book_pattern": "neufert", "keywords": ["daylight", "sunlight", "orientation"], "max_pages": 1}
                ],
                "laya_intent": "natural_ventilation_and_bioclimatics",
                "laya_expected_checks": {"min_fenestration_ratio": 0.10, "max_shgc": 0.25}
            }
        ]
    }
]

# Find available PDF books in BOOKS_DIR
all_pdfs = list(BOOKS_DIR.rglob("*.pdf"))
print(f"[+] Found {len(all_pdfs)} source PDFs in Architectural Books library.")

def find_pdf_by_pattern(pattern: str):
    pattern = pattern.lower()
    for p in all_pdfs:
        # Avoid Corrupted_Files
        if "corrupted" in str(p).lower():
            continue
        if pattern in p.name.lower():
            return p
    return None

def extract_reference_pages(pdf_path: Path, keywords: list, max_pages: int, output_pdf: Path):
    """Searches PDF for keywords and extracts the most relevant pages using PyMuPDF."""
    try:
        doc = fitz.open(pdf_path)
        matching_pages = []
        
        # Scan pages for keyword hits
        for page_num in range(len(doc)):
            text = doc[page_num].get_text().lower()
            hit_score = sum(1 for kw in keywords if kw.lower() in text)
            if hit_score >= 1:
                matching_pages.append((page_num, hit_score))
        
        # Sort by relevance score
        matching_pages.sort(key=lambda x: x[1], reverse=True)
        selected_pages = [p[0] for p in matching_pages[:max_pages]]
        
        if not selected_pages:
            # Fallback to first page if no direct keyword match
            selected_pages = [0]
            
        selected_pages.sort()
        
        new_doc = fitz.open()
        for pno in selected_pages:
            new_doc.insert_pdf(doc, from_page=pno, to_page=pno)
            
        new_doc.save(output_pdf)
        new_doc.close()
        doc.close()
        return len(selected_pages)
    except Exception as e:
        print(f"    [!] Error extracting from {pdf_path.name}: {e}")
        return 0

def generate_guiding_dossier_pdf(sub_data: dict, output_pdf: Path):
    """Creates a beautifully styled, high-resolution A4 guiding dossier PDF using PyMuPDF."""
    doc = fitz.open()
    page = doc.new_page(width=595, height=842)  # Standard A4
    
    # 1. Header Banner
    header_rect = fitz.Rect(0, 0, 595, 75)
    page.draw_rect(header_rect, color=(0.11, 0.16, 0.23), fill=(0.11, 0.16, 0.23))
    page.insert_text((40, 32), "AGNAA DESIGN STUDIO • GUIDING ARCHITECTURAL CANON", fontsize=11, color=(0.9, 0.9, 0.9), fontname="helv")
    page.insert_text((40, 54), sub_data["title"].upper(), fontsize=13, color=(1.0, 1.0, 1.0), fontname="helv")
    
    y = 100
    
    # Section 1: Statutory Mandate (NBC)
    page.insert_text((40, y), "1. STATUTORY MANDATE & LEGAL CODE", fontsize=10, color=(0.1, 0.3, 0.6), fontname="helv")
    y += 16
    page.insert_text((40, y), f"Code Anchor: {sub_data['nbc_clause']}", fontsize=9, color=(0.2, 0.2, 0.2), fontname="helv")
    y += 14
    
    rect_text = fitz.Rect(40, y, 555, y + 60)
    page.insert_textbox(rect_text, sub_data['statutory_mandate'], fontsize=8.5, color=(0.25, 0.25, 0.25), fontname="helv")
    y += 70
    
    # Section 2: Neufert Ergonomics
    page.insert_text((40, y), "2. ERGONOMIC & ANTHROPOMETRIC CLEARANCES (NEUFERT / TIME-SAVER)", fontsize=10, color=(0.1, 0.3, 0.6), fontname="helv")
    y += 16
    for r in sub_data['neufert_rules']:
        page.insert_text((50, y), f"• {r}", fontsize=8.5, color=(0.2, 0.2, 0.2), fontname="helv")
        y += 14
    y += 6
    
    # Section 3: Spatial Theory (Ching)
    page.insert_text((40, y), "3. SPATIAL THEORY & VOLUMETRIC RATIOS (FRANCIS D.K. CHING)", fontsize=10, color=(0.1, 0.3, 0.6), fontname="helv")
    y += 16
    rect_ching = fitz.Rect(40, y, 555, y + 45)
    page.insert_textbox(rect_ching, sub_data['ching_theory'], fontsize=8.5, color=(0.25, 0.25, 0.25), fontname="helv")
    y += 55
    
    # Section 4: Classical Vastu Treatise
    page.insert_text((40, y), "4. CLASSICAL TREATISE CITATION & SOLAR PHYSICS (CAD VASTU CANON)", fontsize=10, color=(0.1, 0.3, 0.6), fontname="helv")
    y += 16
    rect_vastu = fitz.Rect(40, y, 555, y + 55)
    page.insert_textbox(rect_vastu, sub_data['vastu_citation'], fontsize=8.5, color=(0.25, 0.25, 0.25), fontname="helv")
    y += 65
    
    # Section 5: AGNAA Luxury Studio Benchmark
    page.insert_text((40, y), "5. AGNAA LUXURY STUDIO EXECUTION BENCHMARK (AR. SRIDHAR, SPA DELHI)", fontsize=10, color=(0.1, 0.3, 0.6), fontname="helv")
    y += 16
    rect_agnaa = fitz.Rect(40, y, 555, y + 65)
    page.insert_textbox(rect_agnaa, sub_data['agnaa_standard'], fontsize=8.5, color=(0.25, 0.25, 0.25), fontname="helv")
    y += 75
    
    # Footer
    footer_rect = fitz.Rect(0, 810, 595, 842)
    page.draw_rect(footer_rect, color=(0.95, 0.95, 0.95), fill=(0.95, 0.95, 0.95))
    page.insert_text((40, 828), "AGNAA DESIGN STUDIO • FINANCIAL DISTRICT HYDERABAD • www.agnaa.in", fontsize=8, color=(0.5, 0.5, 0.5), fontname="helv")
    page.insert_text((480, 828), f"REF: {sub_data['sub_id']}", fontsize=8, color=(0.5, 0.5, 0.5), fontname="helv")
    
    doc.save(output_pdf)
    doc.close()

# Main Execution Loop
total_created = 0

for module in CANON_MODULES:
    part_dir = OUTPUT_ROOT / module["part_id"]
    part_dir.mkdir(parents=True, exist_ok=True)
    print(f"\n📂 Processing {module['part_id']}...")
    
    for sub in module["subsections"]:
        sub_dir = part_dir / sub["sub_id"]
        sub_dir.mkdir(parents=True, exist_ok=True)
        refs_dir = sub_dir / "EXTRACTED_REFERENCES"
        refs_dir.mkdir(parents=True, exist_ok=True)
        
        # 1. Generate Guiding PDF
        dossier_pdf = sub_dir / f"{sub['sub_id']}_GUIDING_DOSSIER.pdf"
        generate_guiding_dossier_pdf(sub, dossier_pdf)
        
        # 2. Generate Guiding Markdown
        dossier_md = sub_dir / "GUIDING_CANON_DOSSIER.md"
        with open(dossier_md, "w", encoding="utf-8") as f:
            f.write(f"# AGNAA DESIGN STUDIO • GUIDING CANON DOSSIER\n")
            f.write(f"## {sub['title']}\n\n")
            f.write(f"**Discipline Anchor:** `{module['part_id']}`  \n")
            f.write(f"**Statutory Code Anchor:** `{sub['nbc_clause']}`  \n\n")
            f.write(f"### 1. Statutory Mandate & Legal Rules\n{sub['statutory_mandate']}\n\n")
            f.write(f"### 2. Ergonomic & Anthropometric Standards (Neufert / Time-Saver)\n")
            for r in sub['neufert_rules']:
                f.write(f"- {r}\n")
            f.write(f"\n### 3. Spatial Theory & Volumetric Ratios (Francis D.K. Ching)\n{sub['ching_theory']}\n\n")
            f.write(f"### 4. Classical Sanskrit Treatise & Solar Physics (CAD Vastu)\n{sub['vastu_citation']}\n\n")
            f.write(f"### 5. AGNAA Studio Luxury Execution Benchmark\n{sub['agnaa_standard']}\n\n")
            f.write(f"---\n*AGNAA Design Studio • Principal Architect Ar. Sridhar (SPA Delhi)*\n")
        
        # 3. Generate Laya Decision JSON
        laya_json = sub_dir / "LAYA_DECISION_RULE.json"
        with open(laya_json, "w", encoding="utf-8") as f:
            json.dump({
                "sub_id": sub["sub_id"],
                "laya_intent_category": sub["laya_intent"],
                "statutory_anchor": sub["nbc_clause"],
                "decision_checks": sub["laya_expected_checks"]
            }, f, indent=2)
            
        # 4. Search and Extract Reference Pages from Matching Source Books
        for query in sub["search_queries"]:
            pdf_path = find_pdf_by_pattern(query["book_pattern"])
            if pdf_path:
                clean_name = re.sub(r'[^a-zA-Z0-9_-]', '_', pdf_path.stem)[:30]
                out_extract = refs_dir / f"Extracted_{clean_name}.pdf"
                pages_extracted = extract_reference_pages(pdf_path, query["keywords"], query["max_pages"], out_extract)
                print(f"  -> Extracted {pages_extracted} pages from {pdf_path.name} into {sub['sub_id']}/EXTRACTED_REFERENCES")
            else:
                print(f"  [!] Source PDF pattern '{query['book_pattern']}' not found in library.")
                
        total_created += 1

# Generate Master Index in 00_MASTER_INDEX_AND_METHODOLOGY
master_idx_dir = OUTPUT_ROOT / "00_MASTER_INDEX_AND_METHODOLOGY"
master_idx_dir.mkdir(parents=True, exist_ok=True)
master_toc = master_idx_dir / "MASTER_TOC_CANON_PARTS.md"

with open(master_toc, "w", encoding="utf-8") as f:
    f.write("# AGNAA DESIGN STUDIO • MASTER CANON DIRECTORY & TOC\n")
    f.write("*The Complete Unified Knowledge Structure: NBC 2026, Neufert, Ching, and Classical Vastu Treatises*\n\n")
    for module in CANON_MODULES:
        f.write(f"## 📁 `{module['part_id']}`\n")
        for sub in module["subsections"]:
            f.write(f"- 📄 **{sub['title']}** (`{sub['sub_id']}`)\n")
            f.write(f"  - Statutory: `{sub['nbc_clause']}`\n")
            f.write(f"  - Laya Intent: `{sub['laya_intent']}`\n")
        f.write("\n")

print(f"\n=======================================================")
print(f"✅ Master Content Factory Complete! Generated {total_created} canonical subsections.")
print(f"📂 Master Library Location: {OUTPUT_ROOT}")
print(f"=======================================================")
