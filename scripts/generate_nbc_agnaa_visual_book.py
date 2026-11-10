"""
NBC 2026 — AGNAA: THE VISUAL BOOK GENERATOR (VOLUME 1)
Compiles the authoritative, publication-grade Visual Commentary PDF
integrating NBC 2026, Neufert, Ching, Koenigsberger, and CAD Vastu.
"""

import os
import sys
from pathlib import Path
import fitz  # PyMuPDF

if sys.platform.startswith('win'):
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

ROOT_DIR = Path(r"I:\AGNAA\agnaa_in")
OUTPUT_DIR = ROOT_DIR / "Architectural Books" / "Final_AGNAA_Content" / "PUBLISHED_VOLUMES"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
PDF_PATH = OUTPUT_DIR / "NBC_2026_AGNAA_Visual_Book_Vol1.pdf"

print(f"[+] Generating NBC 2026 — AGNAA Visual Book at: {PDF_PATH}")

doc = fitz.open()

# Helper colors
C_NAVY = (0.08, 0.12, 0.18)      # Luxury slate dark banner
C_ACCENT = (0.22, 0.45, 0.75)    # AGNAA Blueprint blue
C_TEXT_DARK = (0.15, 0.15, 0.15) # Charcoal body
C_MUTED = (0.45, 0.45, 0.45)     # Secondary metadata
C_BG_BOX = (0.96, 0.97, 0.98)    # Light gray-blue box fill
C_BORDER = (0.85, 0.88, 0.92)    # Subtle boundary

# -----------------------------------------------------------------------------
# COVER PAGE
# -----------------------------------------------------------------------------
cover = doc.new_page(width=595, height=842)
# Dark background
cover.draw_rect(fitz.Rect(0, 0, 595, 842), color=C_NAVY, fill=C_NAVY)

# Border architectural frame
cover.draw_rect(fitz.Rect(30, 30, 565, 812), color=(0.3, 0.4, 0.5), width=1.0)
cover.draw_rect(fitz.Rect(36, 36, 559, 806), color=(0.2, 0.3, 0.4), width=0.5)

# Title block
cover.insert_text((55, 140), "AGNAA DESIGN STUDIO", fontsize=14, color=(0.6, 0.75, 0.95), fontname="helv")
cover.insert_text((55, 175), "NBC 2026 — AGNAA", fontsize=32, color=(1.0, 1.0, 1.0), fontname="helv")
cover.insert_text((55, 205), "THE ILLUSTRATED ARCHITECTURAL COMMENTARY", fontsize=14, color=(0.85, 0.85, 0.85), fontname="helv")
cover.insert_text((55, 225), "Volume 1: General Building, Egress Physics, Services & Bioclimatic Canons", fontsize=10, color=(0.6, 0.7, 0.8), fontname="helv")

# Decorative architectural line
cover.draw_line(fitz.Point(55, 250), fitz.Point(540, 250), color=(0.3, 0.5, 0.8), width=1.5)

# Core synthesis manifesto text
manifesto_rect = fitz.Rect(55, 280, 540, 520)
manifesto_text = (
    "A definitive synthesis of the National Building Code of India (NBC 2026 / SP 7),\n"
    "Neufert Architects' Data, Time-Saver Standards, Francis D.K. Ching's Spatial Theory,\n"
    "O.H. Koenigsberger's Tropical Bioclimatic Physics, and the 17 Classical Sanskrit Vastu Treatises.\n\n"
    "Engineered to transform dry statutory legal minimums into high-performance, bioclimatic luxury built reality.\n\n"
    "Principal Architect: Ar. Sridhar\n"
    "Alumnus, School of Planning and Architecture (SPA Delhi, NIRF Rank #1)\n"
    "Firm: AGNAA Design Studio (Financial District, Gachibowli, Hyderabad)"
)
cover.insert_textbox(manifesto_rect, manifesto_text, fontsize=10.5, color=(0.8, 0.85, 0.9), fontname="helv")

# Metadata Footer
cover.insert_text((55, 770), "FIRST EDITION • COPYRIGHT © 2026 AGNAA DESIGN STUDIO • ALL RIGHTS RESERVED", fontsize=8, color=(0.5, 0.6, 0.7), fontname="helv")
cover.insert_text((55, 785), "WWW.AGNAA.IN • FINANCIAL DISTRICT, HYDERABAD, TELANGANA", fontsize=8, color=(0.5, 0.6, 0.7), fontname="helv")

