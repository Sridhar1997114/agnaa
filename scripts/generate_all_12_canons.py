"""
GENERATE ALL 12 CANONS: OMNICHANNEL EXPORT & MASTER KNOWLEDGE CANON
===================================================================
Produces full 12-canon parity across:
- src/data/agnaa-canon/master-canon.ts
- public/agnaa-canon-exports/AGNAA_LAYA_RULES_LEDGER.json
- public/agnaa-canon-exports/AGNAA_MASTER_CAROUSELS.md
- public/agnaa-canon-exports/AGNAA_RVC_VOICEOVER_SCRIPTS.md
"""

import os
import sys
import json
from pathlib import Path

if sys.platform.startswith('win'):
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

ROOT_DIR = Path(r"I:\AGNAA\agnaa_in")
DATA_DIR = ROOT_DIR / "src" / "data" / "agnaa-canon"
EXPORTS_DIR = ROOT_DIR / "public" / "agnaa-canon-exports"

EXPORTS_DIR.mkdir(parents=True, exist_ok=True)

# 12 Canons Data Definitions
CANONS = [
    {
        "id": "AGNAA-CANON-01",
        "slug": "master-suite-habitable-volume-nbc-ching-vastu",
        "title": "The Master Suite: Volumetric Headroom, Anthropometrics & Solar Axis",
        "subtitle": "Harmonizing NBC Clause 12.2, Neufert Bed Envelopes, Ching Spatial Proportions, and Mayamata Nairutya Treatises",
        "discipline": "spatial_planning",
        "plate_code": "PLATE 03-01",
        "statutory": {
            "codeClause": "NBC 2026, Vol. 1, Part 3, Clause 12.2 (Habitable Rooms)",
            "sourceBook": "National Building Code of India 2026 (SP 7: 2026)",
            "mandatoryRule": "Every habitable room must have a minimum floor area of 9.5 m² (single room) or 13.5 m² (with dining), minimum width of 2.4 m, and minimum clear height of 2.75 m from finished floor level to ceiling soffit (permissible reduction to 2.4 m in air-conditioned spaces). Minimum exterior fenestration must be >= 10% of floor area.",
            "hyderabadStatutoryRule": "Under GHMC G.O. 168 & TG-bPASS 2026, residential villa master bedrooms require minimum 3.0 m clear setbacks from rear plot boundaries when rear-facing fenestrations provide mandatory light and ventilation.",
            "parameters": [
                {"label": "Statutory Minimum Clear Height", "value": "2.75 m (9 ft 0 in)", "legalStatus": "mandatory_minimum"},
                {"label": "Statutory Air-Conditioned Relaxation", "value": "2.40 m (7 ft 10 in)", "legalStatus": "permissible_relaxation"},
                {"label": "Minimum Clear Width", "value": "2.40 m (7 ft 10 in)", "legalStatus": "mandatory_minimum"},
                {"label": "Natural Ventilation Opening Ratio", "value": "10% of floor area minimum", "legalStatus": "mandatory_minimum"}
            ]
        },
        "ergonomics": {
            "sourceBook": "Neufert Architects' Data (4th Ed.) & Time-Saver Standards for Interior Design",
            "ergonomicRationale": "Human movement envelopes require clear clearances around the primary bed. A 900 mm perimeter aisle ensures unhindered bed-making and circulation. A 1200 mm clearance between the bed foot and hinged wardrobe doors allows simultaneous opening and passage.",
            "keyDimensions": [
                {"label": "Bed Perimeter Aisle", "dimension": "900 mm (3 ft 0 in)", "clearanceStandard": "Single-person clear unhindered passage"},
                {"label": "Wardrobe to Bed Foot Aisle", "dimension": "1200 mm (4 ft 0 in)", "clearanceStandard": "Hinged shutter swing + walking buffer"},
                {"label": "Window Sill Eye-Level Datum", "dimension": "800 mm (2 ft 7 in)", "clearanceStandard": "Aligns garden line-of-sight from seated bed height (450 mm)"}
            ]
        },
        "spatialTheory": {
            "sourceBook": "Francis D.K. Ching: Architecture - Form, Space, and Order (4th Ed.)",
            "coreConcept": "Spatial Enclosure, Volumetric Ratio & Vertical Datum",
            "architecturalPrinciple": "In rooms exceeding 25 m², maintaining statutory minimum 2.75 m height induces severe horizontal compression. The vertical envelope must scale proportionately with floor area, maintaining a height-to-width ratio between 1:1.25 and 1:1.40.",
            "proportionRatio": "1 : 1.40 (Golden Section Volumetric Proportion)"
        },
        "classicalVastu": {
            "treatiseName": "Mayamata: An Aesthetic Treatise on Hindu Architecture",
            "chapterVerseCitation": "Mayamata Vol. 1, Ch. 26 (Padavinyasa), Verses 12-15 & Samarāṅgaṇa Sūtradhāra Ch. 38",
            "classicalSanskritConcept": "Nairutya Sthira Pada (South-West Heavy Earth Quad)",
            "bioclimaticAndSolarRationale": "The South-West sector receives the harshest infrared thermal loading in the Indian Deccan plateau during 2:00 PM to 5:30 PM. Classical Vastu mandates placing the master sleeping suite with thickest masonry walls here, acting as a thermal buffer that shields the rest of the villa.",
            "openInterpretationNote": "In modern luxury villas, this thermal buffering principle is executed by pairing SW sleeping zones with ventilated cavity walls or dressing vestibule air locks."
        },
        "agnaaBenchmark": {
            "principalArchitect": "Ar. Sridhar (SPA Delhi Alumnus, NIRF #1)",
            "firmStandard": "The AGNAA High-Ceiling Microclimate Protocol",
            "volumetricElevation": "AGNAA elevates statutory 2.75 m ceilings to an engineered standard of 3.35 m to 3.50 m (11.0 to 11.5 ft). This accommodates a 350 mm dropped ceiling for concealed VRF/VRV air conditioning while leaving a generous 3.0 m clear finished headroom.",
            "hyderabadMicroclimateExecution": "In Hyderabad luxury residences (Jubilee Hills, Kokapet), high ceilings create thermal buoyancy (stack effect), allowing daytime warm air to accumulate above human head height and exhaust through high clerestory louvers.",
            "materialTectonics": "Raw exposed concrete soffits paired with warm white-oak wall paneling, acoustic fabric-wrapped bed datum planes, and concealed shadowline perimeter coves."
        },
        "layaRules": {
            "intentChoiceCategory": "residential_master_suite",
            "decisionChecks": [
                {"question": "Is the clear finished headroom >= 3.00 m after VRF duct drops?", "expectedBoolean": True, "failingRemedy": "Increase slab casting height to min 3.35 m or re-route ductwork to dressing corridor plenum."},
                {"question": "Is the bed perimeter clearance >= 900 mm on three sides?", "expectedBoolean": True, "failingRemedy": "Expand master suite width or reduce bed frame width to standard 1800 mm King footprint."},
                {"question": "Is the master suite anchored in the South-West (Nairutya) sector?", "expectedBoolean": True, "failingRemedy": "Re-zone master suite to South-West or provide secondary thermal masonry buffer on West facade."}
            ],
            "relevanceKeywords": ["master bedroom", "habitable room height", "ceiling height", "VRF plenum", "Neufert bed clearance", "Nairutya master bed"]
        }
    },
    {
        "id": "AGNAA-CANON-02",
        "slug": "culinary-machine-work-triangle-agni-exhaust",
        "title": "The Culinary Machine: Ergonomic Work Triangles & Agni Exhaust Physics",
        "subtitle": "Synthesizing NBC Clause 12.3, Neufert Counter Clearances, Ching Space-Within-Space, and Samarangana Sutradhara SE Siting",
        "discipline": "spatial_planning",
        "plate_code": "PLATE 03-02",
        "statutory": {
            "codeClause": "NBC 2026, Vol. 1, Part 3, Clause 12.3 (Kitchens)",
            "sourceBook": "National Building Code of India 2026 (SP 7: 2026)",
            "mandatoryRule": "Every kitchen must have a minimum floor area of 5.0 m² with a minimum width of 1.8 m (7.5 m² and 2.1 m width when combined with dining). Clear height >= 2.75 m. External window area >= 1.0 m². Strictly prohibited from opening directly into a water closet.",
            "hyderabadStatutoryRule": "GHMC G.O. 168 mandates that kitchens have direct connection to an external utility/wash balcony with minimum 1.2 m clear width and fire-safe grease trap.",
            "parameters": [
                {"label": "Standalone Kitchen Min Area", "value": "5.0 m²", "legalStatus": "mandatory_minimum"},
                {"label": "Combined Kitchen-Dining Min Area", "value": "7.5 m²", "legalStatus": "mandatory_minimum"},
                {"label": "Minimum Counter Frontage Width", "value": "1.8 m", "legalStatus": "mandatory_minimum"},
                {"label": "Direct External Window Area", "value": "1.0 m² minimum", "legalStatus": "mandatory_minimum"}
            ]
        },
        "ergonomics": {
            "sourceBook": "Time-Saver Standards for Interior Design & Neufert Architects' Data",
            "ergonomicRationale": "The kitchen is an industrial work machine. A 1200 mm aisle between opposing counters allows simultaneous oven door swing (450 mm) and person circulation. The work triangle (refrigerator -> sink -> cooktop) perimeter must sum between 4.0 m and 7.9 m.",
            "keyDimensions": [
                {"label": "Dual-Cook Parallel Aisle", "dimension": "1200 mm (4 ft 0 in)", "clearanceStandard": "Simultaneous oven door swing + walking buffer"},
                {"label": "Sink to Hob Prep Counter", "dimension": "900 mm (3 ft 0 in)", "clearanceStandard": "Uninterrupted food preparation cutting board surface"},
                {"label": "Work Triangle Perimeter", "dimension": "4.0 m to 7.9 m", "clearanceStandard": "Prevents redundant steps and fatigue"}
            ]
        },
        "spatialTheory": {
            "sourceBook": "Francis D.K. Ching: Architecture - Form, Space, and Order (4th Ed.)",
            "coreConcept": "Space-Within-a-Space & Architectural Threshold Hierarchy",
            "architecturalPrinciple": "In luxury contemporary homes, the culinary space bifurcates into two distinct experiential envelopes: the Public Show Kitchen (visual and social anchor) and the Concealed Wet Scullery (high-heat functional engine).",
            "proportionRatio": "1 : 1.20 (Island to Perimeter Ratio)"
        },
        "classicalVastu": {
            "treatiseName": "Samarāṅgaṇa Sūtradhāra (King Bhoja)",
            "chapterVerseCitation": "Samarāṅgaṇa Sūtradhāra Ch. 38 (Grihasamstha), Verses 22-25",
            "classicalSanskritConcept": "Agni Kona (South-East Quad)",
            "bioclimaticAndSolarRationale": "In peninsular India, prevailing summer winds blow from South-West toward North-East. Siting the kitchen in the South-East ensures culinary exhaust, steam, and particulate matter are naturally swept outward and away from master living suites.",
            "openInterpretationNote": "Second permissible alternative is North-West (Vayu), using cross-ventilation breezes."
        },
        "agnaaBenchmark": {
            "principalArchitect": "Ar. Sridhar (SPA Delhi Alumnus, NIRF #1)",
            "firmStandard": "The AGNAA Dual-Kitchen Typology",
            "volumetricElevation": "Show Kitchen anchored by a monolithic 3.0 m x 1.2 m quartz island facing living-dining, seamlessly paired with a concealed heavy-duty Wet Scullery equipped with commercial 1200-CFM exterior ducted extraction.",
            "hyderabadMicroclimateExecution": "Custom double-sealed acoustic motorized pocket sliders isolate high-spice Indian cooking odors while maintaining visual glass continuity.",
            "materialTectonics": "Stain-proof sintered Dekton countertops, seamless touch-to-open fluted timber cabinetry, and integrated downdraft extraction units."
        },
        "layaRules": {
            "intentChoiceCategory": "culinary_space",
            "decisionChecks": [
                {"question": "Is the work triangle perimeter between 4.0 m and 7.9 m?", "expectedBoolean": True, "failingRemedy": "Reposition refrigerator or prep sink closer to primary induction hob."},
                {"question": "Is the opposing counter aisle >= 1200 mm?", "expectedBoolean": True, "failingRemedy": "Widen kitchen clearance to prevent traffic collision during cooking."},
                {"question": "Is the primary cooking zone placed in the South-East (Agni) quadrant?", "expectedBoolean": True, "failingRemedy": "Relocate gas/induction hob to South-East corner with dedicated vertical exhaust."}
            ],
            "relevanceKeywords": ["kitchen design", "work triangle", "Neufert kitchen", "Agni kitchen", "wet kitchen scullery", "kitchen island clearance"]
        }
    },
    {
        "id": "AGNAA-CANON-03",
        "slug": "vertical-sculpture-tread-riser-blondel-headroom",
        "title": "Vertical Sculpture: Tread-Riser Blondel Cadence & Headroom Arcs",
        "subtitle": "Synthesizing NBC Clause 4.4.3, Blondel Locomotive Formula, Neufert Ergonomics, and Vishwakarma Prakash Dakshinavarta Treatises",
        "discipline": "vertical_circulation",
        "plate_code": "PLATE 04-01",
        "statutory": {
            "codeClause": "NBC 2026, Vol. 1, Part 4, Clause 4.4.3 (Staircases)",
            "sourceBook": "National Building Code of India 2026 (SP 7: 2026)",
            "mandatoryRule": "Residential internal staircases must have a minimum clear flight width of 1.0 m (1000 mm). Maximum riser height 190 mm (150 mm recommended for public safety), minimum tread 250 mm (300 mm recommended). Clear continuous headroom throughout the flight and landings must be >= 2.2 m (2200 mm). Handrail height 900-1000 mm.",
            "hyderabadStatutoryRule": "Under GHMC G.O. 168, fire escape staircases in buildings exceeding 15 m height must be enclosed with minimum 2-hour fire-rated RCC walls and self-closing 2-hour fire doors.",
            "parameters": [
                {"label": "Statutory Minimum Flight Width", "value": "1000 mm (Residential) / 1500 mm (Public)", "legalStatus": "mandatory_minimum"},
                {"label": "Statutory Maximum Riser", "value": "190 mm (Residential Cap) / 150 mm (Public)", "legalStatus": "mandatory_minimum"},
                {"label": "Statutory Minimum Tread", "value": "250 mm (Residential) / 300 mm (Public)", "legalStatus": "mandatory_minimum"},
                {"label": "Continuous Headroom Arc", "value": "2200 mm minimum", "legalStatus": "mandatory_minimum"}
            ]
        },
        "ergonomics": {
            "sourceBook": "Neufert Architects' Data & François Blondel: Cours d'Architecture",
            "ergonomicRationale": "Human locomotive cadence is governed by François Blondel's 1675 formula: 2R + T = 600 mm to 640 mm (matching human walking stride length). A 150 mm riser combined with a 300 mm tread produces exactly 2(150) + 300 = 600 mm, optimal for rhythmic ascent without cardiac strain.",
            "keyDimensions": [
                {"label": "Blondel Formula Target", "dimension": "2R + T = 600 - 640 mm", "clearanceStandard": "Universal human locomotive stride efficiency"},
                {"label": "Optimal Precision Riser", "dimension": "150 mm (5.9 in)", "clearanceStandard": "Prevents shin-splint fatigue and trip hazard"},
                {"label": "Full Foot Contact Tread", "dimension": "300 mm (11.8 in)", "clearanceStandard": "Ensures full heel-to-toe contact during rapid descent"}
            ]
        },
        "spatialTheory": {
            "sourceBook": "Francis D.K. Ching: Architecture - Form, Space, and Order (4th Ed.)",
            "coreConcept": "The Staircase as Kinetic Sculpture & Vertical Void Piercing",
            "architecturalPrinciple": "The staircase is not merely a utility core; it is an active kinetic sculpture that pierces the floor slabs, drawing natural light deep into subterranean levels and providing changing vertical perspectives.",
            "proportionRatio": "2 : 1 (Tread to Riser Proportion)"
        },
        "classicalVastu": {
            "treatiseName": "Vishwakarma Prakash",
            "chapterVerseCitation": "Vishwakarma Prakash Ch. 6, Verses 34-38 & Samarāṅgaṇa Sūtradhāra Ch. 45",
            "classicalSanskritConcept": "Dakshinavarta (Clockwise Ascent) & Sthira Pada Anchor",
            "bioclimaticAndSolarRationale": "Ascent must proceed in a clockwise direction (Dakshinavarta), aligning with human right-side vestibular equilibrium. Heavy structural staircase mass must be anchored in the South or West sectors.",
            "openInterpretationNote": "Staircases must never be placed directly over the center (Brahmasthan Void) or North-East (Ishan)."
        },
        "agnaaBenchmark": {
            "principalArchitect": "Ar. Sridhar (SPA Delhi Alumnus, NIRF #1)",
            "firmStandard": "The AGNAA Floating Cantilever Tectonic",
            "volumetricElevation": "1200 mm to 1350 mm wide cantilevered treads emerging seamlessly from a reinforced concrete shear wall, clad in flamed leathered granite with zero visible stringers.",
            "hyderabadMicroclimateExecution": "Stairwell designed as a 3-storey central light chimney, crowned with automated operable clerestory louvers creating stack-effect ventilation.",
            "materialTectonics": "Continuous recessed brass handrail channel with concealed 2700K downward grazing LED illumination and frameless low-iron structural glass balustrades."
        },
        "layaRules": {
            "intentChoiceCategory": "staircase_design",
            "decisionChecks": [
                {"question": "Does the flight satisfy Blondel's 2R + T = 600 to 640 mm?", "expectedBoolean": True, "failingRemedy": "Adjust riser/tread count to achieve 150mm riser and 300mm tread."},
                {"question": "Is the continuous clear headroom >= 2200 mm across all steps and landings?", "expectedBoolean": True, "failingRemedy": "Shift upper floor slab cut-out opening back by one tread length."},
                {"question": "Does the flight ascend in a clockwise (Dakshinavarta) direction?", "expectedBoolean": True, "failingRemedy": "Mirror stair orientation so ascent turns right."}
            ],
            "relevanceKeywords": ["staircase design", "Blondel formula", "tread riser", "NBC staircase", "Vastu staircase", "cantilever stair"]
        }
    },
    {
        "id": "AGNAA-CANON-04",
        "slug": "wet-environments-luxury-ablution-pipe-shafts",
        "title": "Wet Environments: Luxury Ablution & External Pipe Shafts",
        "subtitle": "Synthesizing NBC Clause 12.4 & Part 9, Neufert Wet Zones, Chudley Multi-Tier Tanking, and Vastu Drainage Siting",
        "discipline": "services_hydraulics",
        "plate_code": "PLATE 03-03",
        "statutory": {
            "codeClause": "NBC 2026, Vol. 1, Part 3, Clause 12.4 & Part 9 (Plumbing)",
            "sourceBook": "National Building Code of India 2026 (SP 7: 2026)",
            "mandatoryRule": "Bathroom min area 1.8 m² (width 1.2 m); WC min 1.1 m² (width 0.9 m); combined bath+WC min 2.8 m² (width 1.2 m). Clear height >= 2.1 m. Ventilator area >= 0.3 m² direct to exterior or open shaft (min shaft area 1.2 m²). Must not be sited directly above habitable rooms without water-tight slab.",
            "hyderabadStatutoryRule": "GHMC G.O. 168 mandates external plumbing shafts to be fully inspectable with continuous ventilation and connection to dual-pipe graywater/blackwater recycling systems.",
            "parameters": [
                {"label": "Combined Bath + WC Min Area", "value": "2.8 m²", "legalStatus": "mandatory_minimum"},
                {"label": "Standalone Bathroom Min Area", "value": "1.8 m²", "legalStatus": "mandatory_minimum"},
                {"label": "Water Closet Min Area", "value": "1.1 m²", "legalStatus": "mandatory_minimum"},
                {"label": "Minimum Ventilator Opening", "value": "0.3 m² to exterior", "legalStatus": "mandatory_minimum"}
            ]
        },
        "ergonomics": {
            "sourceBook": "Neufert Architects' Data (4th Ed.) - Sanitary Installations",
            "ergonomicRationale": "Wet-room ergonomics requires tripartite zoning: Dry (Vanity), Semi-Wet (WC), and Wet (Shower/Tub). 900 mm clear frontage is required before vanities. WC requires 450 mm from bowl centerline to side walls and 900 mm frontal knee clearance.",
            "keyDimensions": [
                {"label": "WC Centerline to Side Clearances", "dimension": "450 mm (1 ft 6 in)", "clearanceStandard": "Unrestricted elbow freedom and paper reach"},
                {"label": "Shower Recessed Floor Drop", "dimension": "50 mm (2 in)", "clearanceStandard": "Prevents flood overflow into dry vanity area"},
                {"label": "Vanity Counter Ergonomic Height", "dimension": "850 - 900 mm", "clearanceStandard": "Prevents lower back hunching during washing"}
            ]
        },
        "spatialTheory": {
            "sourceBook": "Andrea Deplazes: Constructing Architecture & Edward Allen: Detailing",
            "coreConcept": "Tectonic Waterproofing & Acoustic Decoupling",
            "architecturalPrinciple": "Waterproofing must never be treated as a paint coat; it is a multi-tier continuous membrane envelope. Pipe shafts must be acoustically decoupled from bedroom partition walls to silence flush water rushing.",
            "proportionRatio": "1 : 2 (Dry to Wet Spatial Ratio)"
        },
        "classicalVastu": {
            "treatiseName": "Samarāṅgaṇa Sūtradhāra & Mayamata",
            "chapterVerseCitation": "Samarāṅgaṇa Sūtradhāra Ch. 38, Verses 30-33",
            "classicalSanskritConcept": "Vayu Kona (North-West) & Invert Slope Direction",
            "bioclimaticAndSolarRationale": "Ablution and waste elimination zones are traditionally sited in the North-West (Vayu Kona), where brisk evening winds dry damp moisture. Drainage outflow pipes must slope North or East.",
            "openInterpretationNote": "Strictly avoid plumbing lines and toilets in North-East (Ishan) and South-West (Nairutya)."
        },
        "agnaaBenchmark": {
            "principalArchitect": "Ar. Sridhar (SPA Delhi Alumnus, NIRF #1)",
            "firmStandard": "The AGNAA 5-Fixture Spa Protocol",
            "volumetricElevation": "Master bathroom sized at 18 m² to 24 m² featuring freestanding monolithic stone tub, double floating quartz vanity, enclosed private WC cabin with acoustic glass, and walk-in rain shower.",
            "hyderabadMicroclimateExecution": "Dual-layer SBS polymer-modified bituminous tanking with 300 mm coved skirting upturns, coupled with linear concealed stainless steel tile drains.",
            "materialTectonics": "Large-format sintered stone slabs with book-matched veins, zero grout lines, and unlacquered brushed brass Dornbracht tapware."
        },
        "layaRules": {
            "intentChoiceCategory": "wet_area_plumbing",
            "decisionChecks": [
                {"question": "Is the bathroom floor recessed 50 mm below adjoining bedroom FFL?", "expectedBoolean": True, "failingRemedy": "Cast sunken slab or install marble threshold water stop."},
                {"question": "Are soil and waste pipe stacks routed through external inspectable shafts?", "expectedBoolean": True, "failingRemedy": "Re-route plumbing stacks into external 600x900 mm masonry shaft."},
                {"question": "Is the WC positioned away from the North-East (Ishan) sector?", "expectedBoolean": True, "failingRemedy": "Relocate toilet fixture to North-West or West zone."}
            ],
            "relevanceKeywords": ["bathroom design", "plumbing shaft", "Neufert toilet", "sunken slab", "waterproofing", "Vastu bathroom"]
        }
    },
    {
        "id": "AGNAA-CANON-05",
        "slug": "life-safety-egress-travel-arcs-fire-corridors",
        "title": "Life Safety Egress: Travel Distance Arcs & Fire Corridors",
        "subtitle": "Synthesizing NBC Part 4 Clause 4.4.2, Time-Saver Evacuation Capacities, Ching Circulation Spines, and Mahamarma Clear Axes",
        "discipline": "fire_life_safety",
        "plate_code": "PLATE 04-02",
        "statutory": {
            "codeClause": "NBC 2026, Vol. 1, Part 4, Clause 4.4.2 & Table 5 (Egress)",
            "sourceBook": "National Building Code of India 2026 (SP 7: 2026)",
            "mandatoryRule": "Maximum travel distance to an enclosed fire staircase must not exceed 30.0 m in un-sprinklered buildings (45.0 m in fully sprinklered buildings). Dead-end corridor length is strictly capped at 6.0 m (un-sprinklered) or 15.0 m (sprinklered). Minimum corridor width 1.0 m (residential), 1.5 m (commercial).",
            "hyderabadStatutoryRule": "Telangana Fire Services Act & GHMC G.O. 168 mandate dual independent remote exits for any floor plate exceeding 500 m² or occupancy > 50 persons.",
            "parameters": [
                {"label": "Max Travel Distance (Un-sprinklered)", "value": "30.0 m (98 ft 5 in)", "legalStatus": "mandatory_minimum"},
                {"label": "Max Travel Distance (Sprinklered)", "value": "45.0 m (147 ft 7 in)", "legalStatus": "mandatory_minimum"},
                {"label": "Max Dead-End Corridor Limit", "value": "6.0 m (19 ft 8 in)", "legalStatus": "strict_prohibition"},
                {"label": "Minimum Clear Corridor Width", "value": "1.0 m (Res) / 1.5 m (Comm)", "legalStatus": "mandatory_minimum"}
            ]
        },
        "ergonomics": {
            "sourceBook": "Time-Saver Standards for Building Types - Egress and Evacuation Dynamics",
            "ergonomicRationale": "Corridor width dictates crowd evacuation flow rate. Standard exit unit is 500 mm (width of adult shoulders). Each 500 mm unit accommodates 45 persons per minute. Opposing corridor clearance requires min 1200 mm for two people to pass without twisting torso.",
            "keyDimensions": [
                {"label": "Unit Exit Width", "dimension": "500 mm (1 ft 8 in)", "clearanceStandard": "Discharges 45 persons per minute in panic flow"},
                {"label": "Two-Person Passing Clearance", "dimension": "1200 mm (4 ft 0 in)", "clearanceStandard": "Two adults passing without shoulder brushing"},
                {"label": "Door Swing Encroachment", "dimension": "Max 50% corridor width", "clearanceStandard": "Door swing must not choke required evacuation width"}
            ]
        },
        "spatialTheory": {
            "sourceBook": "Francis D.K. Ching: Architecture - Form, Space, and Order & Juhani Pallasmaa",
            "coreConcept": "Circulation as Architectural Promenade & Sensory Orienting Axis",
            "architecturalPrinciple": "Circulation corridors must not be treated as narrow, claustrophobic tubes. Ching mandates terminating every corridor on a natural light aperture, garden courtyard, or focal art niche.",
            "proportionRatio": "1 : 8 (Width to Length Corridor Ratio Max)"
        },
        "classicalVastu": {
            "treatiseName": "Brihat Samhitā (Varahamihira) & Vishwakarma Prakash",
            "chapterVerseCitation": "Brihat Samhitā Ch. 53, Verses 55-60 & Vishwakarma Prakash Ch. 3",
            "classicalSanskritConcept": "Mahamarma Axis Purity (Brahmasutra / Yamasutra)",
            "bioclimaticAndSolarRationale": "Primary axial energy channels (Sutra) crossing East-West and North-South must remain unencumbered by structural masonry or column shafts. Clean unobstructed circulation ensures balanced ventilation flows.",
            "openInterpretationNote": "Ensure unobstructed line of sight from arrival foyer to living garden threshold."
        },
        "agnaaBenchmark": {
            "principalArchitect": "Ar. Sridhar (SPA Delhi Alumnus, NIRF #1)",
            "firmStandard": "The AGNAA Dual-Escape Sanctuary Benchmark",
            "volumetricElevation": "In all luxury villas, internal travel distance is restricted to a maximum of 22 metres (far exceeding the statutory 30m code), ensuring children and elderly reach exits in under 15 seconds.",
            "hyderabadMicroclimateExecution": "All corridors feature full-height glazed pocket panels opening into landscaped green courtyards, transforming fire egress paths into serene art galleries.",
            "materialTectonics": "Flush ceiling-concealed magnetic track lighting, acoustic fabric wall wraps, and concealed frameless 2-hour fire-rated pivot doors."
        },
        "layaRules": {
            "intentChoiceCategory": "fire_life_safety_egress",
            "decisionChecks": [
                {"question": "Is the travel distance from any point to an exit <= 30.0 m?", "expectedBoolean": True, "failingRemedy": "Add secondary egress staircase or reconfigure room layout."},
                {"question": "Are all dead-end corridors <= 6.0 m in length?", "expectedBoolean": True, "failingRemedy": "Open dead-end corridor to exterior balcony or add return loop."},
                {"question": "Is the primary circulation axis free from structural column encroachments?", "expectedBoolean": True, "failingRemedy": "Adjust structural column grid to clear primary corridor spine."}
            ],
            "relevanceKeywords": ["travel distance", "dead-end corridor", "NBC fire safety", "fire exit width", "egress geometry", "Mahamarma axis"]
        }
    },
    {
        "id": "AGNAA-CANON-06",
        "slug": "subterranean-anatomy-basement-tanking-drainage",
        "title": "Subterranean Anatomy: Basement Tanking & Sump Drainage",
        "subtitle": "Synthesizing NBC Clause 12.8 & Part 6, Chudley Sub-Structure Tanking, Edward Allen Waterstops, and GHMC Setback Bylaws",
        "discipline": "spatial_planning",
        "plate_code": "PLATE 03-04",
        "statutory": {
            "codeClause": "NBC 2026, Vol. 1, Part 3, Clause 12.8 & Part 6 (Foundations)",
            "sourceBook": "National Building Code of India 2026 (SP 7: 2026)",
            "mandatoryRule": "Basement clear height minimum 2.4 m, maximum 4.5 m (commercial). Natural ventilation must be minimum 10% of external wall area or mechanical system delivering 6 air changes per hour. Retaining walls must be structural RCC engineered against lateral earth and hydrostatic pressures.",
            "hyderabadStatutoryRule": "GHMC G.O. 168 mandates that basements must not encroach into statutory open setbacks around the building perimeter, maintaining clear ground absorption margins.",
            "parameters": [
                {"label": "Basement Minimum Clear Height", "value": "2.40 m (7 ft 10 in)", "legalStatus": "mandatory_minimum"},
                {"label": "Mechanical Ventilation ACH", "value": "6 Air Changes / Hour minimum", "legalStatus": "mandatory_minimum"},
                {"label": "Statutory Setback Clearance", "value": "Strict prohibition of basement encroachment", "legalStatus": "strict_prohibition"},
                {"label": "Waterproofing Warranty Standard", "value": "100% tanking envelope", "legalStatus": "mandatory_minimum"}
            ]
        },
        "ergonomics": {
            "sourceBook": "Time-Saver Standards & Neufert Architects' Data - Underground Spaces",
            "ergonomicRationale": "Subterranean habitable spaces (cinemas, wine cellars, gymnasiums) require artificial environmental compensation: 3.0 m to 3.2 m ceiling headroom prevents subterranean claustrophobia; acoustic dampening is essential due to solid concrete floor and wall reflections.",
            "keyDimensions": [
                {"label": "Luxury Subterranean Clear Headroom", "dimension": "3200 mm (10 ft 6 in)", "clearanceStandard": "Eliminates subterranean compression"},
                {"label": "Sump Pit Clearance Margin", "dimension": "1200 x 1200 x 1500 mm", "clearanceStandard": "Accommodates dual submersible pumps with backup float switches"},
                {"label": "Perforated French Drain Diameter", "dimension": "150 mm (6 in)", "clearanceStandard": "Continuous gravitational sub-soil relief"}
            ]
        },
        "spatialTheory": {
            "sourceBook": "Roy Chudley & Roger Greeno: Building Construction Handbook",
            "coreConcept": "Sub-Structure Hydrostatic Physics & Tanking Barrier Systems",
            "architecturalPrinciple": "Water exerts relentless hydrostatic pressure against subterranean walls. Waterproofing must employ a dual-barrier system: external geotextile drainage boards reducing hydrostatic head, backed by crystalline elastomeric SBS tanking.",
            "proportionRatio": "1 : 1 (Hydrostatic Pressure Relief Ratio)"
        },
        "classicalVastu": {
            "treatiseName": "Mayamata & Manasara (Bhoomi Pariksha)",
            "chapterVerseCitation": "Mayamata Ch. 3, Verses 15-20 & Samarāṅgaṇa Sūtradhāra Ch. 8",
            "classicalSanskritConcept": "Bhoomi Garbha (Subterranean Mass Stability)",
            "bioclimaticAndSolarRationale": "Subterranean excavations alter earth geomagnetic equilibrium. Ancient treatises strictly prohibit water storage sumps in South-West. Heavy plant rooms and pump machinery belong in North-West or South-West, while water harvest sumps belong in North-East.",
            "openInterpretationNote": "Rainwater harvesting cisterns in NE (Ishan) maintain positive gravitational drainage."
        },
        "agnaaBenchmark": {
            "principalArchitect": "Ar. Sridhar (SPA Delhi Alumnus, NIRF #1)",
            "firmStandard": "The AGNAA Subterranean Sanctuary Protocol",
            "volumetricElevation": "Basements cast at 3.65 m slab-to-slab to provide 3.2 m finished headroom after installing floating acoustic sub-floors and ducted fresh-air ERV systems (Energy Recovery Ventilators).",
            "hyderabadMicroclimateExecution": "Hydrophilic swelling bentonite waterstops at all construction kicker joints, coupled with dual German submersible sewage and drainage pumps with auto-start diesel generators.",
            "materialTectonics": "Textured board-marked concrete feature walls, natural lightwell light scoops with bamboo planting, and micro-perforated acoustic timber paneling."
        },
        "layaRules": {
            "intentChoiceCategory": "subterranean_basement",
            "decisionChecks": [
                {"question": "Is the basement clear finished height >= 2.75 m?", "expectedBoolean": True, "failingRemedy": "Deepen basement excavation to achieve minimum 3.0 m clear height."},
                {"question": "Is a dual-pump sump pit provided with emergency backup power?", "expectedBoolean": True, "failingRemedy": "Detail 1.2x1.2m sump pit with twin submersible grinder pumps."},
                {"question": "Are retaining walls protected with continuous external drainage boards?", "expectedBoolean": True, "failingRemedy": "Specify dimpled HDPE drainage board and French drain pipe at footing."}
            ],
            "relevanceKeywords": ["basement height", "retaining wall", "tanking", "French drain", "subterranean ventilation", "GHMC basement setback"]
        }
    },
    {
        "id": "AGNAA-CANON-07",
        "slug": "vehicular-ingress-ramp-gradients-turning-radii",
        "title": "Vehicular Ingress: Ramp Gradients & Turning Radii",
        "subtitle": "Synthesizing NBC Part 3 / Part 10, Neufert Vehicular Dynamics, Ching Spatial Sequence, and Manasara Vahana Pravesha",
        "discipline": "spatial_planning",
        "plate_code": "PLATE 03-05",
        "statutory": {
            "codeClause": "NBC 2026, Vol. 1, Part 3 & Part 10 (Parking and Vehicular Access)",
            "sourceBook": "National Building Code of India 2026 (SP 7: 2026)",
            "mandatoryRule": "Maximum ramp slope for four-wheelers must not exceed 1:10 (10%); 1:8 (12.5%) for two-wheelers. Minimum ramp clear width 3.0 m (one-way) or 6.0 m (two-way). Standard parking bay dimensions: 2.5 m x 5.0 m. Two-way driveway aisle clear width >= 6.0 m.",
            "hyderabadStatutoryRule": "GHMC G.O. 168 mandates that all commercial and luxury residential layouts provide a minimum 6.0 m turning radius and unobstructed fire tender driveway around the building.",
            "parameters": [
                {"label": "Maximum Vehicular Ramp Gradient", "value": "1:10 (10%) for Four-Wheelers", "legalStatus": "mandatory_minimum"},
                {"label": "Standard Parking Bay Dimensions", "value": "2.5 m x 5.0 m (8 ft 2 in x 16 ft 5 in)", "legalStatus": "mandatory_minimum"},
                {"label": "Two-Way Driveway Aisle Width", "value": "6.0 m (19 ft 8 in) minimum", "legalStatus": "mandatory_minimum"},
                {"label": "Minimum Turning Radius", "value": "6.0 m Outer Radius", "legalStatus": "mandatory_minimum"}
            ]
        },
        "ergonomics": {
            "sourceBook": "Neufert Architects' Data (4th Ed.) - Garages and Parking Facilities",
            "ergonomicRationale": "Modern full-size luxury vehicles (Mercedes S-Class, BMW 7-Series, Range Rover) measure up to 5.3 m in length and 2.1 m in width. A turning radius of 6.0 m prevents multiple three-point turns. Ramp entry and exit require 3.0 m transition slopes at 1:20 (5%) to prevent low-chassis underbody scraping.",
            "keyDimensions": [
                {"label": "Luxury Sedan Turning Radius", "dimension": "6.0 m (19 ft 8 in)", "clearanceStandard": "Uninterrupted single-turn vehicular sweep"},
                {"label": "Ramp Crest & Sag Transition Length", "dimension": "3.0 m at 1:20 (5%) slope", "clearanceStandard": "Prevents vehicle front spoiler and catalytic converter scraping"},
                {"label": "Door Swing Parking Clearance", "dimension": "800 mm between cars", "clearanceStandard": "Full door opening without striking adjacent vehicle"}
            ]
        },
        "spatialTheory": {
            "sourceBook": "Francis D.K. Ching: Architecture - Form, Space, and Order",
            "coreConcept": "The Arrival Sequence as Tectonic Threshold",
            "architecturalPrinciple": "The transition from public street velocity to residential stillness is an architectural rite of passage. The porte-cochère and parking gallery must establish a dignified spatial cadence through lighting, ceiling planes, and textured ground surfaces.",
            "proportionRatio": "1 : 10 (Ramp Rise to Run Ratio)"
        },
        "classicalVastu": {
            "treatiseName": "Manasara & Mayamata",
            "chapterVerseCitation": "Manasara Ch. 12 (Vahana Vidhana), Verses 18-22",
            "classicalSanskritConcept": "Vahana Pravesha (Auspicious Vehicular Ingress)",
            "bioclimaticAndSolarRationale": "Ancient texts dictate vehicular entry (chariot/carriage) in auspicious gate sectors: East-3 (Jayanta) or North-3 (Mukhya). Vehicles must be parked facing North or East to ensure auspicious orientation for departure.",
            "openInterpretationNote": "Vehicular ramps must never descend directly along the North-East boundary wall."
        },
        "agnaaBenchmark": {
            "principalArchitect": "Ar. Sridhar (SPA Delhi Alumnus, NIRF #1)",
            "firmStandard": "The AGNAA Private Auto-Gallery Standard",
            "volumetricElevation": "Ramps engineered at an ultra-gentle 1:12 (8.3%) slope with 6.5 m wide two-way passage, illuminated by continuous indirect warm wall grazing LEDs and finished in flamed bush-hammered granite.",
            "hyderabadMicroclimateExecution": "Air-conditioned 4-to-6 car basement gallery with seamless epoxy-terrazzo floors, high-speed insulated sectional overhead doors, and dedicated EV charging stations.",
            "materialTectonics": "Integrated radiant floor de-icing grooves, fluted timber acoustic wall cladding, and architectural glass viewing windows connecting garage to private study."
        },
        "layaRules": {
            "intentChoiceCategory": "vehicular_circulation",
            "decisionChecks": [
                {"question": "Is the ramp gradient <= 1:10 (10%) with 3.0 m transition slopes?", "expectedBoolean": True, "failingRemedy": "Lengthen ramp run or reduce floor-to-floor drop to meet 1:10 slope."},
                {"question": "Is the turning radius >= 6.0 m for luxury vehicular sweep?", "expectedBoolean": True, "failingRemedy": "Widen turning bay to minimum 6.0 m radius."},
                {"question": "Are standard parking bays >= 2.5 m x 5.0 m with 6.0 m driveway aisle?", "expectedBoolean": True, "failingRemedy": "Re-space column grid to 8.4 m to accommodate 3 clear bays between columns."}
            ],
            "relevanceKeywords": ["ramp slope", "turning radius", "parking bay dimensions", "driveway aisle", "NBC parking", "porte-cochere"]
        }
    },
    {
        "id": "AGNAA-CANON-08",
        "slug": "seismic-resilience-soft-storey-stilts-shear-cores",
        "title": "Earthquake Resilience: Soft-Storey Stilts & Shear Wall Cores",
        "subtitle": "Synthesizing NBC Part 6, IS 1893:2016 2.5x Shear Criteria, IS 13920 Ductile Detailing, and Salvadori Load Paths",
        "discipline": "spatial_planning",
        "plate_code": "PLATE 06-01",
        "statutory": {
            "codeClause": "NBC 2026, Vol. 1, Part 6 & IS 1893 (Part 1): 2016",
            "sourceBook": "National Building Code of India 2026 & Bureau of Indian Standards",
            "mandatoryRule": "All RCC framed structures in Seismic Zones II to V must comply with IS 1893 and IS 13920. Buildings with open ground stilt parking (Soft Storey) are legally mandated by IS 1893 Clause 7.10 to have columns and beams designed for 2.5 times calculated seismic shear forces, or integrate structural shear walls.",
            "hyderabadStatutoryRule": "Hyderabad sits in Seismic Zone II (low to moderate risk); however, GHMC G.O. 168 mandates full IS 1893 and IS 13920 structural compliance certificates for all stilt+multi-storey structures.",
            "parameters": [
                {"label": "Soft Storey Seismic Shear Multiplier", "value": "2.5x Calculated Shear Force", "legalStatus": "mandatory_minimum"},
                {"label": "IS 13920 Confinement Tie Spacing", "value": "100 mm c/c throughout lo zone", "legalStatus": "mandatory_minimum"},
                {"label": "Minimum Column Cross-Section", "value": "300 mm minimum dimension", "legalStatus": "mandatory_minimum"},
                {"label": "Continuous Load Path Mandate", "value": "Zero floating column transfers", "legalStatus": "strict_prohibition"}
            ]
        },
        "ergonomics": {
            "sourceBook": "Neufert Architects' Data - Structural Grids & Parking Optimization",
            "ergonomicRationale": "Structural column grid placement directly governs vehicular parking efficiency and domestic usability. A structural bay of 8.0 m to 8.4 m perfectly accommodates three luxury vehicles (2.5 m each) without column impingement on car door swings.",
            "keyDimensions": [
                {"label": "Optimal 3-Car Column Bay", "dimension": "8000 - 8400 mm c/c", "clearanceStandard": "Accommodates 3 full parking bays between columns"},
                {"label": "Column Confinement Zone (lo)", "dimension": "Max of column depth, width, or 450 mm", "clearanceStandard": "IS 13920 ductile plastic hinge zone"},
                {"label": "Concrete Clear Cover to Ties", "dimension": "40 mm minimum", "clearanceStandard": "Fire and corrosion protection of structural steel"}
            ]
        },
        "spatialTheory": {
            "sourceBook": "Mario Salvadori: Why Buildings Stand Up & Francis D.K. Ching: Building Structures Illustrated",
            "coreConcept": "Continuous Load Paths & Lateral Drift Tectonics",
            "architecturalPrinciple": "Earthquake forces are dynamic inertial loads proportional to building mass. Structural integrity demands continuous, un-interrupted load paths from roof to bedrock. Abrupt discontinuities (floating columns) invite pancake collapse.",
            "proportionRatio": "1 : 2.5 (Seismic Shear Amplification Factor)"
        },
        "classicalVastu": {
            "treatiseName": "Samarāṅgaṇa Sūtradhāra (King Bhoja)",
            "chapterVerseCitation": "Samarāṅgaṇa Sūtradhāra Ch. 49 (Stambha Nirmana), Verses 10-14",
            "classicalSanskritConcept": "Stambha Sthirata & Mahamarma Avoidance",
            "bioclimaticAndSolarRationale": "Ancient treatises emphasize that columns (Stambha) must follow strict vertical axiality and must never be placed directly upon the intersection nodes of diagonal energy lines (Mahamarma).",
            "openInterpretationNote": "Centering structural cores around vertical elevator/stair shafts aligns with central stability."
        },
        "agnaaBenchmark": {
            "principalArchitect": "Ar. Sridhar (SPA Delhi Alumnus, NIRF #1)",
            "firmStandard": "The AGNAA Bedrock Monolith Core Protocol",
            "volumetricElevation": "AGNAA eliminates soft-storey vulnerability by embedding full-height 250 mm reinforced concrete shear cores around elevator and stair shafts, carrying 100% of lateral seismic forces.",
            "hyderabadMicroclimateExecution": "All foundations in Hyderabad are anchored directly into granitic Deccan bedrock with chemical rock anchors, allowing slender 200 mm architectural facade columns.",
            "materialTectonics": "M40 high-performance self-compacting concrete, high-yield Fe550D TMT reinforcement, and board-marked fair-faced concrete finishes."
        },
        "layaRules": {
            "intentChoiceCategory": "structural_seismic_safety",
            "decisionChecks": [
                {"question": "Are ground stilt columns designed for 2.5x shear or braced with shear walls?", "expectedBoolean": True, "failingRemedy": "Introduce full-height RCC shear core flanking stair/lift shafts."},
                {"question": "Is the column grid continuous from foundation to roof with zero floating columns?", "expectedBoolean": True, "failingRemedy": "Re-align upper partition walls to match ground column grid."},
                {"question": "Are ductile confinement ties spaced at <= 100 mm in the end zones?", "expectedBoolean": True, "failingRemedy": "Detail IS 13920 seismic confinement hoops @ 100 mm c/c."}
            ],
            "relevanceKeywords": ["soft storey", "IS 1893", "seismic design", "stilt parking collapse", "shear wall core", "ductile detailing"]
        }
    },
    {
        "id": "AGNAA-CANON-09",
        "slug": "bioclimatic-stack-ventilation-courtyard-heat-sinks",
        "title": "Bioclimatic Physics: Stack-Effect Buoyancy & Courtyard Sinks",
        "subtitle": "Synthesizing NBC Part 8/11, Koenigsberger Tropical Housing, DeKay Sun Wind Light, and Matsya Purana Brahmasthan Canons",
        "discipline": "zoning_climate",
        "plate_code": "PLATE 08-01",
        "statutory": {
            "codeClause": "NBC 2026, Vol. 2, Part 8 & Part 11 (Sustainability & Environment)",
            "sourceBook": "National Building Code of India 2026 & Energy Conservation Building Code (ECBC)",
            "mandatoryRule": "Habitable aggregate fenestration opening area must be >= 10% of floor area. Solar Heat Gain Coefficient (SHGC) for fenestrations <= 0.25 in warm climates. Natural cross-ventilation requires opposing or adjacent fenestrations with minimum 3 air changes per hour.",
            "hyderabadStatutoryRule": "Telangana State ECBC & GHMC G.O. 168 mandate rooftop rainwater harvesting recharge pits and compliance with passive energy codes for all plots exceeding 300 m².",
            "parameters": [
                {"label": "Minimum Fenestration Ratio", "value": "10% of carpet area minimum", "legalStatus": "mandatory_minimum"},
                {"label": "Solar Heat Gain Coefficient (SHGC)", "value": "<= 0.25 (Low-E Double Glazing)", "legalStatus": "mandatory_minimum"},
                {"label": "Ventilation Air Changes per Hour", "value": "3 to 6 ACH natural ventilation", "legalStatus": "mandatory_minimum"},
                {"label": "Daylight Factor (DF)", "value": ">= 1.5% in habitable zones", "legalStatus": "mandatory_minimum"}
            ]
        },
        "ergonomics": {
            "sourceBook": "Neufert Architects' Data & O.H. Koenigsberger: Manual of Tropical Housing",
            "ergonomicRationale": "Thermal comfort in hot-semi-arid climates (Hyderabad) requires physiological cooling via air movement. Air velocities of 0.5 to 1.0 m/s produce a perceived cooling effect of 2°C to 3°C without mechanical refrigeration. Window head height governs daylight penetration depth (D = 2.5 x H).",
            "keyDimensions": [
                {"label": "Daylight Penetration Depth", "dimension": "2.5 x Window Head Height", "clearanceStandard": "Deep plan natural daylight reach"},
                {"label": "Optimal Air Velocity for Comfort", "dimension": "0.5 - 1.0 m/s", "clearanceStandard": "Perceived cooling reduction of 2°C - 3°C"},
                {"label": "Cantilevered Chajja Projection", "dimension": "750 - 900 mm", "clearanceStandard": "Complete cutoff of solar rays > 60° altitude"}
            ]
        },
        "spatialTheory": {
            "sourceBook": "Mark DeKay & G.Z. Brown: Sun, Wind, and Light & Francis D.K. Ching",
            "coreConcept": "Stack Buoyancy Physics & Courtyard Microclimates",
            "architecturalPrinciple": "Warm air expands, becomes less dense, and naturally rises. By placing high-level clerestory louvers above a central atrium, negative pressure draws cool air across ground-floor reflecting pools into the living verandahs.",
            "proportionRatio": "1 : 1.5 (Courtyard Width to Building Height Ratio)"
        },
        "classicalVastu": {
            "treatiseName": "Matsya Purana & Mayamata",
            "chapterVerseCitation": "Matsya Purana Ch. 252, Verses 15-18 & Mayamata Ch. 26",
            "classicalSanskritConcept": "Brahmasthan Void (The Celestial Ether Core)",
            "bioclimaticAndSolarRationale": "Ancient treatises mandate leaving the exact center of the building (Brahmasthan) completely open to the sky, free from walls or columns. Scientifically, this central void acts as the master thermal chimney of the tropical residence.",
            "openInterpretationNote": "Integrating water bodies in NE/Center accelerates natural evaporative microclimatic cooling."
        },
        "agnaaBenchmark": {
            "principalArchitect": "Ar. Sridhar (SPA Delhi Alumnus, NIRF #1)",
            "firmStandard": "The AGNAA Bioclimatic Rain Courtyard Standard",
            "volumetricElevation": "Double-height central rain atriums equipped with automated motorized glass louvers that open at sunset to flush out accumulated daytime heat, lowering ambient temperatures by 4°C to 6°C.",
            "hyderabadMicroclimateExecution": "Deep 900 mm cantilevered horizontal chajjas finished with inverted drip grooves block brutal 78° summer high-noon sun while admitting warm 45° winter morning light.",
            "materialTectonics": "Locally quarried Tandur and Kota stone flooring (high thermal inertia), double-glazed Low-E insulated glass units (SHGC 0.22), and lush native courtyard bio-walls."
        },
        "layaRules": {
            "intentChoiceCategory": "bioclimatic_sustainability",
            "decisionChecks": [
                {"question": "Is the aggregate fenestration area >= 10% of room carpet area?", "expectedBoolean": True, "failingRemedy": "Enlarge exterior window openings or add clerestory daylight slits."},
                {"question": "Are South and West windows protected by deep chajjas (>= 750 mm)?", "expectedBoolean": True, "failingRemedy": "Add architectural louvers or cantilevered concrete sunshades."},
                {"question": "Is the central Brahmasthan core kept open as a vertical thermal chimney?", "expectedBoolean": True, "failingRemedy": "Remove central partition walls to create skylit double-height void."}
            ],
            "relevanceKeywords": ["stack effect", "courtyard ventilation", "Brahmasthan", "Koenigsberger tropical", "chajja shading", "natural cooling"]
        }
    },
    {
        "id": "AGNAA-CANON-10",
        "slug": "architectural-acoustics-stc-55-flanking-isolation",
        "title": "Architectural Acoustics: Mass-Air-Mass & Flanking Isolation",
        "subtitle": "Synthesizing NBC Part 8 Sec 4, M. David Egan Acoustics, Peter Zumthor Atmospheres, and Sanskrit Spatial Harmonics",
        "discipline": "services_hydraulics",
        "plate_code": "PLATE 08-02",
        "statutory": {
            "codeClause": "NBC 2026, Vol. 2, Part 8, Section 4 (Acoustics & Sound Insulation)",
            "sourceBook": "National Building Code of India 2026 (SP 7: 2026)",
            "mandatoryRule": "Inter-dwelling party walls and partitions between bedrooms and living areas must achieve a Sound Transmission Class (STC) >= 50 dBA. Indoor ambient background noise levels must not exceed 35 dBA in bedrooms and 45 dBA in living spaces.",
            "hyderabadStatutoryRule": "GHMC G.O. 168 mandates acoustic isolation barriers for all residential buildings adjacent to major arterial roads (100-ft and 150-ft Master Plan roads).",
            "parameters": [
                {"label": "Party Wall Sound Transmission Class", "value": "STC >= 50 dBA", "legalStatus": "mandatory_minimum"},
                {"label": "Maximum Bedroom Ambient Noise", "value": "<= 35 dBA", "legalStatus": "mandatory_minimum"},
                {"label": "Living Room Ambient Noise Limit", "value": "<= 45 dBA", "legalStatus": "mandatory_minimum"},
                {"label": "Acoustic Sealant Bead Standard", "value": "100% perimeter sealing", "legalStatus": "mandatory_minimum"}
            ]
        },
        "ergonomics": {
            "sourceBook": "M. David Egan: Architectural Acoustics & Neufert Architects' Data",
            "ergonomicRationale": "Human sleep quality degrades when background noise spikes exceed 40 dBA. Mass Law dictates that doubling wall mass increases acoustic isolation by 6 dB; however, true luxury isolation requires mechanical decoupling via staggered studs or resilient sound clips with mineral wool absorption.",
            "keyDimensions": [
                {"label": "Acoustic Cavity Rockwool Density", "dimension": "48 kg/m³ density, 50 mm thick", "clearanceStandard": "Mass-Air-Mass resonance absorption"},
                {"label": "Staggered Stud Decoupling Offset", "dimension": "25 mm air gap", "clearanceStandard": "Eliminates direct mechanical sound vibration transmission"},
                {"label": "Electrical Back-to-Back Offset", "dimension": "600 mm minimum stagger", "clearanceStandard": "Prevents acoustic flanking leaks across junction boxes"}
            ]
        },
        "spatialTheory": {
            "sourceBook": "Peter Zumthor: Atmospheres & Juhani Pallasmaa: The Eyes of the Skin",
            "coreConcept": "Acoustic Intimacy & Material Resonance",
            "architecturalPrinciple": "Sound gives space its presence. An echoey, noisy interior feels cheap and chaotic. Architectural luxury is silence. True luxury architecture absorbs acoustic turbulence and surrounds inhabitants with tranquil auditory warmth.",
            "proportionRatio": "STC 58 : 1 (Acoustic Decoupling Ratio)"
        },
        "classicalVastu": {
            "treatiseName": "Manasara & Samarāṅgaṇa Sūtradhāra",
            "chapterVerseCitation": "Manasara Ch. 34 (Shayanashala Vidhana), Verses 8-12",
            "classicalSanskritConcept": "Shabda Shanti (Auditory Harmony of Sleeping Chambers)",
            "bioclimaticAndSolarRationale": "Ancient texts demand that sleeping chambers be shielded from cacophony and street noise to prevent psychic restlessness and preserve restorative sleep cycles.",
            "openInterpretationNote": "Position acoustic buffers (closets, bathrooms) along noisy external road frontages."
        },
        "agnaaBenchmark": {
            "principalArchitect": "Ar. Sridhar (SPA Delhi Alumnus, NIRF #1)",
            "firmStandard": "The AGNAA STC 58 Silent Sanctuary Benchmark",
            "volumetricElevation": "All private suite walls engineered with double staggered steel studs, 50 mm 48 kg/m³ acoustic mineral wool, resilient isolation clips, and two layers of 15 mm high-density acoustic drywall with damping polymer.",
            "hyderabadMicroclimateExecution": "All doors fitted with drop-down automatic acoustic perimeter drop seals, and air conditioning ducts fitted with inline silencer attenuator boxes.",
            "materialTectonics": "Perforated micro-grooved acoustic oak wall paneling, heavy Belgian linen acoustic drapery, and solid 45 mm thick timber flush doors."
        },
        "layaRules": {
            "intentChoiceCategory": "architectural_acoustics",
            "decisionChecks": [
                {"question": "Do bedroom party walls achieve STC >= 50 dBA?", "expectedBoolean": True, "failingRemedy": "Specify staggered stud wall with 50mm acoustic mineral wool infill."},
                {"question": "Are back-to-back electrical switch boxes staggered by >= 600 mm?", "expectedBoolean": True, "failingRemedy": "Offset electrical boxes to different stud cavities and seal with putty pads."},
                {"question": "Are private bedroom suites acoustically buffered from noisy road frontages?", "expectedBoolean": True, "failingRemedy": "Place dressing rooms or bathrooms along noisy facade as acoustic buffer."}
            ],
            "relevanceKeywords": ["STC 50", "acoustic insulation", "soundproofing", "Egan acoustics", "bedroom noise 35dBA", "flanking sound"]
        }
    },
    {
        "id": "AGNAA-CANON-11",
        "slug": "daylight-engineering-2-5h-depth-circadian-illuminance",
        "title": "Daylight Engineering: 2.5H Depth & Circadian Illuminance",
        "subtitle": "Synthesizing NBC Part 8 Sec 1, Neufert Daylighting, Livingston & Karlen Lighting Basics, and Vedic Solar Harmonics",
        "discipline": "zoning_climate",
        "plate_code": "PLATE 08-03",
        "statutory": {
            "codeClause": "NBC 2026, Vol. 2, Part 8, Section 1 (Lighting & Daylighting)",
            "sourceBook": "National Building Code of India 2026 & ECBC 2026",
            "mandatoryRule": "Daylight Factor (DF) must be >= 1.5% in habitable spaces. Lighting Power Density (LPD) must not exceed 6.0 W/m² for residential interiors. Unified Glare Rating (UGR) <= 19 in reading and study zones.",
            "hyderabadStatutoryRule": "Telangana State ECBC mandates high-efficacy LED lighting systems with daylight-sensing dimming in all perimeter zones within 4.5 m of fenestrations.",
            "parameters": [
                {"label": "Minimum Daylight Factor", "value": ">= 1.5% in Habitable Rooms", "legalStatus": "mandatory_minimum"},
                {"label": "Lighting Power Density (LPD)", "value": "<= 6.0 W/m² maximum", "legalStatus": "mandatory_minimum"},
                {"label": "Unified Glare Rating (UGR)", "value": "<= 19 in Work/Study Zones", "legalStatus": "mandatory_minimum"},
                {"label": "Daylight Zone Perimeter Margin", "value": "4.5 m from fenestration", "legalStatus": "mandatory_minimum"}
            ]
        },
        "ergonomics": {
            "sourceBook": "Jason Livingston: Designing with Light & Mark Karlen: Lighting Design Basics",
            "ergonomicRationale": "Visual ergonomics requires a layered lighting hierarchy: Ambient (150-200 lux), Task (400-500 lux on kitchen counters and desks), and Accent (5:1 luminance contrast ratio). Natural daylight penetrates effectively up to 2.5 times the window head height.",
            "keyDimensions": [
                {"label": "Daylight Effective Depth (D)", "dimension": "2.5 x Window Head Height (H)", "clearanceStandard": "Deep floor plate natural daylight reach"},
                {"label": "Task Lighting Lux Target", "dimension": "400 - 500 Lux", "clearanceStandard": "Visual acuity without eye strain for culinary/study tasks"},
                {"label": "Ambient Living Lux Target", "dimension": "150 - 200 Lux", "clearanceStandard": "Warm, restful glare-free domestic atmosphere"}
            ]
        },
        "spatialTheory": {
            "sourceBook": "Francis D.K. Ching: Architecture - Form, Space, and Order & Louis I. Kahn",
            "coreConcept": "Light as Form-Giver & Tectonic Illumination",
            "architecturalPrinciple": "As Louis Kahn stated, 'The sun never knew how great it was until it struck the side of a building.' Light shelves reflect harsh direct sunlight onto the ceiling slab, turning the concrete soffit into a giant diffuse light emitter.",
            "proportionRatio": "2.5 : 1 (Daylight Depth to Window Head Height Ratio)"
        },
        "classicalVastu": {
            "treatiseName": "Samarāṅgaṇa Sūtradhāra (King Bhoja)",
            "chapterVerseCitation": "Samarāṅgaṇa Sūtradhāra Ch. 29 (Surya Mandala Vidhana), Verses 14-19",
            "classicalSanskritConcept": "Pratah Surya (Morning Solar Ultraviolet Sanitation)",
            "bioclimaticAndSolarRationale": "Vedic treatises revere early morning sunlight from the East (Pratah Surya), which contains beneficial ultraviolet spectrum that sanitizes interior spaces and triggers human serotonin production.",
            "openInterpretationNote": "Maximizing East and North daylight fenestration preserves solar health."
        },
        "agnaaBenchmark": {
            "principalArchitect": "Ar. Sridhar (SPA Delhi Alumnus, NIRF #1)",
            "firmStandard": "The AGNAA Circadian Lighting Protocol",
            "volumetricElevation": "Integrated DALI-2 computerized lighting automation that adjusts indoor color temperature smoothly from 5000K crisp white at 9 AM to 2700K warm candlelight at 8 PM, preserving human melatonin cycles.",
            "hyderabadMicroclimateExecution": "Dual-surface exterior light shelves projecting 600 mm externally and 400 mm internally, eliminating glare while washing interior ceilings in natural light.",
            "materialTectonics": "BuzziSpace acoustic felt light rings, Flos magnetic recessed running tracks, and museum-grade CRI >= 95 directional spotlights."
        },
        "layaRules": {
            "intentChoiceCategory": "lighting_daylight_design",
            "decisionChecks": [
                {"question": "Is the room depth <= 2.5 times window head height for daylight coverage?", "expectedBoolean": True, "failingRemedy": "Add light shelves, skylights, or secondary fenestration."},
                {"question": "Does task lighting achieve 400-500 lux on kitchen counters and desks?", "expectedBoolean": True, "failingRemedy": "Install under-cabinet LED task strips with CRI >= 90."},
                {"question": "Are primary morning daylight apertures oriented toward East or North?", "expectedBoolean": True, "failingRemedy": "Re-orient fenestration or introduce East clerestory slits."}
            ],
            "relevanceKeywords": ["daylight factor", "2.5H rule", "circadian lighting", "lux levels", "light shelf", "Pratah Surya"]
        }
    },
    {
        "id": "AGNAA-CANON-12",
        "slug": "architectural-detailing-capillary-breaks-joint-integrity",
        "title": "Architectural Detailing: Capillary Breaks & Joint Integrity",
        "subtitle": "Synthesizing NBC Part 12, Edward Allen Detailing, Peter Zumthor Tectonics, and Mayamata Sandhi Treatises",
        "discipline": "spatial_planning",
        "plate_code": "PLATE 12-01",
        "statutory": {
            "codeClause": "NBC 2026, Vol. 2, Part 12 (Architectural Detailing & Building Physics)",
            "sourceBook": "National Building Code of India 2026 (SP 7: 2026)",
            "mandatoryRule": "All exterior architectural facades, parapet copings, window sills, and cladding assemblies must incorporate positive water shedding slopes (min 1:50), continuous weatherproofing membranes, and mechanical expansion joints every 30 m in RCC structures.",
            "hyderabadStatutoryRule": "GHMC G.O. 168 mandates durable weather-resistant exterior finishes with mandatory drip molds on all projecting chajjas, balconies, and parapet copings.",
            "parameters": [
                {"label": "Minimum Coping & Sill Slope", "value": "1:50 positive slope outward", "legalStatus": "mandatory_minimum"},
                {"label": "Structural Expansion Joint Interval", "value": "Every 30.0 m in RCC frames", "legalStatus": "mandatory_minimum"},
                {"label": "Drip Groove Dimensions", "value": "10 x 10 mm continuous groove", "legalStatus": "mandatory_minimum"},
                {"label": "Sealant Joint Width-to-Depth Ratio", "value": "2 : 1 with backer rod", "legalStatus": "mandatory_minimum"}
            ]
        },
        "ergonomics": {
            "sourceBook": "Edward Allen & Patrick Rand: Architectural Detailing: Function, Constructability, Aesthetics",
            "ergonomicRationale": "Buildings leak because water exploits capillary action, surface tension, and gravity. Water clinging to the underside of a slab or sill will travel horizontally and penetrate interior finishes unless physically broken by an inverted 10x10 mm drip groove.",
            "keyDimensions": [
                {"label": "Continuous Drip Groove Size", "dimension": "10 x 10 mm", "clearanceStandard": "Breaks capillary surface tension and forces water detachment"},
                {"label": "Drip Groove Setback from Edge", "dimension": "20 mm from outer face", "clearanceStandard": "Prevents spalling of concrete or stone edge"},
                {"label": "Sealant Joint Width-to-Depth", "dimension": "2 : 1 (e.g. 20 mm wide x 10 mm deep)", "clearanceStandard": "Optimal elastomeric elongation without adhesive failure"}
            ]
        },
        "spatialTheory": {
            "sourceBook": "Peter Zumthor: Thinking Architecture & Andrea Deplazes: Constructing Architecture",
            "coreConcept": "Tectonic Detail as Architectural Truth & Material Respect",
            "architecturalPrinciple": "Details are the physical joints where materials meet. A good detail doesn't conceal joints with plastic trims; it celebrates the junction, providing shadow gaps (reveals) that accommodate differential thermal expansion gracefully.",
            "proportionRatio": "2 : 1 (Sealant Joint Aspect Ratio)"
        },
        "classicalVastu": {
            "treatiseName": "Mayamata & Manasara (Sandhi Vidhana)",
            "chapterVerseCitation": "Mayamata Ch. 18 (Sandhi Vidhana), Verses 1-12",
            "classicalSanskritConcept": "Sandhi Vidhana (The Science of Tectonic Joints)",
            "bioclimaticAndSolarRationale": "Classical Sanskrit masters dedicated entire chapters to Sandhi (joints). If joints between wood, stone, and lime mortar fail to accommodate seasonal swelling and contraction, structural decay accelerates rapidly.",
            "openInterpretationNote": "Shadowline negative reveals express the joinery truth of modern materials."
        },
        "agnaaBenchmark": {
            "principalArchitect": "Ar. Sridhar (SPA Delhi Alumnus, NIRF #1)",
            "firmStandard": "The AGNAA Zero-Stain Facade Standard",
            "volumetricElevation": "Every parapet coping, cantilevered slab, and window sill features a 15 mm negative reveal paired with an inverted 10x10 mm continuous drip groove cut into flamed Deccan granite.",
            "hyderabadMicroclimateExecution": "All horizontal joints sealed with commercial-grade two-part polysulphide sealants backed by closed-cell polyethylene foam rods, withstanding 45°C Hyderabad summer thermal cycles.",
            "materialTectonics": "Rain-screen dry-clad ventilated granite facades with 30 mm rear air cavities and stainless steel Grade 316 anchoring brackets."
        },
        "layaRules": {
            "intentChoiceCategory": "architectural_detailing",
            "decisionChecks": [
                {"question": "Are all horizontal sills, chajjas, and copings sloped outward at >= 1:50?", "expectedBoolean": True, "failingRemedy": "Slope coping stones outward and install continuous drip groove."},
                {"question": "Is a continuous 10x10 mm drip groove provided under all projecting edges?", "expectedBoolean": True, "failingRemedy": "Cut continuous 10x10 mm drip groove 20 mm from outer edge."},
                {"question": "Do facade movement joints follow the 2:1 width-to-depth elastomeric ratio?", "expectedBoolean": True, "failingRemedy": "Insert closed-cell backer rod to establish 2:1 sealant joint depth."}
            ],
            "relevanceKeywords": ["drip groove", "Edward Allen detailing", "capillary break", "coping slope", "movement joint", "Sandhi Vidhana"]
        }
    }
]

