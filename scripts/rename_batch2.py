import os, sys, shutil, stat

sys.stdout.reconfigure(encoding='utf-8', errors='replace')
vault = r"I:\AGNAA\Agnaa Design Studio\all books"

renames = {
    "Specs2019V1.pdf": "12A - CPWD General Specifications Vol 1 Civil Works 2019.pdf",
    "Specs2019V2.pdf": "12B - CPWD General Specifications Vol 2 Civil Works 2019.pdf",
    "CPWD_General_Specification_for_Electrical_Works_Part-I_Internal_2023.pdf": "12C - CPWD General Specifications Electrical Internal 2023.pdf",
    "HVAC_Specification_2024.pdf": "12D - CPWD General Specifications HVAC Works 2024.pdf",
    "CPWD_Works_Manual_2026.pdf": "12E - CPWD Works Manual 2026.pdf",
    "Booklet-Guide-for-Using-NBC-2016.pdf": "07B - Guide for Using National Building Code of India 2016 (CPWD).pdf",
    "manual_on_accessible_built_environment.pdf.crdownload": "12F - CPWD Manual on Accessible Built Environment 2019.pdf",
    "manualdw.pdf": "12G - CPWD Manual on Door and Window Details 2006.pdf",
    "greenmanual_2021.pdf": "12H - CPWD Green Rating Manual 2021.pdf",
    "Handbookofficebuilding.pdf": "12J - CPWD Handbook Planning of Office Building 2013.pdf",
    "Compendium_of_Norms_for_Designing_of_Hospitals_and_Medical_Institutions.pdf": "12K - CPWD Norms for Designing Hospitals and Medical Institutions 2019.pdf",
    "Compendium_of_Architectural_Norms _guidelines_for_Educational_Institutions.pdf": "12L - CPWD Architectural Norms for Educational Institutions 2019.pdf",
    "Compendium_of_High_Rise_Buildings_December_2019.pdf": "12M - CPWD Compendium of High Rise Buildings 2019.pdf",
    "Compendium_for_Design_of_Central_Government_Housing.pdf": "12N - CPWD Compendium for Design of Central Government Housing 2012.pdf",
    "HG2021_MOHUAN.pdf": "12P - Harmonised Guidelines for Universal Accessibility India 2021 (MoHUA).pdf",
    "Final_Book_Heritage.pdf": "12Q - CPWD Conservation and Audit of Heritage Buildings 2019.pdf",
    "Guideleines_Sustainable_Habitat.pdf": "12R - CPWD Guidelines for Sustainable Habitat 2014.pdf",
    "Reducing_Carbon_Footprint_in_Buildings_2024.pdf": "12S - CPWD Reducing Carbon Footprint in Buildings 2024.pdf",
    "Handbook_on_Seismic_Retrofit_of_Buildings.pdf.crdownload": "12T - CPWD Handbook on Seismic Retrofit of Buildings.pdf",
}

# Remove duplicates first
dupes = [
    "CPWD_Works_Manual_2026 (1).pdf",
    "HVAC_Specification_2024 (1).pdf",
    "manualdw (1).pdf",
    "manualdw (2).pdf",
]

for d in dupes:
    p = os.path.join(vault, d)
    if os.path.exists(p):
        try:
            os.chmod(p, stat.S_IWRITE)
            os.remove(p)
            print(f"Deleted duplicate: {d}")
        except Exception as e:
            print(f"Could not delete {d}: {e}")

# Rename files
for old, new in renames.items():
    src = os.path.join(vault, old)
    dst = os.path.join(vault, new)
    if os.path.exists(src):
        try:
            os.chmod(src, stat.S_IWRITE)
        except: pass
        if os.path.exists(dst) and src != dst:
            try: os.remove(dst)
            except: pass
        try:
            shutil.move(src, dst)
            print(f"OK: {old} -> {new}")
        except Exception as e:
            print(f"FAIL: {old} -> {e}")

# Final count
files = sorted([f for f in os.listdir(vault) if not f.startswith('_')])
std = [f for f in files if f[0].isdigit() and ' - ' in f[:6]]
other = [f for f in files if f not in std]
print(f"\nFINAL: {len(std)} standardized | {len(other)} unstandardized")
for f in other:
    print(f"  REMAINING: {f}")
