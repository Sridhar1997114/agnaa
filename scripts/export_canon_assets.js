import fs from 'fs';
import path from 'path';

// Output directories
const exportDir = path.resolve('public', 'agnaa-canon-exports');
if (!fs.existsSync(exportDir)) {
  fs.mkdirSync(exportDir, { recursive: true });
}

// Master Canon Data
const CANON_DATA = [
  {
    id: 'AGNAA-CANON-01',
    title: 'The Master Suite: Volumetric Headroom, Anthropometrics & Solar Axis',
    discipline: 'Spatial Planning & Volumetric Enclosure',
    statutory: {
      clause: 'NBC 2026, Vol. 1, Part 3, Clause 12.2 (Habitable Rooms)',
      source: 'National Building Code of India 2026 (SP 7: 2026)',
      mandate: 'Minimum clear floor area 9.5 m² (single), 13.5 m² (with dining), minimum width 2.4 m, clear height 2.75 m (reducible to 2.4 m in AC spaces). Minimum natural window area: 10% of floor area.',
      hyderabadRule: 'GHMC G.O. 168 mandates minimum 3.0 m rear setback when master bedroom rear fenestrations provide mandatory ventilation.'
    },
    ergonomics: {
      source: 'Neufert Architects Data (4th Ed.) p.182 & Time-Saver Standards',
      rules: [
        '900 mm (3 ft) clear perimeter aisle on all 3 sides of king bed (1800x2000mm)',
        '1200 mm (4 ft) clearance between bed footboard and wardrobe shutters for comfortable dressing',
        '800 mm window sill datum aligns seated bed eye-level (1150 mm) directly with garden foliage'
      ]
    },
    spatialTheory: {
      source: 'Francis D.K. Ching: Form, Space, and Order (4th Ed.) Ch. 4',
      concept: 'Spatial Enclosure & Volumetric Aspect Ratio',
      principle: 'A room wider than 5.0 metres choked at 2.75 m creates horizontal visual compression. Maintaining a 1:1.25 to 1:1.40 height-to-width ratio establishes psychological serenity.'
    },
    vastu: {
      treatise: 'Mayamata Vol. 1, Ch. 26 (Padavinyasa), Verses 12-15 & Samarāṅgaṇa Sūtradhāra Ch. 38',
      sanskrit: 'Nairutya Sthira Pada (South-West Heavy Earth Quad)',
      physics: 'The South-West quad absorbs the harshest afternoon infrared solar loading (2 PM - 5:30 PM) in the Deccan plateau. Thick masonry walls and wardrobe buffers placed in the SW shield the internal villa from radiant overheating.'
    },
    agnaaBenchmark: {
      principal: 'Ar. Sridhar (SPA Delhi Alumnus, NIRF #1)',
      elevation: 'Slab cast at 3.35 m to 3.50 m (11.0 to 11.5 ft). 350 mm dropped ceiling accommodates concealed ducted VRF AC while preserving a full 3.0 m finished luxury headroom.',
      hyderabadTectonics: 'Induces stack-effect thermal buoyancy. Warm ambient air rises above head height and purges through high-level clerestory louvers in Hyderabad semi-arid heat.'
    },
    carousel: {
      hook: 'Why 85% of Luxury Master Bedrooms Feel Cramped (Even at 350 sq.ft)',
      slides: [
        {
          num: 1,
          badge: 'THE HIDDEN TRAP',
          title: 'Floor Area Means Nothing Without Headroom',
          points: [
            'Builders give you a large 250 sq.ft bedroom but choke the ceiling at 2.8 metres.',
            'When false ceilings and AC ducts are added, clear height drops to 2.45 metres.',
            'The result? A claustrophobic room that feels like a budget hotel corridor.'
          ]
        },
        {
          num: 2,
          badge: 'THE LEGAL MANDATE (NBC)',
          title: 'What the Government Mandates',
          points: [
            'NBC 2026 Part 3 Clause 12.2 mandates minimum 2.75 m (9 ft) clear height.',
            'Allows reduction to 2.4 m in air-conditioned spaces (a dangerous cost-saving loophole).',
            'Minimum window area: 10% of total carpet area for natural daylighting.'
          ]
        },
        {
          num: 3,
          badge: 'THE HUMAN BODY (NEUFERT)',
          title: 'Anthropometric Clearances You Cannot Ignore',
          points: [
            'Neufert Standard: 900 mm minimum clear aisle around all 3 sides of the king bed.',
            'Wardrobe clearance: 1200 mm between footboard and shutters for comfortable dressing.',
            'Window sill height: Must align at 800 mm so seated eye-level looks directly into garden foliage.'
          ]
        },
        {
          num: 4,
          badge: 'SPATIAL THEORY (CHING)',
          title: 'Francis D.K. Ching: The Proportion Ratio',
          points: [
            'In Form, Space & Order, Ching defines the visual ratio of room enclosure.',
            'When room width reaches 5 metres, a 2.75 m ceiling creates a 1:1.8 ratio (visual tunnel).',
            'To feel grounded, luxury suites require an aspect ratio between 1:1.25 and 1:1.40.'
          ]
        },
        {
          num: 5,
          badge: 'CLASSICAL TEXTS (VASTU)',
          title: 'The Ancient Solar Physics of the South-West',
          points: [
            'Mayamata (Ch. 26) assigns the Master Suite to Nairutya (South-West).',
            'Ancient reason: Not superstition, but solar thermal mass.',
            'The SW absorbs brutal Deccan afternoon sun; placing thick wardrobe walls here protects the inner villa.'
          ]
        },
        {
          num: 6,
          badge: 'THE AGNAA STANDARD',
          title: 'How Ar. Sridhar Elevates This at AGNAA Design Studio',
          points: [
            'Engineered Slab Baseline: Cast at 3.35 m – 3.50 m (11.5 ft).',
            'Concealed Infrastructure: 350 mm AC drop leaves a full 3.0 m clear finished luxury headroom.',
            'Climatic Stack Effect: High-level automated louvers purge hot air naturally in Hyderabad heat.',
            'Citations: NBC 2026 Pt 3 Cl 12.2 | Neufert p.182 | Ching Ch.4 | Mayamata Ch.26'
          ]
        }
      ],
      caption: 'Why do most luxury master bedrooms still feel suffocating despite spending crores? Because architects often design in 2D floor plans and forget 3D volumetric physics. Here is how we calibrate statutory NBC building codes, Neufert anthropometrics, Ching spatial theory, and classical Mayamata Vastu into one cohesive standard at AGNAA Design Studio. Save this for your upcoming villa build.'
    },
    reel: {
      title: 'The 3.35m Ceiling Secret of Luxury Architecture',
      duration: '45 seconds',
      persona: 'Ar. Sridhar - Calm, measured, authoritative architectural tone',
      scenes: [
        {
          time: '00:00 - 00:08',
          visual: 'Slow cinematic dolly forward into a dimly lit, choked 2.5m ceiling bedroom. Red animated dimension lines flash "2.45m Choked".',
          voice: 'Most luxury homes in Hyderabad make this fatal mistake. They spend five crores on marble, but leave the ceiling at two point seven metres.',
          text: 'The 2.45m Ceiling Mistake'
        },
        {
          time: '00:08 - 00:18',
          visual: 'Camera rises smoothly as the ceiling dissolves upwards into a breathtaking 3.35m exposed concrete volume with warm oak paneling and soft perimeter coves.',
          voice: 'NBC Part 3 Clause 12.2 allows a 2.75 metre minimum. But under Francis D.K. Ching spatial theory, a five-metre wide master suite suffocates at that height.',
          text: 'NBC Pt 3 Cl 12.2 vs Ching Spatial Ratio'
        },
        {
          time: '00:18 - 00:30',
          visual: 'Close-up architectural section view showing hidden VRF AC plenum and 900mm Neufert clearance envelope around the bed.',
          voice: 'At AGNAA Design Studio, we cast slabs at three point three-five metres. This hides complete ducted air conditioning while preserving a full ten-foot finished volume.',
          text: 'AGNAA Standard: 3.35m Clear'
        },
        {
          time: '00:30 - 00:45',
          visual: 'Wide shot of master suite overlooking a private rain courtyard in Kokapet. Screen transitions to clean AGNAA citation card.',
          voice: 'The hot Deccan air rises above head height, giving you thermal buoyancy and absolute spatial calm. That is the science of luxury architecture.',
          text: 'AGNAA Design Studio • Financial District Hyderabad'
        }
      ]
    }
  },
  {
    id: 'AGNAA-CANON-02',
    title: 'The Culinary Machine: Ergonomic Work Triangles, Sculleries & Agni Physics',
    discipline: 'Spatial Planning & Culinary Ergonomics',
    statutory: {
      clause: 'NBC 2026, Vol. 1, Part 3, Clause 12.3 (Kitchens)',
      source: 'National Building Code of India 2026 (SP 7: 2026)',
      mandate: 'Standalone kitchen minimum 5.0 m² area, minimum 1.8 m width. Combined kitchen and dining minimum 7.5 m² area and 2.1 m width. Minimum clear height 2.75 m. External window opening ≥ 1.0 m². Prohibited from opening directly into water closet without ventilated lobby.',
      hyderabadRule: 'Telangana high-density residential norms require dedicated vertical exhaust shafts discharging clear of upper habitable terraces.'
    },
    ergonomics: {
      source: 'Time-Saver Standards for Interior Design p.214 & Neufert Architects Data',
      rules: [
        '1200 mm (4 ft) clear aisle between opposing counters for simultaneous oven swing and walking passage',
        '900 mm (3 ft) prep buffer between sink and hob for hygienic wet-to-cook transition',
        'Work triangle total perimeter must measure between 4.0 m and 7.9 m for fatigue-free cooking'
      ]
    },
    spatialTheory: {
      source: 'Francis D.K. Ching: Architecture - Form, Space, and Order',
      concept: 'Spatial Buffering & Space-Within-A-Space',
      principle: 'Modern luxury kitchens demand segregating public social entertaining from high-smoke Indian culinary operations through an architectural threshold: the Show Island Datum backed by a concealed Wet Scullery.'
    },
    vastu: {
      treatise: 'Samarāṅgaṇa Sūtradhāra (King Bhoja, 11th c.) Ch. 38 & Vishwakarma Prakash Ch. 2',
      sanskrit: 'Agni Kona (South-East Fire Energy Sector)',
      physics: 'Peninsular India experiences prevailing South-Westerly winds. Placing the cooking fire in the South-East ensures culinary exhaust fumes are naturally drawn outward and away from residential living and sleeping quarters.'
    },
    agnaaBenchmark: {
      principal: 'Ar. Sridhar (SPA Delhi Alumnus, NIRF #1)',
      elevation: 'Dual-Kitchen Architectural Protocol: 3.0 m seamless quartz Show Kitchen island anchored to dining, backed by a concealed heavy-duty Wet Scullery with direct service yard access.',
      hyderabadTectonics: 'Equipped with dedicated commercial-grade 1200-cfm external ducting that prevents aromatic Hyderabad spice cooking from infiltrating central air conditioning return ducts.'
    },
    carousel: {
      hook: 'Why Open Concept Kitchens Fail in Indian Luxury Homes',
      slides: [
        {
          num: 1,
          badge: 'THE DESIGN CONFLICT',
          title: 'Western Pinterest vs Indian Cooking',
          points: [
            'Western architectural magazines showcase completely open kitchens with white marble.',
            'In India, heavy tadka, turmeric stains, and high-heat spice vapors ruin open layouts in 6 months.',
            'Homeowners are left with greasy ceilings and lingering cooking odors across the entire villa.'
          ]
        },
        {
          num: 2,
          badge: 'THE LEGAL MANDATE (NBC)',
          title: 'NBC 2026 Kitchen Regulations',
          points: [
            'Clause 12.3 mandates minimum 5.0 m² area and 1.8 m clear width.',
            'Direct exterior window opening of at least 1.0 m² is strictly legally non-negotiable.',
            'Prohibits any kitchen from opening directly into a toilet without an intermediate lobby buffer.'
          ]
        },
        {
          num: 3,
          badge: 'ERGONOMICS (TIME-SAVER)',
          title: 'The 1200 mm Aisle Golden Rule',
          points: [
            'Single cook needs 1050 mm. Two cooks need 1200 mm (4 feet) clear.',
            'Why? A dishwasher door drops 450 mm. Without 1200 mm, your corridor is completely blocked.',
            'Work triangle perimeter must measure between 4.0 m and 7.9 m for zero fatigue.'
          ]
        },
        {
          num: 4,
          badge: 'CLASSICAL VASTU CANONS',
          title: 'The Ancient Science of Agni (South-East)',
          points: [
            'Samarāṅgaṇa Sūtradhāra (Ch. 38) mandates cooking in the South-East.',
            'The Bioclimatic Truth: Peninsular India has prevailing South-West winds.',
            'Placing cooking in SE ensures kitchen smoke is naturally carried outward, never into bedrooms.'
          ]
        },
        {
          num: 5,
          badge: 'THE AGNAA SOLUTION',
          title: 'The Dual-Kitchen Architectural Protocol',
          points: [
            'Show Kitchen: Architectural island in Calacatta quartz facing family dining for light breakfast and hosting.',
            'Wet Scullery: Concealed behind motorized pocket doors with high-cfm commercial exhaust for heavy Indian cuisine.',
            'Direct access to utility yard and staff entry.'
          ]
        },
        {
          num: 6,
          badge: 'THE CITATION INDEX',
          title: 'Validated by Law, Science & Ancient Canons',
          points: [
            'Statutory: NBC 2026 Vol 1 Part 3 Clause 12.3',
            'Ergonomics: Time-Saver Standards for Interior Design p.214',
            'Spatial Order: Ching Form, Space & Order Ch. 2',
            'Classical: Samarāṅgaṇa Sūtradhāra Ch. 38'
          ]
        }
      ],
      caption: 'Can you have a stunning open kitchen in India without your living room smelling of tadka for three days? Yes—if you use the Dual-Kitchen Hierarchy. Here is how AGNAA Design Studio harmonizes statutory NBC ventilation laws, Time-Saver work triangles, and classical Agni Vastu physics into high-performance luxury villas.'
    },
    reel: {
      title: 'The Truth About Open Kitchens in Indian Villas',
      duration: '45 seconds',
      persona: 'Ar. Sridhar - Architectural, authoritative, clear',
      scenes: [
        {
          time: '00:00 - 00:08',
          visual: 'Close-up of a sizzling pan with heavy turmeric spices, camera zooms out to reveal grease mist settling on an open luxury living room sofa.',
          voice: 'Open kitchens look gorgeous on Pinterest. But in an Indian home, they are an absolute disaster without this one architectural separation.',
          text: 'The Pinterest Kitchen Trap'
        },
        {
          time: '00:08 - 00:20',
          visual: 'Architectural camera pan through AGNAA Show Kitchen showing monolithic 3-meter island, then panning toward seamless flush fluted paneling.',
          voice: 'NBC Part 3 Clause 12.3 mandates direct natural ventilation, while Time-Saver standards demand a 1200 mm passage. But Indian cooking requires more.',
          text: 'NBC Cl 12.3 + Time-Saver 1200mm'
        },
        {
          time: '00:20 - 00:32',
          visual: 'The fluted wood paneling glides open silently, revealing a high-tech stainless steel wet scullery with commercial range hood.',
          voice: 'At AGNAA, we engineer a dual-kitchen system. A pristine front show island for breakfast and entertaining, backed by a concealed wet scullery in the South-East.',
          text: 'AGNAA Dual-Kitchen Protocol'
        },
        {
          time: '00:32 - 00:45',
          visual: 'Drone shot gliding over luxury villa dining space seamlessly integrated with the show kitchen. AGNAA branding card appears.',
          voice: 'Zero cooking odors in the living room. Total visual perfection. That is how intelligent architecture respects your lifestyle.',
          text: 'AGNAA Design Studio • Hyderabad'
        }
      ]
    }
  },
  {
    id: 'AGNAA-CANON-03',
    title: 'Vertical Sculpture: Tread-Riser Physics, Headroom & Egress Geometries',
    discipline: 'Vertical Circulation & Life Safety',
    statutory: {
      clause: 'NBC 2026, Vol. 1, Part 4, Clause 4.4.3 & Part 3 Clause 12.8 (Staircases)',
      source: 'National Building Code of India 2026 (SP 7: 2026)',
      mandate: 'Residential internal staircase minimum flight width 1.0 m (1000 mm). Maximum riser 150 mm (recommended public) / 190 mm (residential cap). Minimum tread 250 mm (residential) / 300 mm (public). Continuous clear vertical headroom throughout flight ≥ 2.2 m (2200 mm). Maximum 15 risers per flight without landing.',
      hyderabadRule: 'Telangana Fire Services Department mandates that fire exit staircases in structures over 15m must have positive-pressure mechanical air injection to purge smoke.'
    },
    ergonomics: {
      source: 'François Blondel Ergonomic Formula & Neufert Architects Data p.210',
      rules: [
        'Universal locomotion formula: 2R + T = 600 mm to 640 mm',
        '150 mm riser + 300 mm tread = 2(150) + 300 = 600 mm (Optimal human cadence)',
        'Landing depth must be equal to or greater than flight width (min 1200 mm) to allow stretcher turning'
      ]
    },
    spatialTheory: {
      source: 'Francis D.K. Ching: Architecture - Form, Space, and Order',
      concept: 'Path-Space Transition & Kinetic Light Core',
      principle: 'A staircase must not be hidden in a dark concrete box. Ching defines vertical circulation as an active volumetric event. Piercing floor slabs creates a multi-storey vertical aperture that draws natural light deep into subterranean levels.'
    },
    vastu: {
      treatise: 'Vishwakarma Prakash Ch. 6, Verses 34-38 & Manuṣyālaya Candrikā Ch. 4',
      sanskrit: 'Dakshinavarta (Clockwise Ascent) & Nairutya / Dakshina Placement',
      physics: 'Clockwise ascent matches natural Coriolis equilibrium in the northern hemisphere. Heavy structural dead weight of the staircase is assigned to South or West, keeping North and East open for low-angle morning sunlight.'
    },
    agnaaBenchmark: {
      principal: 'Ar. Sridhar (SPA Delhi Alumnus, NIRF #1)',
      elevation: 'Cantilevered reinforced concrete or steel structural spine treads clad in flamed leathered granite with 1200 mm to 1350 mm clear width and zero visible stringers.',
      hyderabadTectonics: 'Encased in a 3-storey microclimate atrium with an automated operable skylight. Acts as a solar chimney that purges hot rising air out the roof, creating natural cooling drafts across ground-floor water bodies.'
    },
    carousel: {
      hook: 'Why Cheap Stairs Cause Trips, Falls, and Knee Pain in Luxury Homes',
      slides: [
        {
          num: 1,
          badge: 'THE WALKING HAZARD',
          title: 'Why Do You Trip on Staircases?',
          points: [
            'Have you ever felt clumsy on a staircase, stubbing your toe or feeling breathless?',
            'It’s not your fault—it’s bad mathematical geometry by your builder.',
            'A 10 mm error in riser height disrupts subconscious human brain cadence.'
          ]
        },
        {
          num: 2,
          badge: 'THE MATHEMATICAL TRUTH',
          title: 'The 350-Year-Old Blondel Formula',
          points: [
            'French architect François Blondel discovered: 2 × Riser + Tread = 600 mm to 640 mm.',
            'If Riser = 150 mm and Tread = 300 mm &rarr; 2(150) + 300 = 600 mm (Perfection).',
            'Builders cut treads to 230 mm to save space, forcing you to walk sideways.'
          ]
        },
        {
          num: 3,
          badge: 'THE STATUTORY CODE (NBC)',
          title: 'NBC 2026 Legal Staircase Mandates',
          points: [
            'Part 4 Clause 4.4.3: Minimum 1.0 m clear width for residential homes.',
            'Minimum clear headroom: 2.2 m (2200 mm) measured vertically from tread nosing.',
            'Maximum 15 risers per flight without a landing to prevent fatal fall velocity.'
          ]
        },
        {
          num: 4,
          badge: 'ANCIENT SANSKRIT CANON',
          title: 'Clockwise Ascent & Planetary Physics',
          points: [
            'Vishwakarma Prakash (Ch. 6) mandates Dakshinavarta (Clockwise Ascent).',
            'When you climb turning right, your inner ear vestibular system maintains centrifugal balance.',
            'Heavy vertical load placed in South or West preserves the open light of North and East.'
          ]
        },
        {
          num: 5,
          badge: 'THE AGNAA STANDARD',
          title: 'How Ar. Sridhar Builds Stairs as Kinetic Sculptures',
          points: [
            '1200 mm wide cantilevered treads emerging seamlessly from a reinforced shear wall.',
            'Encased within a 3-storey central light shaft that acts as a natural cooling chimney.',
            'Integrated concealed underside LED step lights calibrated to circadian evening warmth (2700K).'
          ]
        },
        {
          num: 6,
          badge: 'THE SPECIFICATION INDEX',
          title: 'Save This Checklist for Your Structural Engineer',
          points: [
            'Riser: Exactly 150 mm | Tread: Exactly 300 mm',
            'Clear Width: 1200 mm | Clear Headroom: ≥ 2200 mm',
            'NBC 2026 Pt 4 Cl 4.4.3 | Neufert p.210 | Vishwakarma Prakash Ch.6'
          ]
        }
      ],
      caption: 'Stairs are not just steps—they are kinetic architectural sculptures that dictate whether you feel exhausted or elevated walking through your home. Here is how AGNAA Design Studio fuses the 350-year-old Blondel formula, NBC 2026 statutory safety codes, and Vishwakarma Prakash clockwise physics into floating works of art.'
    },
    reel: {
      title: 'The Fatal Staircase Mistake 90% of Builders Make',
      duration: '45 seconds',
      persona: 'Ar. Sridhar - Architectural, authoritative, clear',
      scenes: [
        {
          time: '00:00 - 00:08',
          visual: 'Person climbing a steep, dark, cramped staircase, bumping their shoulder against a low beam. Red warning flash "Headroom Choked: 1.9m".',
          voice: 'Ever wonder why climbing some stairs feels exhausting, while others feel completely effortless? It all comes down to ten millimeters.',
          text: 'The 10mm Staircase Flaw'
        },
        {
          time: '00:08 - 00:20',
          visual: 'Dynamic 3D model drawing a cross-section showing 150mm riser and 300mm tread with formula 2R + T = 600mm.',
          voice: 'NBC Part 4 mandates a 2.2 metre headroom, while the Blondel formula demands two risers plus one tread equals exactly six hundred millimeters.',
          text: 'NBC Part 4 Cl 4.4.3 | 2R + T = 600mm'
        },
        {
          time: '00:20 - 00:32',
          visual: 'Camera sweeps around a glowing cantilevered floating staircase in an AGNAA villa with sunlight pouring from a 3-storey skylight above.',
          voice: 'At AGNAA Design Studio, we turn the stair into a kinetic sculpture. Cantilevered treads, twelve-hundred millimeter clear passage, ascending clockwise as mandated in classical texts.',
          text: 'AGNAA Floating Cantilever Monolith'
        },
        {
          time: '00:32 - 00:45',
          visual: 'Slow upward pan toward the skylight showing warm evening rays. Closing brand logo.',
          voice: 'It acts as a natural thermal chimney, flushing hot air out the roof while creating art you walk on every single day.',
          text: 'AGNAA Design Studio • Architecture & Turnkey'
        }
      ]
    }
  }
];