print(f"[+] Total Canons Loaded: {len(CANONS)}")

# =============================================================================
# EXPORT 1: AGNAA_LAYA_RULES_LEDGER.json
# =============================================================================
laya_ledger = []
for c in CANONS:
    entry = {
        "canonId": c["id"],
        "plateCode": c["plate_code"],
        "title": c["title"],
        "nbcClause": c["statutory"]["codeClause"],
        "intentChoiceCategory": c["layaRules"]["intentChoiceCategory"],
        "relevanceKeywords": c["layaRules"]["relevanceKeywords"],
        "decisionChecks": c["layaRules"]["decisionChecks"],
        "statutoryParameters": c["statutory"]["parameters"],
        "ergonomicClearances": c["ergonomics"]["keyDimensions"],
        "vastuSector": c["classicalVastu"]["classicalSanskritConcept"],
        "agnaaBenchmark": c["agnaaBenchmark"]["volumetricElevation"]
    }
    laya_ledger.append(entry)

ledger_path = EXPORTS_DIR / "AGNAA_LAYA_RULES_LEDGER.json"
with open(ledger_path, "w", encoding="utf-8") as f:
    json.dump(laya_ledger, f, indent=2)
print(f"✅ Exported: {ledger_path} ({len(laya_ledger)} entries)")

