"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  Compass, Sliders, Moon, Star, ArrowLeft,
  Coins, Hand, Heart, Calendar, 
  Sparkles, BookOpen, Search, Cpu, Award
} from 'lucide-react';
import { TerminalSearch } from '@/components/layout/TerminalSearch';

// Nakshatras dataset
const NAKSHATRAS = [
  { id: 1, name: "Ashwini", ruler: "Ketu", status: "Auspicious", desc: "Bestows rapid success, health, and vitality. Highly compatible with most profiles." },
  { id: 2, name: "Bharani", ruler: "Yama", status: "Neutral", desc: "Under Yama lordship. Suitable for commercial or active physical spaces." },
  { id: 3, name: "Krittika", ruler: "Agni", status: "Inauspicious", desc: "Fire-ruled. Avoid for residences; indicators of friction and heated disputes." },
  { id: 4, name: "Rohini", ruler: "Brahma", status: "Highly Auspicious", desc: "Ultimate creative growth, luxury, and long-term family stability." },
  { id: 5, name: "Mrigashira", ruler: "Soma", status: "Highly Auspicious", desc: "Peaceful and harmonious; grants intellectual growth and emotional ease." },
  { id: 6, name: "Ardra", ruler: "Rudra", status: "Inauspicious", desc: "Storm-ruled. Associated with unstable energies and emotional volatility." },
  { id: 7, name: "Punarvasu", ruler: "Aditi", status: "Auspicious", desc: "Brings renewal, spiritual progress, and material return." },
  { id: 8, name: "Pushya", ruler: "Brihaspati", status: "Highly Auspicious", desc: "The most nourishing star. Brings ultimate abundance, luck, and wisdom." },
  { id: 9, name: "Ashlesha", ruler: "Sarpas", status: "Inauspicious", desc: "Snake-ruled. Induces vulnerability, energetic drainage, and disputes." },
  { id: 10, name: "Magha", ruler: "Pitrus", status: "Auspicious", desc: "Ancestor-ruled. Strong and stable; excellent for traditional seats and main offices." },
  { id: 11, name: "Purva Phalguni", ruler: "Bhaga", status: "Neutral", desc: "Relaxed and leisure-oriented. Good for entertainment zones, neutral for core areas." },
  { id: 12, name: "Uttara Phalguni", ruler: "Aryaman", status: "Auspicious", desc: "Governs partnership, domestic stability, and steady financial progress." },
  { id: 13, name: "Hasta", ruler: "Savitr", status: "Highly Auspicious", desc: "Hand-ruled. Excellent for arts, commerce, craftsmanship, and fertility." },
  { id: 14, name: "Chitra", ruler: "Vishwakarma", status: "Highly Auspicious", desc: "Vishwakarma's own star. Governs design, luxury, structure, and aesthetic beauty." },
  { id: 15, name: "Swati", ruler: "Vayu", status: "Auspicious", desc: "Wind-ruled. Bestows independence, adaptability, and high commercial expansion." },
  { id: 16, name: "Vishakha", ruler: "Indra-Agni", status: "Neutral", desc: "Dual energy. Fosters split focus; acceptable for business, average for homes." },
  { id: 17, name: "Anuradha", ruler: "Mitra", status: "Highly Auspicious", desc: "Deep friendship, social network support, and spiritual integration." },
  { id: 18, name: "Jyeshtha", ruler: "Indra", status: "Inauspicious", desc: "Elder energy. Can trigger isolation and blockages for younger generations." },
  { id: 19, name: "Mula", ruler: "Nirriti", status: "Neutral", desc: "Root star. High spiritual potential, though material foundations can fluctuate." },
  { id: 20, name: "Purvashadha", ruler: "Apah", status: "Neutral", desc: "Water-ruled. Auspicious for water features, agricultural planning, neutral for homes." },
  { id: 21, name: "Uttarashadha", ruler: "Viswadevas", status: "Auspicious", desc: "Universal gods. Brings stable, steady, and invincible progress." },
  { id: 22, name: "Shravana", ruler: "Vishnu", status: "Highly Auspicious", desc: "Hearing/Wisdom. Enhances learning, heavy community reputation, and focus." },
  { id: 23, name: "Dhanishta", ruler: "Vasus", status: "Highly Auspicious", desc: "Wealth-ruled. Heavy financial flows, positive sound dynamics, and luxury." },
  { id: 24, name: "Shatabhisha", ruler: "Varuna", status: "Auspicious", desc: "Healing/Secrets. Perfect for medical setups, labs, and deep spiritual zones." },
  { id: 25, name: "Purva Bhadrapada", ruler: "Aja Ekapada", status: "Neutral", desc: "Highly mystical, but average for standard family living comfort." },
  { id: 26, name: "Uttara Bhadrapada", ruler: "Ahirbudhnya", status: "Highly Auspicious", desc: "Absolute foundations, deep peace, stability, and enduring structures." },
  { id: 27, name: "Revati", ruler: "Pushan", status: "Highly Auspicious", desc: "Safe journeys, wealth protection, and smooth transition energies." }
];

// Tithis dataset
const TITHIS = [
  { id: 1, name: "Prathama", type: "Nanda", status: "Good", desc: "Worthy for minor layout changes and cosmetic updates." },
  { id: 2, name: "Dwitiya", type: "Bhadra", status: "Highly Auspicious", desc: "Outstanding for starting foundations and placing pillars." },
  { id: 3, name: "Tritiya", type: "Jaya", status: "Highly Auspicious", desc: "Ensures success and resolution of boundary disputes." },
  { id: 4, name: "Chaturthi", type: "Rikta", status: "Avoid", desc: "Rikta (empty) day. Associated with leakage of assets; avoid final design." },
  { id: 5, name: "Panchami", type: "Poorna", status: "Highly Auspicious", desc: "Ultimate completeness. Fosters heavy wealth retention and growth." },
  { id: 6, name: "Shashthi", type: "Nanda", status: "Good", desc: "Governs administrative victory and career gains." },
  { id: 7, name: "Saptami", type: "Bhadra", status: "Highly Auspicious", desc: "Brings steady peace and stable marital partnerships." },
  { id: 8, name: "Ashtami", type: "Jaya", status: "Neutral", desc: "Good for religious/spiritual rooms, neutral for commercial use." },
  { id: 9, name: "Navami", type: "Rikta", status: "Avoid", desc: "Rikta day. Leads to arguments and structural repairs." },
  { id: 10, name: "Dashami", type: "Poorna", status: "Highly Auspicious", desc: "Brings widespread fame, legacy building, and steady wealth." },
  { id: 11, name: "Ekadashi", type: "Nanda", status: "Highly Auspicious", desc: "High spiritual charge. Great for home meditation/temple sectors." },
  { id: 12, name: "Dwadashi", type: "Bhadra", status: "Good", desc: "Excellent for multi-tiered roofs and storehouses." },
  { id: 13, name: "Trayodashi", type: "Jaya", status: "Highly Auspicious", desc: "Highly creative; brings fortune to design studios and shops." },
  { id: 14, name: "Chaturdashi", type: "Rikta", status: "Avoid", desc: "Rikta day. Triggers legal blockages. Do not initiate construction." },
  { id: 15, name: "Pournami (Full Moon)", type: "Poorna", status: "Highly Auspicious", desc: "Maximum solar-lunar light reflection. Perfect harmony, health, and peace." }
];

