import os
import sys
import shutil

sys.stdout.reconfigure(encoding='utf-8', errors='replace')
vault = r"I:\AGNAA\Agnaa Design Studio\all books"
dl = r"C:\Users\sridh\Downloads"

def log(msg):
    print(msg, flush=True)

# 1. Upgrade 04 to 6th Edition
bci_6th = os.path.join(vault, "Building Construction Illustrated (Sixth Edition) (Francis D. K. Ching).pdf")
bci_target = os.path.join(vault, "04 - Building Construction Illustrated (Francis D.K. Ching).pdf")
if os.path.exists(bci_6th):
    if os.path.exists(bci_target):
        try:
            os.remove(bci_target)
        except Exception as e:
            log(f"Could not remove old 04: {e}")
    try:
        shutil.move(bci_6th, bci_target)
        log("Upgraded 04 to 6th Edition")
    except Exception as e:
        log(f"Error moving 6th edition: {e}")

# 2. Upgrade 05 to 5th Edition 2023 from Downloads
fso_dl = None
for f in os.listdir(dl):
    fp = os.path.join(dl, f)
    if os.path.isfile(fp) and "form, space, and order" in f.lower():
        try:
            sz = os.path.getsize(fp)
            if sz > 100 * 1024 * 1024:
                fso_dl = fp
                break
        except Exception:
            continue

if fso_dl:
    fso_target = os.path.join(vault, "05 - Architecture - Form, Space, and Order (Francis D.K. Ching).pdf")
    try:
        shutil.copy2(fso_dl, fso_target)
        log(f"Upgraded 05 to 5th Edition 2023 ({os.path.getsize(fso_target)/(1024*1024):.2f} MB)")
    except Exception as e:
        log(f"Error copying FSO: {e}")

# 3. Add 02C Time-Saver Standards for Building Types
for f in os.listdir(dl):
    fp = os.path.join(dl, f)
    if os.path.isfile(fp) and "time-saver standards for building types" in f.lower():
        target = os.path.join(vault, "02C - Time-Saver Standards for Building Types (Joseph De Chiara).pdf")
        if not os.path.exists(target):
            shutil.copy2(fp, target)
            log("Added 02C Time-Saver Standards for Building Types")
        break

# 4. Add AIA Handbook as 06B
for f in os.listdir(dl):
    fp = os.path.join(dl, f)
    if os.path.isfile(fp) and ("the architect's handbook of professional practice" in f.lower() or "architect handbook of professional practice" in f.lower()):
        target = os.path.join(vault, "06B - AIA The Architects Handbook of Professional Practice (Richard L. Hayes).pdf")
        if not os.path.exists(target):
            shutil.copy2(fp, target)
            log("Added 06B AIA Architects Handbook of Professional Practice")
        break

# 5. Add Mayamatam Vol 2
for f in os.listdir(dl):
    fp = os.path.join(dl, f)
    if os.path.isfile(fp) and "mayamatam ii" in f.lower():
        target = os.path.join(vault, "43B - Mayamata - Indian Treatise on Housing Architecture Vol 2 (Bruno Dagens).pdf")
        if not os.path.exists(target):
            shutil.copy2(fp, target)
            log("Added 43B Mayamatam Vol 2")
        break

# 6. Add Encyclopaedia of Hindu Architecture
for f in os.listdir(dl):
    fp = os.path.join(dl, f)
    if os.path.isfile(fp) and "an encyclopaedia of hindu architecture" in f.lower():
        target = os.path.join(vault, "44B - An Encyclopaedia of Hindu Architecture (P.K. Acharya).pdf")
        if not os.path.exists(target):
            shutil.copy2(fp, target)
            log("Added 44B Encyclopaedia of Hindu Architecture")
        break

# 7. Add Vishwakarma Prakash Retold
for f in os.listdir(dl):
    fp = os.path.join(dl, f)
    if os.path.isfile(fp) and "ancient science of vastu" in f.lower():
        target = os.path.join(vault, "81 - Ancient Science of Vastu - Vishwakarma Prakash Retold (Siddharth Borad).pdf")
        if not os.path.exists(target):
            shutil.copy2(fp, target)
            log("Added 81 Ancient Science of Vastu")
        break

# 8. Add Architectural Geometry
for f in os.listdir(dl):
    fp = os.path.join(dl, f)
    if os.path.isfile(fp) and "architectural geometry" in f.lower():
        target = os.path.join(vault, "82 - Architectural Geometry (Helmut Pottmann).pdf")
        if not os.path.exists(target):
            shutil.copy2(fp, target)
            log("Added 82 Architectural Geometry")
        break

# 9. Add Parametric Design for Architecture
for f in os.listdir(dl):
    fp = os.path.join(dl, f)
    if os.path.isfile(fp) and "parametric design for architecture" in f.lower():
        target = os.path.join(vault, "83 - Parametric Design for Architecture (Wassim Jabi).pdf")
        if not os.path.exists(target):
            shutil.copy2(fp, target)
            log("Added 83 Parametric Design for Architecture")
        break

# 10. Clean up loose unnumbered duplicates
loose_patterns = [
    "architects data, 3rd edition",
    "architecture form, space, order (frank ching)",
    "building construction handbook -- roy chudley",
    "building structures illustrated _ patterns",
    "constructing architecture _ materials",
    "design drawing, 2ed",
    "mario salvadori, saralinda hooker",
    "neufert architects data (ernst neufert"
]

for f in os.listdir(vault):
    fl = f.lower()
    for lp in loose_patterns:
        if lp in fl:
            p = os.path.join(vault, f)
            try:
                os.remove(p)
                log(f"Removed loose duplicate: {f}")
            except Exception as e:
                log(f"Error removing {f}: {e}")
            break

log("Synchronization complete!")