# =============================================================================
# EXPORT 2: AGNAA_MASTER_CAROUSELS.md
# =============================================================================
carousels_md = "# AGNAA MASTER ARCHITECTURAL CAROUSELS (12 CANONICAL PLATES)\n\n"
carousels_md += "> Authored by Ar. Sridhar (SPA Delhi Alumnus) • Principal Architect, AGNAA Design Studio, Hyderabad\n"
carousels_md += "> Ready-to-publish 6-slide LinkedIn / Instagram educational carousels.\n\n---\n\n"

for idx, c in enumerate(CANONS):
    carousels_md += f"## CANON {idx+1:02d}: {c['title'].upper()}\n"
    carousels_md += f"**Code Anchor:** `{c['statutory']['codeClause']}` | **Plate:** `{c['plate_code']}`\n\n"
    
    # Slide 1: The Trap
    carousels_md += f"### SLIDE 1: THE TRAP\n"
    carousels_md += f"**Headline:** Why most residential buildings feel cramped, cheap, or thermally uncomfortable.\n"
    carousels_md += f"- **The Problem:** Developers build strictly to statutory minimum legal requirements.\n"
    carousels_md += f"- **The Legal Floor:** `{c['statutory']['mandatoryRule'][:140]}...`\n"
    carousels_md += f"- **The Reality:** A code minimum is merely the legal threshold to avoid jail—it is NOT good architecture.\n\n"
    
    # Slide 2: Neufert Ergonomics
    carousels_md += f"### SLIDE 2: HUMAN ERGONOMICS (NEUFERT & TIME-SAVER)\n"
    carousels_md += f"**Headline:** Real human movement envelopes dictate the plan.\n"
    for d in c["ergonomics"]["keyDimensions"]:
        carousels_md += f"- **{d['label']}:** `{d['dimension']}` — {d['clearanceStandard']}\n"
    carousels_md += f"- **Rationale:** {c['ergonomics']['ergonomicRationale'][:160]}...\n\n"
    
    # Slide 3: Spatial & Tectonic Theory
    carousels_md += f"### SLIDE 3: SPATIAL & TECTONIC THEORY (CHING / ALLEN / ZUMTHOR)\n"
    carousels_md += f"**Headline:** {c['spatialTheory']['coreConcept']}\n"
    carousels_md += f"- **Source:** {c['spatialTheory']['sourceBook']}\n"
    carousels_md += f"- **Principle:** {c['spatialTheory']['architecturalPrinciple']}\n"
    carousels_md += f"- **Proportion Ratio:** `{c['spatialTheory']['proportionRatio']}`\n\n"
    
    # Slide 4: Bioclimatics & Vedic Vastu
    carousels_md += f"### SLIDE 4: BIOCLIMATICS & CLASSICAL SANSKRIT TREATISES\n"
    carousels_md += f"**Headline:** Demystifying Ancient Treatises through Deccan Solar Physics.\n"
    carousels_md += f"- **Treatise & Citation:** {c['classicalVastu']['treatiseName']} ({c['classicalVastu']['chapterVerseCitation']})\n"
    carousels_md += f"- **Concept:** `{c['classicalVastu']['classicalSanskritConcept']}`\n"
    carousels_md += f"- **Solar/Climatic Truth:** {c['classicalVastu']['bioclimaticAndSolarRationale']}\n\n"
    
    # Slide 5: The AGNAA Luxury Benchmark
    carousels_md += f"### SLIDE 5: THE AGNAA STUDIO BENCHMARK\n"
    carousels_md += f"**Headline:** How Ar. Sridhar builds in Hyderabad (Financial District / Jubilee Hills).\n"
    carousels_md += f"- **Executive Elevation:** {c['agnaaBenchmark']['volumetricElevation']}\n"
    carousels_md += f"- **Microclimate Execution:** {c['agnaaBenchmark']['hyderabadMicroclimateExecution']}\n"
    carousels_md += f"- **Material Tectonics:** {c['agnaaBenchmark']['materialTectonics']}\n\n"
    
    # Slide 6: Summary & CTA
    carousels_md += f"### SLIDE 6: SUMMARY & CALL TO ACTION\n"
    carousels_md += f"**Headline:** Elevate your architectural practice beyond statutory minimums.\n"
    carousels_md += f"- Read the full **NBC 2026 — AGNAA Master Visual Book**.\n"
    carousels_md += f"- Download the air-gapped **AGNAA 3B CAD Compliance Engine**.\n"
    carousels_md += f"- Follow **Ar. Sridhar / AGNAA Design Studio** (www.agnaa.in).\n\n"
    carousels_md += f"**Caption:** Stop building legal minimums. Architecture begins where the building code ends. Full breakdown of {c['title']} inside the slide deck.\n"
    carousels_md += f"**Hashtags:** `#Architecture #NBC2026 #AgnaaDesignStudio #ArSridhar #SPADelhi #Neufert #FrancisChing #VastuArchitecture #LuxuryResidences #HyderabadArchitects`\n\n---\n\n"

