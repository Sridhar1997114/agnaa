"""
NBC 2026 — AGNAA: MASTER VISUAL BOOK GENERATOR (COMPREHENSIVE EDITION)
======================================================================
Compiles the authoritative, 15-page publication-grade architectural masterwork:
- Integrates NBC 2026, Neufert, Time-Saver, Francis D.K. Ching, Koenigsberger,
  Edward Allen, Peter Zumthor, M. David Egan, and the 17 Sanskrit Vastu Treatises.
- Features 12 full-bleed CAD blueprint technical schematics rendered with vector precision.
- Features Cover, Architectural Table of Contents, 12 Plates, and the Master Compliance Appendix.

Principal Architect: Ar. Sridhar (SPA Delhi Alumnus)
Firm: AGNAA Design Studio (Financial District, Hyderabad)
"""

import os
import sys
from pathlib import Path
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as patches
import matplotlib.lines as lines
import fitz  # PyMuPDF

if sys.platform.startswith('win'):
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

ROOT_DIR = Path(r"I:\AGNAA\agnaa_in")
PUB_DIR = ROOT_DIR / "Architectural Books" / "Final_AGNAA_Content" / "PUBLISHED_VOLUMES"
SCHEMATICS_DIR = PUB_DIR / "SCHEMATICS"
PUB_DIR.mkdir(parents=True, exist_ok=True)
SCHEMATICS_DIR.mkdir(parents=True, exist_ok=True)

MASTER_PDF_PATH = PUB_DIR / "NBC_2026_AGNAA_Master_Visual_Book.pdf"

print(f"[+] Starting NBC 2026 — AGNAA Master Visual Book Compilation...")
print(f"[+] Output PDF Destination: {MASTER_PDF_PATH}")
print(f"[+] Schematics Cache: {SCHEMATICS_DIR}")

# =============================================================================
# COLOR PALETTES
# =============================================================================
BG_BLUEPRINT = "#0d1522"     # Deep CAD slate navy
C_CYAN = "#38bdf8"           # Structural elements & primary walls
C_AMBER = "#fbbf24"          # Circulation, Vastu & energy vectors
C_CORAL = "#f87171"          # Life safety & egress
C_GREEN = "#34d399"          # Vegetation, air & water
C_WHITE = "#ffffff"          # Text & dimensions
C_SLATE = "#64748b"          # Gridlines & reference datums
C_GRID = "#1e293b"           # Subtle background grid

# PDF Page Colors
PDF_NAVY = (0.05, 0.08, 0.14)      # Dark luxury header/footer
PDF_ACCENT = (0.15, 0.45, 0.82)    # AGNAA Signature Blueprint blue
PDF_GOLD = (0.85, 0.65, 0.15)      # Title gold highlight
PDF_TEXT_DARK = (0.12, 0.14, 0.18) # Text body charcoal
PDF_BG_CARD = (0.97, 0.98, 0.99)   # Crisp card background
PDF_CARD_BORDER = (0.86, 0.89, 0.93)# Card border line

# =============================================================================
# 12 TECHNICAL SCHEMATIC GENERATORS (MATPLOTLIB)
# =============================================================================

def setup_blueprint_fig():
    fig, ax = plt.subplots(figsize=(10.6, 6.0), dpi=200)
    fig.patch.set_facecolor(BG_BLUEPRINT)
    ax.set_facecolor(BG_BLUEPRINT)
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 60)
    ax.set_aspect('equal')
    ax.axis('off')
    
    # Draw subtle CAD grid
    for x in range(0, 105, 10):
        ax.axvline(x, color=C_GRID, linewidth=0.5, linestyle=":")
    for y in range(0, 65, 10):
        ax.axhline(y, color=C_GRID, linewidth=0.5, linestyle=":")
        
    # Technical border frame
    border = patches.Rectangle((1, 1), 98, 58, fill=False, edgecolor=C_SLATE, linewidth=0.8)
    ax.add_patch(border)
    inner_border = patches.Rectangle((1.8, 1.8), 96.4, 56.4, fill=False, edgecolor=C_GRID, linewidth=0.4)
    ax.add_patch(inner_border)
    
    return fig, ax

def draw_dim_h(ax, x1, x2, y, text, color=C_WHITE, offset=1.5):
    """Draws a horizontal architectural dimension line with ticks and text."""
    ax.plot([x1, x2], [y, y], color=color, linewidth=0.8)
    ax.plot([x1, x1], [y - 1.2, y + 1.2], color=color, linewidth=1.0)
    ax.plot([x2, x2], [y - 1.2, y + 1.2], color=color, linewidth=1.0)
    ax.text((x1 + x2)/2, y + offset, text, color=color, fontsize=8, ha='center', va='bottom', weight='bold')

def draw_dim_v(ax, x, y1, y2, text, color=C_WHITE, offset=1.5):
    """Draws a vertical architectural dimension line with ticks and text."""
    ax.plot([x, x], [y1, y2], color=color, linewidth=0.8)
    ax.plot([x - 1.2, x + 1.2], [y1, y1], color=color, linewidth=1.0)
    ax.plot([x - 1.2, x + 1.2], [y2, y2], color=color, linewidth=1.0)
    ax.text(x + offset, (y1 + y2)/2, text, color=color, fontsize=8, ha='left', va='center', weight='bold', rotation=90)

# --- Schematic 01: Master Suite ---
def generate_schematic_01(out_path):
    fig, ax = setup_blueprint_fig()
    ax.text(3, 55, "SCHEMATIC 03-01: HABITABLE ROOM GEOMETRY & ERGONOMIC CLEARANCES", color=C_CYAN, fontsize=9, weight='bold')
    ax.text(3, 52, "PLAN & SECTION SYNTHESIS • NBC 12.2 • NEUFERT PG 245 • NAIRUTYA AXIS", color=C_SLATE, fontsize=7.5)
    
    # Room outline (Plan - Left side)
    room = patches.Rectangle((6, 8), 44, 40, facecolor='#111d33', edgecolor=C_CYAN, linewidth=2.0)
    ax.add_patch(room)
    
    # Bed (King 1.8 x 2.0m -> 18 x 20 units)
    bed = patches.Rectangle((19, 24), 18, 20, facecolor='#1e293b', edgecolor=C_WHITE, linewidth=1.2)
    ax.add_patch(bed)
    # Headboard
    headboard = patches.Rectangle((18, 42), 20, 2.5, facecolor='#334155', edgecolor=C_CYAN, linewidth=1.0)
    ax.add_patch(headboard)
    # Pillows
    ax.add_patch(patches.Rectangle((20.5, 37), 6.5, 4, facecolor='#475569', edgecolor=C_WHITE, linewidth=0.8))
    ax.add_patch(patches.Rectangle((29.0, 37), 6.5, 4, facecolor='#475569', edgecolor=C_WHITE, linewidth=0.8))
    ax.text(28, 30, "KING BED\n1800 x 2000 mm", color=C_WHITE, fontsize=7.5, ha='center', va='center')
    
    # Neufert Clearances (Dashed)
    ax.plot([10, 10], [24, 44], color=C_AMBER, linestyle='--', linewidth=0.9)
    ax.plot([46, 46], [24, 44], color=C_AMBER, linestyle='--', linewidth=0.9)
    ax.plot([19, 37], [16, 16], color=C_AMBER, linestyle='--', linewidth=0.9)
    ax.text(14.5, 33, "900 mm AISLE\n(NEUFERT)", color=C_AMBER, fontsize=6.5, ha='center')
    ax.text(41.5, 33, "900 mm AISLE\n(NEUFERT)", color=C_AMBER, fontsize=6.5, ha='center')
    ax.text(28, 19, "1200 mm WARDROBE DRESSING AISLE", color=C_AMBER, fontsize=6.5, ha='center')
    
    # Wardrobe Bank
    wardrobe = patches.Rectangle((6, 8), 44, 6, facecolor='#1e293b', edgecolor=C_SLATE, linewidth=1.0)
    ax.add_patch(wardrobe)
    ax.text(28, 11, "BUILT-IN WARDROBE BANK (DEPTH 600 mm)", color=C_SLATE, fontsize=7, ha='center')
    
    # Dimensions (Plan)
    draw_dim_h(ax, 6, 50, 49.5, "WIDTH: 4400 mm (MIN NBC 2400 mm)", color=C_WHITE)
    draw_dim_v(ax, 51.5, 8, 48, "LENGTH: 4000 mm", color=C_WHITE)
    
    # Section view (Right side)
    ax.text(56, 49, "SECTION A-A: LUXURY HEADROOM & DUCTED VRF PLENUM", color=C_AMBER, fontsize=8, weight='bold')
    
    # Concrete Slabs
    slab_top = patches.Rectangle((56, 43), 40, 2.5, facecolor='#334155', edgecolor=C_CYAN, linewidth=1.2)
    slab_bot = patches.Rectangle((56, 10), 40, 2.5, facecolor='#334155', edgecolor=C_CYAN, linewidth=1.2)
    ax.add_patch(slab_top)
    ax.add_patch(slab_bot)
    ax.text(76, 44.2, "UPPER RCC STRUCTURAL SLAB", color=C_WHITE, fontsize=6.5, ha='center')
    ax.text(76, 11.2, "FLOOR FINISH LEVEL (FFL)", color=C_WHITE, fontsize=6.5, ha='center')
    
    # False ceiling drop (VRF Plenum)
    ax.plot([56, 96], [38, 38], color=C_AMBER, linestyle='-', linewidth=1.0)
    plenum = patches.Rectangle((56, 38), 40, 5, facecolor='#1e293b', edgecolor=C_AMBER, linestyle=':', linewidth=0.8)
    ax.add_patch(plenum)
    ax.text(76, 40.5, "CONCEALED VRF / DUCTING PLENUM (350 mm)", color=C_AMBER, fontsize=7, ha='center')
    
    # Headroom dimension
    draw_dim_v(ax, 97.5, 12.5, 38, "CLEAR FINISHED: 3000 mm (10'-0\")", color=C_GREEN, offset=1.0)
    draw_dim_v(ax, 54, 12.5, 43, "SLAB-TO-SLAB: 3350 mm", color=C_CYAN, offset=-1.5)
    
    # Statutory minimum indicator line
    ax.plot([56, 96], [34.5, 34.5], color=C_CORAL, linestyle='--', linewidth=0.8)
    ax.text(76, 35.5, "NBC 2026 STATUTORY MIN: 2750 mm (AIR COND: 2400 mm)", color=C_CORAL, fontsize=6.5, ha='center')
    
    # Nairutya indicator
    ax.text(8, 45, "SOUTH-WEST\n(NAIRUTYA)", color=C_AMBER, fontsize=7.5, weight='bold')
    
    fig.savefig(out_path, facecolor=fig.get_facecolor(), bbox_inches='tight')
    plt.close(fig)

