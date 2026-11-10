import os
import sys
import shutil

# Ensure UTF-8 output
if sys.platform.startswith('win'):
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

dest_dir = r"I:\AGNAA\Agnaa Design Studio\all books"
os.makedirs(dest_dir, exist_ok=True)

# Collect all files across our architectural sources
search_dirs = [
    r"I:\AGNAA\agnaa_in\Architectural Books",
    r"I:\AGNAA\agnaa_in\Architectural Books\Latest books",
    r"I:\AGNAA\agnaa_in\Architectural Books\Organized_Library\01_Classical_Theory_and_Treatises",
    r"I:\AGNAA\agnaa_in\Architectural Books\Organized_Library\02_Design_Principles_and_Graphics",
    r"I:\AGNAA\agnaa_in\Architectural Books\Organized_Library\03_Building_Standards_and_Construction",
    r"I:\AGNAA\agnaa_in\Architectural Books\Organized_Library\04_Structural_Engineering_and_Physics",
    r"I:\AGNAA\agnaa_in\Architectural Books\Organized_Library\05_Modern_History_Monographs_and_Manifestos",
    r"I:\AGNAA\agnaa_in\Architectural Books\Organized_Library\06_Art_Culture_and_Other",
    r"I:\AGNAA\Agnaa Recent works\NBC 2026\Architectural books for agnaa\Book 10",
    r"I:\AGNAA\Agnaa Recent works\NBC 2026\Architectural books for agnaa\Book 12"
]

file_pool = []
for sd in search_dirs:
    if os.path.exists(sd):
        for f in os.listdir(sd):
            full_p = os.path.join(sd, f)
            if os.path.isfile(full_p):
                file_pool.append((f.lower(), full_p))

# Books to copy: (Clean Name, [keyword_checks])
targets = [
    ('58 - Modern Architecture Since 1900 (William J.R. Curtis).pdf', ['curtis']),
    ('59 - The Death and Life of Great American Cities (Jane Jacobs).pdf', ['jacobs']),
    ('61 - The Architects Studio Companion - Rules of Thumb (Joseph Iano & Edward Allen).pdf', ['studio companion']),
    ('65 - Architectural Graphics (Francis D.K. Ching).pdf', ['architectural graphics', 'ching']),
    ('66 - Operative Design - A Catalog of Spatial Verbs (Anthony di Mari).pdf', ['operative design']),
    ('67 - Conditional Design - Elemental Architecture (Anthony di Mari).pdf', ['conditional design']),
    ('68 - Precedents in Architecture - Analytic Diagrams (Clark & Pause).pdf', ['precedents in architecture']),
    ('69 - The Architecture of Happiness (Alain De Botton).pdf', ['architecture of happiness']),
    ('70 - 101 Things I Learned in Architecture School (Matthew Frederick).pdf', ['101 things']),
    ('71 - SMLXL Small, Medium, Large, Extra-Large (Rem Koolhaas & Bruce Mau).pdf', ['small, medium, large']),
    ('72 - Yes is More - An Archicomic on Architectural Evolution (BIG - Bjarke Ingels).pdf', ['yes is more']),
    ('73 - A History of Architecture on the Comparative Method (Banister Fletcher).pdf', ['banister_fletcher']),
    ('74 - A History of Architecture - Settings and Rituals (Spiro Kostof).pdf', ['spiro kostof']),
    ('75 - The Future of Architecture (Frank Lloyd Wright).pdf', ['future of architecture']),
    ('76 - Detail in Contemporary Concrete Architecture (David Phillips).pdf', ['contemporary concrete']),
    ('77 - Detail in Contemporary Glass Architecture (Virginia McLeod).pdf', ['contemporary glass']),
    ('78 - Designing with Light (Jason Livingston).epub', ['designing with light']),
    ('79 - Lighting Design Basics (Mark Karlen & James R. Benya).pdf', ['lighting design basics']),
    ('80 - Charles Correa (Kenneth Frampton).pdf', ['charles correa'])
]

copied_count = 0
for target_name, kws in targets:
    tpath = os.path.join(dest_dir, target_name)
    if os.path.exists(tpath):
        print(f"[ALREADY EXISTS] {target_name}")
        copied_count += 1
        continue
    matched = None
    for fname_lower, fpath in file_pool:
        if all(k in fname_lower for k in kws):
            matched = fpath
            break
    if matched:
        try:
            shutil.copy2(matched, tpath)
            sz_mb = os.path.getsize(tpath) / (1024 * 1024)
            print(f"[COPIED] {target_name} ({sz_mb:.2f} MB)")
            copied_count += 1
        except Exception as e:
            print(f"[ERROR] {target_name}: {e}")
    else:
        print(f"[NOT FOUND] {target_name}")

print(f"\nDone! Successfully processed targets.")
