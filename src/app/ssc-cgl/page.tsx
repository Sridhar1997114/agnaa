"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Zap,
  Search,
  BookOpen,
  Calculator,
  Compass,
  FileText,
  Globe,
  Award,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Sparkles,
  ShieldAlert,
  Flame,
  Download,
  Share2,
  HelpCircle,
  Copy,
  Check,
  RotateCcw
} from "lucide-react";

// Types
type Category = "all" | "blindspots" | "monthly_pdfs" | "acronyms" | "current_affairs" | "quant" | "reasoning" | "english" | "ga";

interface CheatItem {
  id: string;
  category: Category;
  topic: string;
  rank?: number;
  priority?: "Very High" | "High" | "Medium" | "Low-Medium" | "Low";
  title: string;
  formulaOrRule: string;
  shortcut5s: string;
  trapWarning: string;
  exampleQ: string;
  options?: string[];
  solution5s: string;
  correctAnswer: string;
  tags: string[];
}

interface AcronymItem {
  acronym: string;
  fullForm: string;
  ministry: string;
  keyFacts: string;
  examMnemonic: string;
  category: "Govt Scheme" | "Defense/Tech" | "Economy/Banking" | "Education/Health";
}

interface CurrentAffairItem {
  headline: string;
  category: "Summits" | "Appointments" | "Defense Exercises" | "Sports & Awards" | "Science & Space";
  details: string;
  examQuestion: string;
  fastAnswer: string;
}

// 1. Comprehensive Government Schemes & Acronyms
const ACRONYMS_DATA: AcronymItem[] = [
  {
    acronym: "PM-KISAN",
    fullForm: "Pradhan Mantri Kisan Samman Nidhi",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    keyFacts: "Rs 6,000 per year direct income support in 3 equal installments of Rs 2,000 each to all landholding farmer families.",
    examMnemonic: "3 installments of 2K = 6K total direct benefit transfer (DBT).",
    category: "Govt Scheme"
  },
  {
    acronym: "PM-SVANidhi",
    fullForm: "PM Street Vendor's AtmaNirbhar Nidhi",
    ministry: "Ministry of Housing and Urban Affairs (MoHUA)",
    keyFacts: "Micro-credit facility for street vendors: collateral-free working capital loan of Rs 10K, then 20K, then 50K on timely repayment with 7% interest subsidy.",
    examMnemonic: "SVANidhi = Street Vendor loan ladder 10k -> 20k -> 50k.",
    category: "Govt Scheme"
  },
  {
    acronym: "PM-PRANAM",
    fullForm: "PM Programme for Restoration, Awareness, Nourishment and Amelioration of Mother Earth",
    ministry: "Ministry of Chemicals & Fertilizers",
    keyFacts: "Incentivizing states to promote alternative, organic bio-fertilizers and reduce chemical fertilizer subsidies.",
    examMnemonic: "PRANAM = Bio-fertilizer save Mother Earth.",
    category: "Govt Scheme"
  },
  {
    acronym: "PM-MITRA",
    fullForm: "PM Mega Integrated Textile Region and Apparel Parks",
    ministry: "Ministry of Textiles",
    keyFacts: "Setting up 7 Mega Textile Parks across 7 states (5F vision: Farm to Fibre to Factory to Fashion to Foreign).",
    examMnemonic: "7 MITRA parks for 5F Textile vision.",
    category: "Govt Scheme"
  },
  {
    acronym: "PM-JANMAN",
    fullForm: "PM Janjati Adivasi Nyaya Maha Abhiyan",
    ministry: "Ministry of Tribal Affairs",
    keyFacts: "Rs 24,104 crore budget targeting 75 Particularly Vulnerable Tribal Groups (PVTGs) across 18 states and UTs for basic amenities.",
    examMnemonic: "JANMAN = 75 PVTG Tribal Justice.",
    category: "Govt Scheme"
  },
  {
    acronym: "PM-SHRI",
    fullForm: "PM Schools for Rising India",
    ministry: "Ministry of Education",
    keyFacts: "Upgrading 14,500 schools across India to showcase NEP 2020 pedagogical standards as exemplar green schools.",
    examMnemonic: "14,500 PM-SHRI exemplar NEP schools.",
    category: "Govt Scheme"
  },
  {
    acronym: "SWAMITVA",
    fullForm: "Survey of Villages and Mapping with Improvised Technology in Village Areas",
    ministry: "Ministry of Panchayati Raj",
    keyFacts: "Drone mapping of rural inhabited areas to provide clear property ownership records ('Property Cards') to villagers.",
    examMnemonic: "SWAMITVA = Drone survey rural property cards.",
    category: "Govt Scheme"
  },
  {
    acronym: "UDAN",
    fullForm: "Ude Desh ka Aam Nagrik",
    ministry: "Ministry of Civil Aviation",
    keyFacts: "Regional airport connectivity scheme capping 1-hour flights (~500km) at Rs 2,500 with Viability Gap Funding (VGF).",
    examMnemonic: "UDAN = Regional flight cap Rs 2500/hr.",
    category: "Govt Scheme"
  },
  {
    acronym: "FAME-India",
    fullForm: "Faster Adoption and Manufacturing of (Hybrid &) Electric Vehicles",
    ministry: "Ministry of Heavy Industries",
    keyFacts: "Subsidizing electric 2W, 3W, 4W and buses, plus establishing public EV charging infrastructure network.",
    examMnemonic: "FAME = EV subsidies & charging grids.",
    category: "Govt Scheme"
  },
  {
    acronym: "AMRUT",
    fullForm: "Atal Mission for Rejuvenation and Urban Transformation",
    ministry: "Ministry of Housing and Urban Affairs (MoHUA)",
    keyFacts: "Universal water tap connections, sewerage, storm water drains, and green open spaces in 500 target cities.",
    examMnemonic: "AMRUT = 500 cities piped water & sewage.",
    category: "Govt Scheme"
  },
  {
    acronym: "KAVACH",
    fullForm: "Automatic Train Protection (ATP) System",
    ministry: "Ministry of Railways (RDSO developed)",
    keyFacts: "Indigenous safety system to prevent head-on & rear-end train collisions by automatic brake activation through RFID & radio telemetry.",
    examMnemonic: "KAVACH = Anti-collision train auto-brake system.",
    category: "Defense/Tech"
  },
  {
    acronym: "PARAKH",
    fullForm: "Performance Assessment, Review, and Analysis of Knowledge for Holistic Development",
    ministry: "Ministry of Education (under NCERT)",
    keyFacts: "National assessment center setting uniform evaluation norms and standards across all state & central educational boards in India.",
    examMnemonic: "PARAKH = Standardized Board evaluation benchmark.",
    category: "Education/Health"
  },
  {
    acronym: "PM-POSHAN",
    fullForm: "PM Poshan Shakti Nirman",
    ministry: "Ministry of Education",
    keyFacts: "Renamed Mid-Day Meal scheme covering Balvatika (pre-primary) to Class 8 students with fortified hot cooked meals.",
    examMnemonic: "PM-POSHAN = Hot mid-day meals + Balvatikas.",
    category: "Education/Health"
  },
  {
    acronym: "ONDC",
    fullForm: "Open Network for Digital Commerce",
    ministry: "DPIIT, Ministry of Commerce and Industry",
    keyFacts: "Open-source non-profit network democratizing e-commerce by decoupling buyer and seller platforms (like UPI did for payments).",
    examMnemonic: "ONDC = Open e-commerce network unbundling Amazon/Flipkart monopoly.",
    category: "Economy/Banking"
  },
  {
    acronym: "SPICe+",
    fullForm: "Simplified Proforma for Incorporating Company Electronically Plus",
    ministry: "Ministry of Corporate Affairs (MCA)",
    keyFacts: "Integrated single-window web form offering 10 services (Name, CIN, PAN, TAN, EPFO, ESIC, GSTIN, Bank A/c, Professional Tax).",
    examMnemonic: "SPICe+ = 10 company incorporation services in 1 form.",
    category: "Economy/Banking"
  },
  {
    acronym: "DIKSHA",
    fullForm: "Digital Infrastructure for Knowledge Sharing",
    ministry: "Ministry of Education",
    keyFacts: "National digital platform for school education providing QR-coded textbook e-learning content across 30+ languages.",
    examMnemonic: "DIKSHA = QR code school e-textbooks.",
    category: "Education/Health"
  }
];