# --- Schematic 02: Kitchen & Work Triangle ---
def generate_schematic_02(out_path):
    fig, ax = setup_blueprint_fig()
    ax.text(3, 55, "SCHEMATIC 03-02: DUAL-KITCHEN TYPOLOGY & WORK TRIANGLE ERGONOMICS", color=C_CYAN, fontsize=9, weight='bold')
    ax.text(3, 52, "SHOW KITCHEN + WET SCULLERY • NBC 12.3 • NEUFERT PG 280 • AGNI KONA (SE)", color=C_SLATE, fontsize=7.5)
    
    # Outer Kitchen Boundary
    kitch = patches.Rectangle((6, 8), 88, 40, facecolor='#111d33', edgecolor=C_CYAN, linewidth=2.0)
    ax.add_patch(kitch)
    
    # Partition Wall (Acoustic sliding separating Show Kitchen & Wet Scullery)
    ax.plot([56, 56], [8, 48], color=C_SLATE, linestyle='--', linewidth=1.5)
    ax.text(56, 49, "ACOUSTIC SLIDING POCKET DOOR", color=C_SLATE, fontsize=7, ha='center')
    
    # Zone 1: Show Kitchen (Left)
    ax.text(31, 44, "ZONE A: SHOW KITCHEN & BREAKFAST DATUM", color=C_CYAN, fontsize=8, weight='bold', ha='center')
    # Island
    island = patches.Rectangle((18, 18), 26, 12, facecolor='#1e293b', edgecolor=C_WHITE, linewidth=1.5)
    ax.add_patch(island)
    ax.text(31, 24, "MONOLITHIC QUARTZ ISLAND\n3000 x 1200 mm", color=C_WHITE, fontsize=7.5, ha='center', va='center')
    
    # Back Counter
    back_cntr = patches.Rectangle((6, 36), 46, 6, facecolor='#1e293b', edgecolor=C_CYAN, linewidth=1.0)
    ax.add_patch(back_cntr)
    # Built-in ovens / induction
    ax.add_patch(patches.Rectangle((12, 37.5), 8, 3, facecolor='#334155', edgecolor=C_WHITE, linewidth=0.8))
    ax.text(16, 39, "INDUCTION", color=C_WHITE, fontsize=6, ha='center')
    
    # Aisle dimension
    draw_dim_v(ax, 14, 24, 36, "1200 mm CLEAR DUAL-COOK AISLE", color=C_AMBER)
    
    # Zone 2: Wet Scullery (Right)
    ax.text(75, 44, "ZONE B: HEAVY WET SCULLERY (AGNI)", color=C_AMBER, fontsize=8, weight='bold', ha='center')
    
    # Counter L-Shape in Wet Kitchen
    c1 = patches.Rectangle((60, 12), 30, 6, facecolor='#1e293b', edgecolor=C_AMBER, linewidth=1.2)
    c2 = patches.Rectangle((84, 18), 6, 26, facecolor='#1e293b', edgecolor=C_AMBER, linewidth=1.2)
    ax.add_patch(c1)
    ax.add_patch(c2)
    
    # Hob (Agni)
    hob = patches.Rectangle((84.5, 34), 5, 8, facecolor='#dc2626', edgecolor=C_WHITE, linewidth=0.8)
    ax.add_patch(hob)
    ax.text(87, 38, "GAS HOB\n(SE CORNER)", color=C_WHITE, fontsize=6, ha='center', va='center')
    
    # Sink
    sink = patches.Rectangle((64, 12.5), 10, 5, facecolor='#0284c7', edgecolor=C_WHITE, linewidth=0.8)
    ax.add_patch(sink)
    ax.text(69, 15, "DOUBLE SINK", color=C_WHITE, fontsize=6, ha='center', va='center')
    
    # Refrigerator
    fridge = patches.Rectangle((60, 36), 8, 8, facecolor='#334155', edgecolor=C_WHITE, linewidth=0.8)
    ax.add_patch(fridge)
    ax.text(64, 40, "FRIDGE", color=C_WHITE, fontsize=6, ha='center', va='center')
    
    # Work Triangle lines (Fridge -> Sink -> Hob -> Fridge)
    ax.plot([64, 69], [36, 17.5], color=C_CORAL, linestyle=':', linewidth=1.2)
    ax.plot([69, 84.5], [17.5, 38], color=C_CORAL, linestyle=':', linewidth=1.2)
    ax.plot([84.5, 68], [38, 40], color=C_CORAL, linestyle=':', linewidth=1.2)
    ax.text(73, 28, "TIME-SAVER WORK TRIANGLE\nPERIMETER: 6.2 m (MIN 4.0 m, MAX 7.9 m)", color=C_CORAL, fontsize=6.5, ha='center', weight='bold')
    
    # Exhaust Duct Callout
    ax.annotate("1200 CFM EXTERIOR EXHAUST DUCT", xy=(89.5, 42), xytext=(68, 52),
                color=C_GREEN, fontsize=7.5, weight='bold',
                arrowprops=dict(arrowstyle="->", color=C_GREEN, lw=1.0))
    
    # External window opening
    ax.plot([94, 94], [22, 32], color=C_CYAN, linewidth=4.0)
    ax.text(93, 27, "EXTERIOR WINDOW >= 1.0 m²", color=C_CYAN, fontsize=6.5, rotation=90, va='center', ha='right')
    
    fig.savefig(out_path, facecolor=fig.get_facecolor(), bbox_inches='tight')
    plt.close(fig)

# --- Schematic 03: Wet Areas & Plumbing Shaft ---
def generate_schematic_03(out_path):
    fig, ax = setup_blueprint_fig()
    ax.text(3, 55, "SCHEMATIC 03-03: LUXURY 5-FIXTURE BATHROOM & EXTERIOR PLUMBING SHAFT", color=C_CYAN, fontsize=9, weight='bold')
    ax.text(3, 52, "DRY-WET ZONING • NBC 12.4 • CHUDLEY TANKING • WATERPROOF MEMBRANES", color=C_SLATE, fontsize=7.5)
    
    # Bathroom Envelope (6.0m x 3.0m -> 60 x 30 units)
    bath = patches.Rectangle((10, 12), 60, 32, facecolor='#111d33', edgecolor=C_CYAN, linewidth=2.0)
    ax.add_patch(bath)
    
    # Zone 1: Dry Zone (Vanity)
    dry = patches.Rectangle((10, 12), 22, 32, facecolor='#162544', edgecolor=C_SLATE, linestyle='--', linewidth=0.8)
    ax.add_patch(dry)
    vanity = patches.Rectangle((12, 14), 18, 8, facecolor='#1e293b', edgecolor=C_WHITE, linewidth=1.0)
    ax.add_patch(vanity)
    ax.add_patch(patches.Circle((16.5, 18), 2.5, facecolor='#334155', edgecolor=C_CYAN))
    ax.add_patch(patches.Circle((25.5, 18), 2.5, facecolor='#334155', edgecolor=C_CYAN))
    ax.text(21, 26, "DRY ZONE: DUAL BASIN VANITY", color=C_WHITE, fontsize=7, ha='center')
    
    # Zone 2: Semi-Wet (Water Closet)
    wc_box = patches.Rectangle((32, 12), 16, 32, facecolor='#1a2c50', edgecolor=C_SLATE, linestyle='--', linewidth=0.8)
    ax.add_patch(wc_box)
    wc = patches.Rectangle((36, 14), 8, 11, facecolor='#334155', edgecolor=C_WHITE, linewidth=1.0)
    ax.add_patch(wc)
    ax.text(40, 28, "WALL-HUNG WC\nCONCEALED CISTERN\n(900 mm AISLE)", color=C_WHITE, fontsize=6.5, ha='center')
    
    # Zone 3: Wet Zone (Walk-in Shower & Freestanding Tub)
    wet = patches.Rectangle((48, 12), 22, 32, facecolor='#112542', edgecolor=C_CYAN, linewidth=1.2)
    ax.add_patch(wet)
    # Linear Floor Drain
    drain = patches.Rectangle((67, 14), 1.5, 28, facecolor='#0284c7', edgecolor=C_WHITE, linewidth=0.8)
    ax.add_patch(drain)
    ax.text(66, 28, "LINEAR STAINLESS TILE DRAIN (50 mm RECESS DROP)", color=C_CYAN, fontsize=6.5, rotation=90, va='center', ha='right')
    ax.text(57, 20, "WALK-IN RAIN SHOWER\n10 mm TOUGHENED GLASS", color=C_WHITE, fontsize=6.5, ha='center')
    
    # Exterior Plumbing Shaft (Right of bathroom)
    shaft = patches.Rectangle((74, 12), 16, 32, facecolor='#0f172a', edgecolor=C_CORAL, linewidth=1.5)
    ax.add_patch(shaft)
    ax.text(82, 41, "EXTERNAL PIPE SHAFT\n(600 x 900 mm MIN)", color=C_CORAL, fontsize=7.5, weight='bold', ha='center')
    
    # Pipes inside shaft
    pipes = [("SOIL STACK (110 mm)", 78, 30, '#ef4444'),
             ("WASTE STACK (75 mm)", 78, 24, '#3b82f6'),
             ("VENT STACK (50 mm)", 78, 18, '#10b981')]
    for pname, px, py, pcol in pipes:
        ax.add_patch(patches.Circle((px, py), 2.2, facecolor=pcol, edgecolor=C_WHITE))
        ax.text(px + 3.5, py, pname, color=C_WHITE, fontsize=6.5, va='center')
        
    # Waterproofing Coving Callout
    ax.annotate("2-LAYER SBS TANKING MEMBRANE\nWITH 300 mm COVED SKIRTING UPTURN", xy=(48, 12), xytext=(22, 4),
                color=C_AMBER, fontsize=7.5, weight='bold',
                arrowprops=dict(arrowstyle="->", color=C_AMBER, lw=1.0))
    
    draw_dim_h(ax, 10, 70, 46, "LUXURY BATH SUITE: 6000 mm (MIN NBC WC 1.1 m²)", color=C_WHITE)
    
    fig.savefig(out_path, facecolor=fig.get_facecolor(), bbox_inches='tight')
    plt.close(fig)

# --- Schematic 04: Staircase & Blondel Cadence ---
def generate_schematic_04(out_path):
    fig, ax = setup_blueprint_fig()
    ax.text(3, 55, "SCHEMATIC 04-01: VERTICAL KINETIC SCULPTURE & BLONDEL LOCOMOTIVE CADENCE", color=C_CYAN, fontsize=9, weight='bold')
    ax.text(3, 52, "NBC PART 4 CLAUSE 4.4.3 • NEUFERT PG 212 • DAKSHINAVARTA (CLOCKWISE ASCENT)", color=C_SLATE, fontsize=7.5)
    
    # Section Stair Profile (Left side: 8 steps shown)
    sx, sy = 10, 10
    riser = 4.0   # 150 mm
    tread = 8.0   # 300 mm
    
    points = [(sx, sy)]
    for i in range(5):
        points.append((sx + i*tread, sy + (i+1)*riser))
        points.append((sx + (i+1)*tread, sy + (i+1)*riser))
        
    pxs, pys = zip(*points)
    ax.plot(pxs, pys, color=C_CYAN, linewidth=2.5)
    
    # Structural soffit slab
    ax.plot([sx, sx + 5*tread], [sy - 4, sy + 5*riser - 4], color=C_SLATE, linewidth=1.5, linestyle='--')
    ax.text(28, 14, "REINFORCED WAIST SLAB (175 mm)", color=C_SLATE, fontsize=6.5, rotation=26)
    
    # Step Dimensions Callout
    draw_dim_v(ax, sx + 2*tread + 1, sy + 2*riser, sy + 3*riser, "R = 150 mm", color=C_AMBER, offset=1.0)
    draw_dim_h(ax, sx + 2*tread, sx + 3*tread, sy + 3*riser + 2, "T = 300 mm", color=C_AMBER, offset=1.0)
    
    # Blondel Formula Box
    blondel_box = patches.Rectangle((8, 38), 44, 12, facecolor='#1e293b', edgecolor=C_AMBER, linewidth=1.2)
    ax.add_patch(blondel_box)
    ax.text(30, 45.5, "BLONDEL HUMAN LOCOMOTION CADENCE:", color=C_AMBER, fontsize=7.5, weight='bold', ha='center')
    ax.text(30, 41.5, "2R + T = 2(150) + 300 = 600 mm  [RANGE: 600 - 640 mm]\nOPTIMAL BIOMECHANICAL EFFICIENCY • ZERO CARDIAC SURGE", color=C_WHITE, fontsize=7, ha='center')
    
    # Continuous Headroom Arc
    ax.plot([sx + 1*tread, sx + 5*tread], [sy + 1*riser + 22, sy + 5*riser + 22], color=C_CORAL, linestyle='-.', linewidth=1.2)
    draw_dim_v(ax, sx + 3*tread, sy + 3*riser, sy + 3*riser + 22, "HEADROOM: 2200 mm CLEAR (NBC MANDATE)", color=C_CORAL, offset=1.2)
    
    # Plan View (Right side)
    ax.text(64, 48, "PLAN: DAKSHINAVARTA (CLOCKWISE)", color=C_CYAN, fontsize=8, weight='bold')
    stair_plan = patches.Rectangle((62, 10), 30, 36, facecolor='#111d33', edgecolor=C_CYAN, linewidth=1.5)
    ax.add_patch(stair_plan)
    
    # Mid-landing
    landing = patches.Rectangle((62, 34), 30, 12, facecolor='#1e293b', edgecolor=C_SLATE, linewidth=1.0)
    ax.add_patch(landing)
    ax.text(77, 40, "MID-LANDING: 1200 mm", color=C_WHITE, fontsize=7, ha='center')
    
    # Flights & Central Well
    ax.plot([77, 77], [10, 34], color=C_SLATE, linewidth=2.0)
    ax.text(69.5, 22, "FLIGHT 1 (UP)\nWIDTH: 1200 mm", color=C_WHITE, fontsize=6.5, ha='center')
    ax.text(84.5, 22, "FLIGHT 2 (UP)\nWIDTH: 1200 mm", color=C_WHITE, fontsize=6.5, ha='center')
    
    # Clockwise Turn Arrow
    arrow = patches.FancyArrowPatch((69.5, 26), (84.5, 26), connectionstyle="arc3,rad=-0.6",
                                    color=C_AMBER, arrowstyle="->", mutation_scale=15, linewidth=2.0)
    ax.add_patch(arrow)
    ax.text(77, 30, "CLOCKWISE", color=C_AMBER, fontsize=7, weight='bold', ha='center')
    
    fig.savefig(out_path, facecolor=fig.get_facecolor(), bbox_inches='tight')
    plt.close(fig)

