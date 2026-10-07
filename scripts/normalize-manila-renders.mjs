import fs from 'fs';
import path from 'path';

const map = {
  'Aiims_Safdarjung.jpg': 'aiims-safdarjung.jpg',
  'SUnderNursery_GardenHouse (1).jpg': 'sunder-nursery-garden-house.jpg',
  'ICCC_HPL (1).jpg': 'iccc-smart-city-centre.jpg',
  'Big_Red_group_Final (3).jpg': 'big-red-group-commercial-hq.jpg',
  'Library_d1_1 - Photo.jpg': 'central-public-library.jpg',
  '2.jpg': 'national-academy-archery.jpg',
  'Sports_3 - Photo.jpg': 'olympic-sports-complex-aerial.jpg',
  'Sports_7 - Photo_8 - Photo.jpg': 'olympic-sports-arena-concourse.jpg',
  'Sports_7 - Photo_9 - Photo.jpg': 'olympic-sports-stadium-facade.jpg',
  '9985.jpg': 'classical-colonial-stone-mansion.jpg',
  'Marvella_r3 (1).jpg': 'marvella-luxury-residences-tower.jpg',
  'Marvella_r3 (5).jpg': 'marvella-luxury-penthouse-balconies.jpg',
  'BaleneseVilla_ManilaVIsuals (5).jpg': 'balinese-luxury-resort-villa-exterior.jpg',
  'Balinese360.jpg': 'balinese-luxury-villa-panoramic-pool.jpg',
  'R1Balinese (6).jpg': 'balinese-luxury-villa-garden-pavilion.jpg',
  'shopping complex_13 - Photo.jpg': 'commercial-shopping-mall-promenade.jpg',
  'shopping complex_R2_13 - Photo.jpg': 'commercial-retail-mall-facade.jpg',
  'Nursing Home.jpg': 'multispecialty-healthcare-nursing-home.jpg',
  'school_1 - Photo.jpg': 'k12-educational-campus-facade.jpg',
  'r5_3 - Photo.jpg': 'institutional-academic-campus-gate.jpg',
  'r5_4 - Photo.jpg': 'institutional-academic-campus-aerial.jpg',
  'abhijeeth render.jpg': 'mediterranean-tuscan-villa.jpg',
  'FInal SC (8).jpg': 'tech-corporate-collaborative-workspace.jpg',
  'Final_pdates (1).jpg': 'executive-lounge-acoustic-cafe.jpg',
  'f_Photo - 4.jpg': 'modern-boutique-residential-apartments.jpg',
  'p2.jpg': 'modernist-brick-urban-residences.jpg',
  "OP3'.jpg": 'double-height-sculptural-atrium-lobby.jpg',
  'r4_1 - Photo.jpg': 'curated-luxury-residence-living-interior.jpg',
  'Revised _ele (2).jpg': 'contemporary-urban-townhouse-duplex.jpg'
};

const dir = 'i:\\AGNAA\\agnaa_in\\public\\projects\\manila';

let count = 0;
for (const [srcName, destName] of Object.entries(map)) {
  const src = path.join(dir, srcName);
  const dst = path.join(dir, destName);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dst);
    console.log(`Copied: ${srcName} -> ${destName}`);
    count++;
  } else {
    console.warn(`Source not found: ${srcName}`);
  }
}
console.log(`Successfully normalized ${count} renders.`);
