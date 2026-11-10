import os, sys, shutil, stat

sys.stdout.reconfigure(encoding='utf-8', errors='replace')
vault = r"I:\AGNAA\Agnaa Design Studio\all books"

# 1. Exact renames map
renames = {
    "1049327294-G-O-ms-No-95-TDR-Utilization-21-03-2026.pdf": "16B - Telangana G.O.Ms.No.95 TDR Utilization and High-Rise Rules 2026.pdf",
    "filename.pdf": "16C - Telangana Fire Service Act 1999 and Fire Safety Rules.pdf",
    "WALTA 2002 (AP).pdf": "16D - Telangana WALTA Act 2002 and Rain Water Harvesting Mandates.pdf",
    "NwKLE3sH.pdf": "16E - DTCP Handbook on Layout Approval Process and Subdivision Rules.pdf",
    "Site Planning International Practice (Gary Hack, Kevin Lynch) (z-library.sk, 1lib.sk, z-lib.sk).epub": "84 - Site Planning (Gary Hack & Kevin Lynch).epub",
    "Urban design  street and square (Moughtin, Cliff).pdf": "86 - Urban Design - Street and Square (Cliff Moughtin).pdf",
    "Mechanical and Electrical Equipment for Buildings, 12th Edition Wiley E-Text Card and Interactive Resource Center Access Card (Walter T. Grondzik, Alison G. Kwok).pdf": "87 - Mechanical and Electrical Equipment for Buildings 12th Ed (Grondzik & Kwok).pdf",
    "Building Services Design for Energy-Efficient Buildings Second Edition ( etc.).epub": "88 - Building Services Design for Energy Efficient Buildings (Paul Tymkow).epub",
    "STRUCTURAL DESIGN FOR FIRE SAFETY SECOND EDITION (ANDREW H.BUCHANAN AND ANTHONY K.ABU).pdf": "89 - Structural Design for Fire Safety (Andrew H. Buchanan & Anthony K. Abu).pdf",
    "Structures Or Why Things Dont Fall Down (J.e. Gordon).pdf": "90 - Structures - Or Why Things Dont Fall Down (J.E. Gordon).pdf",
    "Project management  strategic design and implementation (Cleland, David I, Ireland, Lewis R. etc.).pdf": "91 - Project Management - Strategic Design and Implementation (David I. Cleland & Lewis R. Ireland).pdf",
    "An architects guide to running a practice (Littlefield, David).pdf": "92 - The Architects Guide to Running a Practice (David Littlefield).pdf",
    "Cradle to cradle remaking the way we make things (Michael Braungart, William McDonough).epub": "93 - Cradle to Cradle - Remaking the Way We Make Things (Michael Braungart & William McDonough).epub",
}

# 2. Duplicates to remove
dupes = [
    "NwKLE3sH (1).pdf",
]

for d in dupes:
    p = os.path.join(vault, d)
    if os.path.exists(p):
        try:
            os.chmod(p, stat.S_IWRITE)
            os.remove(p)
            print(f"Deleted duplicate: {d}")
        except Exception as e:
            print(f"Failed deleting {d}: {e}")

# Also remove duplicate 30MB FSO Ching if unnumbered
for f in os.listdir(vault):
    if "form, space, and order" in f.lower() and not f.startswith("05"):
        p = os.path.join(vault, f)
        try:
            os.chmod(p, stat.S_IWRITE)
            os.remove(p)
            print(f"Deleted duplicate Ching FSO: {f}")
        except Exception as e:
            print(f"Failed deleting duplicate FSO: {e}")

# 3. Perform renames
for old, new in renames.items():
    src = os.path.join(vault, old)
    dst = os.path.join(vault, new)
    if os.path.exists(src):
        try:
            os.chmod(src, stat.S_IWRITE)
        except:
            pass
        if os.path.exists(dst) and src != dst:
            try:
                os.chmod(dst, stat.S_IWRITE)
                os.remove(dst)
            except:
                pass
        try:
            shutil.move(src, dst)
            print(f"OK: {old} -> {new}")
        except Exception as e:
            print(f"FAIL: {old} -> {e}")

# 4. Check status
files = sorted([f for f in os.listdir(vault) if not f.startswith('_')])
std = [f for f in files if f[0].isdigit() and ' - ' in f[:6]]
other = [f for f in files if f not in std]
print(f"\nVAULT TOTAL: {len(std)} standardized books | {len(other)} in-progress/unstandardized")
for f in other:
    print(f"  WAITING: {f}")