# --- Schematic 05: Life Safety Egress & Travel Arcs ---
def generate_schematic_05(out_path):
    fig, ax = setup_blueprint_fig()
    ax.text(3, 55, "SCHEMATIC 04-02: LIFE SAFETY EGRESS RADII & TRAVEL DISTANCE BOUNDARIES", color=C_CYAN, fontsize=9, weight='bold')
    ax.text(3, 52, "NBC PART 4 TAB. 5 • 30m UN-SPRINKLERED / 45m SPRINKLERED • TIME-SAVER EVACUATION", color=C_SLATE, fontsize=7.5)
    
    # Building floor plate outline
    floor = patches.Rectangle((8, 8), 84, 40, facecolor='#111d33', edgecolor=C_CYAN, linewidth=2.0)
    ax.add_patch(floor)
    
    # Enclosed Fire Exit Stair 1 (Left core)
    stair1 = patches.Rectangle((8, 22), 12, 16, facecolor='#dc2626', edgecolor=C_WHITE, linewidth=1.5)
    ax.add_patch(stair1)
    ax.text(14, 30, "FIRE STAIR 1\n2-HR RATED", color=C_WHITE, fontsize=6.5, weight='bold', ha='center')
    
    # Enclosed Fire Exit Stair 2 (Right core)
    stair2 = patches.Rectangle((80, 22), 12, 16, facecolor='#dc2626', edgecolor=C_WHITE, linewidth=1.5)
    ax.add_patch(stair2)
    ax.text(86, 30, "FIRE STAIR 2\n2-HR RATED", color=C_WHITE, fontsize=6.5, weight='bold', ha='center')
    
    # Primary Corridor Spine
    corridor = patches.Rectangle((20, 26), 60, 8, facecolor='#1e293b', edgecolor=C_AMBER, linestyle='--', linewidth=1.0)
    ax.add_patch(corridor)
    ax.text(50, 30, "PRIMARY EGRESS CORRIDOR (CLEAR WIDTH: 1500 mm / RESIDENTIAL MIN: 1000 mm)", color=C_AMBER, fontsize=7, ha='center', weight='bold')
    
    # Travel Distance Radius Arcs from Stairs
    arc1 = patches.Arc((20, 30), 45, 35, angle=0, theta1=-70, theta2=70, color=C_CORAL, linestyle='-.', linewidth=1.5)
    arc2 = patches.Arc((80, 30), 45, 35, angle=0, theta1=110, theta2=250, color=C_CORAL, linestyle='-.', linewidth=1.5)
    ax.add_patch(arc1)
    ax.add_patch(arc2)
    
    ax.text(38, 42, "30.0 m TRAVEL DISTANCE BOUNDARY (UN-SPRINKLERED)", color=C_CORAL, fontsize=7, weight='bold')
    ax.text(38, 16, "45.0 m TRAVEL DISTANCE ENVELOPE (FULL SPRINKLER SYSTEM)", color=C_GREEN, fontsize=7)
    
    # Dead-end corridor branch
    dead_end = patches.Rectangle((45, 8), 10, 18, facecolor='#1a243b', edgecolor=C_CORAL, linewidth=1.2)
    ax.add_patch(dead_end)
    draw_dim_v(ax, 56.5, 8, 26, "MAX 6.0 m DEAD-END (NBC 4.4.2)", color=C_CORAL, offset=1.0)
    
    # Evacuation arrows
    ax.annotate("", xy=(10, 30), xytext=(35, 30), arrowprops=dict(arrowstyle="->", color=C_GREEN, lw=2.0))
    ax.annotate("", xy=(90, 30), xytext=(65, 30), arrowprops=dict(arrowstyle="->", color=C_GREEN, lw=2.0))
    
    fig.savefig(out_path, facecolor=fig.get_facecolor(), bbox_inches='tight')
    plt.close(fig)

# --- Schematic 06: Basements & Retaining Walls ---
def generate_schematic_06(out_path):
    fig, ax = setup_blueprint_fig()
    ax.text(3, 55, "SCHEMATIC 03-04: DEEP BASEMENT RETAINING WALL & TANKING SUB-SYSTEM", color=C_CYAN, fontsize=9, weight='bold')
    ax.text(3, 52, "NBC 12.8 • CHUDLEY SEC 4 • WATERPROOF TANKING • PERFORATED FRENCH DRAIN", color=C_SLATE, fontsize=7.5)
    
    # Soil Profile on Left
    ax.fill_between([4, 28, 28, 4], [0, 0, 48, 48], facecolor='#1a2332', edgecolor=C_SLATE, linewidth=0.8)
    ax.text(14, 30, "HYDROSTATIC SOIL\n& ACTIVE LATERAL\nEARTH PRESSURE", color=C_SLATE, fontsize=7.5, ha='center')
    
    # RCC Retaining Wall
    wall = patches.Rectangle((28, 6), 6, 46, facecolor='#334155', edgecolor=C_CYAN, linewidth=1.5)
    ax.add_patch(wall)
    ax.text(31, 32, "300 mm RCC\nRETAINING\nWALL", color=C_WHITE, fontsize=6.5, ha='center', weight='bold')
    
    # Dual-Layer Tanking Membrane (Left edge of wall)
    ax.plot([27.5, 27.5], [6, 52], color=C_AMBER, linewidth=2.0)
    ax.text(26, 42, "DUAL-LAYER SBS MEMBRANE", color=C_AMBER, fontsize=6.5, rotation=90, va='center', ha='right')
    
    # French Drain & Filter Gravel at Footing
    ax.add_patch(patches.Circle((22, 10), 3.5, facecolor='#0284c7', edgecolor=C_WHITE, linewidth=1.0))
    ax.text(22, 10, "150 mm\nDRAIN", color=C_WHITE, fontsize=5.5, ha='center', va='center')
    ax.text(22, 4.5, "GEOTEXTILE-WRAPPED FRENCH DRAIN", color=C_CYAN, fontsize=6, ha='center')
    
    # Basement Floor Slab (Right of wall)
    bsmt_slab = patches.Rectangle((34, 6), 60, 5, facecolor='#334155', edgecolor=C_CYAN, linewidth=1.2)
    ax.add_patch(bsmt_slab)
    ax.text(64, 8.5, "250 mm WATERPROOF BASEMENT SLAB (PUDDLE-FLANGE SUMP PIT DRAINAGE)", color=C_WHITE, fontsize=7, ha='center')
    
    # Clear Basement Height
    draw_dim_v(ax, 38, 11, 46, "CLEAR HEIGHT: 2750 mm MIN (NBC 12.8)", color=C_GREEN, offset=1.2)
    
    # Natural Ground Level (NGL)
    ax.plot([4, 28], [48, 48], color=C_GREEN, linewidth=2.0)
    ax.text(14, 50, "NATURAL GROUND LEVEL (NGL)", color=C_GREEN, fontsize=7, ha='center', weight='bold')
    
    # Hydrophilic Waterstop at joint
    ax.add_patch(patches.Rectangle((29.5, 6), 3, 1.5, facecolor='#ef4444', edgecolor=C_WHITE))
    ax.annotate("HYDROPHILIC SWELLING WATERSTOP\nAT COLD KICKER JOINT", xy=(31, 6.7), xytext=(50, 20),
                color=C_CORAL, fontsize=7.5, weight='bold',
                arrowprops=dict(arrowstyle="->", color=C_CORAL, lw=1.2))
    
    fig.savefig(out_path, facecolor=fig.get_facecolor(), bbox_inches='tight')
    plt.close(fig)

# --- Schematic 07: Vehicular Ramps & Parking ---
def generate_schematic_07(out_path):
    fig, ax = setup_blueprint_fig()
    ax.text(3, 55, "SCHEMATIC 03-05: VEHICULAR RAMP GRADIENTS & TURNING GEOMETRY", color=C_CYAN, fontsize=9, weight='bold')
    ax.text(3, 52, "NBC PART 3 / PART 10 • 1:10 MAXIMUM RAMP • 6.0 m TURNING RADIUS • 2.5 x 5.0 m BAYS", color=C_SLATE, fontsize=7.5)
    
    # Longitudinal Ramp Profile (Top half)
    ax.text(4, 48, "LONGITUDINAL SECTION: MULTI-LEVEL PARKING RAMP WITH TRANSITION TRANSITIONS", color=C_AMBER, fontsize=7.5, weight='bold')
    
    # Levels
    ax.plot([6, 22], [42, 42], color=C_WHITE, linewidth=1.5)  # Ground level
    ax.plot([22, 32], [42, 38], color=C_AMBER, linewidth=2.0) # 1:20 Top transition
    ax.plot([32, 68], [38, 20], color=C_CYAN, linewidth=2.5)  # 1:10 Main ramp
    ax.plot([68, 78], [20, 18], color=C_AMBER, linewidth=2.0) # 1:20 Bottom transition
    ax.plot([78, 94], [18, 18], color=C_WHITE, linewidth=1.5)  # Basement floor
    
    ax.text(14, 43.5, "GROUND FLOOR LEVEL", color=C_WHITE, fontsize=6.5)
    ax.text(27, 41, "1:20 (5%)\nTRANSITION", color=C_AMBER, fontsize=6)
    ax.text(50, 31, "1:10 (10%) MAIN RAMP GRADIENT (NBC MAX 1:8)", color=C_CYAN, fontsize=7.5, weight='bold', rotation=-26)
    ax.text(73, 21, "1:20 (5%)\nTRANSITION", color=C_AMBER, fontsize=6)
    ax.text(86, 19.5, "BASEMENT LEVEL", color=C_WHITE, fontsize=6.5)
    
    # Turning Radius & Parking Bay (Bottom half)
    ax.text(4, 15, "PLAN: TURNING CIRCLE & MINIMUM NBC PARKING BAY GEOMETRIES", color=C_CYAN, fontsize=7.5, weight='bold')
    
    # Turning circle
    turn = patches.Circle((24, 7), 6.0, fill=False, edgecolor=C_AMBER, linestyle='--', linewidth=1.2)
    ax.add_patch(turn)
    ax.plot([24, 30], [7, 7], color=C_AMBER, linewidth=1.0)
    ax.text(27, 8, "R = 6.0 m", color=C_AMBER, fontsize=7, weight='bold')
    ax.text(24, 4, "TURNING RADIUS\n(LUXURY VEHICLES)", color=C_WHITE, fontsize=6, ha='center')
    
    # Parking Bays (2.5 x 5.0m)
    bx = 45
    for i in range(3):
        bay = patches.Rectangle((bx + i*14, 2), 12, 12, facecolor='#1e293b', edgecolor=C_CYAN, linewidth=1.0)
        ax.add_patch(bay)
        ax.text(bx + i*14 + 6, 8, f"BAY {i+1}\n2.5 x 5.0 m\n(NBC MIN)", color=C_WHITE, fontsize=6.5, ha='center')
        
    draw_dim_h(ax, bx, bx + 12, 0.5, "2500 mm", color=C_WHITE)
    draw_dim_v(ax, bx - 1.5, 2, 14, "5000 mm", color=C_WHITE)
    
    fig.savefig(out_path, facecolor=fig.get_facecolor(), bbox_inches='tight')
    plt.close(fig)