carousels_path = EXPORTS_DIR / "AGNAA_MASTER_CAROUSELS.md"
with open(carousels_path, "w", encoding="utf-8") as f:
    f.write(carousels_md)
print(f"✅ Exported: {carousels_path}")

# =============================================================================
# EXPORT 3: AGNAA_RVC_VOICEOVER_SCRIPTS.md
# =============================================================================
rvc_md = "# AGNAA RVC VOICE CLONING SCRIPTS (45-SECOND ARCHITECTURAL REELS)\n\n"
rvc_md += "> Voice Profile: Ar. Sridhar (Calm, authoritative, deliberate, architectural gravitas)\n"
rvc_md += "> Target Duration: 45 seconds per reel | Format: 9:16 Vertical Video\n\n---\n\n"

for idx, c in enumerate(CANONS):
    rvc_md += f"## REEL {idx+1:02d}: {c['title'].upper()}\n"
    rvc_md += f"**Code Anchor:** `{c['statutory']['codeClause']}`\n\n"
    
    rvc_md += f"| Timestamp | Visual Action | Ar. Sridhar RVC Voiceover Line | On-Screen Text |\n"
    rvc_md += f"| :--- | :--- | :--- | :--- |\n"
    rvc_md += f"| `00:00 - 00:08` | Slow tracking shot of cramped 2.75m room with red statutory warning badge | Most developers build homes strictly to the statutory minimum of the National Building Code. But a building code minimum is just the legal floor—it is not luxury architecture. | NBC MINIMUM IS NOT LUXURY |\n"
    rvc_md += f"| `00:08 - 00:18` | CAD blueprint expands with glowing cyan dimensions and Neufert clearances | Take {c['title'].split(':')[0].lower()}. Neufert mandates precise clearances: {c['ergonomics']['keyDimensions'][0]['dimension']} for effortless movement, and Francis Ching warns that rooms choked below proper volumetric proportions induce spatial claustrophobia. | NEUFERT: {c['ergonomics']['keyDimensions'][0]['dimension']} |\n"
    rvc_md += f"| `00:18 - 00:30` | 3D solar sun-path simulation showing thermal vectors and Sanskrit text overlay | In our ancient treatises—{c['classicalVastu']['treatiseName']}—this exact zone is called {c['classicalVastu']['classicalSanskritConcept']}. It is not mysticism; it is pure Deccan solar physics engineered to protect the home. | SOLAR PHYSICS • {c['classicalVastu']['classicalSanskritConcept']} |\n"
    rvc_md += f"| `00:30 - 00:45` | Gorgeous cinematic drone shot of finished AGNAA villa in Jubilee Hills | At AGNAA, we don't settle for code minimums. We elevate every detail to executive standards with our air-gapped architectural AI. Because your home deserves timeless architectural mastery. | AGNAA DESIGN STUDIO • AR. SRIDHAR |\n\n---\n\n"

rvc_path = EXPORTS_DIR / "AGNAA_RVC_VOICEOVER_SCRIPTS.md"
with open(rvc_path, "w", encoding="utf-8") as f:
    f.write(rvc_md)
print(f"✅ Exported: {rvc_path}")

# =============================================================================
# EXPORT 4: src/data/agnaa-canon/master-canon.ts
# =============================================================================
ts_code = "import { AgnaaMasterCanonEntry } from './types';\n\n"
ts_code += "export const AGNAA_MASTER_CANON: AgnaaMasterCanonEntry[] = "
ts_code += json.dumps(CANONS, indent=2)
ts_code += ";\n"

# Clean up json booleans to TS format if needed, but json.dumps handles True -> true nicely
ts_path = DATA_DIR / "master-canon.ts"
with open(ts_path, "w", encoding="utf-8") as f:
    f.write(ts_code)
print(f"✅ Exported: {ts_path} ({len(CANONS)} complete canons)")

print("\n" + "="*70)
print("🏆 ALL 12 CANONS EXPORTED AND SYNCHRONIZED ACROSS THE CODEBASE!")
print("="*70)
