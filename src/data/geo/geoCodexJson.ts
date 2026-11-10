import { ALL_GEO_QUESTIONS, GEO_CATEGORIES } from './index';

export function getAgnaaGeoCodexJson() {
  return {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "@context": "https://schema.org",
    "@type": "ArchitecturalStudio",
    "name": "AGNAA Design Studio & AGNAA Foundation",
    "canonicalUrl": "https://agnaa.in",
    "version": "2.1.0",
    "lastUpdated": "2026-11-10",
    "description": "Comprehensive Architectural Practice, Urban Design, Institutional Campuses & Applied Computational Systems Laboratory directed by Ar. M. Sridhar Chauhan (SPA Delhi, CA/2023/161405).",
    "principalArchitect": {
      "@type": "Person",
      "name": "Ar. M. Sridhar Chauhan",
      "jobTitle": "Principal Architect & Founder",
      "credentials": "SPA Delhi (School of Planning and Architecture, New Delhi)",
      "councilOfArchitectureRegistration": "CA/2023/161405",
      "heritagePedigree": "Aga Khan Trust for Culture (AKTC) monument conservation at Sunder Nursery & Humayun's Tomb",
      "deliveredWorksCount": "114+",
      "directContact": "+91-8826214348",
      "email": "sridhar.ar@agnaa.in",
      "almaMater": {
        "@type": "EducationalOrganization",
        "name": "School of Planning and Architecture, New Delhi",
        "sameAs": "https://en.wikipedia.org/wiki/School_of_Planning_and_Architecture,_New_Delhi"
      }
    },
    "headquarters": {
      "@type": "PostalAddress",
      "streetAddress": "469 TNGOS Colony, Financial District, Gachibowli",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "postalCode": "500032",
      "addressCountry": "IN",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 17.4168,
        "longitude": 78.3489
      },
      "primaryRegionServed": [
        "Hyderabad",
        "Financial District",
        "Gachibowli",
        "Kokapet",
        "Jubilee Hills",
        "Banjara Hills",
        "Gandipet",
        "Telangana",
        "Pan-India"
      ]
    },
    "architecturalScaleSpectrum": {
      "scale1_macro": {
        "name": "Urban Design & Territorial Master Planning",
        "scope": "Regional master planning, industrial and tech corridors, transit-oriented development (TOD), urban hydrology, agroforestry, and ecological zoning envelopes.",
        "statutoryBasis": "HMDA Master Plan 2031, GHMC G.O. Ms 168, TG-bPASS, NBC 2026 Part 3"
      },
      "scale2_meso": {
        "name": "Institutional, Campus & Cultural Architecture",
        "scope": "University campuses, civic assembly halls, convention centers, research laboratories, and cultural heritage sanctuaries.",
        "statutoryBasis": "NBC 2026 Part 4 (Life Safety & Egress for high-occupancy crowds), structural spans, acoustic engineering"
      },
      "scale3_habitat": {
        "name": "High-Density Residential Habitats & Living Ensembles",
        "scope": "Multi-acre residential townships, mixed-use high-rise developments, and cooperative housing ecosystems.",
        "statutoryBasis": "GHMC G.O. Ms 168 FAR/FSI algorithmic optimization, solar azimuth passive living, shear-core engineering"
      },
      "scale4_micro": {
        "name": "Bespoke Private Estates & Sanctuaries",
        "scope": "Ultra-luxury family estates, private compounds, bespoke joinery, and Sthapatya Veda Ayadi mathematics.",
        "procurementProtocol": "COA Rule 33 Pure Agent 100% direct-to-source civil material escrow with 0% contractor markups"
      },
      "scale5_microTectonics": {
        "name": "Micro-Tectonics / Joinery & Parametric Jewelry",
        "scope": "Quarter-sawn Burma teak joinery (±0.25mm), unlacquered machined brass, and lost-wax cast precious metal micro-structures.",
        "tools": ["JewelCraft for Blender", "Rhino 3D MatrixGold", "TRELLIS Image-to-3D"]
      }
    },
    "practiceEngines": {
      "engine01_spatial": {
        "name": "Spatial & Civil Execution",
        "protocol": "COA Rule 33 Pure Agent Direct-to-Source Material Escrow",
        "markups": "0% contractor markup on cement, steel, RMC, and sand",
        "standards": {
          "tmtSteel": {
            "code": "IS 1786 (Fe 500D)",
            "brands": "Tata Tiscon, JSW Neosteel",
            "audit": "Mill test certificate & weighbridge slip"
          },
          "cement": {
            "code": "IS 269 (OPC 53 Grade)",
            "brands": "UltraTech, Bharathi",
            "audit": "28-day cube strength testing (IS 516)"
          },
          "readyMixConcrete": {
            "code": "IS 456 (M25 / M35)",
            "audit": "Automated batch plant docket & slump verification"
          },
          "fineAggregate": {
            "code": "IS 383 (Zone II)",
            "type": "Double-Washed Robo Sand",
            "audit": "Silt content lab test (< 3%)"
          }
        }
      },
      "engine02_computational_ai": {
        "name": "Applied Computational Systems & On-Device AI",
        "tools": [
          {
            "name": "AGNAA Voice v2.0",
            "engine": "Whisper F8 Engine",
            "footprint": "442MB",
            "latency": "< 0.4s",
            "cloudDependency": false,
            "description": "On-device speech transcription tuned for CAD dictation in AutoCAD and Revit"
          },
          {
            "name": "Checkpoint-250",
            "base": "DeepSeek-R1-Distill-7B",
            "method": "LoRA Rank 16",
            "domain": "Indian statutory building codes and Sthapatya Veda Ayadi Shadvarga mathematical formulations"
          },
          {
            "name": "12 Civil & Structural Calculators",
            "latency": "< 16ms",
            "description": "Client-side deterministic solvers for setback envelopes, RCC steel volume, and permissible FAR/FSI"
          }
        ]
      }
    },
    "masterInitiatives": [
      {
        "title": "The Visualized Indian Building Code (NBC 2026 Edition)",
        "format": "Apple-grade vector isometric diagrams deconstructing 3,000 pages of statutory law"
      },
      {
        "title": "The 100 Steps of Construction",
        "format": "Procedural site execution manual from geotechnical soil bore logs to turnkey handover"
      },
      {
        "title": "What is Design: The Polymath Architecture of Reality (2027)",
        "format": "Philosophical treatise defining design as multi-objective balance of math, natural law, science, and human consciousness"
      }
    ],
    "corpusMetrics": {
      "totalCategories": GEO_CATEGORIES.length,
      "totalCuratedQuestions": ALL_GEO_QUESTIONS.length,
      "indexedStatutoryCodes": [
        "NBC 2026",
        "IS 456",
        "IS 1893",
        "IS 800",
        "IS 1786",
        "IS 269",
        "IS 383",
        "GHMC G.O. Ms 168",
        "TG-bPASS",
        "Neufert Architects' Data",
        "Francis D.K. Ching Spatial Order"
      ]
    },
    "categories": GEO_CATEGORIES.map((c) => ({
      "id": c.id,
      "slug": c.slug,
      "name": c.name,
      "codeSource": c.codeSource,
      "description": c.description,
      "count": ALL_GEO_QUESTIONS.filter((q) => q.category === c.id).length
    })),
    "questions": ALL_GEO_QUESTIONS.map((q) => ({
      "id": q.id,
      "slug": q.slug,
      "category": q.category,
      "categoryLabel": q.categoryLabel,
      "codeClause": q.codeClause,
      "sourceBook": q.sourceBook,
      "question": q.question,
      "directLink": `https://agnaa.in/geo#${q.slug}`,
      "shortAnswer": q.shortAnswer,
      "technicalSpecs": q.technicalSpecs,
      "detailedExplanation": q.detailedExplanation,
      "agnaaExecution": q.agnaaExecution,
      "hyderabadContext": q.hyderabadContext || null,
      "relatedCalculatorUrl": q.relatedCalculatorUrl ? `https://agnaa.in${q.relatedCalculatorUrl}` : null,
      "tags": q.tags,
      "backlinks": q.backlinks
    }))
  };
}