# --- Schematic 08: Seismic Resilience & Stilt Parking ---
def generate_schematic_08(out_path):
    fig, ax = setup_blueprint_fig()
    ax.text(3, 55, "SCHEMATIC 06-01: SOFT-STOREY STILT PARKING & IS 1893:2016 SEISMIC RESILIENCE", color=C_CYAN, fontsize=9, weight='bold')
    ax.text(3, 52, "IS 1893 • 2.5x SEISMIC SHEAR MULTIPLIER • IS 13920 CONFINEMENT HOOPS • RCC SHEAR CORES", color=C_SLATE, fontsize=7.5)
    
    # Building Frame Elevation (3 storeys shown)
    # Stilt Ground Floor
    ax.plot([10, 90], [10, 10], color=C_WHITE, linewidth=2.0) # Ground
    ax.plot([10, 90], [22, 22], color=C_WHITE, linewidth=2.0) # Stilt ceiling / 1st floor
    ax.plot([10, 90], [34, 34], color=C_WHITE, linewidth=1.5) # 2nd floor
    ax.plot([10, 90], [46, 46], color=C_WHITE, linewidth=1.5) # Roof
    
    # Columns
    cols_x = [15, 35, 65, 85]
    for cx in cols_x:
        # Upper floor columns (Standard)
        ax.add_patch(patches.Rectangle((cx - 1.5, 22), 3, 24, facecolor='#334155', edgecolor=C_SLATE, linewidth=0.8))
        # Ground stilt columns (Heavily reinforced with IS 1893 2.5x design)
        ax.add_patch(patches.Rectangle((cx - 2.5, 10), 5, 12, facecolor='#dc2626', edgecolor=C_WHITE, linewidth=1.2))
        # Confinement hoop ties
        for ty in [11, 13, 19, 21]:
            ax.plot([cx - 2.5, cx + 2.5], [ty, ty], color=C_AMBER, linewidth=1.0)
            
    # Central Shear Wall Core (Eliminating Soft-Storey Collapse)
    shear_core = patches.Rectangle((45, 10), 10, 36, facecolor='#0369a1', edgecolor=C_CYAN, linewidth=2.0)
    ax.add_patch(shear_core)
    ax.text(50, 28, "CONTINUOUS\nFULL-HEIGHT\nRCC SHEAR CORE\n(LIFT/STAIR)\nANCHORED IN\nBEDROCK", color=C_WHITE, fontsize=7, weight='bold', ha='center', va='center')
    
    # Seismic Lateral Force Vector (Earthquake ground motion)
    ax.annotate("SEISMIC SHEAR FORCE (Vb)", xy=(10, 10), xytext=(2, 2),
                color=C_CORAL, fontsize=8, weight='bold',
                arrowprops=dict(arrowstyle="->", color=C_CORAL, lw=2.5))
    
    # Stilt column callout
    ax.annotate("IS 1893 CL. 7.10 MANDATE:\nCOLUMNS DESIGNED FOR\n2.5x CALCULATED SHEAR", xy=(17.5, 16), xytext=(2, 28),
                color=C_CORAL, fontsize=7, weight='bold',
                arrowprops=dict(arrowstyle="->", color=C_CORAL, lw=1.2))
    
    # Infill Masonry on upper floors
    ax.add_patch(patches.Rectangle((16.5, 22), 17, 12, facecolor='#1e293b', edgecolor=C_SLATE, linestyle=':'))
    ax.add_patch(patches.Rectangle((66.5, 22), 17, 12, facecolor='#1e293b', edgecolor=C_SLATE, linestyle=':'))
    ax.text(25, 28, "UPPER FLOOR INFILL MASONRY\nCREATES STIFF UPPER BOX", color=C_SLATE, fontsize=6, ha='center')
    ax.text(75, 28, "UPPER FLOOR INFILL MASONRY\nCREATES STIFF UPPER BOX", color=C_SLATE, fontsize=6, ha='center')
    
    fig.savefig(out_path, facecolor=fig.get_facecolor(), bbox_inches='tight')
    plt.close(fig)

# --- Schematic 09: Bioclimatic Stack Ventilation ---
def generate_schematic_09(out_path):
    fig, ax = setup_blueprint_fig()
    ax.text(3, 55, "SCHEMATIC 08-01: BIOCLIMATIC STACK-EFFECT BUOYANCY & COURTYARD SINK", color=C_CYAN, fontsize=9, weight='bold')
    ax.text(3, 52, "KOENIGSBERGER TROPICAL HOUSING • DEKAY SUN WIND LIGHT • BRAHMASTHAN VOID", color=C_SLATE, fontsize=7.5)
    
    # Villa Cross Section with Central Courtyard
    # Left Wing (South)
    ax.add_patch(patches.Rectangle((8, 10), 30, 32, facecolor='#111d33', edgecolor=C_CYAN, linewidth=1.5))
    # Right Wing (North)
    ax.add_patch(patches.Rectangle((62, 10), 30, 32, facecolor='#111d33', edgecolor=C_CYAN, linewidth=1.5))
    
    # Central Courtyard (Brahmasthan Void)
    court = patches.Rectangle((38, 10), 24, 40, facecolor='#0b1526', edgecolor=C_AMBER, linestyle='--', linewidth=1.5)
    ax.add_patch(court)
    ax.text(50, 48, "THERMAL CHIMNEY ATRIUM", color=C_AMBER, fontsize=7.5, weight='bold', ha='center')
    
    # Water Body in Courtyard
    water = patches.Rectangle((42, 10), 16, 4, facecolor='#0284c7', edgecolor=C_WHITE, linewidth=0.8)
    ax.add_patch(water)
    ax.text(50, 12, "RAIN POOL / EVAPORATIVE HEAT SINK", color=C_WHITE, fontsize=6, ha='center')
    
    # Deep Overhangs (Chajjas on South facade)
    chajja = patches.Rectangle((2, 42), 8, 2, facecolor='#f59e0b', edgecolor=C_WHITE, linewidth=1.0)
    ax.add_patch(chajja)
    ax.text(6, 46, "DEEP 900 mm CHAJJA\nBLOCKS SUMMER SUN", color=C_AMBER, fontsize=6, ha='center')
    
    # Summer Sun Rays (78 deg high noon)
    ax.plot([0, 10], [55, 38], color=C_AMBER, linestyle=':', linewidth=2.0)
    ax.text(3, 52, "78° SUMMER NOON SUN (BLOCKED)", color=C_AMBER, fontsize=6.5)
    
    # Winter Sun Rays (45 deg deep penetration)
    ax.plot([0, 20], [35, 15], color=C_GREEN, linestyle='--', linewidth=1.5)
    ax.text(10, 26, "45° WINTER LOW SUN (ADMITTED)", color=C_GREEN, fontsize=6.5)
    
    # Convective Airflow Vectors (Rising through chimney)
    arrows_y = [16, 26, 36]
    for ay in arrows_y:
        ax.annotate("", xy=(50, ay + 6), xytext=(50, ay),
                    arrowprops=dict(arrowstyle="->", color=C_CORAL, lw=2.0))
    ax.text(50, 32, "HOT AIR RISES\n(THERMAL BUOYANCY)", color=C_CORAL, fontsize=6.5, ha='center', weight='bold')
    
    # High-level Motorized Clerestory Louvers
    ax.add_patch(patches.Rectangle((42, 46), 16, 3, facecolor='#dc2626', edgecolor=C_WHITE, linewidth=1.0))
    ax.text(50, 47.5, "AUTOMATED EXHAUST LOUVERS", color=C_WHITE, fontsize=6, ha='center')
    
    # Cool air draw from garden
    ax.annotate("", xy=(38, 15), xytext=(12, 15), arrowprops=dict(arrowstyle="->", color=C_GREEN, lw=1.8))
    ax.text(25, 17, "COOL AIR DRAW", color=C_GREEN, fontsize=6.5, ha='center')
    
    ax.text(50, 6, "PASSIVE AMBIENT REDUCTION: -4°C TO -6°C WITHOUT COMPRESSORS", color=C_GREEN, fontsize=7.5, weight='bold', ha='center')
    
    fig.savefig(out_path, facecolor=fig.get_facecolor(), bbox_inches='tight')
    plt.close(fig)

# --- Schematic 10: Architectural Acoustics & STC 55 ---
def generate_schematic_10(out_path):
    fig, ax = setup_blueprint_fig()
    ax.text(3, 55, "SCHEMATIC 08-02: ARCHITECTURAL ACOUSTICS & STC 55 PARTY WALL DETECTIVE", color=C_CYAN, fontsize=9, weight='bold')
    ax.text(3, 52, "M. DAVID EGAN ACOUSTICS • STAGGERED STUDS • RESILIENT CLIPS • FLANKING TRANSMISSION", color=C_SLATE, fontsize=7.5)
    
    # High-Performance STC 55 Wall Section (Horizontal cut)
    # Room A on left, Room B on right
    ax.text(15, 50, "SUITE A (NOISY LIVING)", color=C_CORAL, fontsize=8, weight='bold', ha='center')
    ax.text(85, 50, "SUITE B (QUIET BEDROOM)", color=C_GREEN, fontsize=8, weight='bold', ha='center')
    
    # Plasterboard Layer 1 (Left: 2x 15mm acoustic gypsum)
    ax.add_patch(patches.Rectangle((32, 10), 3, 36, facecolor='#94a3b8', edgecolor=C_WHITE, linewidth=0.8))
    ax.text(30, 28, "DOUBLE 15 mm\nACOUSTIC PLASTERBOARD", color=C_WHITE, fontsize=6, rotation=90, va='center', ha='right')
    
    # Resilient Isolation Sound Clips
    for cy in [16, 28, 40]:
        ax.add_patch(patches.Rectangle((35, cy - 1), 2, 2, facecolor='#ef4444', edgecolor=C_WHITE))
    ax.text(36, 44, "RESILIENT\nCLIPS", color=C_CORAL, fontsize=6, ha='center')
    
    # Cavity with Staggered Studs & Mineral Rockwool
    cavity = patches.Rectangle((37, 10), 26, 36, facecolor='#1e293b', edgecolor=C_AMBER, linewidth=1.2)
    ax.add_patch(cavity)
    
    # Rockwool mineral wool infill
    ax.add_patch(patches.Rectangle((39, 10), 22, 36, facecolor='#475569', edgecolor=C_SLATE, linestyle=':'))
    ax.text(50, 28, "50 mm HIGH-DENSITY (48 kg/m³)\nMINERAL FIBRE ROCKWOOL\n(MASS-AIR-MASS ABSORPTION)", color=C_AMBER, fontsize=7, ha='center', weight='bold')
    
    # Plasterboard Layer 2 (Right: 2x 15mm acoustic gypsum)
    ax.add_patch(patches.Rectangle((63, 10), 3, 36, facecolor='#94a3b8', edgecolor=C_WHITE, linewidth=0.8))
    
    # Perimeter Acoustic Sealant Beads
    ax.add_patch(patches.Rectangle((32, 8), 34, 2, facecolor='#38bdf8', edgecolor=C_WHITE))
    ax.add_patch(patches.Rectangle((32, 46), 34, 2, facecolor='#38bdf8', edgecolor=C_WHITE))
    ax.text(50, 6, "NON-HARDENING ACOUSTIC SEALANT PREVENTS FLANKING LEAKS", color=C_CYAN, fontsize=7, ha='center')
    
    # Sound Decibel Attenuation Wave
    ax.annotate("75 dBA NOISE", xy=(28, 28), xytext=(8, 28),
                color=C_CORAL, fontsize=8, weight='bold',
                arrowprops=dict(arrowstyle="->", color=C_CORAL, lw=2.0))
    ax.annotate("<= 20 dBA (WHISPER QUIET)", xy=(92, 28), xytext=(68, 28),
                color=C_GREEN, fontsize=8, weight='bold',
                arrowprops=dict(arrowstyle="->", color=C_GREEN, lw=2.0))
    
    fig.savefig(out_path, facecolor=fig.get_facecolor(), bbox_inches='tight')
    plt.close(fig)

