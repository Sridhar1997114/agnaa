import os
import sys
import shutil

dest = r"I:\AGNAA\Agnaa Design Studio\all books"

# 1. Metric Handbook
for f in os.listdir(dest):
    if "metric handbook" in f.lower() and not f.startswith("03 -"):
        src = os.path.join(dest, f)
        target = os.path.join(dest, "03 - Metric Handbook - Planning and Design Data (Pamela Buxton).pdf")
        shutil.move(src, target)
        print("Moved 03 Metric Handbook")

# 2. Time-Saver Standards Architectural Design Data
for f in os.listdir(dest):
    if "time-saver standards for architectural design data" in f.lower() and not f.startswith("02B -"):
        src = os.path.join(dest, f)
        target = os.path.join(dest, "02B - Time-Saver Standards for Architectural Design Data (Callender & Crosbie).pdf")
        shutil.move(src, target)
        print("Moved 02B Time-Saver Standards")

# 3. Building Construction Illustrated 6th Edition
for f in os.listdir(dest):
    if "building construction illustrated (sixth edition)" in f.lower():
        src = os.path.join(dest, f)
        target = os.path.join(dest, "04 - Building Construction Illustrated (Francis D.K. Ching).pdf")
        if os.path.exists(target):
            os.remove(target)
        shutil.move(src, target)
        print("Upgraded 04 Building Construction Illustrated to 6th Edition")

# 4. Copy 5th Edition Ching Form Space Order from Downloads
dl_dir = r"C:\Users\sridh\Downloads"
for f in os.listdir(dl_dir):
    if "form, space, and order" in f.lower() and "5" in f:
        src = os.path.join(dl_dir, f)
        target = os.path.join(dest, "05 - Architecture - Form, Space, and Order (Francis D.K. Ching).pdf")
        # prefer the larger complete edition if multiple
        sz = os.path.getsize(src) / (1024 * 1024)
        if sz > 50:
            shutil.copy2(src, target)
            print(f"Upgraded 05 Architecture Form Space Order to 5th Edition 2023 ({sz:.2f} MB)")
            break

# 5. Remove unnumbered loose duplicates
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

for f in os.listdir(dest):
    fl = f.lower()
    for lp in loose_patterns:
        if lp in fl:
            p = os.path.join(dest, f)
            try:
                os.remove(p)
                print(f"Removed loose duplicate: {f}")
            except Exception as e:
                print(f"Error removing {f}: {e}")
            break

print("All cleaning and upgrades complete!")
