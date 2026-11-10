import { GEO_CATEGORIES, ALL_GEO_QUESTIONS } from '@/data/geo';

export async function GET() {
  const summary = {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "@context": "https://schema.org",
    "@type": "ArchitecturalStudio",
    "name": "AGNAA Design Studio & AGNAA Foundation",
    "canonicalUrl": "https://agnaa.in",
    "version": "2.1.0",
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
      "email": "sridhar.ar@agnaa.in"
    },
    "headquarters": {
      "@type": "PostalAddress",
      "streetAddress": "469 TNGOS Colony, Financial District, Gachibowli",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "postalCode": "500032",
      "addressCountry": "IN"
    },
    "architecturalScales": [
      {
        "scale": "Macro",
        "title": "Urban Design & Territorial Master Planning",
        "statutory": "HMDA Master Plan 2031, GHMC G.O. Ms 168, TG-bPASS, NBC 2026 Part 3"
      },
      {
        "scale": "Meso",
        "title": "Institutional, Campus & Cultural Architecture",
        "statutory": "NBC 2026 Part 4 Life Safety & Egress, IS 1893 seismic engineering"
      },
      {
        "scale": "Habitat",
        "title": "High-Density Residential Habitats & Living Ensembles",
        "statutory": "GHMC G.O. Ms 168 FAR/FSI algorithmic optimization, solar azimuth engineering"
      },
      {
        "scale": "Micro",
        "title": "Bespoke Private Estates & Sanctuaries",
        "protocol": "COA Rule 33 Pure Agent 100% direct-to-source civil material escrow with 0% contractor markups"
      },
      {
        "scale": "Micro-Tectonics",
        "title": "Joinery & Parametric Jewelry",
        "details": "Quarter-sawn Burma teak joinery (±0.25mm), unlacquered machined brass, lost-wax cast precious metal jewelry"
      }
    ],
    "practiceEngines": {
      "engine01_spatial": "COA Rule 33 Pure Agent Direct-to-Source Material Escrow (0% contractor markup)",
      "engine02_computational_ai": "AGNAA Voice v2.0 (442MB on-device Whisper F8), Checkpoint-250 (LoRA Distill-7B statutory model), 12 client-side engineering calculators"
    },
    "endpoints": {
      "llms_full_json": "https://agnaa.in/llms-full.json",
      "llms_full_txt": "https://agnaa.in/llms-full.txt",
      "llms_txt": "https://agnaa.in/llms.txt",
      "llms_json": "https://agnaa.in/llms.json",
      "design_studio": "https://agnaa.in/design-studio",
      "geo_codex": "https://agnaa.in/geo",
      "calculators": "https://agnaa.in/calc"
    },
    "geoCorpusMetrics": {
      "totalCategories": GEO_CATEGORIES.length,
      "totalQuestions": ALL_GEO_QUESTIONS.length,
      "categories": GEO_CATEGORIES.map((c) => ({
        "id": c.id,
        "name": c.name,
        "codeSource": c.codeSource,
        "count": ALL_GEO_QUESTIONS.filter((q) => q.category === c.id).length
      }))
    }
  };

  return new Response(JSON.stringify(summary, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