# --- Schematic 11: Daylight Engineering ---
def generate_schematic_11(out_path):
    fig, ax = setup_blueprint_fig()
    ax.text(3, 55, "SCHEMATIC 08-03: DAYLIGHT PENETRATION PHYSICS & 2.5H DEPTH RULE", color=C_CYAN, fontsize=9, weight='bold')
    ax.text(3, 52, "NBC PART 8 SEC 1 • NEUFERT PG 118 • LIGHT SHELF REFLECTION • GLARE CONTROL", color=C_SLATE, fontsize=7.5)
    
    # Room Cross Section
    # Left Exterior Wall with Window & Light Shelf
    ax.plot([14, 14], [10, 22], color=C_CYAN, linewidth=3.0) # Lower wall / sill
    ax.plot([14, 14], [34, 46], color=C_CYAN, linewidth=3.0) # Upper wall / lintel
    ax.plot([14, 90], [10, 10], color=C_WHITE, linewidth=2.0) # Floor
    ax.plot([14, 90], [46, 46], color=C_WHITE, linewidth=2.0) # Ceiling
    
    # Window Sill & Lintel
    ax.text(8, 16, "SILL: 800 mm", color=C_WHITE, fontsize=6.5, ha='right')
    ax.text(8, 38, "LINTEL: 2400 mm", color=C_WHITE, fontsize=6.5, ha='right')
    
    # Light Shelf (Interior & Exterior projection)
    shelf = patches.Rectangle((10, 28), 12, 1.5, facecolor='#fbbf24', edgecolor=C_WHITE, linewidth=1.0)
    ax.add_patch(shelf)
    ax.text(16, 31, "DUAL-SURFACE LIGHT SHELF", color=C_AMBER, fontsize=6.5, ha='center', weight='bold')
    
    # Direct Light vs Bounced Diffuse Light
    # Bounced light hitting ceiling
    ax.plot([4, 16], [36, 29.5], color=C_AMBER, linestyle='-', linewidth=1.5)
    ax.plot([16, 48], [29.5, 46], color=C_AMBER, linestyle='--', linewidth=1.2)
    ax.plot([48, 70], [46, 12], color=C_AMBER, linestyle=':', linewidth=1.0)
    ax.text(48, 48, "DIFFUSE CEILING REFLECTION ILLUMINATES DEEP PLAN", color=C_AMBER, fontsize=7, ha='center')
    
    # Daylight Depth Boundary (2.5 x H)
    ax.axvline(64, color=C_CORAL, linestyle='-.', linewidth=1.5)
    draw_dim_h(ax, 14, 64, 8, "PRIMARY DAYLIGHT ZONE: D = 2.5 x H = 6.0 m (NO ARTIFICIAL LIGHT NEEDED)", color=C_GREEN)
    
    # Lux Zones
    ax.text(30, 20, "ZONE 1: HIGH DAYLIGHT\n(> 500 LUX)", color=C_GREEN, fontsize=7.5, ha='center')
    ax.text(78, 20, "ZONE 2: SUPPLEMENTARY\nLED (200 LUX)", color=C_SLATE, fontsize=7.5, ha='center')
    
    fig.savefig(out_path, facecolor=fig.get_facecolor(), bbox_inches='tight')
    plt.close(fig)

# --- Schematic 12: Architectural Detailing ---
def generate_schematic_12(out_path):
    fig, ax = setup_blueprint_fig()
    ax.text(3, 55, "SCHEMATIC 12-01: EDWARD ALLEN TECTONIC DETAILING & WATER-SHEDDING ANATOMY", color=C_CYAN, fontsize=9, weight='bold')
    ax.text(3, 52, "ARCHITECTURAL DETAILING (ALLEN & RAND) • CAPILLARY BREAKS • DRIP GROOVES • FLASHINGS", color=C_SLATE, fontsize=7.5)
    
    # Detailed Window Head / Chajja / Drip Edge Section
    # RCC Lintel & Chajja Overhang
    chajja_pts = [(20, 36), (60, 36), (60, 28), (56, 28), (56, 25), (52, 25), (52, 28), (20, 28)]
    cpx, cpy = zip(*chajja_pts)
    ax.fill(cpx, cpy, facecolor='#334155', edgecolor=C_CYAN, linewidth=1.5)
    ax.text(36, 31, "RCC CANOPY SLAB", color=C_WHITE, fontsize=7, weight='bold')
    
    # 10x10mm Drip Groove under overhang
    ax.add_patch(patches.Rectangle((52, 25), 4, 3, facecolor='#0d1522', edgecolor=C_CORAL, linewidth=1.0))
    ax.annotate("10 x 10 mm CONTINUOUS DRIP GROOVE\nBREAKS SURFACE TENSION (ZERO WATER CREEP)", xy=(54, 25), xytext=(62, 18),
                color=C_CORAL, fontsize=7, weight='bold',
                arrowprops=dict(arrowstyle="->", color=C_CORAL, lw=1.2))
    
    # Water Drop Path (Deflected downward)
    ax.annotate("", xy=(54, 12), xytext=(54, 24), arrowprops=dict(arrowstyle="->", color=C_CYAN, lw=2.0))
    ax.text(56, 14, "GRAVITATIONAL RUNOFF", color=C_CYAN, fontsize=6)
    
    # Slope to drain on top of slab
    ax.plot([20, 60], [38, 36], color=C_AMBER, linewidth=1.5)
    ax.text(38, 40, "1:50 POSITIVE SLOPE TO RAINWATER CHUTE", color=C_AMBER, fontsize=7)
    
    # Window Frame & Elastomeric Sealant Joint
    win = patches.Rectangle((20, 14), 10, 14, facecolor='#1e293b', edgecolor=C_WHITE, linewidth=1.0)
    ax.add_patch(win)
    ax.text(25, 20, "THERMALLY\nBROKEN\nALUMINIUM\nFRAME", color=C_WHITE, fontsize=6, ha='center')
    
    # Sealant with Closed-Cell Backer Rod
    ax.add_patch(patches.Circle((25, 27.5), 1.2, facecolor='#ef4444', edgecolor=C_WHITE))
    ax.annotate("POLYETHYLENE BACKER ROD +\nPOLYSULPHIDE SEALANT JOINT", xy=(25, 27.5), xytext=(4, 22),
                color=C_AMBER, fontsize=6.5, weight='bold',
                arrowprops=dict(arrowstyle="->", color=C_AMBER, lw=1.0))
    
    # Capillary break dimension
    ax.text(25, 11, "THREE-LAYER WATER CONTROL: DEFLECTION, DRAINAGE, DRYING", color=C_GREEN, fontsize=7.5, weight='bold')
    
    fig.savefig(out_path, facecolor=fig.get_facecolor(), bbox_inches='tight')
    plt.close(fig)

# =============================================================================
# COMPILE ALL 12 SCHEMATICS
# =============================================================================
SCHEMATIC_MAP = {
    "PLATE_03_01": SCHEMATICS_DIR / "schematic_03_01.png",
    "PLATE_03_02": SCHEMATICS_DIR / "schematic_03_02.png",
    "PLATE_03_03": SCHEMATICS_DIR / "schematic_03_03.png",
    "PLATE_04_01": SCHEMATICS_DIR / "schematic_04_01.png",
    "PLATE_04_02": SCHEMATICS_DIR / "schematic_04_02.png",
    "PLATE_03_04": SCHEMATICS_DIR / "schematic_03_04.png",
    "PLATE_03_05": SCHEMATICS_DIR / "schematic_03_05.png",
    "PLATE_06_01": SCHEMATICS_DIR / "schematic_06_01.png",
    "PLATE_08_01": SCHEMATICS_DIR / "schematic_08_01.png",
    "PLATE_08_02": SCHEMATICS_DIR / "schematic_08_02.png",
    "PLATE_08_03": SCHEMATICS_DIR / "schematic_08_03.png",
    "PLATE_12_01": SCHEMATICS_DIR / "schematic_12_01.png",
}

print("[+] Rendering 12 CAD Blueprint Schematics via Matplotlib...")
generate_schematic_01(SCHEMATIC_MAP["PLATE_03_01"])
generate_schematic_02(SCHEMATIC_MAP["PLATE_03_02"])
generate_schematic_03(SCHEMATIC_MAP["PLATE_03_03"])
generate_schematic_04(SCHEMATIC_MAP["PLATE_04_01"])
generate_schematic_05(SCHEMATIC_MAP["PLATE_04_02"])
generate_schematic_06(SCHEMATIC_MAP["PLATE_03_04"])
generate_schematic_07(SCHEMATIC_MAP["PLATE_03_05"])
generate_schematic_08(SCHEMATIC_MAP["PLATE_06_01"])
generate_schematic_09(SCHEMATIC_MAP["PLATE_08_01"])
generate_schematic_10(SCHEMATIC_MAP["PLATE_08_02"])
generate_schematic_11(SCHEMATIC_MAP["PLATE_08_03"])
generate_schematic_12(SCHEMATIC_MAP["PLATE_12_01"])
print("    ✅ All 12 Schematics rendered successfully at 200 DPI!")