// 1. Generate AGNAA_MASTER_CAROUSELS.md
let carouselMd = `# AGNAA DESIGN STUDIO • MASTER CAROUSEL CAMPAIGNS
*Authoritative Architectural Standards: NBC 2026, Neufert Ergonomics, Ching Spatial Theory & Classical Vastu Treatises*
*Principal Architect: Ar. Sridhar (SPA Delhi Alumnus)*

---

`;

CANON_DATA.forEach((item, index) => {
  carouselMd += `## CAMPAIGN ${index + 1}: ${item.carousel.hook}\n\n`;
  carouselMd += `**Discipline:** \`${item.discipline}\`  \n`;
  carouselMd += `**Statutory Code Anchor:** \`${item.statutory.clause}\`  \n\n`;

  item.carousel.slides.forEach((slide) => {
    carouselMd += `### [SLIDE ${slide.num}] ${slide.badge}: ${slide.title}\n`;
    slide.points.forEach((p) => {
      carouselMd += `- ${p}\n`;
    });
    carouselMd += `\n*Design Note: ${slide.badge} graphic with minimalist typography.*\n\n`;
  });

  carouselMd += `### Instagram / LinkedIn Post Caption:\n`;
  carouselMd += `> ${item.carousel.caption}\n\n`;
  carouselMd += `**Hashtags:** \`#AgnaaDesignStudio #ArSridhar #NBC2026 #ArchitectureIndia #LuxuryArchitecture #HyderabadVillas\`\n\n`;
  carouselMd += `---\n\n`;
});

