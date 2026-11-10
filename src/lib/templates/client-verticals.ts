export interface DeliverableItem {
  name: string;
  desc: string;
  status: 'done' | 'active' | 'pending';
  category: string;
  isBonus?: boolean;
}

export interface ProjectStage {
  id: string;
  title: string;
  category: string;
  badge?: string;
  items: DeliverableItem[];
}

export interface VerticalTemplate {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  industry: string;
  accentColor: string;
  gradient: string;
  typicalContractValue: {
    min: number;
    max: number;
    recommended: number;
    display: string;
  };
  stages: ProjectStage[];
  bonusScope: {
    title: string;
    items: string[];
    valueEstimate: string;
  };
  paymentMilestones: {
    label: string;
    percent: number;
    description: string;
  }[];
}

export const CLIENT_VERTICAL_TEMPLATES: Record<string, VerticalTemplate> = {
  architecture: {
    id: "vert-arch",
    slug: "architecture",
    title: "Architecture & Spatial Engineering",
    subtitle: "Turnkey architectural planning, structural coordination, and municipal sanction documentation.",
    industry: "Architecture & Construction",
    accentColor: "#1C1C72",
    gradient: "from-[#1C1C72] to-[#2563EB]",
    typicalContractValue: {
      min: 150000,
      max: 650000,
      recommended: 350000,
      display: "₹1,50,000 – ₹6,50,000"
    },
    stages: [
      {
        id: "arch-stage-1",
        title: "Site Survey & Zoning Analysis",
        category: "Planning",
        items: [
          { name: "Topographical Contour Survey Verification", desc: "Boundary offsets, level differentials, and road alignment.", status: "done", category: "Planning" },
          { name: "Municipal Bye-Law & FSI Calculation", desc: "Zoning classification, setback envelope, and built-up efficiency audit.", status: "done", category: "Planning" },
          { name: "Solar Path & Vastu Orientation Matrix", desc: "Climatic zoning, wind flow vectors, and solar radiation modeling.", status: "done", category: "Planning" }
        ]
      },
      {
        id: "arch-stage-2",
        title: "Schematic Conceptual Masterplanning",
        category: "Design",
        items: [
          { name: "3 Iterative Concept Layout Options", desc: "Spatial programming, circulation cores, and functional zone mapping.", status: "done", category: "Design" },
          { name: "Volumetric 3D Massing Study", desc: "Form exploration, sun-shade analysis, and facade silhouette.", status: "done", category: "Design" },
          { name: "Executive Design Review Presentation", desc: "High-resolution plan walkthrough with spatial rationale.", status: "done", category: "Design" }
        ]
      },
      {
        id: "arch-stage-3",
        title: "Detailed Architectural & Sanction Set",
        category: "Working Drawings",
        items: [
          { name: "Comprehensive Working Drawings (1:50)", desc: "Dimensioned floor plans, section cuts, and exterior elevations.", status: "active", category: "Working Drawings" },
          { name: "Door & Window Joinery Schedule", desc: "Material specs, hardware schedule, and opening details.", status: "active", category: "Working Drawings" },
          { name: "Municipal Sanction Submission Drawings", desc: "Authority compliance docket ready for local approval.", status: "active", category: "Working Drawings" }
        ]
      },
      {
        id: "arch-stage-4",
        title: "BIM Coordination & BOQ Estimation",
        category: "Execution",
        items: [
          { name: "Detailed Bill of Quantities (BOQ)", desc: "Civil works, concrete volume, steel tonnage, and finishing itemization.", status: "pending", category: "Execution" },
          { name: "Structural & MEP Coordination Audit", desc: "Clash detection between RCC columns, plumbing stacks, and conduits.", status: "pending", category: "Execution" }
        ]
      }
    ],
    bonusScope: {
      title: "Complimentary Spatial Excellence Suite",
      items: [
        "Photorealistic 3D Exterior Dusk Render (4K Resolution)",
        "Material Moodboard & Tactile Sample Matrix",
        "Executive Construction Docket Binder (Printed & Hardbound)"
      ],
      valueEstimate: "₹45,000 Courtesy Bonus"
    },
    paymentMilestones: [
      { label: "Mobilization Advance", percent: 30, description: "Upon engagement and site survey initiation" },
      { label: "Concept Approval", percent: 40, description: "Upon sign-off on 3D massing and finalized floor layouts" },
      { label: "Working Drawings & BOQ Handover", percent: 30, description: "Upon delivery of complete GFC working drawing docket" }
    ]
  },

  graphicDesign: {
    id: "vert-graphic",
    slug: "graphic-design",
    title: "Graphic Design & Visual Communications",
    subtitle: "High-impact packaging, editorial publishing, environmental signage, and sales collateral.",
    industry: "Visual Communications",
    accentColor: "#7B2DBF",
    gradient: "from-[#4A259C] to-[#7B2DBF]",
    typicalContractValue: {
      min: 75000,
      max: 250000,
      recommended: 125000,
      display: "₹75,000 – ₹2,50,000"
    },
    stages: [
      {
        id: "gd-stage-1",
        title: "Creative Strategy & Typography Architecture",
        category: "Strategy",
        items: [
          { name: "Visual Identity Audit & Benchmarking", desc: "Competitor visual audit and hierarchy mapping.", status: "done", category: "Strategy" },
          { name: "Bespoke Typography Hierarchy System", desc: "Licensing evaluation, display typography, and body readability.", status: "done", category: "Strategy" }
        ]
      },
      {
        id: "gd-stage-2",
        title: "Marketing Collateral & Editorial Design",
        category: "Collateral",
        items: [
          { name: "Executive Corporate Brochure (16 Pages)", desc: "Grid-based publication layout with infographics and bespoke art direction.", status: "done", category: "Collateral" },
          { name: "Product Data Sheets & Technical One-Pagers", desc: "Industrial clarity layout for engineering specification.", status: "done", category: "Collateral" },
          { name: "Tradeshow Booth & Exhibition Wall Graphics", desc: "Large-format vector graphics calibrated to print specs.", status: "active", category: "Collateral" }
        ]
      },
      {
        id: "gd-stage-3",
        title: "Packaging & Production Pre-Press",
        category: "Packaging",
        items: [
          { name: "Custom Structural Dieline Design", desc: "Precision fold dielines, bleed tolerances, and glue flap geometry.", status: "active", category: "Packaging" },
          { name: "CMYK + Spot UV + Foil Print Master Files", desc: "Separated vector plates, Pantone color matching, and print supervision.", status: "pending", category: "Packaging" }
        ]
      }
    ],
    bonusScope: {
      title: "Complimentary Asset Package",
      items: [
        "15 Modular Social Media Grid Templates (Figma & PSD)",
        "Vector Iconography Library (40 Custom Industrial Icons)",
        "Direct Print Vendor Proofing Supervision"
      ],
      valueEstimate: "₹25,000 Courtesy Bonus"
    },
    paymentMilestones: [
      { label: "Design Inception", percent: 40, description: "Advance upon creative brief alignment" },
      { label: "Collateral Proof Approval", percent: 40, description: "Upon finalized artwork sign-off" },
      { label: "Master Print Release", percent: 20, description: "Delivery of all vector dielines and press-ready PDFs" }
    ]
  },

  brandIdentity: {
    id: "vert-brand",
    slug: "branding",
    title: "Brand Systems & Corporate Identity",
    subtitle: "End-to-end corporate branding, trademark-ready identity, and living design token guidelines.",
    industry: "Brand Architecture",
    accentColor: "#1C1C72",
    gradient: "from-[#1C1C72] via-[#4A259C] to-[#7B2DBF]",
    typicalContractValue: {
      min: 125000,
      max: 450000,
      recommended: 175000,
      display: "₹1,25,000 – ₹4,50,000"
    },
    stages: [
      {
        id: "bi-stage-1",
        title: "Brand Strategy & Positioning Philosophy",
        category: "Strategy",
        items: [
          { name: "Corporate Value Matrix & Narrative", desc: "Market differentiation, tone of voice, and value proposition.", status: "done", category: "Strategy" },
          { name: "Archetype & Emotional Vector Mapping", desc: "Visual psychographics and industrial authority positioning.", status: "done", category: "Strategy" }
        ]
      },
      {
        id: "bi-stage-2",
        title: "Core Logomark & Sacred Geometry Synthesis",
        category: "Identity",
        items: [
          { name: "Primary Master Logomark (9 Vector Formats)", desc: "Sacred geometry proportions, dark/light variants, and favicon lockups.", status: "done", category: "Identity" },
          { name: "Dynamic Sub-Brand Lockup Architecture", desc: "Division hierarchies, product line prefixes, and department badges.", status: "done", category: "Identity" },
          { name: "Trademark Registration Drawing Set", desc: "High-contrast monochrome boundary drawings for IP registry.", status: "done", category: "Identity" }
        ]
      },
      {
        id: "bi-stage-3",
        title: "Corporate Identity Bible & Living Tokens",
        category: "Guidelines",
        items: [
          { name: "Executive 60-Page Brand Manual (PDF)", desc: "Clear space rules, incorrect usage, color formulas, and typography rules.", status: "active", category: "Guidelines" },
          { name: "Design Token Exports (Tailwind, CSS, Figma)", desc: "Ready-to-import color palettes, shadows, and typographic scales.", status: "active", category: "Guidelines" },
          { name: "Physical Stationery & Legal Seal Master Files", desc: "Letterhead, business cards, rubber stamps, and presentation slides.", status: "active", category: "Guidelines" }
        ]
      }
    ],
    bonusScope: {
      title: "Executive Corporate Courtesy Suite",
      items: [
        "12-Person Retouched Staff ID Badge System",
        "10 C-Suite Double-Sided Business Card Formats",
        "Official High-Res Wax Seal & Digital Signature Master File"
      ],
      valueEstimate: "₹35,000 Courtesy Bonus"
    },
    paymentMilestones: [
      { label: "Kickoff Advance", percent: 35, description: "Upon strategic discovery kickoff" },
      { label: "Identity Lock", percent: 45, description: "Upon master logomark and color token sign-off" },
      { label: "Bible Handover", percent: 20, description: "Delivery of master guideline PDF and token assets" }
    ]
  },

  videoCGI: {
    id: "vert-video",
    slug: "video-cgi",
    title: "Video Production, 3D Motion & CGI",
    subtitle: "Cinematic 4K corporate films, 3D product animations, and photorealistic CGI walkthroughs.",
    industry: "Motion & CGI",
    accentColor: "#EA580C",
    gradient: "from-[#EA580C] to-[#C026D3]",
    typicalContractValue: {
      min: 150000,
      max: 750000,
      recommended: 275000,
      display: "₹1,50,000 – ₹7,50,000"
    },
    stages: [
      {
        id: "vc-stage-1",
        title: "Narrative Scripting & Pre-Visualization",
        category: "Pre-Production",
        items: [
          { name: "Executive Voiceover Script & Beat Sheet", desc: "Time-coded narrative, technical script, and emotional arc.", status: "done", category: "Pre-Production" },
          { name: "Bespoke Illustrated Storyboard (24 Frames)", desc: "Camera angle, composition, and lighting reference board.", status: "done", category: "Pre-Production" }
        ]
      },
      {
        id: "vc-stage-2",
        title: "3D Asset Modeling & Texture Shading",
        category: "3D Production",
        items: [
          { name: "Precision CAD/3D Product Modeling", desc: "Sub-millimeter accurate CAD asset reconstruction and optimization.", status: "done", category: "3D Production" },
          { name: "PBR Material Shading & Octane Lighting", desc: "Industrial metals, glass refractions, internal cutaways, and micro-textures.", status: "active", category: "3D Production" }
        ]
      },
      {
        id: "vc-stage-3",
        title: "4K Rendering, Sound Design & Color Grading",
        category: "Post-Production",
        items: [
          { name: "Ultra-HD 4K 60fps Final Master Render", desc: "Cinematic camera moves, depth of field, and optical flares.", status: "active", category: "Post-Production" },
          { name: "Spatial Audio Engineering & Sound FX", desc: "Bespoke ambient soundscape, foley sweeps, and stereo voiceover mastering.", status: "pending", category: "Post-Production" },
          { name: "Social Media Micro-Cuts (9:16 Shorts / Reels)", desc: "Fast-paced vertical cuts for LinkedIn and Instagram campaigns.", status: "pending", category: "Post-Production" }
        ]
      }
    ],
    bonusScope: {
      title: "Complimentary Motion Package",
      items: [
        "10 Isolated 4K Transparent PNG Product Renders for Website",
        "Looping 3D Logo Intro / Outro Sting (Alpha Channel)",
        "Uncompressed ProRes 422 Master Archive"
      ],
      valueEstimate: "₹40,000 Courtesy Bonus"
    },
    paymentMilestones: [
      { label: "Pre-Production Advance", percent: 40, description: "Upon storyboard and script lock" },
      { label: "Animatic Approval", percent: 35, description: "Upon gray-box 3D motion animatic approval" },
      { label: "Final 4K Delivery", percent: 25, description: "Upon final color-graded video file sign-off" }
    ]
  },

  realEstate: {
    id: "vert-re",
    slug: "real-estate",
    title: "Real Estate & Property Development Marketing",
    subtitle: "High-conversion project landing engines, interactive unit visualizers, and NRI sales kits.",
    industry: "Real Estate & Infrastructure",
    accentColor: "#059669",
    gradient: "from-[#059669] to-[#1C1C72]",
    typicalContractValue: {
      min: 200000,
      max: 1200000,
      recommended: 450000,
      display: "₹2,00,000 – ₹12,00,000"
    },
    stages: [
      {
        id: "re-stage-1",
        title: "Project Identity & Strategic Positioning",
        category: "Identity",
        items: [
          { name: "Luxury Property Brand Identity & Name Lockup", desc: "Development logo, project typography, and architectural emblem.", status: "done", category: "Identity" },
          { name: "Buyer Persona & NRI Investor Pitch Narrative", desc: "Yield analysis, location advantages, and luxury amenity messaging.", status: "done", category: "Identity" }
        ]
      },
      {
        id: "re-stage-2",
        title: "Digital Sales Engine & Interactive Experience",
        category: "Digital Platform",
        items: [
          { name: "High-Speed Project Website & Lead Capture Funnel", desc: "Direct CRM integration, brochure download gate, and WhatsApp router.", status: "done", category: "Digital Platform" },
          { name: "Interactive 3D Masterplan & Floor Plan Explorer", desc: "Filter by 2BHK/3BHK, corner units, and vastu orientations.", status: "active", category: "Digital Platform" },
          { name: "Virtual 360° Walkthrough Integration", desc: "Embed-ready panoramic viewer for remote buyer inspections.", status: "active", category: "Digital Platform" }
        ]
      },
      {
        id: "re-stage-3",
        title: "Printed Sales Collateral & Launch Assets",
        category: "Collateral",
        items: [
          { name: "Deluxe Hardbound Coffee Table Sales Docket", desc: "Gold foil debossed luxury brochure with architectural schematics.", status: "pending", category: "Collateral" },
          { name: "Site Experience Center Graphics & Hoardings", desc: "Outdoor highway hoarding vectors and site gate branding.", status: "pending", category: "Collateral" }
        ]
      }
    ],
    bonusScope: {
      title: "Builder Launch Booster Suite",
      items: [
        "Automated WhatsApp CRM Lead Auto-Responder Bot",
        "Google Maps Optimized Project Pin & Geo-Schema Data",
        "20 High-Res Architectural Renders Optimized for Meta Ads"
      ],
      valueEstimate: "₹65,000 Courtesy Bonus"
    },
    paymentMilestones: [
      { label: "Mobilization Advance", percent: 30, description: "Upon project kickoff and wireframe alignment" },
      { label: "Digital Platform Preview", percent: 40, description: "Upon website and floor plan explorer deployment" },
      { label: "Sales Launch Sign-Off", percent: 30, description: "Upon CRM go-live and master brochure release" }
    ]
  },

  aiDeploy: {
    id: "vert-ai",
    slug: "ai-llm-deployment",
    title: "Autonomous AI, Agent Systems & SLM/LLM Deployment",
    subtitle: "Custom Small Language Model (SLM) training, multi-agent workflows, and on-prem enterprise AI.",
    industry: "Applied Artificial Intelligence",
    accentColor: "#6366F1",
    gradient: "from-[#1C1C72] via-[#4338CA] to-[#9333EA]",
    typicalContractValue: {
      min: 250000,
      max: 1800000,
      recommended: 550000,
      display: "₹2,50,000 – ₹18,00,000"
    },
    stages: [
      {
        id: "ai-stage-1",
        title: "Proprietary Data Engineering & SLM Material Curation",
        category: "Data Curation",
        items: [
          { name: "Knowledge Extraction & Document Parsing Pipeline", desc: "Extracting messy PDFs, CAD specs, contracts, and internal databases.", status: "done", category: "Data Curation" },
          { name: "Synthetic Instruction Dataset Generation (JSONL)", desc: "10,000+ verified (instruction, input, output) domain reasoning pairs.", status: "done", category: "Data Curation" },
          { name: "Deduplication, Tokenization & Safety Guardrailing", desc: "PII masking, format validation, and domain boundary filtering.", status: "done", category: "Data Curation" }
        ]
      },
      {
        id: "ai-stage-2",
        title: "Model Fine-Tuning & Alignment (LoRA / QLoRA)",
        category: "Model Training",
        items: [
          { name: "Base SLM Model Selection & Quantization Audit", desc: "Benchmarking Llama-3.1 8B vs Phi-4 vs Gemma-2 9B for target latency.", status: "done", category: "Model Training" },
          { name: "Parameter-Efficient Fine-Tuning (PEFT / QLoRA)", desc: "GPU training runs on dedicated A100/H100 compute with custom learning rate schedules.", status: "active", category: "Model Training" },
          { name: "Direct Preference Optimization (DPO / RLHF)", desc: "Aligning model tone, eliminating hallucinations, and locking response formatting.", status: "active", category: "Model Training" }
        ]
      },
      {
        id: "ai-stage-3",
        title: "Autonomous Agent Tool-Calling & Production Deployment",
        category: "Deployment",
        items: [
          { name: "Custom Tool-Calling & Function Execution Schema", desc: "Connecting model to CRM, SQL databases, WhatsApp, and email APIs.", status: "pending", category: "Deployment" },
          { name: "Local On-Prem or Private Cloud Inference Engine", desc: "Deploying via vLLM or Ollama with GGUF/AWQ quantization for sub-50ms tokens.", status: "pending", category: "Deployment" },
          { name: "Automated Evaluation Benchmark & Drift Monitoring", desc: "Regression testing harness comparing outputs against gold standard cases.", status: "pending", category: "Deployment" }
        ]
      }
    ],
    bonusScope: {
      title: "Enterprise AI Infrastructure Bonus",
      items: [
        "Executive Web Chat & Admin Testing Playground (Next.js)",
        "Automated Nightly Backup of Fine-Tuned Model Weights",
        "1-Month Performance & Latency Optimization Retainer Included"
      ],
      valueEstimate: "₹75,000 Courtesy Bonus"
    },
    paymentMilestones: [
      { label: "Data Engineering Advance", percent: 40, description: "Upon dataset curation and synthetic generation plan" },
      { label: "Trained Model Benchmark Sign-Off", percent: 40, description: "Upon demonstration of fine-tuned model eval metrics" },
      { label: "Production Deployment & Handover", percent: 20, description: "Upon containerization, API routing, and handover" }
    ]
  }
};