# =============================================================================
# DATA DEFINITIONS FOR THE 12 MASTER PLATES
# =============================================================================
MASTER_PLATES = [
    {
        "plate_code": "PLATE 03-01",
        "nbc_clause": "NBC 2026 VOL. 1 • PART 3 • CLAUSE 12.2",
        "title": "THE MASTER SUITE: HABITABLE VOLUME & SOLAR AXIS",
        "schematic_key": "PLATE_03_01",
        "specs": [
            ("NBC 2026 Statutory Mandate", "Min Floor Area 9.5 m² (Single), 13.5 m² (Double). Clear Width >= 2.4 m. Clear Height >= 2.75 m (Reducible to 2.4 m in air-conditioned spaces). External fenestration aggregate >= 10% carpet area."),
            ("Neufert & Time-Saver Ergonomics", "900 mm (3 ft) clear perimeter aisle on 3 sides of king bed (1800x2000mm). 1200 mm (4 ft) between footboard and wardrobe shutters for dressing. Window sill at 800 mm aligns seated eye-level with gardens."),
            ("Francis D.K. Ching Spatial Theory", "Form, Space & Order (Ch. 4): Rooms > 25 m² choked at 2.75 m induce horizontal visual compression. Maintain a 1:1.25 to 1:1.40 height-to-width volumetric proportion."),
            ("Bioclimatics & CAD Vastu Treatises", "Mayamata Ch. 26 & Koenigsberger Solar Physics: South-West sector (Nairutya Sthira Pada) absorbs brutal afternoon infrared radiation (2 PM - 5:30 PM). Thick masonry and wardrobe buffers in SW protect inner villa."),
            ("The AGNAA Studio Luxury Benchmark", "Slab cast at 3.35 m to 3.50 m (11.5 ft). A 350 mm dropped plenum hides ducted VRF AC while leaving a full 3.0 m (10 ft) finished headroom, inducing natural stack-effect buoyancy.")
        ]
    },
    {
        "plate_code": "PLATE 03-02",
        "nbc_clause": "NBC 2026 VOL. 1 • PART 3 • CLAUSE 12.3",
        "title": "THE CULINARY MACHINE: WORK TRIANGLES & AGNI EXHAUST",
        "schematic_key": "PLATE_03_02",
        "specs": [
            ("NBC 2026 Statutory Mandate", "Standalone kitchen min area 5.0 m², min width 1.8 m. Combined with dining min 7.5 m² (width 2.1 m). Clear height >= 2.75 m. External window opening >= 1.0 m². Strictly prohibited from opening into WC."),
            ("Time-Saver & Neufert Ergonomics", "1200 mm (4 ft) clear aisle between opposing parallel counters for simultaneous oven swing (450 mm) and circulation. 900 mm prep buffer between sink and hob. Work triangle perimeter 4.0 m to 7.9 m."),
            ("Francis D.K. Ching Spatial Theory", "Space-within-a-Space: Segregate public entertaining from high-smoke Indian culinary operations through an architectural threshold: the Show Island Datum backed by a concealed Wet Scullery."),
            ("Bioclimatics & CAD Vastu Treatises", "Samarāṅgaṇa Sūtradhāra Ch. 38 (King Bhoja): Agni Kona (South-East). Prevailing South-Westerly summer winds in peninsular India draw culinary exhaust fumes outward and away from bedrooms."),
            ("The AGNAA Studio Luxury Benchmark", "Dual-Kitchen Architectural Hierarchy: Monolithic 3.0 m quartz island facing dining, backed by a concealed heavy-duty Wet Scullery with direct service yard access and dedicated 1200-CFM external exhaust.")
        ]
    },
    {
        "plate_code": "PLATE 03-03",
        "nbc_clause": "NBC 2026 VOL. 1 • PART 3 • CLAUSE 12.4 & PART 9",
        "title": "WET ENVIRONMENTS: LUXURY ABLUTION & EXTERNAL PIPE SHAFTS",
        "schematic_key": "PLATE_03_03",
        "specs": [
            ("NBC 2026 Statutory Mandate", "Bathroom min area 1.8 m² (width 1.2 m); WC min 1.1 m² (width 0.9 m); combined bath+WC min 2.8 m². Clear height >= 2.1 m. Ventilator >= 0.3 m² direct to exterior or open shaft (min shaft area 1.2 m²)."),
            ("Neufert Wet-Room Ergonomics", "Vanity counter height 850-900 mm; 900 mm clear frontage. WC centerline 450 mm from side walls; 900 mm clear frontal knee clearance. Shower wet envelope min 900x1200 mm with 50 mm sunken floor depression."),
            ("Edward Allen & Chudley Construction", "Multi-tier tanking: Elastomeric polyurethane / SBS membrane upturned 300 mm above finished floor level and full height in wet shower enclosure. Acoustic insulation lagging on all soil and waste drops."),
            ("Bioclimatics & CAD Vastu Treatises", "Samarāṅgaṇa Sūtradhāra Ch. 38: Bathrooms in North-West (Vayu Kona) or East; strictly prohibited in North-East (Ishan) or South-West (Nairutya). Waste drainage slope strictly toward North or East."),
            ("The AGNAA Studio Luxury Benchmark", "5-Fixture Master Spa Suite: Monolithic double quartz vanity, enclosed private WC cubicle with acoustic glazing, and walk-in rain shower with flush frameless linear drains and unpolished flamed stone floors.")
        ]
    },
    {
        "plate_code": "PLATE 04-01",
        "nbc_clause": "NBC 2026 VOL. 1 • PART 4 • CLAUSE 4.4.3",
        "title": "VERTICAL SCULPTURE: TREAD-RISER BLONDEL CADENCE & HEADROOM",
        "schematic_key": "PLATE_04_01",
        "specs": [
            ("NBC 2026 Statutory Mandate", "Residential internal flight min width 1.0 m (1000 mm), commercial 1.5 m. Max riser 150 mm (recommended public) / 190 mm (residential cap). Min tread 250 mm (res) / 300 mm (public). Clear headroom throughout >= 2.2 m."),
            ("Neufert & Blondel Ergonomic Formula", "Universal locomotive cadence: 2R + T = 600 mm to 640 mm. A 150 mm riser + 300 mm tread produces exactly 2(150) + 300 = 600 mm (optimal human cadence preventing cardiac fatigue during ascent)."),
            ("Francis D.K. Ching Spatial Theory", "Vertical Movement Datum: The staircase is an active kinetic sculpture piercing horizontal slabs, drawing natural daylight deep into lower levels through skylit atrium voids."),
            ("Classical Treatises (CAD Vastu)", "Vishwakarma Prakash Ch. 6 Verses 34-38: Dakshinavarta (Clockwise Ascent). Ascent must turn right matching natural centrifugal balance. Heavy structural mass anchored in South or West."),
            ("The AGNAA Studio Luxury Benchmark", "1200 mm to 1350 mm wide cantilevered treads emerging from a reinforced concrete shear wall, clad in flamed leathered granite with zero visible stringers and continuous recessed brass LED handrails.")
        ]
    },
    {
        "plate_code": "PLATE 04-02",
        "nbc_clause": "NBC 2026 VOL. 1 • PART 4 • CLAUSE 4.4.2 & TAB. 5",
        "title": "EGRESS GEOMETRIES: TRAVEL DISTANCES & LIFE SAFETY CORRIDORS",
        "schematic_key": "PLATE_04_02",
        "specs": [
            ("NBC 2026 Statutory Mandate", "Max travel distance to enclosed fire exit: 30 m (un-sprinklered), 45 m (fully sprinklered). Dead-end corridor limit: 6.0 m (un-sprinklered), 15.0 m (sprinklered). Min corridor width: 1.0 m (res), 1.5 m (commercial)."),
            ("Time-Saver Standards for Building Types", "Evacuation capacity: 45 persons per minute per 500 mm unit exit width. Opposing corridor clearance: Min 1200 mm for two people to pass without shoulder contact."),
            ("Pallasmaa & Ching Sensory Circulation", "Circulation spines must not be sterile escape tubes. Ching mandates terminating paths on natural daylight apertures, framed courtyards, or focal artwork niches."),
            ("Classical Treatises (CAD Vastu)", "Brihat Samhitā Ch. 53 & Vishwakarma Prakash Ch. 3: Mahamarma Egress Purity. Primary East-West and North-South circulation axes (Sutra) must remain unblocked by structural columns."),
            ("The AGNAA Studio Luxury Benchmark", "In high-density luxury villas, egress paths are engineered with dual independent escape routes restricted to 22 metres max (far exceeding statutory 30m safety), fitted with flush 2-hour fire-rated doors.")
        ]
    },
    {
        "plate_code": "PLATE 03-04",
        "nbc_clause": "NBC 2026 VOL. 1 • PART 3 • CLAUSE 12.8 & PART 6",
        "title": "SUBTERRANEAN ANATOMY: BASEMENT TANKING & DRAINAGE SUMPS",
        "schematic_key": "PLATE_03_04",
        "specs": [
            ("NBC 2026 Statutory Mandate", "Basement clear height min 2.4 m, max 4.5 m (commercial). Ventilation min 10% wall area or mechanical 6 air changes/hr. Retaining walls must be structural RCC designed for hydrostatic soil pressure."),
            ("Chudley & Greeno Tanking Principles", "External tanking envelope: Dual-layer elastomeric polymer-modified bitumen membrane protected by high-density polyethylene dimpled drainage board with continuous perforated sub-soil drain at footing."),
            ("Edward Allen Material Detailing", "Cold joints between slab and wall require continuous hydrophilic expanding waterstops (swells 300% on contact with moisture) and puddle-flange pipe sleeve penetrations."),
            ("Telangana Bylaws & Vastu Canons", "GHMC G.O. 168: Basements permitted exclusively within building envelope after statutory open setbacks. Vastu: Heavy mechanical plant and pump sumps anchored in North-West or South-West."),
            ("The AGNAA Studio Luxury Benchmark", "AGNAA luxury basements feature 3.2 m clear headroom, accommodating private acoustic screening rooms, wine cellars, and double submersible backup sump pumps with auto-starting generators.")
        ]
    },
    {
        "plate_code": "PLATE 03-05",
        "nbc_clause": "NBC 2026 VOL. 1 • PART 3 / PART 10 (PARKING)",
        "title": "VEHICULAR INGRESS: RAMP GRADIENTS & TURNING RADII",
        "schematic_key": "PLATE_03_05",
        "specs": [
            ("NBC 2026 & GHMC Statutory Mandate", "Max ramp slope: 1:10 (10%) for cars; 1:8 (12.5%) for two-wheelers. Min ramp width: 3.0 m (one-way), 6.0 m (two-way). Parking bay min: 2.5 m x 5.0 m. Two-way driveway aisle min width: 6.0 m."),
            ("Neufert & Time-Saver Vehicular Dynamics", "Turning circle outer radius min 6.0 m for full-size luxury sedans (Mercedes S-Class / BMW 7-Series). Ramp entry and exit require 3.0 m long transition slopes at 1:20 (5%) to prevent chassis scraping."),
            ("Francis D.K. Ching Spatial Sequence", "Vehicular Arrival as Tectonic Threshold: Transition from public street speed to residential tranquility through an architectural porte-cochère with textured granite pavers and integrated up-lighting."),
            ("Classical Treatises (CAD Vastu)", "Manasara Ch. 12: Vehicular entry (Vahana Pravesha) optimal in East-3 (Jayanta) or North-3 (Mukhya). Vehicles should park facing North or East for auspicious departure."),
            ("The AGNAA Studio Luxury Benchmark", "Curvilinear 6.5 m wide two-way ramp finished in acid-etched exposed aggregate granite with integrated radiant floor heating/anti-skid grooves and direct access to an air-conditioned 4-car private gallery.")
        ]
    },
    {
        "plate_code": "PLATE 06-01",
        "nbc_clause": "NBC 2026 VOL. 1 • PART 6 • IS 1893:2016",
        "title": "EARTHQUAKE RESILIENCE: SOFT-STOREY STILTS & SHEAR WALL CORES",
        "schematic_key": "PLATE_06_01",
        "specs": [
            ("NBC 2026 & IS 1893:2016 Mandate", "All RCC structures in Seismic Zones II to V must comply with IS 1893 and IS 13920. Buildings with open ground stilt parking (Soft Storey) are legally mandated to have columns and beams designed for 2.5x calculated seismic shear forces."),
            ("Neufert & Structural Bay Optimization", "Column grids of 6.0 m to 8.4 m optimize underground vehicular parking turning bays while aligning with upper residential partition walls."),
            ("Mario Salvadori & Ching Structural Rationalism", "Why Buildings Stand Up: Structural columns define architectural rhythm. Columns must provide continuous load paths down to granitic bedrock without abrupt horizontal transfers."),
            ("Classical Treatises (CAD Vastu)", "Samarāṅgaṇa Sūtradhāra Ch. 49 (Stambha Nirmana): Columns must follow proportional tapering and avoid intersecting diagonal Mahamarma intersection nodes."),
            ("The AGNAA Studio Luxury Benchmark", "AGNAA mandates continuous full-height reinforced shear wall cores flanking elevators and stairs, eliminating soft-storey collapse risks on stilt levels while maintaining slender 200 mm perimeter columns.")
        ]
    },
    {
        "plate_code": "PLATE 08-01",
        "nbc_clause": "NBC 2026 VOL. 2 • PART 8 & PART 11 (SUSTAINABILITY)",
        "title": "BIOCLIMATIC PHYSICS: STACK-EFFECT BUOYANCY & COURTYARD SINKS",
        "schematic_key": "PLATE_08_01",
        "specs": [
            ("NBC 2026 & ECBC Energy Mandate", "Habitable aggregate opening area >= 10% floor area. Solar Heat Gain Coefficient (SHGC) for fenestrations <= 0.25 in warm climates. Natural cross-ventilation requires opposing or adjacent openings."),
            ("Neufert & Koenigsberger Daylighting", "Daylight penetration depth: Natural light penetrates up to 2.5 times the window head height from the exterior wall. Minimum 3 to 6 air changes per hour (ACH) for indoor air quality."),
            ("Francis D.K. Ching & Mark DeKay", "Sun, Wind, and Light: High-level clerestory apertures exhaust heated air, creating negative pressure that draws cool air across ground-floor water bodies."),
            ("Classical Treatises (CAD Vastu)", "Matsya Purana Ch. 252 & Mayamata Ch. 26: The central courtyard (Brahmasthan Void) acts as a celestial thermal chimney, cooling the surrounding verandahs naturally."),
            ("The AGNAA Studio Luxury Benchmark", "AGNAA villas integrate double-height rain atriums with automated motorized clerestory louvers, reducing internal ambient temperatures by 4°C to 6°C compared to exterior Hyderabad summer heat.")
        ]
    },
    {
        "plate_code": "PLATE 08-02",
        "nbc_clause": "NBC 2026 VOL. 2 • PART 8 • SECTION 4 (ACOUSTICS)",
        "title": "ARCHITECTURAL ACOUSTICS: MASS-AIR-MASS & FLANKING ISOLATION",
        "schematic_key": "PLATE_08_02",
        "specs": [
            ("NBC 2026 Statutory Acoustic Mandate", "Inter-dwelling party walls must achieve Sound Transmission Class STC >= 50 dBA. Indoor ambient noise level in bedrooms must not exceed 35 dBA (45 dBA in living areas)."),
            ("M. David Egan Architectural Acoustics", "Mass Law & Decoupling: Doubling mass increases isolation by 6 dB. True acoustic isolation requires staggered-stud or double-wall assemblies with resilient channel clips and rockwool damping cavity."),
            ("Peter Zumthor Sensory Tectonics", "Atmospheres: Acoustic intimacy defines architectural luxury. Sound must be absorbed smoothly without slap-echo flutter through calibrated perforated timber panels and heavy drapery datums."),
            ("Classical Treatises (CAD Vastu)", "Manasara Ch. 34: Spatial harmonics dictate that sound reverberations in living quarters (Shayanashala) must be contained to preserve peace and prevent psychic agitation."),
            ("The AGNAA Studio Luxury Benchmark", "STC 58 Acoustic Envelopes: All home theatre and master bedroom partitions feature double staggered metal studs, 50 mm 48 kg/m³ rockwool, resilient sound clips, and double 15 mm acoustic drywall with Green Glue.")
        ]
    },
    {
        "plate_code": "PLATE 08-03",
        "nbc_clause": "NBC 2026 VOL. 2 • PART 8 • SECTION 1 (LIGHTING)",
        "title": "DAYLIGHT ENGINEERING: 2.5H DEPTH & CIRCADIAN ILLUMINANCE",
        "schematic_key": "PLATE_08_03",
        "specs": [
            ("NBC 2026 & ECBC Lighting Mandates", "Daylight Factor (DF) >= 1.5% in habitable rooms. Lighting Power Density (LPD) <= 6.0 W/m² for residential interiors. Glare rating (UGR) <= 19 in study and work areas."),
            ("Livingston & Karlen Lighting Principles", "Layered Illumination Hierarchy: 3 distinct layers: Ambient (150-200 lux), Task (400-500 lux on counters/desks), and Accent (5:1 luminance ratio highlighting textured stone artwork)."),
            ("Neufert & Koenigsberger Solar Physics", "Daylight Penetration Rule: Usable natural daylight extends into a room to a depth of 2.5 times the window head height. Dual-surface light shelves redirect glare-free diffuse light onto the ceiling slab."),
            ("Classical Treatises (CAD Vastu)", "Samarāṅgaṇa Sūtradhāra Ch. 29: Pratah Surya (Morning Sun) in East brings beneficial ultraviolet rays for sanitation; Western setting sun must be shaded to prevent toxic infrared buildup."),
            ("The AGNAA Studio Luxury Benchmark", "Automated DALI-2 Circadian Lighting System: Color temperature transitions smoothly from 5000K crisp white at 9 AM down to 2700K warm candlelight at 8 PM, synchronizing human melatonin cycles.")
        ]
    },
    {
        "plate_code": "PLATE 12-01",
        "nbc_clause": "NBC 2026 VOL. 2 • PART 12 • TECTONIC DETAILING",
        "title": "ARCHITECTURAL DETAILING: CAPILLARY BREAKS & JOINT INTEGRITY",
        "schematic_key": "PLATE_12_01",
        "specs": [
            ("NBC 2026 Part 12 Statutory Mandate", "All exterior cladding, copings, and fenestration junctions must incorporate continuous weatherproofing membranes, expansion relief joints, and positive water drainage slopes >= 1:50."),
            ("Edward Allen's Detailing Hierarchy", "Three-Tier Water Penetration Control: 1. Deflect water with overhangs and sloped sills; 2. Drain penetrated moisture with weepholes and cavities; 3. Dry trapped humidity via ventilation gaps."),
            ("Peter Zumthor Material Craft", "Thinking Architecture: A detail is not an ornament; it is the physical joint where two materials meet in mutual respect. Joints must absorb thermal expansion gracefully without cracking."),
            ("Classical Treatises (CAD Vastu)", "Mayamata Ch. 18 (Sandhi Vidhana): Tectonic joinery rules dictate that junctions between wood, stone, and metal must preserve axial equilibrium and prevent premature weathering decay."),
            ("The AGNAA Studio Luxury Benchmark", "Every exterior slab, sill, and coping features an inverted 10x10 mm continuous drip groove cut 20 mm from the front edge, terminating capillary action and preventing facade staining.")
        ]
    }
]