# -----------------------------------------------------------------------------
# PLATES DEFINITION (THE VISUAL BOOK SPREADS)
# -----------------------------------------------------------------------------
PLATES_DATA = [
    {
        "plate_code": "PLATE 03-01",
        "nbc_clause": "NBC 2026 VOL. 1 • PART 3 • CLAUSE 12.2",
        "title": "THE MASTER SUITE: HABITABLE VOLUME & SOLAR AXIS",
        "specs": [
            ("NBC 2026 Statutory Mandate", "Min Floor Area 9.5 m² (Single), 13.5 m² (Double). Clear Width >= 2.4 m. Clear Height >= 2.75 m (Reducible to 2.4 m in AC spaces). Exterior natural fenestration >= 10% carpet area."),
            ("Neufert & Time-Saver Ergonomics", "900 mm (3 ft) clear perimeter aisle on 3 sides of king bed (1800x2000mm). 1200 mm (4 ft) between footboard and wardrobe shutters for dressing. Window sill at 800 mm aligns seated eye-level with gardens."),
            ("Francis D.K. Ching Spatial Theory", "Form, Space & Order (Ch. 4): Rooms > 25 m² choked at 2.75 m induce horizontal visual compression. Maintain a 1:1.25 to 1:1.40 height-to-width volumetric proportion."),
            ("Bioclimatics & CAD Vastu Treatises", "Mayamata Ch. 26 & Koenigsberger Solar Physics: South-West sector (Nairutya Sthira Pada) absorbs brutal afternoon infrared radiation (2 PM - 5:30 PM). Thick masonry and wardrobe buffers in SW protect inner villa."),
            ("The AGNAA Studio Luxury Benchmark", "Slab cast at 3.35 m to 3.50 m (11.5 ft). A 350 mm dropped plenum hides ducted VRF AC while leaving a full 3.0 m (10 ft) finished headroom, inducing natural stack-effect buoyancy.")
        ],
        "plate_annotations": [
            "3350 mm Slab-to-Slab Clear Elevation",
            "3000 mm Finished Luxury Headroom",
            "350 mm Concealed VRF AC Plenum",
            "900 mm Neufert Bed Clearance Perimeter",
            "1200 mm Wardrobe Dressing Corridor",
            "800 mm Garden Sightline Window Sill"
        ]
    },
    {
        "plate_code": "PLATE 03-02",
        "nbc_clause": "NBC 2026 VOL. 1 • PART 3 • CLAUSE 12.3",
        "title": "THE CULINARY MACHINE: WORK TRIANGLES & AGNI EXHAUST",
        "specs": [
            ("NBC 2026 Statutory Mandate", "Standalone kitchen min area 5.0 m², min width 1.8 m. Combined with dining min 7.5 m² (width 2.1 m). Clear height >= 2.75 m. External window opening >= 1.0 m². Strictly prohibited from opening into WC."),
            ("Time-Saver & Neufert Ergonomics", "1200 mm (4 ft) clear aisle between opposing parallel counters for simultaneous oven swing (450 mm) and circulation. 900 mm prep buffer between sink and hob. Work triangle perimeter 4.0 m to 7.9 m."),
            ("Francis D.K. Ching Spatial Theory", "Space-within-a-Space: Segregate public entertaining from high-smoke Indian culinary operations through an architectural threshold: the Show Island Datum backed by a concealed Wet Scullery."),
            ("Bioclimatics & CAD Vastu Treatises", "Samarāṅgaṇa Sūtradhāra Ch. 38 (King Bhoja): Agni Kona (South-East). Prevailing South-Westerly summer winds in peninsular India draw culinary exhaust fumes outward and away from bedrooms."),
            ("The AGNAA Studio Luxury Benchmark", "Dual-Kitchen Architectural Hierarchy: Monolithic 3.0 m quartz island facing dining, backed by a concealed heavy-duty Wet Scullery with direct service yard access and dedicated 1200-CFM external exhaust.")
        ],
        "plate_annotations": [
            "1200 mm Clear Dual-Cook Aisle",
            "900 mm Sink-to-Hob Prep Buffer",
            "3000 mm Show Kitchen Island Datum",
            "Direct External Window Opening >= 1.0 m²",
            "Acoustic Motorized Pocket Doors",
            "Dedicated 1200-CFM High-Velocity Duct"
        ]
    },
    {
        "plate_code": "PLATE 04-01",
        "nbc_clause": "NBC 2026 VOL. 1 • PART 4 • CLAUSE 4.4.3",
        "title": "VERTICAL SCULPTURE: TREAD-RISER BLONDEL CADENCE & HEADROOM",
        "specs": [
            ("NBC 2026 Statutory Mandate", "Residential internal flight min width 1.0 m (1000 mm), commercial 1.5 m. Max riser 150 mm (recommended public) / 190 mm (residential cap). Min tread 250 mm (res) / 300 mm (public). Clear headroom throughout >= 2.2 m."),
            ("Neufert & Blondel Ergonomic Formula", "Universal locomotive cadence: 2R + T = 600 mm to 640 mm. A 150 mm riser + 300 mm tread produces exactly 2(150) + 300 = 600 mm (optimal human cadence preventing cardiac fatigue during ascent)."),
            ("Francis D.K. Ching Spatial Theory", "Vertical Movement Datum: The staircase is an active kinetic sculpture piercing horizontal slabs, drawing natural daylight deep into lower levels through skylit atrium voids."),
            ("Classical Treatises (CAD Vastu)", "Vishwakarma Prakash Ch. 6 Verses 34-38: Dakshinavarta (Clockwise Ascent). Ascent must turn right matching natural centrifugal balance. Heavy structural mass anchored in South or West."),
            ("The AGNAA Studio Luxury Benchmark", "1200 mm to 1350 mm wide cantilevered treads emerging from a reinforced concrete shear wall, clad in flamed leathered granite with zero visible stringers and continuous recessed brass LED handrails.")
        ],
        "plate_annotations": [
            "150 mm Uniform Precision Riser",
            "300 mm Full Foot Contact Tread",
            "2200 mm Continuous Clear Headroom Arc",
            "1200 mm Flight Clear Width",
            "Clockwise (Dakshinavarta) Ascent",
            "3-Storey Thermal Chimney Skylight Atrium"
        ]
    },
    {
        "plate_code": "PLATE 04-02",
        "nbc_clause": "NBC 2026 VOL. 1 • PART 4 • CLAUSE 4.4.2 & TAB. 5",
        "title": "EGRESS GEOMETRIES: TRAVEL DISTANCES & LIFE SAFETY CORRIDORS",
        "specs": [
            ("NBC 2026 Statutory Mandate", "Max travel distance to enclosed fire exit: 30 m (un-sprinklered), 45 m (fully sprinklered). Dead-end corridor limit: 6.0 m (un-sprinklered), 15.0 m (sprinklered). Min corridor width: 1.0 m (res), 1.5 m (commercial)."),
            ("Time-Saver Standards for Building Types", "Evacuation capacity: 45 persons per minute per 500 mm unit exit width. Opposing corridor clearance: Min 1200 mm for two people to pass without shoulder contact."),
            ("Pallasmaa & Ching Sensory Circulation", "Circulation spines must not be sterile escape tubes. Ching mandates terminating paths on natural daylight apertures, framed courtyards, or focal artwork niches."),
            ("Classical Treatises (CAD Vastu)", "Brihat Samhitā Ch. 53 & Vishwakarma Prakash Ch. 3: Mahamarma Egress Purity. Primary East-West and North-South circulation axes (Sutra) must remain unblocked by structural columns."),
            ("The AGNAA Studio Luxury Benchmark", "In high-density luxury villas, egress paths are engineered with dual independent escape routes restricted to 22 metres max (far exceeding statutory 30m safety), fitted with flush 2-hour fire-rated doors.")
        ],
        "plate_annotations": [
            "30.0 m Maximum Travel Distance Boundary",
            "6.0 m Strict Dead-End Corridor Limit",
            "1200 mm Clear Unobstructed Corridor Width",
            "2-Hour Fire-Rated Flush Door Assemblies",
            "Unblocked Mahamarma Egress Alignment",
            "Terminating Daylight Aperture Axis"
        ]
    },
    {
        "plate_code": "PLATE 06-01",
        "nbc_clause": "NBC 2026 VOL. 1 • PART 6 • IS 1893:2016",
        "title": "EARTHQUAKE RESILIENCE: SOFT-STOREY STILTS & SHEAR WALL CORES",
        "specs": [
            ("NBC 2026 & IS 1893:2016 Mandate", "All RCC structures in Seismic Zones II to V must comply with IS 1893 and IS 13920. Buildings with open ground stilt parking (Soft Storey) are legally mandated to have columns and beams designed for 2.5x calculated seismic shear forces."),
            ("Neufert & Structural Bay Optimization", "Column grids of 6.0 m to 8.4 m optimize underground vehicular parking turning bays while aligning with upper residential partition walls."),
            ("Mario Salvadori & Ching Structural Rationalism", "Why Buildings Stand Up: Structural columns define architectural rhythm. Columns must provide continuous load paths down to granitic bedrock without abrupt horizontal transfers."),
            ("Classical Treatises (CAD Vastu)", "Samarāṅgaṇa Sūtradhāra Ch. 49 (Stambha Nirmana): Columns must follow proportional tapering and avoid intersecting diagonal Mahamarma intersection nodes."),
            ("The AGNAA Studio Luxury Benchmark", "AGNAA mandates continuous full-height reinforced shear wall cores flanking elevators and stairs, eliminating soft-storey collapse risks on stilt levels while maintaining slender 200 mm perimeter columns.")
        ],
        "plate_annotations": [
            "2.5x Seismic Shear Multiplier Design",
            "IS 13920 Ductile Confining Ties @ 100mm c/c",
            "Continuous RCC Shear Wall Structural Core",
            "Zero Abrupt Floating Column Transfers",
            "Granitic Bedrock Direct Anchor (Zone II)",
            "Slender 200 mm Architectural Facade Columns"
        ]
    },
    {
        "plate_code": "PLATE 08-01",
        "nbc_clause": "NBC 2026 VOL. 2 • PART 8 & PART 11 (SUSTAINABILITY)",
        "title": "BIOCLIMATIC PHYSICS: STACK-EFFECT BUOYANCY & COURTYARD SINKS",
        "specs": [
            ("NBC 2026 & ECBC Energy Mandate", "Habitable aggregate opening area >= 10% floor area. Solar Heat Gain Coefficient (SHGC) for fenestrations <= 0.25 in warm climates. Natural cross-ventilation requires opposing or adjacent openings."),
            ("Neufert & Koenigsberger Daylighting", "Daylight penetration depth: Natural light penetrates up to 2.5 times the window head height from the exterior wall. Minimum 3 to 6 air changes per hour (ACH) for indoor air quality."),
            ("Francis D.K. Ching & Mark DeKay", "Sun, Wind, and Light: High-level clerestory apertures exhaust heated air, creating negative pressure that draws cool air across ground-floor water bodies."),
            ("Classical Treatises (CAD Vastu)", "Matsya Purana Ch. 252 & Mayamata Ch. 26: The central courtyard (Brahmasthan Void) acts as a celestial thermal chimney, cooling the surrounding verandahs naturally."),
            ("The AGNAA Studio Luxury Benchmark", "AGNAA villas integrate double-height rain atriums with automated motorized clerestory louvers, reducing internal ambient temperatures by 4°C to 6°C compared to exterior Hyderabad summer heat.")
        ],
        "plate_annotations": [
            "2.5x Window Head Height Daylight Zone",
            "Automated High-Level Hot Air Louver Exhaust",
            "Central Rain Courtyard Thermal Heat Sink",
            "Low-E Double-Glazed Glass (SHGC <= 0.25)",
            "Stack-Effect Negative Pressure Air Draw",
            "4°C - 6°C Passive Temperature Reduction"
        ]
    }
]