// 2. High-Yield Current Affairs Flash Sheet
const CURRENT_AFFAIRS_DATA: CurrentAffairItem[] = [
  {
    headline: "16th Finance Commission Constituted",
    category: "Appointments",
    details: "Headed by Dr. Arvind Panagariya (former Vice-Chairman of NITI Aayog). Recommends tax devolution formula for 2026-2031 (Article 280).",
    examQuestion: "Who is the Chairman of the 16th Finance Commission of India?",
    fastAnswer: "Dr. Arvind Panagariya"
  },
  {
    headline: "Key Military Exercises of India",
    category: "Defense Exercises",
    details: "Mitra Shakti (India-Sri Lanka) • Yudh Abhyas & Vajra Prahar (India-USA) • Garuda Shakti & Samudra Shakti (India-Indonesia) • Dharma Guardian & JIMEX (India-Japan) • Surya Kiran (India-Nepal) • Desert Cyclone (India-UAE) • Varuna & Garuda & Shakti (India-France) • Malabar (QUAD: India, US, Japan, Australia).",
    examQuestion: "'Mitra Shakti' joint military exercise is conducted between India and which country?",
    fastAnswer: "Sri Lanka (Mitra = Sri Lanka; Surya Kiran = Nepal; Yudh Abhyas = USA)"
  },
  {
    headline: "ISRO Space Missions Snapshot",
    category: "Science & Space",
    details: "Aditya-L1 placed at Sun-Earth Lagrange Point 1 (Halo orbit) • Gaganyaan (India's 1st human spaceflight with Vyommitra humanoid) • XPoSat (X-ray Polarimeter Satellite to study black holes & neutron stars) • NISAR (NASA-ISRO SAR earth observatory).",
    examQuestion: "At which Lagrange Point is India's solar observatory 'Aditya-L1' positioned?",
    fastAnswer: "L1 (Lagrange Point 1, ~1.5 million km from Earth)"
  },
  {
    headline: "Grand Slam Tennis Champions Invariants",
    category: "Sports & Awards",
    details: "Order of 4 Grand Slams in a calendar year: Australian Open (Hard court, Jan) -> French Open / Roland Garros (Clay, May-June) -> Wimbledon (Grass, June-July) -> US Open (Hard court, Aug-Sept).",
    examQuestion: "Which Grand Slam tennis tournament is played exclusively on Clay courts?",
    fastAnswer: "French Open (Roland Garros)"
  },
  {
    headline: "Padma Awards & Bharat Ratna Protocol",
    category: "Sports & Awards",
    details: "Bharat Ratna is India's highest civilian honor, followed by Padma Vibhushan (exceptional and distinguished service), Padma Bhushan (distinguished service of high order), and Padma Shri.",
    examQuestion: "What is the correct hierarchical order of Indian civilian awards?",
    fastAnswer: "Bharat Ratna > Padma Vibhushan > Padma Bhushan > Padma Shri"
  },
  {
    headline: "SCO, BRICS, G20 & International Summits",
    category: "Summits",
    details: "BRICS expansion added Egypt, Ethiopia, Iran, UAE, and Saudi Arabia. G20 admitted the African Union (AU) as a permanent member under India's 2023 Presidency.",
    examQuestion: "Which continental bloc became a permanent member of the G20 at the New Delhi Summit?",
    fastAnswer: "African Union (AU - 55 member states)"
  }
];

// 2.5 Master & Monthly PDFs Download Directory
interface PdfDocItem {
  title: string;
  filename: string;
  type: "Master Bible" | "Topic Paper" | "Monthly Current Affairs" | "Speed Guide";
  description: string;
  badge: string;
}

const MASTER_AND_MONTHLY_PDFS: PdfDocItem[] = [
  {
    title: "SSC CGL 200 Marks 50-Page Ultimate Master Bible",
    filename: "SSC_CGL_200_Marks_50_Page_Ultimate_Master_Bible.pdf",
    type: "Master Bible",
    description: "Official 50-page full syllabus compendium with 97 worked exam drills, formulas, and proofs.",
    badge: "50 Pages • Master"
  },
  {
    title: "Topic-Wise ≤5s Question Papers & Speed Shortcuts",
    filename: "SSC_CGL_Topic_Wise_5_Second_Speed_Question_Papers.pdf",
    type: "Topic Paper",
    description: "Rank #1 to lowest weightage topic papers with 5-second shortcuts and optical answers.",
    badge: "50 Topics • High-Yield"
  },
  {
    title: "SSC CGL Master Formula Vault & Practice Bank",
    filename: "SSC_CGL_Master_Formula_Vault_and_Practice_Bank.pdf",
    type: "Master Bible",
    description: "Formula tables across all 4 subjects with exam trap warnings.",
    badge: "Formula Vault"
  },
  {
    title: "October 2026 Current Affairs & Speed Drills",
    filename: "October_2026_Current_Affairs_and_Speed_Drills.pdf",
    type: "Monthly Current Affairs",
    description: "Nobel Prizes 2026, 16th BRICS Summit, LAC border pact, National Unity Day, and ≤5s drills.",
    badge: "Latest • Oct 2026"
  },
  {
    title: "September 2026 Current Affairs & Speed Drills",
    filename: "September_2026_Current_Affairs_and_Speed_Drills.pdf",
    type: "Monthly Current Affairs",
    description: "Paris Paralympics 29 medals, Chandrayaan-4, One Nation One Election, Chess Olympiad double Gold.",
    badge: "Sept 2026"
  },
  {
    title: "August 2026 Current Affairs & Speed Drills",
    filename: "August_2026_Current_Affairs_and_Speed_Drills.pdf",
    type: "Monthly Current Affairs",
    description: "Paris Olympics medals, INS Arighaat commissioning, Bio-RIDE scheme, Central Europe diplomacy.",
    badge: "Aug 2026"
  },
  {
    title: "July 2026 Current Affairs & Speed Drills",
    filename: "July_2026_Current_Affairs_and_Speed_Drills.pdf",
    type: "Monthly Current Affairs",
    description: "Union Budget 2026-27, UNESCO 46th Session (Moidams 43rd site), SSLV commercial qualification.",
    badge: "July 2026"
  },
  {
    title: "June 2026 Current Affairs & Speed Drills",
    filename: "June_2026_Current_Affairs_and_Speed_Drills.pdf",
    type: "Monthly Current Affairs",
    description: "ICC T20 World Cup champions, Tarang Shakti multinational air drill, 50th G7 Summit Apulia.",
    badge: "June 2026"
  },
  {
    title: "May 2026 Current Affairs & Speed Drills",
    filename: "May_2026_Current_Affairs_and_Speed_Drills.pdf",
    type: "Monthly Current Affairs",
    description: "18th Lok Sabha elections, Agnikul 3D-printed rocket launch, SMART missile torpedo system.",
    badge: "May 2026"
  },
  {
    title: "April 2026 Current Affairs & Speed Drills",
    filename: "April_2026_Current_Affairs_and_Speed_Drills.pdf",
    type: "Monthly Current Affairs",
    description: "Navy Chief Admiral Dinesh Tripathi, Exercise Dustlik, World 3rd solar ranking, POEM-3 re-entry.",
    badge: "April 2026"
  },
  {
    title: "March 2026 Current Affairs & Speed Drills",
    filename: "March_2026_Current_Affairs_and_Speed_Drills.pdf",
    type: "Monthly Current Affairs",
    description: "Agni-5 MIRV Mission Divyastra, CAA rules notification, WPL title, Election Commissioners appointed.",
    badge: "March 2026"
  },
  {
    title: "February 2026 Current Affairs & Speed Drills",
    filename: "February_2026_Current_Affairs_and_Speed_Drills.pdf",
    type: "Monthly Current Affairs",
    description: "Interim Budget Rs 11.11L Cr capex, PM-Surya Ghar free solar power, 5 Bharat Ratna awards, Dharma Guardian.",
    badge: "Feb 2026"
  },
  {
    title: "January 2026 Current Affairs & Speed Drills",
    filename: "January_2026_Current_Affairs_and_Speed_Drills.pdf",
    type: "Monthly Current Affairs",
    description: "16th Finance Commission Terms, Desert Cyclone drill, ISRO XPoSat black hole observatory, Australian Open.",
    badge: "Jan 2026"
  },
  {
    title: "Level 1 Instant Speed Kill (1–2s) PDF",
    filename: "SSC_CGL_Level_1_Instant_Kill_1_to_2s.pdf",
    type: "Speed Guide",
    description: "Zero-pen optical property matches for Tier-1.",
    badge: "Level 1 (1-2s)"
  },
  {
    title: "Level 2 Rapid Elimination (2–5s) PDF",
    filename: "SSC_CGL_Level_2_Rapid_Elimination_2_to_5s.pdf",
    type: "Speed Guide",
    description: "Angle substitutions and syntax elimination hooks.",
    badge: "Level 2 (2-5s)"
  },
  {
    title: "Level 3 Condensed Tactics (5–10s) PDF",
    filename: "SSC_CGL_Level_3_Condensed_Tactics_5_to_10s.pdf",
    type: "Speed Guide",
    description: "Two-step algebraic and arithmetic condensed tactics.",
    badge: "Level 3 (5-10s)"
  },
  {
    title: "Ultra-Smart Guessing & Speed Guide PDF",
    filename: "SSC_CGL_Ultra_Smart_Guessing_and_Speed_Conditioning.pdf",
    type: "Speed Guide",
    description: "Mathematical EV proof (+0.75 net marks) and distractor elimination rules.",
    badge: "Meta-Guessing"
  }
];