fs.writeFileSync(path.join(exportDir, 'AGNAA_MASTER_CAROUSELS.md'), carouselMd);
console.log('Generated AGNAA_MASTER_CAROUSELS.md');

// 2. Generate AGNAA_RVC_VOICEOVER_SCRIPTS.md
let reelsMd = `# AGNAA DESIGN STUDIO • CINEMATIC SHORTS & RVC VOICEOVER SCRIPTS
*Ready-to-use 45-Second Architectural Video Scripts calibrated for RVC Voice Cloning*
*Voice Persona: Ar. Sridhar (Calm, Measured, Authoritative Architectural Voice)*

---

`;

CANON_DATA.forEach((item, index) => {
  reelsMd += `## SCRIPT ${index + 1}: ${item.reel.title}\n\n`;
  reelsMd += `**Target Duration:** ${item.reel.duration}  \n`;
  reelsMd += `**RVC Model Persona:** ${item.reel.persona}  \n`;
  reelsMd += `**Statutory Anchor:** \`${item.statutory.clause}\`  \n\n`;

  reelsMd += `| Timestamp | Visual Action & Camera Direction | RVC Voiceover Text (Read Exactly As Is) | On-Screen Graphic Text |\n`;
  reelsMd += `| :--- | :--- | :--- | :--- |\n`;

  item.reel.scenes.forEach((scene) => {
    reelsMd += `| **${scene.time}** | ${scene.visual} | *"${scene.voice}"* | \`${scene.text}\` |\n`;
  });

  reelsMd += `\n**Full RVC Clean Audio Prompt (Copy-Paste into TTS/RVC):**\n`;
  reelsMd += `\`\`\`text\n`;
  reelsMd += item.reel.scenes.map((s) => s.voice).join(' ') + '\n';
  reelsMd += `\`\`\`\n\n`;
  reelsMd += `---\n\n`;
});

fs.writeFileSync(path.join(exportDir, 'AGNAA_RVC_VOICEOVER_SCRIPTS.md'), reelsMd);
console.log('Generated AGNAA_RVC_VOICEOVER_SCRIPTS.md');

// 3. Generate AGNAA_LAYA_RULES_LEDGER.json
const layaLedger = CANON_DATA.map((item) => ({
  canonId: item.id,
  title: item.title,
  statutoryClause: item.statutory.clause,
  mandatoryParameters: item.statutory.mandate,
  ergonomicDimensions: item.ergonomics.rules,
  classicalVastuSource: `${item.vastu.treatise} (${item.vastu.sanskrit})`,
  bioclimaticRationale: item.vastu.physics,
  agnaaExecutionBenchmark: item.agnaaBenchmark.elevation
}));

fs.writeFileSync(path.join(exportDir, 'AGNAA_LAYA_RULES_LEDGER.json'), JSON.stringify(layaLedger, null, 2));
console.log('Generated AGNAA_LAYA_RULES_LEDGER.json');

console.log('All branding and content assets successfully built in public/agnaa-canon-exports!');