# =============================================================================
# ASSEMBLE MASTER PDF USING PYMUPDF
# =============================================================================
print("[+] Assembling Publication Master PDF...")
doc = fitz.open()

# -----------------------------------------------------------------------------
# PAGE 1: COVER PAGE
# -----------------------------------------------------------------------------
cover = doc.new_page(width=595, height=842)
cover.draw_rect(fitz.Rect(0, 0, 595, 842), color=PDF_NAVY, fill=PDF_NAVY)

# Border architectural frame
cover.draw_rect(fitz.Rect(25, 25, 570, 817), color=(0.25, 0.35, 0.45), width=1.0)
cover.draw_rect(fitz.Rect(30, 30, 565, 812), color=(0.15, 0.25, 0.35), width=0.5)

# Title Block
cover.insert_text((55, 120), "AGNAA DESIGN STUDIO • COMPREHENSIVE EDITION", fontsize=11, color=(0.6, 0.75, 0.95), fontname="helv")
cover.insert_text((55, 155), "NBC 2026 — AGNAA", fontsize=32, color=(1.0, 1.0, 1.0), fontname="helv")
cover.insert_text((55, 185), "THE ILLUSTRATED ARCHITECTURAL COMMENTARY", fontsize=13, color=PDF_GOLD, fontname="helv")
cover.insert_text((55, 205), "A Complete Synthesis of Statutory Law, Human Ergonomics, Tectonic Physics & Vastu Treatises", fontsize=9.5, color=(0.7, 0.8, 0.9), fontname="helv")

cover.draw_line(fitz.Point(55, 225), fitz.Point(540, 225), color=(0.3, 0.5, 0.8), width=1.5)

manifesto_text = (
    "ABOUT THIS MASTERWORK\n\n"
    "The National Building Code of India (NBC 2026 / SP 7) defines statutory minimums to safeguard "
    "human life. However, legal minimums rarely produce exceptional, bioclimatic luxury architecture.\n\n"
    "This publication bridges the gap. On each plate, every statutory clause is elevated through:\n"
    "  1. NEUFERT & TIME-SAVER STANDARDS: Anthropometric and ergonomic clearances.\n"
    "  2. FRANCIS D.K. CHING & EDWARD ALLEN: Spatial theory, tectonic joinery, and water physics.\n"
    "  3. O.H. KOENIGSBERGER & MARK DEKAY: Tropical bioclimatic physics, stack ventilation, and solar orientation.\n"
    "  4. 17 CLASSICAL SANSKRIT TREATISES: CAD Vastu geometry, cosmic energy grids (Brahmasthan), and orientation.\n"
    "  5. THE AGNAA STUDIO BENCHMARK: Ar. Sridhar's uncompromising luxury specifications.\n\n"
    "AUTHOR & STUDIO CREDENTIALS:\n"
    "Principal Architect: Ar. Sridhar\n"
    "Alumnus: School of Planning and Architecture (SPA Delhi, NIRF Rank #1)\n"
    "Practice: AGNAA Design Studio (Financial District, Hyderabad, Telangana)\n"
    "Registration: Council of Architecture (CoA) New Delhi • IIA Fellow"
)
cover.insert_textbox(fitz.Rect(55, 245, 540, 520), manifesto_text, fontsize=9.0, color=(0.85, 0.88, 0.92), fontname="helv")

# Cover Technical Blueprint Accent
accent_rect = fitz.Rect(55, 540, 540, 740)
cover.draw_rect(accent_rect, color=(0.2, 0.3, 0.4), fill=(0.08, 0.12, 0.20), width=0.8)
cover.insert_text((75, 565), "SYSTEM SPECIFICATION MATRIX (12 MASTER PLATES)", fontsize=10, color=(0.4, 0.7, 1.0), fontname="helv")
cover.insert_text((75, 585), "• PART 3: Habitable Suites, Dual Kitchens, Bathrooms, Basements, Vehicular Ramps", fontsize=8.5, color=(0.7, 0.8, 0.9), fontname="helv")
cover.insert_text((75, 605), "• PART 4: Egress Arcs, Fire Corridors, Cantilevered Staircases & Blondel Locomotion", fontsize=8.5, color=(0.7, 0.8, 0.9), fontname="helv")
cover.insert_text((75, 625), "• PART 6: Soft-Storey Seismic Stilt Frames & IS 1893:2016 2.5x Shear Criteria", fontsize=8.5, color=(0.7, 0.8, 0.9), fontname="helv")
cover.insert_text((75, 645), "• PART 8: Stack Buoyancy Courtyards, STC 55 Acoustic Envelopes & Daylight Physics", fontsize=8.5, color=(0.7, 0.8, 0.9), fontname="helv")
cover.insert_text((75, 665), "• PART 12: Edward Allen Detailing, Capillary Break Drip Grooves & Joint Mechanics", fontsize=8.5, color=(0.7, 0.8, 0.9), fontname="helv")
cover.insert_text((75, 695), "INTEGRATED WITH AGNAA 3B AIR-GAPPED CAD COMPLIANCE AI", fontsize=8.5, color=PDF_GOLD, fontname="helv")
cover.insert_text((75, 715), "Native DXF Generation • 50ms Real-Time Auditing • Zero Cloud Dependencies", fontsize=8, color=(0.6, 0.7, 0.8), fontname="helv")

# Footer
cover.insert_text((55, 785), "FIRST EDITION • COPYRIGHT © 2026 AGNAA DESIGN STUDIO • ALL RIGHTS RESERVED", fontsize=8, color=(0.5, 0.6, 0.7), fontname="helv")
cover.insert_text((55, 800), "WWW.AGNAA.IN • FINANCIAL DISTRICT, GACHIBOWLI, HYDERABAD", fontsize=8, color=(0.5, 0.6, 0.7), fontname="helv")

# -----------------------------------------------------------------------------
# PAGE 2: TABLE OF CONTENTS & CANONICAL MATRIX
# -----------------------------------------------------------------------------
toc_page = doc.new_page(width=595, height=842)
toc_page.draw_rect(fitz.Rect(0, 0, 595, 65), color=PDF_NAVY, fill=PDF_NAVY)
toc_page.insert_text((40, 26), "AGNAA DESIGN STUDIO • MASTER INDEX", fontsize=9, color=(0.7, 0.8, 0.95), fontname="helv")
toc_page.insert_text((40, 48), "TABLE OF CONTENTS & CANONICAL MAPPING MATRIX", fontsize=12, color=(1.0, 1.0, 1.0), fontname="helv")

# Subheader
toc_page.draw_rect(fitz.Rect(0, 65, 595, 85), color=PDF_ACCENT, fill=PDF_ACCENT)
toc_page.insert_text((40, 79), "THE 12 CANONICAL PLATES OF NBC 2026 — AGNAA", fontsize=8.5, color=(1.0, 1.0, 1.0), fontname="helv")

# Table Rows
ty = 105
for idx, pl in enumerate(MASTER_PLATES):
    row_bg = (0.96, 0.97, 0.98) if idx % 2 == 0 else (1.0, 1.0, 1.0)
    toc_page.draw_rect(fitz.Rect(35, ty, 560, ty + 52), color=PDF_CARD_BORDER, fill=row_bg, width=0.5)
    
    # Plate Code Badge
    toc_page.draw_rect(fitz.Rect(42, ty + 8, 120, ty + 26), color=PDF_ACCENT, fill=PDF_ACCENT)
    toc_page.insert_text((50, ty + 21), pl["plate_code"], fontsize=8, color=(1.0, 1.0, 1.0), fontname="helv")
    
    # Page Number
    toc_page.insert_text((520, ty + 22), f"PAGE {idx + 3}", fontsize=8.5, color=PDF_ACCENT, fontname="helv")
    
    # Title & Code Anchor
    toc_page.insert_text((130, ty + 21), pl["title"], fontsize=9, color=PDF_TEXT_DARK, fontname="helv")
    toc_page.insert_text((42, ty + 42), f"CODE ANCHOR: {pl['nbc_clause']}", fontsize=7.5, color=(0.4, 0.45, 0.5), fontname="helv")
    
    ty += 56