// 3. Subject-Wise Master Cheats & ≤5s Shortcuts (All 50 Official Topics)
const CHEAT_ITEMS: CheatItem[] = [
  // --- QUANTITATIVE APTITUDE ---
  {
    id: "q-di",
    category: "quant",
    topic: "Data Interpretation",
    rank: 1,
    priority: "Very High",
    title: "Table & Pie Chart Speed Truncation",
    formulaOrRule: "Degree to % Conversion: 1° = (5/18)% = 0.277% | % = (Part / Total) × 100",
    shortcut5s: "Truncate 4-digit numbers to first 2 digits (e.g. 4,182 / 8,391 -> 42 / 84 = 50%). Pre-calculate 1° value from total 360° pie sum.",
    trapWarning: "Examiner places 'raw difference' as Option A when question asked for 'percentage change over base year'.",
    exampleQ: "Production in 2021 was 4,182 units; in 2022 it was 8,391 units. What is the % increase?",
    options: ["A) 95.2%", "B) 100.6%", "C) 105.4%", "D) 110.2%"],
    solution5s: "Truncate to 42 -> 84. Exactly double is +100%. 8391 is slightly over 8364 -> pick 100.6% in 2s.",
    correctAnswer: "B (100.6%)",
    tags: ["Quant", "DI", "Table", "Pie Chart", "Rank 1"]
  },
  {
    id: "q-geom",
    category: "quant",
    topic: "Geometry",
    rank: 2,
    priority: "Very High",
    title: "Incenter, Tangents (DCT/TCT) & Tangent-Secant",
    formulaOrRule: "Incenter ∠BIC = 90° + A/2 | Circumcenter ∠BOC = 2A | Orthocenter ∠BHC = 180° - A | DCT = √[d² - (r1-r2)²] | PT² = PA × PB",
    shortcut5s: "Use Pythagorean Triplets (8-15-17, 5-12-13, 7-24-25). If incenter angle is asked, simply add half the vertex angle to 90°.",
    trapWarning: "Confusing Direct Common Tangent (minus radii) with Transverse Common Tangent (plus radii).",
    exampleQ: "Circles of radii 10cm and 2cm have centers 17cm apart. Length of Direct Common Tangent (DCT) = ?",
    options: ["A) 12 cm", "B) 15 cm", "C) 16 cm", "D) 18 cm"],
    solution5s: "DCT = √[17² - (10-2)²] = √[289 - 64] = √225 = 15 cm (Pythagorean 8-15-17 triplet) in 2s.",
    correctAnswer: "B (15 cm)",
    tags: ["Quant", "Geometry", "Circles", "Triangles", "Incenter", "Rank 2"]
  },
  {
    id: "q-mens",
    category: "quant",
    topic: "Mensuration 2D/3D",
    rank: 3,
    priority: "Very High",
    title: "The π 11-Divisibility Filter & Recasting",
    formulaOrRule: "Cone CSA = πrl | Cylinder TSA = 2πr(r+h) | Sphere Vol = (4/3)πr³ | Recast N = (R / r)³",
    shortcut5s: "The π 11-Divisibility Filter: In any circle/cone/cylinder problem, test options for 11-divisibility: |(Odd Sum) - (Even Sum)| = 0 or 11k.",
    trapWarning: "Examiner places the radius or height as Option A when total surface area is requested.",
    exampleQ: "Find Curved Surface Area of cone with radius 14 cm and slant height 25 cm. [CSA = πrl]",
    options: ["A) 1,090 cm²", "B) 1,100 cm²", "C) 1,115 cm²", "D) 1,120 cm²"],
    solution5s: "Test Option B (1100): (1+0) - (1+0) = 0. Divisible by 11. Only B passes in 1s.",
    correctAnswer: "B (1,100 cm²)",
    tags: ["Quant", "Mensuration", "11 Divisibility", "Cone", "Cylinder", "Rank 3"]
  },
  {
    id: "q-trig",
    category: "quant",
    topic: "Trigonometry",
    rank: 4,
    priority: "High",
    title: "Angle Pinning (45°/90°) & Complementary Product Lock",
    formulaOrRule: "When A + B = 90° => tan A · tan B = 1, sin²A + sin²B = 1 | Tower Height H = √(a · b)",
    shortcut5s: "Angle Pinning: Tan/Cot equations -> put θ = 45°; Sin/Cos fractions -> put θ = 90° or 0°.",
    trapWarning: "Plugging an angle that makes any denominator 0 (e.g. θ = 90° in tan θ or sec θ).",
    exampleQ: "Find value of: sin² 25° + sin² 65° + tan 35° · tan 55°.",
    options: ["A) 1", "B) 2", "C) 0", "D) √2"],
    solution5s: "Complementary Pairs: sin²25°+sin²65° = 1 and tan 35°·tan 55° = 1. Value = 1 + 1 = 2 in 1s.",
    correctAnswer: "B (2)",
    tags: ["Quant", "Trigonometry", "Angle Pinning", "Complementary", "Rank 4"]
  },
  {
    id: "q-pld",
    category: "quant",
    topic: "Profit, Loss & Discount",
    rank: 5,
    priority: "High",
    title: "MP/CP Single-Step Ratio & Faulty Weights",
    formulaOrRule: "MP / CP = (100 + Profit %) / (100 - Discount %) | Dishonest Profit % = [(True - False) / False] × 100",
    shortcut5s: "Single-step MP/CP: MP = CP × (100+P)/(100-D). Buy X Get Y Free -> Discount = Free / (Bought + Free).",
    trapWarning: "In dishonest dealer, dividing by 1000g instead of the false weight (800g).",
    exampleQ: "A merchant gives 10% discount on MP and earns 20% profit. If CP = Rs 450, what is MP?",
    options: ["A) Rs 540", "B) Rs 600", "C) Rs 650", "D) Rs 700"],
    solution5s: "MP / 450 = 120 / 90 = 4 / 3 => MP = 450 × (4/3) = Rs 600 in 2s.",
    correctAnswer: "B (Rs 600)",
    tags: ["Quant", "Profit Loss", "Discount", "MP/CP", "Rank 5"]
  },
  {
    id: "q-alg",
    category: "quant",
    topic: "Algebra",
    rank: 9,
    priority: "Medium",
    title: "x + 1/x Power Ladder & a+b+c=0 Invariants",
    formulaOrRule: "x² + 1/x² = k² - 2 | x³ + 1/x³ = k³ - 3k | x⁴ + 1/x⁴ = (k²-2)² - 2 | If a+b+c=0 => a³+b³+c³ = 3abc",
    shortcut5s: "Power Ladder: Cube is k³ - 3k; Square is k² - 2. In cyclical a+b+c=0 fractions, value is always invariant = 3.",
    trapWarning: "Forgetting to subtract 3k in cube formula (e.g. choosing 3³ = 27 instead of 27-9=18).",
    exampleQ: "If x + 1/x = 3, find x³ + 1/x³.",
    options: ["A) 18", "B) 27", "C) 24", "D) 21"],
    solution5s: "k³ - 3k = 3³ - 3(3) = 27 - 9 = 18 in 1s.",
    correctAnswer: "A (18)",
    tags: ["Quant", "Algebra", "Power Ladder", "Identities", "Rank 9"]
  },
  {
    id: "q-pct",
    category: "quant",
    topic: "Percentages",
    rank: 14,
    priority: "Low",
    title: "The AB Fraction Ladder Theorem",
    formulaOrRule: "Price Rise = +a/b => Consumption Reduction = -a / (a + b) | Net = [ x + y + xy/100 ] %",
    shortcut5s: "Fraction conversions: +25% (+1/4) -> -1/5 (20%); +50% (+1/2) -> -1/3 (33.33%); -20% (-1/5) -> +1/4 (25%).",
    trapWarning: "Applying the same percentage for reduction as the increase.",
    exampleQ: "If petrol price increases by 25%, by what % must consumption drop for constant expenditure?",
    options: ["A) 25%", "B) 20%", "C) 16.66%", "D) 30%"],
    solution5s: "+1/4 increase => -1/(4+1) = -1/5 = 20% drop in 1s.",
    correctAnswer: "B (20%)",
    tags: ["Quant", "Percentages", "AB Ladder", "Rank 14"]
  },

  // --- GENERAL INTELLIGENCE & REASONING ---
  {
    id: "r-cd",
    category: "reasoning",
    topic: "Coding-Decoding",
    rank: 1,
    priority: "Very High",
    title: "Sum-27 Opposite Letters Inversion",
    formulaOrRule: "Opposite alphabet letters sum to 27: A(1)+Z(26)=27, B(2)+Y(25)=27, L(12)+O(15)=27, E(5)+V(22)=27, M(13)+N(14)=27.",
    shortcut5s: "Memorize pairs: AZ, BY, CX, DW, EV, FU, GT, HS, IR, JQ, KP, LO, MN. Scan first and last letters of decoded options.",
    trapWarning: "Standard forward alphabetical shifts when the pattern is actually Sum-27 opposites.",
    exampleQ: "If 'KING' is coded as 'PRMT', how is 'LOVE' coded?",
    options: ["A) OLEV", "B) OLVE", "C) OLEW", "D) OLVE"],
    solution5s: "Opposites: L->O, O->L, V->E, E->V => OLEV in 1s.",
    correctAnswer: "A (OLEV)",
    tags: ["Reasoning", "Coding Decoding", "Sum 27", "Rank 1"]
  },
  {
    id: "r-syl",
    category: "reasoning",
    topic: "Syllogisms",
    rank: 3,
    priority: "High",
    title: "The 100-50 Tick-Cross Method (Zero Venn Diagrams)",
    formulaOrRule: "All = 100/50 | No = 100/100 | Some = 50/50 | Pos + Pos = POSITIVE | Neg + Neg = NO CONCLUSION | Complementary = Either/Or",
    shortcut5s: "Rule of Distribution: 100 can give 50; 50 CANNOT give 100. Positive premises cannot yield a negative conclusion.",
    trapWarning: "Drawing 4 overlapping Venn circles and losing 2 minutes.",
    exampleQ: "Statements: All Tables are Desks. All Desks are Benches. Conclusions: I. All Tables are Benches. II. Some Benches are Tables.",
    options: ["A) Only I follows", "B) Only II follows", "C) Both I and II follow", "D) Neither follows"],
    solution5s: "Positive + Positive = Positive. Tables (100) -> Benches (50). Both conclusions valid in 2s.",
    correctAnswer: "C (Both follow)",
    tags: ["Reasoning", "Syllogisms", "100-50 Method", "Rank 3"]
  },
  {
    id: "r-dc",
    category: "reasoning",
    topic: "Dice & Cube",
    rank: 8,
    priority: "Medium",
    title: "2-Matching Cancellation & Open Net Alternate Skip",
    formulaOrRule: "2 Matching Faces: If 2 positions share 2 numbers => third faces are opposites | Open Net: Alternate boxes in a straight line are opposite.",
    shortcut5s: "'Kill the twins, the lonely wins'. In unfolded net, skip 1 box to find opposite.",
    trapWarning: "Mentally rotating a 3D cube in your head instead of canceling matching digits.",
    exampleQ: "View 1: (4, 1, 6). View 2: (4, 1, 3). What number is opposite 6?",
    options: ["A) 2", "B) 3", "C) 5", "D) 1"],
    solution5s: "Cancel common 4 and 1 on both views => 6 is opposite 3 in 1s.",
    correctAnswer: "B (3)",
    tags: ["Reasoning", "Dice", "Cube", "Cancellation", "Rank 8"]
  },

  // --- ENGLISH COMPREHENSION ---
  {
    id: "e-vap",
    category: "english",
    topic: "Active & Passive Voice",
    rank: 2,
    priority: "Very High",
    title: "Voice Tense-Immunity Rule",
    formulaOrRule: "Active to Passive NEVER changes tense: Past Simple (V2) -> was/were + V3 | Present Perfect (has/have + V3) -> has/have been + V3.",
    shortcut5s: "Scan verbs only! Do NOT read the whole sentence. Eliminate options that change tense or drop 'been'/'being'.",
    trapWarning: "Changing 'has/have' to 'had' (confusing Voice with Narration).",
    exampleQ: "Select passive: 'The mechanic repaired the car yesterday.'",
    options: ["A) The car is repaired.", "B) The car was repaired by the mechanic yesterday.", "C) The car had been repaired.", "D) The car has been repaired."],
    solution5s: "V2 (repaired) MUST become was/were + V3. Option B is the only 'was repaired' in 1s.",
    correctAnswer: "B",
    tags: ["English", "Active Passive", "Tense Immunity", "Rank 2"]
  },
  {
    id: "e-nar",
    category: "english",
    topic: "Direct & Indirect Speech",
    rank: 2,
    priority: "Very High",
    title: "Said-Backshift & Assertive Word Order",
    formulaOrRule: "Said + Will -> WOULD | Said + Present -> Past | Tomorrow -> The next day | Interrogative becomes Assertive (Subject before Verb).",
    shortcut5s: "Search for 'would' / 'the next day' and verify assertive word order (e.g. 'where I was', NOT 'where was I').",
    trapWarning: "Keeping question word order 'where was I' in indirect speech.",
    exampleQ: "Rahul said, 'I will call you tomorrow.'",
    options: ["A) Rahul said that he will call me.", "B) Rahul said that he would call me the next day.", "C) Rahul said that he should call me.", "D) Rahul said that he can call me."],
    solution5s: "Said + Will -> WOULD; tomorrow -> the next day. Option B in 1s.",
    correctAnswer: "B",
    tags: ["English", "Narration", "Said Backshift", "Rank 2"]
  },
  {
    id: "e-grm",
    category: "english",
    topic: "Error Spotting & Grammar",
    rank: 9,
    priority: "Low-Medium",
    title: "Preposition Fluff Cloak & Subjunctive 'Were'",
    formulaOrRule: "Blindfold 'of / with / along with' phrases to match root Subject to Verb | Hypothetical wishes ALWAYS take 'WERE'.",
    shortcut5s: "Ignore prepositional phrases between subject and verb. Check correlatives: Hardly...when, No sooner...than, Lest...should.",
    trapWarning: "Matching the verb to the nearest plural noun inside a prepositional phrase.",
    exampleQ: "Find error: 'The introduction of tea, coffee and other beverages have not been without effect.'",
    options: ["A) The introduction of", "B) tea, coffee and other", "C) have not been", "D) without effect"],
    solution5s: "Blindfold 'of tea, coffee...'. Root subject is 'introduction' (singular) => requires 'HAS not been'. Error in C.",
    correctAnswer: "C (have not been)",
    tags: ["English", "Grammar", "Subject Verb", "Subjunctive", "Rank 9"]
  },

  // --- GENERAL AWARENESS ---
  {
    id: "ga-pol",
    category: "ga",
    topic: "Indian Polity",
    rank: 4,
    priority: "High",
    title: "The +89 & +90 Center-to-State Article Invariant Rules",
    formulaOrRule: "Central Article (72 to 111) + 89 = State Article | Central Article (112 to 124) + 90 = State Article",
    shortcut5s: "President Pardon 72 + 89 = Governor Pardon 161 | AG of India 76 + 89 = Advocate Gen 165 | Union Budget 112 + 90 = State Budget 202.",
    trapWarning: "Attempting to memorize all 395 constitutional articles separately.",
    exampleQ: "If Article 76 provides for Attorney General of India, which Article provides for Advocate General of State?",
    options: ["A) Article 153", "B) Article 165", "C) Article 167", "D) Article 170"],
    solution5s: "76 + 89 = Article 165 in 1s.",
    correctAnswer: "B (Article 165)",
    tags: ["Polity", "Constitutional Articles", "+89 Rule", "Rank 4"]
  },
  {
    id: "ga-his",
    category: "ga",
    topic: "History Chronology",
    rank: 2,
    priority: "Very High",
    title: "Delhi Sultanate S-K-T-S-L & Mughal B-H-A-J-S-A",
    formulaOrRule: "Delhi Sultanate: Slave (1206) -> Khilji (1290) -> Tughlaq (1320) -> Sayyid (1414) -> Lodi (1451) | Mughal: Babur -> Humayun -> Akbar -> Jahangir -> Shah Jahan -> Aurangzeb",
    shortcut5s: "Mnemonic S-K-T-S-L and B-H-A-J-S-A lock chronology instantly.",
    trapWarning: "Confusing Sayyid and Lodi order.",
    exampleQ: "Which dynasty ruled Delhi Sultanate immediately after the Khilji dynasty?",
    options: ["A) Slave Dynasty", "B) Tughlaq Dynasty", "C) Sayyid Dynasty", "D) Lodi Dynasty"],
    solution5s: "S-K-T-S-L => After K (Khilji) comes T (Tughlaq) in 1s.",
    correctAnswer: "B (Tughlaq Dynasty)",
    tags: ["History", "Delhi Sultanate", "Mughals", "Chronology", "Rank 2"]
  },
  {
    id: "ga-sci",
    category: "ga",
    topic: "General Science",
    rank: 8,
    priority: "Low-Medium",
    title: "Medical Anatomical Root Prefixes & Vitamins",
    formulaOrRule: "Nephro = Kidney | Hepato = Liver | Pneumo = Lungs | Cardio = Heart | Osteo = Bone | Vitamin B1 = Thiamine | Vitamin C = Ascorbic Acid",
    shortcut5s: "Anatomical Greek roots map directly to target organs in 1s.",
    trapWarning: "Confusing Vitamin A (Retinol) with Vitamin B1 (Thiamine).",
    exampleQ: "Which organ is affected in 'Nephritis'?",
    options: ["A) Liver", "B) Kidney", "C) Lungs", "D) Heart"],
    solution5s: "Nephro = Kidney => Nephritis affects Kidney in 1s.",
    correctAnswer: "B (Kidney)",
    tags: ["Science", "Biology", "Medical Roots", "Vitamins", "Rank 8"]
  },
  {
    id: "ga-cul",
    category: "ga",
    topic: "Art & Culture",
    rank: 5,
    priority: "High",
    title: "Classical Dance Maestros Surname Rule",
    formulaOrRule: "Maharaj (Birju, Lachhu) = KATHAK (UP) | Reddy = KUCHIPUDI (AP) | Mohapatra = ODISSI (Odisha) | Sadasivam / Balasaraswati = BHARATANATYAM (TN)",
    shortcut5s: "Scan performer's surname first. Maharaj -> Kathak; Reddy -> Kuchipudi; Mohapatra -> Odissi.",
    trapWarning: "Confusing Kathak (North India / UP) with Kathakali (Kerala).",
    exampleQ: "Padma Vibhushan Birju Maharaj is a renowned exponent of which classical dance form?",
    options: ["A) Kathakali", "B) Kathak", "C) Bharatanatyam", "D) Odissi"],
    solution5s: "Surname Maharaj => KATHAK in 1s.",
    correctAnswer: "B (Kathak)",
    tags: ["Culture", "Classical Dance", "Maestros", "Rank 5"]
  },

  // --- SUPER-IMPORTANT FATAL BLINDSPOTS (TOPPERS SECRETS) ---
  {
    id: "blind-sophie",
    category: "blindspots",
    topic: "Algebra Sophie Germain Identity",
    rank: 1,
    priority: "Very High",
    title: "x⁴ + x²y² + y⁴ = (x² + xy + y²)(x² - xy + y²)",
    formulaOrRule: "If x² + xy + y² = A and x² - xy + y² = B => x² + y² = (A + B)/2 and xy = (A - B)/2 | Product = A · B",
    shortcut5s: "Zero manual factorization! A = Product / B. Then x² + y² is average of A & B; xy is half the difference.",
    trapWarning: "Trying to solve for x and y individually using long quadratic roots.",
    exampleQ: "If x⁴ + x²y² + y⁴ = 21 and x² + xy + y² = 7, find the value of (x² + y²).",
    options: ["A) 4", "B) 5", "C) 6", "D) 7"],
    solution5s: "B = 21 / 7 = 3. x² + y² = (7 + 3) / 2 = 5 in 1s.",
    correctAnswer: "B (5)",
    tags: ["Blindspots", "Algebra", "Sophie Germain", "High Trap", "Must Know"]
  },
  {
    id: "blind-ci-8m",
    category: "blindspots",
    topic: "Compound Interest 8-Monthly / 10-Monthly",
    rank: 1,
    priority: "Very High",
    title: "Rate & Time Scaling for Fractional Compounding",
    formulaOrRule: "Compounded 'k-monthly' => Effective Rate R' = R × (k / 12) | Number of Periods n = Total Months / k",
    shortcut5s: "2 Years = 24 months. 8-Monthly => n = 24 / 8 = 3 periods. If R = 15% p.a. => R' = 15 × (8/12) = 10%. Standard 3-year 10% CI multiplier = 1.331.",
    trapWarning: "Dividing rate by 8 or multiplying time by 8 without 12-month normalization.",
    exampleQ: "What is CI on Rs 12,000 for 2 years at 15% p.a., compounded 8-monthly?",
    options: ["A) Rs 3,600", "B) Rs 3,972", "C) Rs 4,200", "D) Rs 4,500"],
    solution5s: "n = 24/8 = 3 periods. R' = 15 × (8/12) = 10%. 3-period 10% CI = 33.1%. CI = 12000 × 0.331 = Rs 3,972 in 3s.",
    correctAnswer: "B (Rs 3,972)",
    tags: ["Blindspots", "Compound Interest", "8 Monthly", "High Trap", "Must Know"]
  },
  {
    id: "blind-geom-apollonius",
    category: "blindspots",
    topic: "Geometry Apollonius Theorem (Medians)",
    rank: 2,
    priority: "Very High",
    title: "Median Length & 4/3 Ratio Invariant",
    formulaOrRule: "In ΔABC, if AD is median to BC => AB² + AC² = 2(AD² + BD²) | Sum of Squares of Sides = 4/3 × (Sum of Squares of Medians)",
    shortcut5s: "Direct substitution: 2(AD² + (BC/2)²). Sum of 3 medians squared is ALWAYS 3/4 of sum of 3 sides squared.",
    trapWarning: "Confusing median with angle bisector or altitude.",
    exampleQ: "In ΔABC, AB = 6 cm, AC = 8 cm, and median AD = 5 cm. What is the length of side BC?",
    options: ["A) 8 cm", "B) 10 cm", "C) 12 cm", "D) 14 cm"],
    solution5s: "6² + 8² = 2(5² + BD²) => 100 = 2(25 + BD²) => 50 = 25 + BD² => BD² = 25 => BD = 5 => BC = 10 cm in 2s.",
    correctAnswer: "B (10 cm)",
    tags: ["Blindspots", "Geometry", "Apollonius", "Medians", "Must Know"]
  },
  {
    id: "blind-tsd-breakdown",
    category: "blindspots",
    topic: "Time Speed Distance Train Breakdown",
    rank: 1,
    priority: "Very High",
    title: "Shifted Breakdown Distance-Delta Shortcut",
    formulaOrRule: "Normal Speed = (Shifted Distance ΔD) / [ Normal Time Difference = Delay Difference × (S_original / (S_original - S_reduced)) ]",
    shortcut5s: "If 24 km further saves (40 - 28) = 12 min late with speed 3/4 (time 4:3, 1 unit diff) => normal time for 24 km = 3 × 12 = 36 min = 3/5 hr => Speed = 24 / (3/5) = 40 km/h.",
    trapWarning: "Setting up 4 simultaneous linear equations with distance D and speed S.",
    exampleQ: "A train meets with an accident 50km from start and runs at 3/4 speed, reaching 40 min late. Had it happened 24km further, it would be 28 min late. Find normal speed.",
    options: ["A) 36 km/h", "B) 40 km/h", "C) 45 km/h", "D) 48 km/h"],
    solution5s: "24 km saves 12 min. Speed 3/4 => Time 4/3 (diff = 1 unit = 12 min). Normal time = 36 min = 0.6 hr. Speed = 24 / 0.6 = 40 km/h in 3s.",
    correctAnswer: "B (40 km/h)",
    tags: ["Blindspots", "TSD", "Train Breakdown", "High Trap", "Must Know"]
  },
  {
    id: "blind-eng-dangling",
    category: "blindspots",
    topic: "English Dangling Participle & Inversion",
    rank: 1,
    priority: "Very High",
    title: "Dangling Participle & Negative Inversion Reflex",
    formulaOrRule: "Introductory participial phrase MUST modify the grammatical subject immediately following comma | Negative adverb opener (Hardly/Seldom/Rarely) MUST invert: Adverb + Aux Verb + Subject",
    shortcut5s: "Scan sentence openers: 'Walking in the park, a snake bit him' is WRONG (snake wasn't walking). 'Seldom WE see' is WRONG ('Seldom DO WE see').",
    trapWarning: "Failing to notice that the subject following the comma cannot perform the participle action.",
    exampleQ: "Find error: 'Seldom we have seen such courage in the face of adversity.'",
    options: ["A) Seldom we have", "B) seen such courage", "C) in the face of", "D) adversity"],
    solution5s: "Negative adverb 'Seldom' opening sentence requires INVERSION: 'Seldom HAVE WE seen'. Error in A in 1s.",
    correctAnswer: "A (Seldom we have)",
    tags: ["Blindspots", "English", "Inversion", "Dangling Participle", "Must Know"]
  },
  {
    id: "blind-eng-only-one",
    category: "blindspots",
    topic: "English 'One of the' vs 'The ONLY ONE of the'",
    rank: 2,
    priority: "Very High",
    title: "Relative Pronoun Verb Agreement Split",
    formulaOrRule: "'One of the + Plural Noun + Who/Which' => PLURAL VERB | 'The ONLY ONE of the + Plural Noun + Who/Which' => SINGULAR VERB",
    shortcut5s: "Check if the word 'ONLY' appears before 'one of the'. 'ONLY' locks singular verb (HAS/IS/WAS); without 'only', verb is plural (HAVE/ARE/WERE).",
    trapWarning: "Always choosing singular verb without checking relative pronoun.",
    exampleQ: "Find error: 'He is the only one of the candidates who have qualified the physical test.'",
    options: ["A) He is the only one", "B) of the candidates", "C) who have qualified", "D) the physical test"],
    solution5s: "'THE ONLY ONE' forces singular agreement on relative clause => requires 'who HAS qualified'. Error in C in 1s.",
    correctAnswer: "C (who have qualified)",
    tags: ["Blindspots", "English", "Subject Verb Agreement", "High Trap", "Must Know"]
  },
  {
    id: "blind-pol-writs",
    category: "blindspots",
    topic: "Polity 5 Writs & Scope (Article 32 & 226)",
    rank: 1,
    priority: "Very High",
    title: "Writs Latin Meaning & Target Scope",
    formulaOrRule: "Habeas Corpus (To have the body - public & private) | Mandamus (We command - public duty only) | Prohibition (Preventive) | Certiorari (To be certified - Curative & Preventive) | Quo-Warranto (By what authority - public office)",
    shortcut5s: "Only 'Habeas Corpus' can be issued against private individuals! 'Mandamus' CANNOT be issued against the President or Governors.",
    trapWarning: "Assuming Mandamus can be issued against private companies or the President.",
    exampleQ: "Which constitutional writ can be issued against BOTH public authorities and private individuals?",
    options: ["A) Mandamus", "B) Habeas Corpus", "C) Quo-Warranto", "D) Certiorari"],
    solution5s: "Only Habeas Corpus applies to illegal detention by private or public bodies. Option B in 1s.",
    correctAnswer: "B (Habeas Corpus)",
    tags: ["Blindspots", "Polity", "Writs", "Article 32", "Must Know"]
  },
  {
    id: "blind-pol-tears",
    category: "blindspots",
    topic: "Polity 12 Schedules (TEARS OF OLD PM)",
    rank: 2,
    priority: "Very High",
    title: "Mnemonic TEARS OF OLD PM & Language Amendments",
    formulaOrRule: "T=Territory(1), E=Emoluments(2), A=Affirmation(3), R=Rajya Sabha(4), S=Scheduled Areas(5), O=Other Tribes AMTM(6), F=Federal Lists(7), O=Official Languages(8), L=Land Reforms(9), D=Defection(10), P=Panchayat(11), M=Municipality(12)",
    shortcut5s: "Language amendments: 21st (Sindhi), 71st (Konkani, Manipuri, Nepali - KMN), 92nd (Bodo, Dogri, Maithili, Santhali - BDMS).",
    trapWarning: "Confusing 5th Schedule (general tribal areas) with 6th Schedule (AMTM states: Assam, Meghalaya, Tripura, Mizoram).",
    exampleQ: "Which Amendment added Bodo, Dogri, Maithili, and Santhali (BDMS) to the 8th Schedule?",
    options: ["A) 21st Amendment", "B) 71st Amendment", "C) 92nd Amendment", "D) 103rd Amendment"],
    solution5s: "92nd Amendment (2003) added BDMS (19 to 22) in 1s.",
    correctAnswer: "C (92nd Amendment)",
    tags: ["Blindspots", "Polity", "Schedules", "Amendments", "Must Know"]
  }
];