// Weekdays (Vara)
const WEEKDAYS = [
  { id: 1, name: "Sunday (Aditya)", ruler: "Sun", status: "Neutral", desc: "Good for public/government offices, neutral for private homes." },
  { id: 2, name: "Monday (Soma)", ruler: "Moon", status: "Auspicious", desc: "Fosters creativity, calmness, water-flows, and family comfort." },
  { id: 3, name: "Tuesday (Mangala)", ruler: "Mars", status: "Inauspicious", desc: "Fiery energy. Leads to accidents and heated tempers. Avoid key works." },
  { id: 4, name: "Wednesday (Budha)", ruler: "Mercury", status: "Highly Auspicious", desc: "Excellent for business offices, study rooms, and trade." },
  { id: 5, name: "Thursday (Guru)", ruler: "Jupiter", status: "Highly Auspicious", desc: "Brings divine wisdom, children progress, and heavy wealth stability." },
  { id: 6, name: "Friday (Shukra)", ruler: "Venus", status: "Highly Auspicious", desc: "Bestows luxury, artistic success, marital harmony, and beauty." },
  { id: 7, name: "Saturday (Shani)", ruler: "Saturn", status: "Inauspicious", desc: "Slow and heavy energy. Triggers delays, blockages, and fatigue." }
];

// Yoni Archetypes
const YONIS = [
  { id: 1, name: "Dhwaja (Flag)", dir: "East", quality: "Highly Auspicious", desc: "Brings overall success, fame, leadership, and positive beginning energy." },
  { id: 2, name: "Dhuma (Smoke)", dir: "Southeast", quality: "Inauspicious", desc: "Linked to friction, high expenditures, and general mental distress." },
  { id: 3, name: "Simha (Lion)", dir: "South", quality: "Auspicious", desc: "Fosters courage, power, dominance, and security. Excellent for administrative setups." },
  { id: 4, name: "Shwana (Dog)", dir: "Southwest", quality: "Inauspicious", desc: "Triggers instability, unnecessary suspicions, and career fluctuations." },
  { id: 5, name: "Vrishabha (Bull)", dir: "West", quality: "Highly Auspicious", desc: "Brings material gains, business success, nourishment, and physical safety." },
  { id: 6, name: "Khara (Donkey)", dir: "Northwest", quality: "Inauspicious", desc: "Causes heavy labor, delays in projects, and restlessness." },
  { id: 7, name: "Gaja (Elephant)", dir: "North", quality: "Highly Auspicious", desc: "Bestows steady wealth, massive storage capacity, knowledge, and health." },
  { id: 8, name: "Kaka (Crow)", dir: "Northeast", quality: "Inauspicious", desc: "Leads to lack of support, legal disputes, and continuous small losses." }
];

// Amsas
const AMSAS = [
  { id: 1, name: "Siddha (Achiever)", quality: "Highly Auspicious", desc: "Ensures success in every endeavor and realization of dreams." },
  { id: 2, name: "Bhuti (Wealth)", quality: "Highly Auspicious", desc: "Fosters luxury, material comfort, and accumulation of properties." },
  { id: 3, name: "Mukti (Liberation)", quality: "Highly Auspicious", desc: "Brings spiritual peace, clarity of mind, and release from stress." },
  { id: 4, name: "Udyoga (Effort)", quality: "Neutral", desc: "Demands constant work and effort. Good for factories, neutral for homes." },
  { id: 5, name: "Bhoga (Enjoyment)", quality: "Highly Auspicious", desc: "Enhances pleasure, positive social gathering, and family celebrations." },
  { id: 6, name: "Naasha (Loss)", quality: "Inauspicious", desc: "Triggers accidental losses, breakdown of equipment, and arguments." },
  { id: 7, name: "Roga (Disease)", quality: "Inauspicious", desc: "Leads to chronic health challenges, low energy, and listlessness." },
  { id: 8, name: "Shoka (Grief)", quality: "Inauspicious", desc: "Triggers sorrow, lack of motivation, and depressive environments." },
  { id: 9, name: "Vriddhi (Growth)", quality: "Highly Auspicious", desc: "Continuous expansion of wealth, family generations, and knowledge." }
];

// Deities
const DEITIES = [
  { id: 1, name: "Indra", dir: "East", desc: "King of Gods. Grants power, social respect, and network growth." },
  { id: 2, name: "Agni", dir: "Southeast", desc: "Fire Lord. Directs metabolic energy, digestive fire, and drive." },
  { id: 3, name: "Yama", dir: "South", desc: "Lord of Justice. Maintains boundaries, discipline, and order." },
  { id: 4, name: "Nirriti", dir: "Southwest", desc: "Deity of Ancestors. Protects stability, grounding, and legacy." },
  { id: 5, name: "Varuna", dir: "West", desc: "Water Lord. Controls communication, fluid assets, and outer contacts." },
  { id: 6, name: "Vayu", dir: "Northwest", desc: "Wind Lord. Influences opportunities, thoughts change, and relationships." },
  { id: 7, name: "Kubera", dir: "North", desc: "Wealth Custodian. Bestows financial opportunities, banking, and gains." },
  { id: 8, name: "Ishana", dir: "Northeast", desc: "Shiva Archetype. Ultimate spiritual purity, wisdom, and cosmic flow." }
];