# TOC Footer
toc_page.draw_rect(fitz.Rect(0, 815, 595, 842), color=PDF_NAVY, fill=PDF_NAVY)
toc_page.insert_text((40, 831), "NBC 2026 — AGNAA • AR. SRIDHAR (SPA DELHI) • FINANCIAL DISTRICT HYDERABAD • WWW.AGNAA.IN", fontsize=7.5, color=(0.6, 0.7, 0.8), fontname="helv")
toc_page.insert_text((535, 831), "PAGE 2", fontsize=7.5, color=(0.9, 0.9, 0.9), fontname="helv")

# -----------------------------------------------------------------------------
# PAGES 3 to 14: THE 12 FULL PLATES
# -----------------------------------------------------------------------------
for p_idx, plate in enumerate(MASTER_PLATES):
    page = doc.new_page(width=595, height=842)
    
    # 1. Top Header Banner
    page.draw_rect(fitz.Rect(0, 0, 595, 60), color=PDF_NAVY, fill=PDF_NAVY)
    page.insert_text((35, 24), "AGNAA DESIGN STUDIO • NBC 2026 VISUAL COMMENTARY", fontsize=8.5, color=(0.7, 0.8, 0.95), fontname="helv")
    page.insert_text((35, 46), plate["title"], fontsize=11.5, color=(1.0, 1.0, 1.0), fontname="helv")
    page.insert_text((485, 46), plate["plate_code"], fontsize=11.5, color=(0.4, 0.7, 1.0), fontname="helv")
    
    # Code Anchor Sub-banner
    page.draw_rect(fitz.Rect(0, 60, 595, 78), color=PDF_ACCENT, fill=PDF_ACCENT)
    page.insert_text((35, 73), f"CODE ANCHOR: {plate['nbc_clause']}", fontsize=8.0, color=(1.0, 1.0, 1.0), fontname="helv")
    
    # 2. Embed the 16:9 CAD Technical Blueprint Schematic
    schematic_img_path = SCHEMATIC_MAP[plate["schematic_key"]]
    schematic_rect = fitz.Rect(32, 84, 563, 384)  # 531 x 300 pt
    page.draw_rect(schematic_rect, color=PDF_CARD_BORDER, fill=(0.05, 0.08, 0.14), width=1.0)
    page.insert_image(schematic_rect, filename=str(schematic_img_path), keep_proportion=True)
    
    # 3. Five-Tier Text Specification Matrix
    y_start = 392
    box_height = 80
    
    tier_badges = [
        "1. NBC 2026 STATUTORY MANDATE (LEGAL FLOOR)",
        "2. NEUFERT & TIME-SAVER (ERGONOMIC ENVELOPE)",
        "3. SPATIAL THEORY & TECTONIC PHYSICS (CHING / ALLEN)",
        "4. BIOCLIMATICS & CAD VASTU TREATISES (17 SANSKRIT CANONS)",
        "5. THE AGNAA STUDIO LUXURY BENCHMARK (EXECUTIVE SPEC)"
    ]
    
    for s_idx, (section_title, section_body) in enumerate(plate["specs"]):
        sy = y_start + (s_idx * (box_height + 4))
        
        # Background card
        card_rect = fitz.Rect(32, sy, 563, sy + box_height)
        page.draw_rect(card_rect, color=PDF_CARD_BORDER, fill=PDF_BG_CARD, width=0.6)
        
        # Header strip inside card
        header_color = PDF_ACCENT if s_idx != 4 else (0.10, 0.45, 0.30)
        page.draw_rect(fitz.Rect(32, sy, 563, sy + 16), color=header_color, fill=header_color)
        page.insert_text((38, sy + 12), tier_badges[s_idx], fontsize=7.5, color=(1.0, 1.0, 1.0), fontname="helv")
        
        # Body text
        body_rect = fitz.Rect(38, sy + 20, 555, sy + box_height - 3)
        page.insert_textbox(body_rect, section_body, fontsize=7.5, color=PDF_TEXT_DARK, fontname="helv")

    # 4. Footer
    footer_rect = fitz.Rect(0, 816, 595, 842)
    page.draw_rect(footer_rect, color=PDF_NAVY, fill=PDF_NAVY)
    page.insert_text((35, 832), "NBC 2026 — AGNAA • AR. SRIDHAR (SPA DELHI) • FINANCIAL DISTRICT HYDERABAD • WWW.AGNAA.IN", fontsize=7.5, color=(0.6, 0.7, 0.8), fontname="helv")
    page.insert_text((535, 832), f"PAGE {p_idx + 3}", fontsize=7.5, color=(0.9, 0.9, 0.9), fontname="helv")

# -----------------------------------------------------------------------------
# PAGE 15: MASTER COMPLIANCE APPENDIX & LAYA DECISION LEDGER
# -----------------------------------------------------------------------------
app_page = doc.new_page(width=595, height=842)
app_page.draw_rect(fitz.Rect(0, 0, 595, 65), color=PDF_NAVY, fill=PDF_NAVY)
app_page.insert_text((40, 26), "AGNAA DESIGN STUDIO • TECHNICAL APPENDIX", fontsize=9, color=(0.7, 0.8, 0.95), fontname="helv")
app_page.insert_text((40, 48), "MASTER COMPLIANCE LEDGER & LAYA 3B DECISION RULES", fontsize=12, color=(1.0, 1.0, 1.0), fontname="helv")

app_page.draw_rect(fitz.Rect(0, 65, 595, 85), color=PDF_ACCENT, fill=PDF_ACCENT)
app_page.insert_text((40, 79), "CONSOLIDATED QUICK REFERENCE FOR SITE ARCHITECTS & LOCAL AI AUDITING", fontsize=8.5, color=(1.0, 1.0, 1.0), fontname="helv")

# Appendix Matrix Box
app_box = fitz.Rect(35, 100, 560, 790)
app_page.draw_rect(app_box, color=PDF_CARD_BORDER, fill=PDF_BG_CARD, width=0.8)

appendix_content = (
    "CONSOLIDATED ARCHITECTURAL METRICS & STATUTORY THRESHOLDS\n\n"
    "1. SPATIAL & VOLUMETRIC DIMENSIONS (NBC PART 3):\n"
    "   • Habitable Bedroom: Min Area 9.5 m² (Single), 13.5 m² (Double) • Min Width 2.4 m • Min Clear Height 2.75 m (AC: 2.4 m)\n"
    "   • AGNAA Luxury Benchmark: 3.35 m Slab Cast • 350 mm Concealed VRF Drop • 3.0 m Finished Headroom\n"
    "   • Standalone Kitchen: Min Area 5.0 m² • Min Width 1.8 m • External Fenestration >= 1.0 m²\n"
    "   • Combined Kitchen + Dining: Min Area 7.5 m² • Min Width 2.1 m\n"
    "   • Bathroom (Standalone): Min Area 1.8 m² • Min Width 1.2 m\n"
    "   • Water Closet (WC): Min Area 1.1 m² • Min Width 0.9 m\n"
    "   • Combined Bath + WC: Min Area 2.8 m² • Min Width 1.2 m\n\n"
    "2. LIFE SAFETY & EGRESS GEOMETRY (NBC PART 4):\n"
    "   • Maximum Travel Distance to Enclosed Exit: 30.0 m (Un-sprinklered) • 45.0 m (Fully Sprinklered)\n"
    "   • Maximum Dead-End Corridor Length: 6.0 m (Un-sprinklered) • 15.0 m (Fully Sprinklered)\n"
    "   • Residential Internal Flight Width: Min 1.0 m (1000 mm) • Commercial Flight Width: Min 1.5 m (1500 mm)\n"
    "   • Residential Tread/Riser: Max Riser 190 mm • Min Tread 250 mm • Clear Continuous Headroom >= 2.2 m\n"
    "   • Blondel Ergonomic Formula: 2R + T = 600 mm to 640 mm (AGNAA Precision: 2 x 150 + 300 = 600 mm)\n\n"
    "3. VEHICULAR CIRCULATION & PARKING (NBC PART 3 / PART 10 / GHMC G.O. 168):\n"
    "   • Maximum Ramp Slope: 1:10 (10%) for Four-Wheelers • 1:8 (12.5%) for Two-Wheelers\n"
    "   • Ramp Transition Slopes: 3.0 m long at 1:20 (5%) at both entry and exit thresholds\n"
    "   • Minimum Turning Radius: 6.0 m Outer Radius for luxury sedans and SUVs\n"
    "   • Standard Parking Bay Size: 2.5 m x 5.0 m • Two-Way Driveway Aisle: 6.0 m Clear Width\n\n"
    "4. STRUCTURAL SEISMIC RESILIENCE (IS 1893:2016 & IS 13920):\n"
    "   • Soft-Storey Stilt Parking: Ground columns must be designed for 2.5x calculated seismic shear forces\n"
    "   • Ductile Confinement: Hoop ties @ 100 mm c/c throughout the lo zone (max of d, b, or 450 mm)\n"
    "   • Structural Core: Full-height RCC shear walls flanking elevator/staircase cores anchored into granitic bedrock\n\n"
    "5. BIOCLIMATIC & ACOUSTIC PERFORMANCE (NBC PART 8 & PART 11):\n"
    "   • Daylight Factor (DF) >= 1.5% • Natural Daylighting Penetration Depth = 2.5 x Window Head Height\n"
    "   • Party Wall Sound Transmission Class: STC >= 50 dBA (AGNAA Benchmark: STC 58 Staggered Stud Assembly)\n"
    "   • Indoor Ambient Noise Limit: <= 35 dBA in Bedrooms • <= 45 dBA in Living Areas\n\n"
    "6. SANSKRIT VASTU ORIENTATION MATRIX (17 CANONICAL TREATISES):\n"
    "   • Master Bedroom: South-West (Nairutya Sthira Pada) • Absorbs afternoon infrared and anchors stability\n"
    "   • Kitchen & Culinary Operations: South-East (Agni Kona) • Exhaust fumes drawn outward by SW winds\n"
    "   • Atrium & Water Body: Center (Brahmasthan Void) & North-East (Ishan) • Induces stack thermal cooling\n"
    "   • Staircase Kinetic Mass: South or West • Ascent direction strictly Dakshinavarta (Clockwise)\n\n"
    "AIR-GAPPED COMPLIANCE AI INTEGRATION:\n"
    "This ledger powers the offline Qwen 2.5 3B / Laya Decision Engine running locally at AGNAA Design Studio.\n"
    "Model evaluates floor plan DXF files in <50ms with zero cloud transmission of proprietary client assets."
)
app_page.insert_textbox(fitz.Rect(48, 115, 548, 775), appendix_content, fontsize=7.8, color=PDF_TEXT_DARK, fontname="helv")

# Appendix Footer
app_page.draw_rect(fitz.Rect(0, 815, 595, 842), color=PDF_NAVY, fill=PDF_NAVY)
app_page.insert_text((40, 831), "NBC 2026 — AGNAA • AR. SRIDHAR (SPA DELHI) • FINANCIAL DISTRICT HYDERABAD • WWW.AGNAA.IN", fontsize=7.5, color=(0.6, 0.7, 0.8), fontname="helv")
app_page.insert_text((530, 831), "PAGE 15 (END)", fontsize=7.5, color=(0.9, 0.9, 0.9), fontname="helv")

# Save PDF with compression for high-performance distribution
doc.save(MASTER_PDF_PATH, deflate=True, garbage=4, clean=True)
doc.close()

file_size_mb = os.path.getsize(MASTER_PDF_PATH) / (1024 * 1024)

print("\n" + "="*70)
print("🏆 NBC 2026 — AGNAA MASTER VISUAL BOOK COMPILED SUCCESSFULLY!")
print(f"📄 Master PDF: {MASTER_PDF_PATH}")
print(f"📊 Total Pages: 15 (Cover + Contents + 12 Full Plates + Master Appendix)")
print(f"💾 File Size: {file_size_mb:.2f} MB")
print("="*70)