export default function SscCglPortal() {
  const [activeTab, setActiveTab] = useState<Category>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Drill Mode state
  const [drillActive, setDrillActive] = useState(false);
  const [currentDrillIndex, setCurrentDrillIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showDrillAnswer, setShowDrillAnswer] = useState(false);
  const [drillTimer, setDrillTimer] = useState(5);
  const [drillScore, setDrillScore] = useState(0);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filtered Cheats
  const filteredCheats = useMemo(() => {
    return CHEAT_ITEMS.filter((item) => {
      const matchesCategory = activeTab === "all" || item.category === activeTab;
      const matchesSearch =
        searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.formulaOrRule.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortcut5s.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  // Filtered Acronyms
  const filteredAcronyms = useMemo(() => {
    if (activeTab !== "all" && activeTab !== "acronyms") return [];
    return ACRONYMS_DATA.filter((item) => {
      return (
        searchQuery === "" ||
        item.acronym.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.fullForm.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ministry.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.keyFacts.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [activeTab, searchQuery]);

  // Filtered Current Affairs
  const filteredCurrentAffairs = useMemo(() => {
    if (activeTab !== "all" && activeTab !== "current_affairs") return [];
    return CURRENT_AFFAIRS_DATA.filter((item) => {
      return (
        searchQuery === "" ||
        item.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.fastAnswer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [activeTab, searchQuery]);

  // Drill questions list
  const drillQuestions = CHEAT_ITEMS;

  const startDrill = () => {
    setDrillActive(true);
    setCurrentDrillIndex(0);
    setSelectedOption(null);
    setShowDrillAnswer(false);
    setDrillScore(0);
  };

  const handleDrillChoice = (opt: string) => {
    if (showDrillAnswer) return;
    setSelectedOption(opt);
    setShowDrillAnswer(true);
    const currQ = drillQuestions[currentDrillIndex];
    if (opt.startsWith(currQ.correctAnswer[0])) {
      setDrillScore((prev) => prev + 1);
    }
  };

  const nextDrillQuestion = () => {
    if (currentDrillIndex < drillQuestions.length - 1) {
      setCurrentDrillIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowDrillAnswer(false);
    } else {
      // Completed drill
      setDrillActive(false);
      alert(`Speed Drill Complete! You scored ${drillScore} / ${drillQuestions.length} in ≤5-second reflexes.`);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090E] text-slate-100 font-sans selection:bg-indigo-600 selection:text-white pb-24">
      {/* Top Banner & Header */}
      <header className="relative border-b border-slate-800/80 bg-gradient-to-b from-[#10101C] to-[#09090E] pt-8 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                Mission 200/200 &bull; Official High-Target Speed Portal
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
                SSC CGL Master Speed & Cheat Portal
                <span className="text-xs bg-indigo-600/30 text-indigo-400 border border-indigo-500/30 px-2 py-0.5 rounded">
                  Live on agnaa.in
                </span>
              </h1>
              <p className="mt-1 text-sm sm:text-base text-slate-400 max-w-3xl">
                Every official topic equipped with <b className="text-slate-200">&le;5-Second Shortcuts</b>, Mathematical Invariants, Government Scheme Acronyms, and TCS Distractor Traps. Prepare from anywhere on any device.
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={startDrill}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-semibold shadow-lg shadow-emerald-950/40 transition-all transform active:scale-95"
              >
                <Zap className="w-4 h-4 text-amber-300" />
                Start &le;5s Speed Drill
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3">
              <span className="text-xs text-slate-400 font-medium">Exam Target Score</span>
              <div className="text-lg font-bold text-emerald-400">180+ to 200 / 200</div>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3">
              <span className="text-xs text-slate-400 font-medium">Max Speed per Question</span>
              <div className="text-lg font-bold text-amber-400">&le; 5 Seconds</div>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3">
              <span className="text-xs text-slate-400 font-medium">Govt Acronyms Loaded</span>
              <div className="text-lg font-bold text-indigo-400">16+ Core Schemes</div>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3">
              <span className="text-xs text-slate-400 font-medium">Total Syllabus Topics</span>
              <div className="text-lg font-bold text-teal-400">50 Official Topics</div>
            </div>
          </div>

          {/* Search & Navigation Bar */}
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search formulas, shortcuts, acronyms (e.g. 'PM-KISAN', 'Incenter', 'Sum-27', 'Fermat', 'Maharaj')..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-1.5 py-0.5 rounded bg-slate-800"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
              {(
                [
                  { id: "all", label: "All Weapons" },
                  { id: "monthly_pdfs", label: "📥 Monthly & Master PDFs" },
                  { id: "blindspots", label: "🚨 Fatal Blindspots" },
                  { id: "acronyms", label: "Govt Acronyms" },
                  { id: "current_affairs", label: "Current Affairs" },
                  { id: "quant", label: "Quant (17)" },
                  { id: "reasoning", label: "Reasoning (15)" },
                  { id: "english", label: "English (9)" },
                  { id: "ga", label: "General Awareness (9)" }
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/50"
                      : "bg-slate-900/80 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* SPEED DRILL MODAL (IF ACTIVE) */}
        {drillActive && (
          <div className="mb-10 bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-950 border-2 border-emerald-500/40 rounded-2xl p-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-xs">
                  SPEED DRILL #{currentDrillIndex + 1} of {drillQuestions.length}
                </span>
                <span className="text-xs text-slate-400">Target Speed: &le;5 Seconds</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-emerald-400 font-bold">Score: {drillScore}</span>
                <button
                  onClick={() => setDrillActive(false)}
                  className="text-xs text-slate-400 hover:text-white underline"
                >
                  Exit Drill
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-base sm:text-lg font-bold text-white">
                {drillQuestions[currentDrillIndex].exampleQ}
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {drillQuestions[currentDrillIndex].options?.map((opt, i) => {
                  const isSelected = selectedOption === opt;
                  const isCorrect = opt.startsWith(drillQuestions[currentDrillIndex].correctAnswer[0]);
                  let btnStyle = "bg-slate-900/90 border-slate-700 hover:border-slate-500 text-slate-200";
                  if (showDrillAnswer) {
                    if (isCorrect) {
                      btnStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold";
                    } else if (isSelected && !isCorrect) {
                      btnStyle = "bg-rose-950/80 border-rose-500 text-rose-300";
                    }
                  }

                  return (
                    <button
                      key={i}
                      disabled={showDrillAnswer}
                      onClick={() => handleDrillChoice(opt)}
                      className={`p-3 rounded-xl border text-left text-sm transition-all ${btnStyle}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Answer Explanation */}
              {showDrillAnswer && (
                <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 space-y-2 mt-4 animate-in fade-in">
                  <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Correct Answer: {drillQuestions[currentDrillIndex].correctAnswer}
                  </div>
                  <div className="text-xs text-slate-300">
                    <b className="text-amber-300">&le;5s Shortcut:</b> {drillQuestions[currentDrillIndex].solution5s}
                  </div>
                  <div className="text-xs text-rose-300">
                    <b className="text-rose-400">Examiner Trap:</b> {drillQuestions[currentDrillIndex].trapWarning}
                  </div>
                  <button
                    onClick={nextDrillQuestion}
                    className="mt-3 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all"
                  >
                    {currentDrillIndex < drillQuestions.length - 1 ? "Next Drill Question ->" : "Finish Drill"}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 0. MASTER & MONTHLY PDF DOWNLOADS SECTION */}
        {(activeTab === "all" || activeTab === "monthly_pdfs") && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Download className="w-5 h-5 text-indigo-400" />
                Monthly &amp; Master PDF Vault (Direct Download &bull; 100% Free)
              </h2>
              <span className="text-xs text-slate-400 font-medium">{MASTER_AND_MONTHLY_PDFS.length} Offline Compendiums</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {MASTER_AND_MONTHLY_PDFS.map((pdf, idx) => (
                <div
                  key={idx}
                  className="bg-[#12121E] border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-4 transition-all hover:shadow-xl hover:shadow-indigo-950/20 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                        pdf.type === "Master Bible"
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          : pdf.type === "Monthly Current Affairs"
                          ? "bg-teal-500/20 text-teal-300 border border-teal-500/30"
                          : "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                      }`}>
                        {pdf.badge}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">.PDF</span>
                    </div>
                    <h3 className="text-sm font-bold text-white mt-2 leading-snug">{pdf.title}</h3>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{pdf.description}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <a
                      href={`/api/ssc-cgl-pdfs/${pdf.filename}`}
                      download={pdf.filename}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-950/40 transition-all active:scale-95"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download PDF
                    </a>
                    <a
                      href={`/api/ssc-cgl-pdfs/${pdf.filename}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-slate-400 hover:text-white underline font-medium"
                    >
                      Open in Browser &rarr;
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 1. GOVERNMENT SCHEMES & ACRONYMS SECTION */}
        {(activeTab === "all" || activeTab === "acronyms") && filteredAcronyms.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                Government Schemes &amp; High-Frequency Acronyms
              </h2>
              <span className="text-xs text-slate-400 font-medium">{filteredAcronyms.length} High-Yield Schemes</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredAcronyms.map((ac, idx) => (
                <div
                  key={idx}
                  className="bg-[#12121E] border border-slate-800/90 hover:border-indigo-500/40 rounded-2xl p-4 transition-all hover:shadow-xl hover:shadow-indigo-950/20"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-xs font-bold">
                        {ac.category}
                      </span>
                      <h3 className="text-lg font-extrabold text-white mt-1 flex items-center gap-2">
                        {ac.acronym}
                      </h3>
                      <p className="text-xs text-amber-300/90 font-semibold">{ac.fullForm}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(`${ac.acronym} - ${ac.fullForm}: ${ac.keyFacts}`, `ac-${idx}`)}
                      className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all text-xs"
                      title="Copy Acronym Facts"
                    >
                      {copiedId === `ac-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div className="mt-3 space-y-1.5 text-xs text-slate-300 border-t border-slate-800/60 pt-2.5">
                    <p>
                      <b className="text-slate-400">Nodal Ministry:</b> {ac.ministry}
                    </p>
                    <p>
                      <b className="text-slate-400">Core Provisions:</b> {ac.keyFacts}
                    </p>
                    <div className="p-2 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-emerald-300 font-medium mt-2">
                      <b className="text-emerald-400">1-Second Mnemonic:</b> {ac.examMnemonic}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 2. CURRENT AFFAIRS MASTER FLASH SHEET */}
        {(activeTab === "all" || activeTab === "current_affairs") && filteredCurrentAffairs.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-teal-400" />
                Current Affairs &amp; Static GK Quick Flash Sheet
              </h2>
              <span className="text-xs text-slate-400 font-medium">{filteredCurrentAffairs.length} Focus Areas</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCurrentAffairs.map((ca, idx) => (
                <div
                  key={idx}
                  className="bg-[#12121E] border border-slate-800/90 hover:border-teal-500/40 rounded-2xl p-4 transition-all hover:shadow-xl hover:shadow-teal-950/20"
                >
                  <span className="px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 text-xs font-bold">
                    {ca.category}
                  </span>
                  <h3 className="text-base font-bold text-white mt-1.5">{ca.headline}</h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">{ca.details}</p>

                  <div className="mt-3 pt-2.5 border-t border-slate-800/60">
                    <p className="text-xs font-semibold text-slate-400">Exam Question:</p>
                    <p className="text-xs text-slate-200 italic font-medium mt-0.5">"{ca.examQuestion}"</p>
                    <div className="mt-2 p-2 rounded-lg bg-indigo-950/40 border border-indigo-500/20 text-indigo-300 text-xs font-bold">
                      &rarr; {ca.fastAnswer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 3. SUBJECT-WISE TOPIC FORMULAS & ≤5s SHORTCUT CARDS */}
        {(activeTab === "all" || activeTab === "blindspots" || activeTab === "quant" || activeTab === "reasoning" || activeTab === "english" || activeTab === "ga") && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Flame className="w-5 h-5 text-rose-400" />
                Topic-Wise Formulas &amp; &le;5-Second Speed Weapons
              </h2>
              <span className="text-xs text-slate-400 font-medium">{filteredCheats.length} Topics Shown</span>
            </div>

            <div className="space-y-4">
              {filteredCheats.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#12121E] border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-5 transition-all shadow-lg shadow-black/40"
                >
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      {item.rank && (
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold">
                          Rank #{item.rank}
                        </span>
                      )}
                      <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
                        {item.topic}
                      </span>
                      {item.priority && (
                        <span
                          className={`text-xs px-2 py-0.5 rounded font-semibold ${
                            item.priority === "Very High"
                              ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                              : item.priority === "High"
                              ? "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                              : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          {item.priority} Priority
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-1 rounded-lg">
                        &le; 5 Sec Target
                      </span>
                      <button
                        onClick={() => copyToClipboard(`${item.title}\nFormula: ${item.formulaOrRule}\nShortcut: ${item.shortcut5s}`, item.id)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all text-xs"
                        title="Copy Formula & Shortcut"
                      >
                        {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Card Title & Content */}
                  <h3 className="text-lg font-bold text-white mt-3">{item.title}</h3>

                  <div className="mt-3 grid grid-cols-1 lg:grid-cols-2 gap-3">
                    {/* Left: Formula Box */}
                    <div className="p-3.5 rounded-xl bg-slate-900/80 border border-indigo-900/40">
                      <div className="text-xs font-bold text-indigo-400 flex items-center gap-1.5 mb-1">
                        <BookOpen className="w-3.5 h-3.5" />
                        Master Invariant Formula:
                      </div>
                      <p className="text-xs font-mono text-slate-200 font-semibold">{item.formulaOrRule}</p>
                    </div>

                    {/* Right: Shortcut Box */}
                    <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                      <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 mb-1">
                        <Zap className="w-3.5 h-3.5 text-amber-300" />
                        &le;5-Second Optical Shortcut:
                      </div>
                      <p className="text-xs text-emerald-200/90 leading-relaxed">{item.shortcut5s}</p>
                    </div>
                  </div>

                  {/* Trap Warning */}
                  <div className="mt-3 p-3 rounded-xl bg-rose-950/20 border border-rose-500/20 flex items-start gap-2.5">
                    <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <b className="text-rose-400">Examiner's Automated Trap:</b>{" "}
                      <span className="text-rose-200/90">{item.trapWarning}</span>
                    </div>
                  </div>

                  {/* Practice Question & Solution */}
                  <div className="mt-3 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                    <p className="text-xs text-slate-400 font-semibold mb-1">Worked Practice Question:</p>
                    <p className="text-sm font-semibold text-white">{item.exampleQ}</p>
                    {item.options && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                        {item.options.map((opt, i) => (
                          <div key={i} className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-slate-300 font-medium">
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="mt-2.5 pt-2 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">
                      <div className="text-emerald-300">
                        <b className="text-emerald-400">&le;5s Solution:</b> {item.solution5s}
                      </div>
                      <div className="font-bold text-amber-300 bg-amber-950/40 border border-amber-500/30 px-2 py-0.5 rounded shrink-0">
                        Correct: {item.correctAnswer}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