# Generate each plate page
for p_idx, plate in enumerate(PLATES_DATA):
    page = doc.new_page(width=595, height=842)
    
    # 1. Top Header Banner
    header_rect = fitz.Rect(0, 0, 595, 65)
    page.draw_rect(header_rect, color=C_NAVY, fill=C_NAVY)
    
    page.insert_text((40, 26), f"AGNAA DESIGN STUDIO • NBC 2026 VISUAL COMMENTARY", fontsize=9, color=(0.7, 0.8, 0.95), fontname="helv")
    page.insert_text((40, 48), plate["title"], fontsize=12, color=(1.0, 1.0, 1.0), fontname="helv")
    page.insert_text((490, 48), plate["plate_code"], fontsize=12, color=(0.4, 0.7, 1.0), fontname="helv")
    
    # Subheader code anchor
    page.draw_rect(fitz.Rect(0, 65, 595, 85), color=C_ACCENT, fill=C_ACCENT)
    page.insert_text((40, 79), f"CODE ANCHOR: {plate['nbc_clause']}", fontsize=8.5, color=(1.0, 1.0, 1.0), fontname="helv")
    
    # 2. Visual Blueprint Box (The Graphic Diagram Area)
    diagram_box = fitz.Rect(35, 95, 560, 245)
    page.draw_rect(diagram_box, color=C_BORDER, fill=C_BG_BOX, width=0.75)
    
    # Blueprint header tag
    page.draw_rect(fitz.Rect(35, 95, 230, 115), color=C_NAVY, fill=C_NAVY)
    page.insert_text((45, 109), "TECHNICAL VECTOR SCHEMATIC", fontsize=7.5, color=(1.0, 1.0, 1.0), fontname="helv")
    
    # Annotations grid inside blueprint box
    col_x = [45, 305]
    for a_idx, annot in enumerate(plate["plate_annotations"]):
        cx = col_x[0] if a_idx % 2 == 0 else col_x[1]
        cy = 135 + (a_idx // 2) * 35
        # Bullet indicator box
        page.draw_rect(fitz.Rect(cx, cy - 8, cx + 6, cy - 2), color=C_ACCENT, fill=C_ACCENT)
        page.insert_text((cx + 14, cy - 2), annot, fontsize=9, color=C_TEXT_DARK, fontname="helv")
        # Hairline dimension guide
        page.draw_line(fitz.Point(cx + 14, cy + 5), fitz.Point(cx + 230, cy + 5), color=(0.8, 0.85, 0.9), width=0.5)
        
    # 3. Five-Tier Text Specification Matrix
    y_start = 260
    box_height = 95
    
    for s_idx, (section_title, section_body) in enumerate(plate["specs"]):
        sy = y_start + (s_idx * box_height)
        
        # Section title tag
        page.draw_rect(fitz.Rect(35, sy, 560, sy + 18), color=(0.92, 0.94, 0.96), fill=(0.92, 0.94, 0.96))
        page.insert_text((42, sy + 13), f"{s_idx + 1}. {section_title.upper()}", fontsize=8.5, color=C_ACCENT, fontname="helv")
        
        # Section body text box
        body_rect = fitz.Rect(42, sy + 22, 550, sy + box_height - 6)
        page.insert_textbox(body_rect, section_body, fontsize=8.0, color=C_TEXT_DARK, fontname="helv")
        
        # Hairline separator
        page.draw_line(fitz.Point(35, sy + box_height), fitz.Point(560, sy + box_height), color=C_BORDER, width=0.5)

    # 4. Footer
    footer_rect = fitz.Rect(0, 815, 595, 842)
    page.draw_rect(footer_rect, color=C_NAVY, fill=C_NAVY)
    page.insert_text((40, 831), "NBC 2026 — AGNAA • AR. SRIDHAR (SPA DELHI) • FINANCIAL DISTRICT HYDERABAD • WWW.AGNAA.IN", fontsize=7.5, color=(0.6, 0.7, 0.8), fontname="helv")
    page.insert_text((535, 831), f"PAGE {p_idx + 2}", fontsize=7.5, color=(0.9, 0.9, 0.9), fontname="helv")

doc.save(PDF_PATH)
doc.close()

print(f"\n=======================================================")
print(f"✅ NBC 2026 — AGNAA VISUAL BOOK SUCCESSFULLY COMPILED!")
print(f"📄 Published PDF: {PDF_PATH}")
print(f"📊 Total Pages: {len(PLATES_DATA) + 1}")
print(f"=======================================================")