export default function VastuAyadiCalculator() {
  // Input settings
  const [inputType, setInputType] = useState<'yards' | 'sft' | 'dimensions'>('yards');
  const [yardsInput, setYardsInput] = useState<string>('35');
  const [sftInput, setSftInput] = useState<string>('315');
  const [lengthInput, setLengthInput] = useState<string>('15');
  const [breadthInput, setBreadthInput] = useState<string>('21');
  const [dimensionUnit, setDimensionUnit] = useState<'feet' | 'hasta_18' | 'hasta_33'>('feet');
  
  // Astro settings
  const [userNakshatra, setUserNakshatra] = useState<number>(12); // Default Uttara Phalguni
  const [vocationalFocus, setVocationalFocus] = useState<'residential' | 'administrative' | 'commercial'>('residential');

  // Encyclopedia settings
  const [dictTab, setDictTab] = useState<'nakshatras' | 'tithis' | 'vara' | 'yoni' | 'amsa' | 'dhikpati'>('nakshatras');

  // Optimizer pagination
  const [optPage, setOptPage] = useState<number>(0);
  const [optSearch, setOptSearch] = useState<string>('');
  const [optFilter, setOptFilter] = useState<string>('all');
  const rowsPerPage = 10;

  // 1. Calculate Padam
  const padam = useMemo(() => {
    if (inputType === 'yards') {
      const y = parseFloat(yardsInput) || 0;
      return y * 9; // 1 square yard = 9 square feet
    } else if (inputType === 'sft') {
      return parseFloat(sftInput) || 0;
    } else {
      const l = parseFloat(lengthInput) || 0;
      const b = parseFloat(breadthInput) || 0;
      if (dimensionUnit === 'feet') {
        return l * b;
      } else if (dimensionUnit === 'hasta_18') {
        return (l * 1.5) * (b * 1.5); // Convert Hasta (18") to Feet (1.5')
      } else {
        return (l * 2.75) * (b * 2.75); // Convert Hasta (33") to Feet (2.75')
      }
    }
  }, [inputType, yardsInput, sftInput, lengthInput, breadthInput, dimensionUnit]);

  // 2. Perform Shadvarga Formulas & Scoring
  const getShadvargaResults = (currentPadam: number) => {
    if (currentPadam <= 0) {
      return {
        dhanam: 0, runam: 0, aayam: 0, aayamName: '...',
        vayassu: 0, vayassuName: '...', vaaram: 0, vaaramName: '...',
        tithi: 0, tithiName: '...', nakshatra: 0, nakshatraName: '...',
        yoni: 0, yoniName: '...', amsa: 0, amsaName: '...',
        ayashu: 0, dhikpati: 0, dhikpatiName: '...',
        dhanamScore: 0, runamScore: 0, aayamScore: 0,
        vayassuScore: 0, vaaramScore: 0, tithiScore: 0,
        nakshatraScore: 0, yoniScore: 0, amsaScore: 0,
        deityScore: 0, totalScore: 0, verdict: 'Evaluating Resonance...',
        verdictDesc: 'Please provide valid input dimensions.'
      };
    }

    // Formulas: (Value * Multiplier) % Divisor. If remainder is 0, return the divisor.
    const rem = (val: number, mult: number, div: number) => {
      const r = Math.round(val * mult) % div;
      return r === 0 ? div : r;
    };

    const dhanam = rem(currentPadam, 8, 12);
    const runam = rem(currentPadam, 9, 10);
    const yoni = rem(currentPadam, 3, 8);
    const ayashu = rem(currentPadam, 9, 120);
    const vaaram = rem(currentPadam, 9, 7);
    
    // Tithi
    const tithiVal = rem(currentPadam, 9, 30);
    const isWaning = tithiVal > 15;
    const tithiName = isWaning 
      ? `Krishna ${TITHIS[tithiVal - 16]?.name || 'Prathama'}` 
      : `Shukla ${TITHIS[tithiVal - 1]?.name || 'Prathama'}`;

    // Nakshatra
    const nakshatra = rem(currentPadam, 8, 27);
    const nakshatraName = NAKSHATRAS[nakshatra - 1]?.name || '...';

    // Amsa
    const amsa = rem(currentPadam, 4, 9);
    const amsaName = AMSAS[amsa - 1]?.name || '...';

    // Vayassu
    const vayassu = rem(currentPadam, 27, 100);
    let vayassuName = 'Bala (Child)';
    if (vayassu > 75) vayassuName = 'Atikranta (Decaying)';
    else if (vayassu > 50) vayassuName = 'Vriddha (Old)';
    else if (vayassu > 20) vayassuName = 'Yuvak (Youth)';
    else if (vayassu > 10) vayassuName = 'Kaumara (Teen)';

    // Dhikpati
    const dhikpati = rem(currentPadam, 9, 8);
    const dhikpatiName = DEITIES[dhikpati - 1]?.name || '...';

    // Yoni Name
    const yoniName = YONIS[yoni - 1]?.name || '...';

    // --- Scoring Logic (Standard Shastric weighting) ---
    let dhanamScore = 0;
    if (dhanam > runam) dhanamScore = 100;
    else if (dhanam === runam) dhanamScore = 50;
    else dhanamScore = 20;

    let runamScore = 100 - (runam * 8); // Lower runam is better
    if (runamScore < 20) runamScore = 20;

    let aayamScore = 50;
    if (yoni === 1 && vocationalFocus === 'residential') aayamScore = 100; // Dhwaja
    if (yoni === 3 && vocationalFocus === 'administrative') aayamScore = 100; // Simha
    if (yoni === 5 && vocationalFocus === 'commercial') aayamScore = 100; // Vrishabha
    if (yoni % 2 === 0) aayamScore = 20; // Inauspicious even yonis

    let yoniScore = yoni % 2 !== 0 ? 100 : 30; // Odd yonis have high energy flow

    let vayassuScore = 40;
    if (vayassu > 20 && vayassu < 75) vayassuScore = 100; // Youthful and mature age

    let vaaramScore = 50;
    if ([2, 4, 5, 6].includes(vaaram)) vaaramScore = 100; // Mon, Wed, Thu, Fri are highly benefic days
    if ([3, 7].includes(vaaram)) vaaramScore = 20; // Tue, Sat are malefic

    let tithiScore = 50;
    const goodTithis = [2, 3, 5, 7, 10, 11, 12, 13, 15];
    const isWaningRikta = isWaning && [4, 9, 14, 29, 30].includes(tithiVal);
    if (goodTithis.includes(tithiVal % 15 || 15)) tithiScore = 100;
    if (isWaningRikta) tithiScore = 20;

    // Tarabala Calculation (Horoscope compatibility)
    const diff = (nakshatra - userNakshatra + 27) % 27 + 1;
    const tarabalaRem = diff % 9;
    let nakshatraScore = 50;
    const goodTarabala = [2, 4, 6, 8, 0]; // Sampat, Kshema, Sadhana, Mitra, Paramamitra
    if (goodTarabala.includes(tarabalaRem)) nakshatraScore = 100;
    else if ([3, 5, 7].includes(tarabalaRem)) nakshatraScore = 20; // Vipat, Pratyak, Naidhana

    let amsaScore = 40;
    if ([1, 2, 3, 5, 9].includes(amsa)) amsaScore = 100; // Siddha, Bhuti, Mukti, Bhoga, Vriddhi
    if ([6, 7, 8].includes(amsa)) amsaScore = 20; // Naasha, Roga, Shoka

    let deityScore = 50;
    if ([1, 5, 7, 8].includes(dhikpati)) deityScore = 100; // Indra, Varuna, Kubera, Ishana are highly beneficial deities

    // Aggregate Score
    const totalScore = Math.round(
      (dhanamScore * 0.20) + 
      (runamScore * 0.15) + 
      (yoniScore * 0.15) + 
      (nakshatraScore * 0.15) + 
      (amsaScore * 0.10) + 
      (tithiScore * 0.08) + 
      (vaaramScore * 0.07) + 
      (deityScore * 0.05) + 
      (vayassuScore * 0.05)
    );

    let verdict = 'Borderline';
    let verdictDesc = 'This layout generates mixed vibrations. Some sectors hold wealth stability, but compatibility triggers average balances. Minor structural tuning is recommended.';

    if (totalScore >= 90) {
      verdict = 'Highly Auspicious';
      verdictDesc = 'Exceptional cosmic alignment! Financial inflows greatly exceed expenditures. Constellation synastry (Tarabala) and Yoni prana orientation generate absolute harmony, peace, and spiritual growth.';
    } else if (totalScore >= 70) {
      verdict = 'Auspicious / Good';
      verdictDesc = 'Positive shastric resonance. Auspicious days, matching Yoni flow, and good Nakshatra compatibility support steady wealth growth and family health. Fully usable for construction.';
    } else if (totalScore < 40) {
      verdict = 'Avoid / Inauspicious';
      verdictDesc = 'Severe metrological conflicts. Expenditure (Runam) dominates wealth creation, or Nakshatra synastry triggers heavy Vipat/Naidhana tara. Consider adjusting the plot size or dimensions.';
    }

    return {
      dhanam, runam, aayam: yoni, aayamName: yoniName,
      vayassu, vayassuName, vaaram, vaaramName: WEEKDAYS[vaaram - 1]?.name || '...',
      tithi: tithiVal, tithiName, nakshatra, nakshatraName,
      yoni, yoniName, amsa, amsaName,
      ayashu, dhikpati, dhikpatiName,
      dhanamScore, runamScore, aayamScore,
      vayassuScore, vaaramScore, tithiScore,
      nakshatraScore, yoniScore, amsaScore,
      deityScore, totalScore, verdict, verdictDesc
    };
  };

  // Compute results for current Padam
  const results = useMemo(() => getShadvargaResults(padam), [padam, userNakshatra, vocationalFocus]);

  // Handle Input Tabs
  const switchInputType = (type: 'yards' | 'sft' | 'dimensions') => {
    setInputType(type);
  };

  // Optimizer full database generator (10 to 500 Yards)
  const fullOptimizerData = useMemo(() => {
    const arr = [];
    for (let yards = 10; yards <= 500; yards++) {
      const area = yards * 9;
      const res = getShadvargaResults(area);
      arr.push({
        yards,
        area,
        dhanam: res.dhanam,
        runam: res.runam,
        yoni: `${res.yoni} (${res.yoniName})`,
        nakshatra: res.nakshatraName,
        tithi: res.tithiName,
        vaaram: res.vaaramName,
        amsa: res.amsaName,
        ayashu: res.ayashu,
        score: res.totalScore,
        verdict: res.verdict
      });
    }
    return arr;
  }, [userNakshatra, vocationalFocus]);

  // Filter & Search Optimizer Data
  const filteredOptimizerData = useMemo(() => {
    return fullOptimizerData.filter(item => {
      const matchesSearch = item.yards.toString().includes(optSearch) || item.area.toString().includes(optSearch);
      
      let matchesFilter = true;
      if (optFilter === 'highly_auspicious') matchesFilter = item.score >= 90;
      else if (optFilter === 'auspicious') matchesFilter = item.score >= 70 && item.score < 90;
      else if (optFilter === 'borderline') matchesFilter = item.score >= 40 && item.score < 70;
      else if (optFilter === 'avoid') matchesFilter = item.score < 40;

      return matchesSearch && matchesFilter;
    });
  }, [fullOptimizerData, optSearch, optFilter]);

  // Pagination Slice
  const paginatedData = useMemo(() => {
    const startIdx = optPage * rowsPerPage;
    return filteredOptimizerData.slice(startIdx, startIdx + rowsPerPage);
  }, [filteredOptimizerData, optPage]);

  // Handle page change
  const changePage = (direction: number) => {
    const maxPage = Math.ceil(filteredOptimizerData.length / rowsPerPage) - 1;
    const newPage = optPage + direction;
    if (newPage >= 0 && newPage <= maxPage) {
      setOptPage(newPage);
    }
  };

  // Select yard size from table
  const selectYardSize = (yards: number) => {
    setInputType('yards');
    setYardsInput(yards.toString());
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  // Reset pagination on search/filter update
  useEffect(() => {
    setOptPage(0);
  }, [optSearch, optFilter]);

  // Circular score progress logic
  const scoreCircumference = 515.22;
  const scoreOffset = scoreCircumference - (results.totalScore / 100) * scoreCircumference;

  return (
    <div className="min-h-screen bg-[#06071E] text-white font-inter pb-32 relative overflow-hidden selection:bg-[#7E30E1] selection:text-white">
      
      {/* Background gradients */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#7E30E1 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <div className="absolute -top-[20%] -right-[10%] w-[65%] h-[65%] rounded-full bg-gradient-to-br from-[#7E30E1]/10 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] -left-[10%] w-[55%] h-[55%] rounded-full bg-gradient-to-br from-blue-500/5 to-transparent blur-[120px] pointer-events-none" />

      {/* Sticky top-right search shortcut */}
      <div className="fixed top-8 right-8 z-[60]">
        <TerminalSearch />
      </div>

      <div className="relative z-10 pt-24 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">

          {/* Navigation link back to calculations hub */}
          <Link 
            href="/calc" 
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-[#7E30E1] hover:text-white transition-colors mb-12 border border-[#7E30E1]/20 hover:border-[#7E30E1] bg-[#7E30E1]/5 px-4 py-2.5 rounded-xl backdrop-blur-md"
          >
            <ArrowLeft size={12} /> Back to Hub
          </Link>

          {/* Welcome Hero Section */}
          <div className="text-center max-w-4xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest bg-gradient-to-r from-amber-500 to-amber-300 text-slate-950 uppercase shadow-lg shadow-amber-500/10">
              <Award size={12} /> Sthapatya Veda Metrology
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-purple-400">
              Advanced Cosmic<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7E30E1] via-pink-400 to-[#7E30E1]">Ayadi & Vastu Labs</span>
            </h1>
            <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              Ayadi Shadvarga translates spatial dimensions into energetic frequencies. This laboratory computes the exact structural alignment of any plot using mathematical algorithms from the <strong>Vishwakarma Prakasika</strong>.
            </p>
          </div>

          {/* Main Laboratory Workspace Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
            
            {/* Left Column: Dimensions Inputs Panel */}
            <div className="lg:col-span-5 bg-[#111242]/50 border border-[#1E1F6D] rounded-3xl p-6 sm:p-8 space-y-8 backdrop-blur-md shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 h-32 w-32 bg-[#7E30E1]/5 rounded-full blur-3xl" />
              
              <div>
                <h3 className="text-lg font-black uppercase tracking-wider text-white flex items-center gap-2">
                  <Sliders size={18} className="text-[#7E30E1]" /> Plot Parameter Controls
                </h3>
                <p className="text-xs text-slate-400 mt-1">Select your preferred metric and modify the sliders or numerical inputs.</p>
              </div>

              {/* Mode switch tabs */}
              <div className="bg-[#06071E] p-1.5 rounded-2xl flex gap-1 border border-[#1E1F6D]">
                <button 
                  onClick={() => switchInputType('yards')} 
                  className={`flex-1 py-2.5 text-xs font-black rounded-xl transition-all uppercase tracking-wider ${
                    inputType === 'yards' ? 'bg-[#7E30E1] text-white shadow-lg shadow-[#7E30E1]/20' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Yards Mode
                </button>
                <button 
                  onClick={() => switchInputType('sft')} 
                  className={`flex-1 py-2.5 text-xs font-black rounded-xl transition-all uppercase tracking-wider ${
                    inputType === 'sft' ? 'bg-[#7E30E1] text-white shadow-lg shadow-[#7E30E1]/20' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Sft Mode
                </button>
                <button 
                  onClick={() => switchInputType('dimensions')} 
                  className={`flex-1 py-2.5 text-xs font-black rounded-xl transition-all uppercase tracking-wider ${
                    inputType === 'dimensions' ? 'bg-[#7E30E1] text-white shadow-lg shadow-[#7E30E1]/20' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Dimensions
                </button>
              </div>

              {/* Input Forms */}
              <div className="space-y-6">
                
                {inputType === 'yards' && (
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-[#7E30E1]">Total Plot Size (Square Yards / Gajalu)</label>
                    <div className="relative rounded-2xl bg-[#06071E] border border-[#1E1F6D] focus-within:border-[#7E30E1] transition-all">
                      <input 
                        type="number" 
                        value={yardsInput} 
                        onChange={(e) => setYardsInput(e.target.value)} 
                        className="w-full bg-transparent px-4 py-4 text-white font-extrabold outline-none text-base" 
                        placeholder="e.g. 35"
                      />
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[10px] text-slate-500 font-black tracking-widest">
                        SQ YARDS
                      </div>
                    </div>
                    {/* Slider for quick adjustment */}
                    <input 
                      type="range" 
                      min="10" 
                      max="500" 
                      value={yardsInput || 10} 
                      onChange={(e) => setYardsInput(e.target.value)} 
                      className="w-full h-1 bg-[#1E1F6D] rounded-lg appearance-none cursor-pointer accent-[#7E30E1]"
                    />
                  </div>
                )}

                {inputType === 'sft' && (
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-[#7E30E1]">Total Area (Square Feet / Sft)</label>
                    <div className="relative rounded-2xl bg-[#06071E] border border-[#1E1F6D] focus-within:border-[#7E30E1] transition-all">
                      <input 
                        type="number" 
                        value={sftInput} 
                        onChange={(e) => setSftInput(e.target.value)} 
                        className="w-full bg-transparent px-4 py-4 text-white font-extrabold outline-none text-base" 
                        placeholder="e.g. 315"
                      />
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[10px] text-slate-500 font-black tracking-widest">
                        SQ FEET
                      </div>
                    </div>
                    <input 
                      type="range" 
                      min="90" 
                      max="4500" 
                      value={sftInput || 90} 
                      onChange={(e) => setSftInput(e.target.value)} 
                      className="w-full h-1 bg-[#1E1F6D] rounded-lg appearance-none cursor-pointer accent-[#7E30E1]"
                    />
                  </div>
                )}

                {inputType === 'dimensions' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-[#7E30E1]">Length</label>
                        <div className="relative rounded-2xl bg-[#06071E] border border-[#1E1F6D] focus-within:border-[#7E30E1] transition-all">
                          <input 
                            type="number" 
                            value={lengthInput} 
                            onChange={(e) => setLengthInput(e.target.value)} 
                            className="w-full bg-transparent px-4 py-3.5 text-white font-extrabold outline-none text-base"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-[#7E30E1]">Breadth</label>
                        <div className="relative rounded-2xl bg-[#06071E] border border-[#1E1F6D] focus-within:border-[#7E30E1] transition-all">
                          <input 
                            type="number" 
                            value={breadthInput} 
                            onChange={(e) => setBreadthInput(e.target.value)} 
                            className="w-full bg-transparent px-4 py-3.5 text-white font-extrabold outline-none text-base"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Unit of Measurement</label>
                      <select 
                        value={dimensionUnit} 
                        onChange={(e: any) => setDimensionUnit(e.target.value)} 
                        className="w-full bg-[#06071E] border border-[#1E1F6D] rounded-2xl px-4 py-3 text-white font-bold text-sm outline-none focus:border-[#7E30E1]"
                      >
                        <option value="feet">Feet (standard)</option>
                        <option value="hasta_18">Hasta (18-inch Cubit)</option>
                        <option value="hasta_33">Hasta (33-inch Monumental)</option>
                      </select>
                    </div>
                  </div>
                )}

                <div className="h-px bg-[#1E1F6D]/50" />

                {/* Horoscope synastry parameters */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-1.5">
                      <Star size={16} className="text-[#7E30E1]" /> Horoscope Compatibility Check
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">Check constellation compatibility (Tarabala) and vocational Yoni flow.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-[9px] font-black uppercase tracking-widest text-slate-400">Your Janma Nakshatra</label>
                      <select 
                        value={userNakshatra} 
                        onChange={(e) => setUserNakshatra(parseInt(e.target.value))} 
                        className="w-full bg-[#06071E] border border-[#1E1F6D] rounded-2xl px-4 py-3.5 text-white font-bold text-sm outline-none focus:border-[#7E30E1]"
                      >
                        {NAKSHATRAS.map(n => (
                          <option key={n.id} value={n.id}>{n.id}. {n.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[9px] font-black uppercase tracking-widest text-slate-400">Vocational Focus</label>
                      <select 
                        value={vocationalFocus} 
                        onChange={(e: any) => setVocationalFocus(e.target.value)} 
                        className="w-full bg-[#06071E] border border-[#1E1F6D] rounded-2xl px-4 py-3.5 text-white font-bold text-sm outline-none focus:border-[#7E30E1]"
                      >
                        <option value="residential">Residential / Spiritual (Dhwaja)</option>
                        <option value="administrative">Administrative / Power (Simha)</option>
                        <option value="commercial">Commercial / Mercantile (Vrishabha)</option>
                      </select>
                    </div>
                  </div>
                </div>

              </div>

              {/* Master Display Box */}
              <div className="bg-[#06071E]/80 border border-[#1E1F6D] rounded-2xl p-4 flex justify-between items-center shadow-inner">
                <div>
                  <span className="text-[9px] uppercase font-black text-slate-500 tracking-widest">Calculated Space</span>
                  <div className="text-base font-black text-white">Kshetrapadam (Padam)</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-[#7E30E1]">{padam.toFixed(1)}</div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Sq. Units</span>
                </div>
              </div>
            </div>

            {/* Right Column: Score, Verdict & 11 Shadvarga Metrics */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Radial Score Gauge Panel */}
              <div className="bg-[#111242]/50 border border-[#1E1F6D] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8 backdrop-blur-md shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 h-40 w-40 bg-[#7E30E1]/5 rounded-full blur-3xl" />
                
                {/* SVG Progress Ring */}
                <div className="relative flex items-center justify-center shrink-0">
                  <svg className="w-48 h-48 transform -rotate-90">
                    <circle cx="96" cy="96" r="82" stroke="rgba(30, 41, 59, 0.4)" strokeWidth="12" fill="transparent" />
                    <circle 
                      cx="96" 
                      cy="96" 
                      r="82" 
                      stroke="url(#cosmicGradient)" 
                      strokeWidth="12" 
                      fill="transparent" 
                      strokeDasharray={scoreCircumference} 
                      strokeDashoffset={scoreOffset} 
                      strokeLinecap="round" 
                      className="transition-all duration-1000 ease-out" 
                    />
                    <defs>
                      <linearGradient id="cosmicGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#7E30E1" />
                        <stop offset="50%" stopColor="#EC4899" />
                        <stop offset="100%" stopColor="#3B82F6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-5xl font-black tracking-tighter text-white">{results.totalScore}</span>
                    <span className="text-[9px] tracking-[0.25em] font-black text-slate-400 uppercase">SCORE / 100</span>
                  </div>
                </div>

                {/* Verdict Text */}
                <div className="space-y-3 text-center md:text-left flex-1">
                  <div>
                    <span className="text-[9px] tracking-widest font-black uppercase text-[#7E30E1]">Canonical Verdict</span>
                    <h3 className="text-2xl font-black text-white mt-1 uppercase tracking-tight">{results.verdict}</h3>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed font-semibold">
                    {results.verdictDesc}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start pt-2">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black border uppercase tracking-wider ${results.dhanam >= results.runam ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'}`}>
                      Wealth Balanced
                    </span>
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black border uppercase tracking-wider ${results.nakshatraScore >= 70 ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' : 'bg-slate-500/10 border-slate-500/20 text-slate-400'}`}>
                      Tarabala Check
                    </span>
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black border uppercase tracking-wider ${results.yoniScore >= 70 ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-slate-500/10 border-slate-500/20 text-slate-400'}`}>
                      Prana Orientation
                    </span>
                  </div>
                </div>
              </div>

              {/* Shadvarga Remainder Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                
                {/* 1. Dhanam */}
                <div className="bg-[#111242]/30 border border-[#1E1F6D]/60 p-5 rounded-3xl space-y-3 hover:border-[#7E30E1]/40 transition-all duration-500 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] tracking-wider font-black text-slate-400 uppercase">1. Wealth Capacity</span>
                    <Coins size={14} className="text-yellow-400" />
                  </div>
                  <div>
                    <div className="text-[9px] uppercase font-bold text-slate-500">Dhanam</div>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-2xl font-black text-white">{results.dhanam}</span>
                      <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Inflow rem</span>
                    </div>
                  </div>
                  <div className="text-[10px] font-bold text-emerald-400 border-t border-[#1E1F6D] pt-2 mt-2">
                    Inflow Remainder rating
                  </div>
                </div>

                {/* 2. Runam */}
                <div className="bg-[#111242]/30 border border-[#1E1F6D]/60 p-5 rounded-3xl space-y-3 hover:border-[#7E30E1]/40 transition-all duration-500 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] tracking-wider font-black text-slate-400 uppercase">2. Expenditure & Debt</span>
                    <Hand size={14} className="text-rose-400" />
                  </div>
                  <div>
                    <div className="text-[9px] uppercase font-bold text-slate-500">Runam</div>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-2xl font-black text-white">{results.runam}</span>
                      <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Outflow rem</span>
                    </div>
                  </div>
                  <div className="text-[10px] font-bold text-rose-400 border-t border-[#1E1F6D] pt-2 mt-2">
                    Outflow Debt weight
                  </div>
                </div>

                {/* 3. Aayam */}
                <div className="bg-[#111242]/30 border border-[#1E1F6D]/60 p-5 rounded-3xl space-y-3 hover:border-[#7E30E1]/40 transition-all duration-500 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] tracking-wider font-black text-slate-400 uppercase">3. Aayam Archetype</span>
                    <Compass size={14} className="text-purple-400" />
                  </div>
                  <div>
                    <div className="text-[9px] uppercase font-bold text-slate-500">Yoni</div>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-xl font-black text-white truncate max-w-full block">{results.yoniName}</span>
                    </div>
                  </div>
                  <div className="text-[10px] font-bold text-purple-400 border-t border-[#1E1F6D] pt-2 mt-2">
                    Directional energy flow
                  </div>
                </div>

                {/* 4. Vayassu */}
                <div className="bg-[#111242]/30 border border-[#1E1F6D]/60 p-5 rounded-3xl space-y-3 hover:border-[#7E30E1]/40 transition-all duration-500 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] tracking-wider font-black text-slate-400 uppercase">4. Longevity Phase</span>
                    <Heart size={14} className="text-pink-400" />
                  </div>
                  <div>
                    <div className="text-[9px] uppercase font-bold text-slate-500">Vayassu</div>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-2xl font-black text-white">{results.vayassu}</span>
                      <span className="text-[9px] font-bold text-purple-400 uppercase tracking-widest">{results.vayassuName}</span>
                    </div>
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 border-t border-[#1E1F6D] pt-2 mt-2">
                    Life force duration
                  </div>
                </div>

                {/* 5. Vaaram */}
                <div className="bg-[#111242]/30 border border-[#1E1F6D]/60 p-5 rounded-3xl space-y-3 hover:border-[#7E30E1]/40 transition-all duration-500 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] tracking-wider font-black text-slate-400 uppercase">5. Solar Day</span>
                    <Calendar size={14} className="text-orange-400" />
                  </div>
                  <div>
                    <div className="text-[9px] uppercase font-bold text-slate-500">Vaaramu</div>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-lg font-black text-white">{results.vaaramName}</span>
                    </div>
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 border-t border-[#1E1F6D] pt-2 mt-2">
                    Solar cycle influence
                  </div>
                </div>

                {/* 6. Tithi */}
                <div className="bg-[#111242]/30 border border-[#1E1F6D]/60 p-5 rounded-3xl space-y-3 hover:border-[#7E30E1]/40 transition-all duration-500 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] tracking-wider font-black text-slate-400 uppercase">6. Lunar Day Phase</span>
                    <Moon size={14} className="text-blue-400" />
                  </div>
                  <div>
                    <div className="text-[9px] uppercase font-bold text-slate-500">Tithi</div>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-xs font-black text-white block leading-snug">{results.tithiName}</span>
                    </div>
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 border-t border-[#1E1F6D] pt-2 mt-2">
                    Lunar cycle phase
                  </div>
                </div>

                {/* 7. Nakshatram */}
                <div className="bg-[#111242]/30 border border-[#1E1F6D]/60 p-5 rounded-3xl space-y-3 hover:border-[#7E30E1]/40 transition-all duration-500 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] tracking-wider font-black text-slate-400 uppercase">7. Birth Star</span>
                    <Star size={14} className="text-[#7E30E1]" />
                  </div>
                  <div>
                    <div className="text-[9px] uppercase font-bold text-slate-500">Nakshatram</div>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-xl font-black text-white">{results.nakshatraName}</span>
                    </div>
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 border-t border-[#1E1F6D] pt-2 mt-2">
                    Horizontal star synastry
                  </div>
                </div>

                {/* 8. Amsa */}
                <div className="bg-[#111242]/30 border border-[#1E1F6D]/60 p-5 rounded-3xl space-y-3 hover:border-[#7E30E1]/40 transition-all duration-500 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] tracking-wider font-black text-slate-400 uppercase">8. Temperament</span>
                    <Sliders size={14} className="text-teal-400" />
                  </div>
                  <div>
                    <div className="text-[9px] uppercase font-bold text-slate-500">Amsa</div>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-xl font-black text-white">{results.amsaName}</span>
                    </div>
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 border-t border-[#1E1F6D] pt-2 mt-2">
                    Behavioral manifestation
                  </div>
                </div>

                {/* 9. Ayashu */}
                <div className="bg-[#111242]/30 border border-[#1E1F6D]/60 p-5 rounded-3xl space-y-3 hover:border-[#7E30E1]/40 transition-all duration-500 flex flex-col justify-between font-sans">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] tracking-wider font-black text-slate-400 uppercase">9. Vital Age</span>
                    <Cpu size={14} className="text-[#EC4899]" />
                  </div>
                  <div>
                    <div className="text-[9px] uppercase font-bold text-slate-500">Ayashu</div>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-2xl font-black text-white">{results.ayashu}</span>
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Years</span>
                    </div>
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 border-t border-[#1E1F6D] pt-2 mt-2">
                    Building lifecycle
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Ten-Dimensional Auspiciousness Rating Progress Bar board */}
          <section className="bg-[#111242]/50 border border-[#1E1F6D] rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-xl mb-20">
            <div className="absolute top-0 left-0 h-32 w-32 bg-[#7E30E1]/5 rounded-full blur-3xl" />
            <div>
              <span className="text-[10px] tracking-[0.25em] font-black uppercase text-[#7E30E1]">Dimensional Analysis</span>
              <h3 className="text-xl font-black text-white mt-1">Auspiciousness Ratings (Out of 100)</h3>
              <p className="text-xs text-slate-400 mt-1">Detailed scores assigned across each metaphysical dimension based on traditional criteria.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-300">1. Dhanam Inflow Score</span>
                    <span className="text-white">{results.dhanamScore} / 100</span>
                  </div>
                  <div className="h-2 bg-[#06071E] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#7E30E1] to-[#EC4899] transition-all duration-500" style={{ width: `${results.dhanamScore}%` }}></div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-300">2. Runam Outflow Control</span>
                    <span className="text-white">{results.runamScore} / 100</span>
                  </div>
                  <div className="h-2 bg-[#06071E] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#7E30E1] to-[#EC4899] transition-all duration-500" style={{ width: `${results.runamScore}%` }}></div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-300">3. Yoni Directional Orientation</span>
                    <span className="text-white">{results.yoniScore} / 100</span>
                  </div>
                  <div className="h-2 bg-[#06071E] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#7E30E1] to-[#EC4899] transition-all duration-500" style={{ width: `${results.yoniScore}%` }}></div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-300">4. Nakshatram Constellation Synastry</span>
                    <span className="text-white">{results.nakshatraScore} / 100</span>
                  </div>
                  <div className="h-2 bg-[#06071E] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#7E30E1] to-[#EC4899] transition-all duration-500" style={{ width: `${results.nakshatraScore}%` }}></div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-300">5. Amsa Quality Alignment</span>
                    <span className="text-white">{results.amsaScore} / 100</span>
                  </div>
                  <div className="h-2 bg-[#06071E] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#7E30E1] to-[#EC4899] transition-all duration-500" style={{ width: `${results.amsaScore}%` }}></div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-300">6. Tithi Lunar Day Auspiciousness</span>
                    <span className="text-white">{results.tithiScore} / 100</span>
                  </div>
                  <div className="h-2 bg-[#06071E] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#7E30E1] to-[#EC4899] transition-all duration-500" style={{ width: `${results.tithiScore}%` }}></div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-300">7. Solar Vaaram Benefic Rating</span>
                    <span className="text-white">{results.vaaramScore} / 100</span>
                  </div>
                  <div className="h-2 bg-[#06071E] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#7E30E1] to-[#EC4899] transition-all duration-500" style={{ width: `${results.vaaramScore}%` }}></div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-300">8. Presiding Deity Protection</span>
                    <span className="text-white">{results.deityScore} / 100</span>
                  </div>
                  <div className="h-2 bg-[#06071E] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#7E30E1] to-[#EC4899] transition-all duration-500" style={{ width: `${results.deityScore}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Dynamic Data Table: 10 to 500 Yards Vastu Optimizer */}
          <section id="optimizer" className="bg-[#111242]/50 border border-[#1E1F6D] rounded-3xl p-6 sm:p-8 backdrop-blur-md space-y-6 relative overflow-hidden shadow-xl mb-20">
            <div className="absolute top-0 right-0 h-40 w-40 bg-[#7E30E1]/5 rounded-full blur-3xl" />
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <Compass size={22} className="text-[#7E30E1]" /> Vastu Yard Optimizer (10 - 500 Yards)
                </h3>
                <p className="text-xs text-slate-400 mt-1">Discover, filter, and load highly auspicious plot sizes mapped across shastric calculations.</p>
              </div>
              
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-3 z-10">
                <div className="relative flex items-center bg-[#06071E] border border-[#1E1F6D] rounded-xl overflow-hidden focus-within:border-[#7E30E1]">
                  <Search size={14} className="text-slate-400 ml-3" />
                  <input 
                    type="text" 
                    value={optSearch} 
                    onChange={(e) => setOptSearch(e.target.value)} 
                    className="bg-transparent px-3 py-2 text-xs font-semibold text-white placeholder-slate-500 outline-none w-36 sm:w-44" 
                    placeholder="Search yard sizes..."
                  />
                </div>
                
                <select 
                  value={optFilter} 
                  onChange={(e) => setOptFilter(e.target.value)} 
                  className="bg-[#06071E] border border-[#1E1F6D] rounded-xl px-3 py-2 text-xs font-bold text-white outline-none focus:border-[#7E30E1]"
                >
                  <option value="all">All Verdicts</option>
                  <option value="highly_auspicious">Highly Auspicious (90+)</option>
                  <option value="auspicious">Good / Usable (70+)</option>
                  <option value="borderline">Borderline (40-69)</option>
                  <option value="avoid">Avoid / Inauspicious (&lt;40)</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-2xl border border-[#1E1F6D]">
              <table className="w-full text-left text-[11px] border-collapse min-w-[800px]">
                <thead className="bg-[#06071E] text-slate-300 font-bold uppercase tracking-wider border-b border-[#1E1F6D]">
                  <tr>
                    <th className="py-4 px-4 text-center">Yards</th>
                    <th className="py-4 px-4 text-center">Sft (Area)</th>
                    <th className="py-4 px-3 text-center">Dhanam</th>
                    <th className="py-4 px-3 text-center">Runam</th>
                    <th className="py-4 px-3 text-center">Star</th>
                    <th className="py-4 px-3 text-center">Yoni</th>
                    <th className="py-4 px-3 text-center">Amsa</th>
                    <th className="py-4 px-3 text-center">Tithi</th>
                    <th className="py-4 px-3 text-center">Solar Vara</th>
                    <th className="py-4 px-3 text-center">Score</th>
                    <th className="py-4 px-4 text-center">Verdict</th>
                    <th className="py-4 px-4 text-center">Select</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E1F6D]/50 text-slate-300 font-semibold bg-[#06071E]/40">
                  {paginatedData.map((row) => (
                    <tr key={row.yards} className="hover:bg-[#1E1F6D]/20 transition-colors">
                      <td className="py-3 px-4 text-center font-black">{row.yards} Yd</td>
                      <td className="py-3 px-4 text-center">{row.area} sqft</td>
                      <td className="py-3 px-3 text-center text-emerald-400">{row.dhanam}</td>
                      <td className="py-3 px-3 text-center text-rose-400">{row.runam}</td>
                      <td className="py-3 px-3 text-center">{row.nakshatra}</td>
                      <td className="py-3 px-3 text-center">{row.yoni}</td>
                      <td className="py-3 px-3 text-center">{row.amsa}</td>
                      <td className="py-3 px-3 text-center text-ellipsis overflow-hidden whitespace-nowrap max-w-[80px]">{row.tithi}</td>
                      <td className="py-3 px-3 text-center">{row.vaaram.split(' ')[0]}</td>
                      <td className="py-3 px-3 text-center font-black text-white">{row.score}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                          row.verdict === 'Highly Auspicious' ? 'bg-emerald-500/10 text-emerald-400' :
                          row.verdict === 'Auspicious / Good' ? 'bg-purple-500/10 text-purple-400' :
                          row.verdict === 'Avoid / Inauspicious' ? 'bg-rose-500/10 text-rose-400' : 'bg-slate-500/10 text-slate-400'
                        }`}>
                          {row.verdict.split(' / ')[0]}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button 
                          onClick={() => selectYardSize(row.yards)} 
                          className="px-2.5 py-1 text-[9px] font-black uppercase tracking-wider rounded-lg border border-[#7E30E1]/30 hover:border-[#7E30E1] bg-[#7E30E1]/5 hover:bg-[#7E30E1] hover:text-white transition-all active:scale-95"
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-400 pt-2 z-10 relative">
              <div>Showing {paginatedData.length > 0 ? (optPage * rowsPerPage) + 1 : 0} to {Math.min((optPage + 1) * rowsPerPage, filteredOptimizerData.length)} of {filteredOptimizerData.length} entries</div>
              <div className="flex gap-2">
                <button 
                  onClick={() => changePage(-1)} 
                  disabled={optPage === 0} 
                  className="px-4 py-2 rounded-xl bg-[#06071E] hover:bg-[#1E1F6D] border border-[#1E1F6D] text-white transition-colors disabled:opacity-40 disabled:pointer-events-none"
                >
                  Previous
                </button>
                <button 
                  onClick={() => changePage(1)} 
                  disabled={(optPage + 1) * rowsPerPage >= filteredOptimizerData.length} 
                  className="px-4 py-2 rounded-xl bg-[#06071E] hover:bg-[#1E1F6D] border border-[#1E1F6D] text-white transition-colors disabled:opacity-40 disabled:pointer-events-none"
                >
                  Next
                </button>
              </div>
            </div>
          </section>

          {/* Sthapatya Veda Reference Encyclopedia Section */}
          <section id="dictionary" className="bg-[#111242]/50 border border-[#1E1F6D] rounded-3xl p-6 sm:p-8 backdrop-blur-md space-y-8 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 left-0 h-32 w-32 bg-[#7E30E1]/5 rounded-full blur-3xl" />
            <div>
              <span className="text-[10px] tracking-[0.25em] font-black uppercase text-purple-400">Reference Manual</span>
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <BookOpen size={20} className="text-[#7E30E1]" /> Shastric Reference Encyclopedia
              </h3>
              <p className="text-xs text-slate-400 mt-1">Directly lookup qualitative shastric values for each modular remainder.</p>
            </div>

            {/* Tab selector */}
            <div className="flex flex-wrap gap-2 border-b border-[#1E1F6D] pb-4">
              <button 
                onClick={() => setDictTab('nakshatras')} 
                className={`px-4 py-2.5 rounded-xl text-xs font-black tracking-wider uppercase transition-all ${
                  dictTab === 'nakshatras' ? 'bg-[#7E30E1] text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                1. Nakshatras
              </button>
              <button 
                onClick={() => setDictTab('tithis')} 
                className={`px-4 py-2.5 rounded-xl text-xs font-black tracking-wider uppercase transition-all ${
                  dictTab === 'tithis' ? 'bg-[#7E30E1] text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                2. Tithis
              </button>
              <button 
                onClick={() => setDictTab('vara')} 
                className={`px-4 py-2.5 rounded-xl text-xs font-black tracking-wider uppercase transition-all ${
                  dictTab === 'vara' ? 'bg-[#7E30E1] text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                3. Weekdays
              </button>
              <button 
                onClick={() => setDictTab('yoni')} 
                className={`px-4 py-2.5 rounded-xl text-xs font-black tracking-wider uppercase transition-all ${
                  dictTab === 'yoni' ? 'bg-[#7E30E1] text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                4. Yoni & Aayam
              </button>
              <button 
                onClick={() => setDictTab('amsa')} 
                className={`px-4 py-2.5 rounded-xl text-xs font-black tracking-wider uppercase transition-all ${
                  dictTab === 'amsa' ? 'bg-[#7E30E1] text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                5. Amsa
              </button>
              <button 
                onClick={() => setDictTab('dhikpati')} 
                className={`px-4 py-2.5 rounded-xl text-xs font-black tracking-wider uppercase transition-all ${
                  dictTab === 'dhikpati' ? 'bg-[#7E30E1] text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                6. Deity
              </button>
            </div>

            {/* Encyclopedia dynamic panel */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2">
              {dictTab === 'nakshatras' && NAKSHATRAS.map(n => (
                <div key={n.id} className="bg-[#06071E]/50 border border-[#1E1F6D]/50 rounded-2xl p-4 space-y-2 hover:border-[#7E30E1]/30 transition-colors">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-black text-white">{n.id}. {n.name}</h4>
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                      n.status === 'Highly Auspicious' || n.status === 'Auspicious' ? 'bg-emerald-500/10 text-emerald-400' :
                      n.status === 'Neutral' ? 'bg-slate-500/10 text-slate-400' : 'bg-rose-500/10 text-rose-400'
                    }`}>{n.status}</span>
                  </div>
                  <p className="text-xs text-slate-400 font-semibold leading-relaxed">{n.desc}</p>
                </div>
              ))}
              
              {dictTab === 'tithis' && TITHIS.map(t => (
                <div key={t.id} className="bg-[#06071E]/50 border border-[#1E1F6D]/50 rounded-2xl p-4 space-y-2 hover:border-[#7E30E1]/30 transition-colors">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-black text-white">{t.id}. {t.name}</h4>
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                      t.status === 'Highly Auspicious' || t.status === 'Good' ? 'bg-emerald-500/10 text-emerald-400' :
                      t.status === 'Neutral' ? 'bg-slate-500/10 text-slate-400' : 'bg-rose-500/10 text-rose-400'
                    }`}>{t.status}</span>
                  </div>
                  <p className="text-[10px] font-black text-purple-400">{t.type} category</p>
                  <p className="text-xs text-slate-400 font-semibold leading-relaxed">{t.desc}</p>
                </div>
              ))}

              {dictTab === 'vara' && WEEKDAYS.map(w => (
                <div key={w.id} className="bg-[#06071E]/50 border border-[#1E1F6D]/50 rounded-2xl p-4 space-y-2 hover:border-[#7E30E1]/30 transition-colors">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-black text-white">{w.name}</h4>
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                      w.status === 'Highly Auspicious' || w.status === 'Auspicious' ? 'bg-emerald-500/10 text-emerald-400' :
                      w.status === 'Neutral' ? 'bg-slate-500/10 text-slate-400' : 'bg-rose-500/10 text-rose-400'
                    }`}>{w.status}</span>
                  </div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Ruler: {w.ruler}</p>
                  <p className="text-xs text-slate-400 font-semibold leading-relaxed">{w.desc}</p>
                </div>
              ))}

              {dictTab === 'yoni' && YONIS.map(y => (
                <div key={y.id} className="bg-[#06071E]/50 border border-[#1E1F6D]/50 rounded-2xl p-4 space-y-2 hover:border-[#7E30E1]/30 transition-colors">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-black text-white">{y.id}. {y.name}</h4>
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                      y.quality === 'Highly Auspicious' || y.quality === 'Auspicious' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                    }`}>{y.quality}</span>
                  </div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Direction: {y.dir}</p>
                  <p className="text-xs text-slate-400 font-semibold leading-relaxed">{y.desc}</p>
                </div>
              ))}

              {dictTab === 'amsa' && AMSAS.map(a => (
                <div key={a.id} className="bg-[#06071E]/50 border border-[#1E1F6D]/50 rounded-2xl p-4 space-y-2 hover:border-[#7E30E1]/30 transition-colors">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-black text-white">{a.id}. {a.name}</h4>
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                      a.quality === 'Highly Auspicious' ? 'bg-emerald-500/10 text-emerald-400' :
                      a.quality === 'Neutral' ? 'bg-slate-500/10 text-slate-400' : 'bg-rose-500/10 text-rose-400'
                    }`}>{a.quality}</span>
                  </div>
                  <p className="text-xs text-slate-400 font-semibold leading-relaxed">{a.desc}</p>
                </div>
              ))}

              {dictTab === 'dhikpati' && DEITIES.map(d => (
                <div key={d.id} className="bg-[#06071E]/50 border border-[#1E1F6D]/50 rounded-2xl p-4 space-y-2 hover:border-[#7E30E1]/30 transition-colors">
                  <h4 className="text-sm font-black text-white">{d.name}</h4>
                  <p className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Presides: {d.dir}</p>
                  <p className="text-xs text-slate-400 font-semibold leading-relaxed">{d.desc}</p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
