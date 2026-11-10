import os, sys, shutil, stat

sys.stdout.reconfigure(encoding='utf-8', errors='replace')
vault = r"I:\AGNAA\Agnaa Design Studio\all books"

renames = {
    "is.456.2000.pdf": "08 - IS 456-2000 Plain and Reinforced Concrete Code of Practice (BIS).pdf",
    "IS.13920.1993.pdf": "10 - IS 13920 Ductile Detailing of RC Structures (BIS).pdf",
    "is.875.1.1987.pdf": "11A - IS 875 Part 1 Dead Loads (BIS).pdf",
    "is.875.2.1987.pdf": "11B - IS 875 Part 2 Imposed Loads (BIS).pdf",
    "is.875.3.1987.pdf": "11C - IS 875 Part 3 Wind Loads (BIS).pdf",
    "is.875.4.1987.pdf": "11D - IS 875 Part 4 Snow Loads (BIS).pdf",
    "is.875.5.1987.pdf": "11E - IS 875 Part 5 Special Loads and Combinations (BIS).pdf",
    "is.sp.34.1987.pdf": "15 - SP 34 Handbook on Concrete Reinforcement and Detailing (BIS).pdf",
    "Updated-UDCPR-30.01.25.pdf": "20 - Unified Development Control and Promotion Regulations UDCPR 2020 (Maharashtra).pdf",
    "DCPR- 2034 and Notification.pdf": "21 - Development Control and Promotion Regulations DCPR 2034 (MCGM Mumbai).pdf",
    "COMPENDIUM_OF_UBBL_201605082020_0.pdf": "23 - Unified Building Bye-Laws UBBL 2016 (Delhi DDA).pdf",
    "Haryana Building Code-2017 with amendments upto 25.05.2023 (1).pdf": "24 - Haryana Building Code 2017 (Govt of Haryana).pdf",
    "TNCDRHR-2019.pdf": "25 - Tamil Nadu Combined Development and Building Rules TNCDBR 2019 (Govt of TN).pdf",
    "TNCDBR-2019.pdf": "25 - Tamil Nadu Combined Development and Building Rules TNCDBR 2019 (Govt of TN).pdf",
    "TNCDRBN-2019.pdf": "25 - Tamil Nadu Combined Development and Building Rules TNCDBR 2019 (Govt of TN).pdf",
    "TNCDRB-2019.pdf": "25 - Tamil Nadu Combined Development and Building Rules TNCDBR 2019 (Govt of TN).pdf",
    "TNCDRBER-2019.pdf": "25 - Tamil Nadu Combined Development and Building Rules TNCDBR 2019 (Govt of TN).pdf",
    "TNCDBR2019.pdf": "25 - Tamil Nadu Combined Development and Building Rules TNCDBR 2019 (Govt of TN).pdf",
    "TNCDRBER2019.pdf": "25 - Tamil Nadu Combined Development and Building Rules TNCDBR 2019 (Govt of TN).pdf",
    "TNCDRBRR-2019.pdf": "25 - Tamil Nadu Combined Development and Building Rules TNCDBR 2019 (Govt of TN).pdf",
    "TNCDBR-2019.pdf": "25 - Tamil Nadu Combined Development and Building Rules TNCDBR 2019 (Govt of TN).pdf",
    "TNCDRBR-2019.pdf": "25 - Tamil Nadu Combined Development and Building Rules TNCDBR 2019 (Govt of TN).pdf",
}

# Handle the TNCDBR file with flexible matching
for f in os.listdir(vault):
    fl = f.lower()
    if "tncd" in fl and "2019" in fl:
        renames[f] = "25 - Tamil Nadu Combined Development and Building Rules TNCDBR 2019 (Govt of TN).pdf"

done = []
for f in os.listdir(vault):
    if f in renames:
        src = os.path.join(vault, f)
        dst = os.path.join(vault, renames[f])
        try:
            os.chmod(src, stat.S_IWRITE)
        except: pass
        if os.path.exists(dst) and src != dst:
            try: os.remove(dst)
            except: pass
        try:
            shutil.move(src, dst)
            done.append(f"Renamed: {f} -> {renames[f]}")
        except Exception as e:
            done.append(f"FAILED: {f} -> {e}")

# Handle Architectural Graphic Standards
for f in os.listdir(vault):
    if "architectural graphic standards" in f.lower():
        src = os.path.join(vault, f)
        dst = os.path.join(vault, "06 - Architectural Graphic Standards (AIA - Ramsey and Sleeper).epub")
        if src != dst:
            try:
                shutil.move(src, dst)
                done.append(f"Renamed: {f} -> 06 - Architectural Graphic Standards")
            except Exception as e:
                done.append(f"FAILED AGS: {e}")
        break

# Handle Climate Responsive Architecture
for f in os.listdir(vault):
    if "climate responsive" in f.lower():
        src = os.path.join(vault, f)
        dst = os.path.join(vault, "33 - Climate Responsive Architecture - A Design Handbook for Energy Efficient Buildings (Arvind Krishan).pdf")
        if src != dst:
            try:
                shutil.move(src, dst)
                done.append(f"Renamed: {f} -> 33 - Climate Responsive Architecture")
            except Exception as e:
                done.append(f"FAILED CRA: {e}")
        break

# Handle BBMP building_bye_laws crdownload
for f in os.listdir(vault):
    if "building_bye_laws" in f.lower() or "bbmp" in f.lower():
        src = os.path.join(vault, f)
        dst = os.path.join(vault, "22 - BBMP Karnataka Building Bye-Laws 2017 (Bengaluru).pdf")
        if src != dst:
            try:
                shutil.move(src, dst)
                done.append(f"Renamed: {f} -> 22 - BBMP Karnataka Building Bye-Laws")
            except Exception as e:
                done.append(f"FAILED BBMP: {e}")
        break

# Remove stray non-book files
strays = ["1734417634.pdf", "53 of 2020 (E).pdf"]
for s in strays:
    p = os.path.join(vault, s)
    if os.path.exists(p):
        # Move to a subfolder instead of deleting, in case user wants them
        misc = os.path.join(vault, "_misc")
        os.makedirs(misc, exist_ok=True)
        try:
            shutil.move(p, os.path.join(misc, s))
            done.append(f"Moved stray to _misc: {s}")
        except Exception as e:
            done.append(f"FAILED stray: {e}")

for d in done:
    print(d)
print("Standardization complete!")
