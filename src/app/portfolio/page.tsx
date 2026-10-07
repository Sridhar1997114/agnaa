"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, Search, Sparkles, MessageCircle, Eye, X, CheckCircle2, Lock, Box, ArrowRight
} from 'lucide-react';

export interface LedgerItem {
  id: string;
  title: string;
  clientOrContext: string;
  location: string;
  year: string;
  type: 'Architectural Design' | '3D Cinema & Video' | 'Built Execution' | 'Urban Masterplan' | 'Turnkey Interior' | 'Statutory Sanction';
  category: 'Civic & State' | 'Residential' | 'Commercial' | 'Institutional' | 'Real Estate & Media';
  scope: string;
  image?: string;
  isConfidential?: boolean;
  tag?: string;
  bentoSpan?: string; // For Apple Bento layout
  bentoHighlight?: string;
}

// ── 9 CURATED BENTO SHOWCASE WORKS (APPLE SLEEK BENTO GRID) ──
const BENTO_WORKS: LedgerItem[] = [
  {
    id: 'nizamuddin-dargah-aga-khan',
    title: 'Nizamuddin Dargah Heritage Exhibit Film',
    clientOrContext: 'Aga Khan Trust for Culture (AKTC)',
    location: "Humayun's Tomb Museum, Delhi",
    year: '2021 – Present',
    type: '3D Cinema & Video',
    category: 'Civic & State',
    scope: 'Permanent daily loop museum exhibit film & cultural documentation.',
    image: '/projects/nizamuddin-aktc-heritage.webp',
    isConfidential: true,
    tag: 'UNESCO World Heritage',
    bentoSpan: 'col-span-1 md:col-span-2 lg:col-span-2 row-span-2',
    bentoHighlight: 'Permanent Daily Loop Inside Humayun\'s Tomb Museum'
  },
  {
    id: 'marvella-luxury-tower',
    title: 'Marvella 30-Storey Luxury Residential Tower',
    clientOrContext: 'Marvella Living / Manila Visuals',
    location: 'High-Density Luxury Sector',
    year: '2023 – 2024',
    type: 'Architectural Design',
    category: 'Residential',
    scope: '30-floor iconic tower, cantilevered aerodynamic balconies & sky lounge.',
    image: '/projects/manila/marvella-luxury-residences-tower.webp',
    isConfidential: true,
    tag: '30-Storey Tower',
    bentoSpan: 'col-span-1 md:col-span-1 lg:col-span-1 row-span-2',
    bentoHighlight: 'Aerodynamic Cantilever Balconies'
  },
  {
    id: 'sunder-nursery-garden-house',
    title: 'Sunder Nursery Ecological Garden House',
    clientOrContext: 'AKTC Buffer / Manila Visuals',
    location: 'Sunder Nursery Park, Delhi',
    year: '2021 – 2023',
    type: 'Architectural Design',
    category: 'Civic & State',
    scope: 'Ecological heritage glass pavilion & botanical conservatory buffer.',
    image: '/projects/manila/sunder-nursery-garden-house.webp',
    isConfidential: true,
    tag: 'UNESCO Buffer',
    bentoSpan: 'col-span-1 md:col-span-1 lg:col-span-1 row-span-1',
    bentoHighlight: 'Ecological Glass Conservatory'
  },
  {
    id: 'aiims-safdarjung-delhi',
    title: 'AIIMS Safdarjung Apex Healthcare Complex',
    clientOrContext: 'Ministry of Health / Manila Visuals',
    location: 'Safdarjung, New Delhi',
    year: '2021 – 2022',
    type: 'Architectural Design',
    category: 'Institutional',
    scope: 'Multi-block tertiary healthcare campus & trauma emergency wing.',
    image: '/projects/manila/aiims-safdarjung.webp',
    isConfidential: true,
    tag: 'Apex Healthcare',
    bentoSpan: 'col-span-1 md:col-span-1 lg:col-span-1 row-span-1',
    bentoHighlight: 'Tertiary Medical Center'
  },
  {
    id: 'yadagirigutta-telangana-cm',
    title: 'Yadagirigutta Sacred Temple Corridor Masterplan',
    clientOrContext: "Hon'ble Chief Minister of Telangana / YTDA",
    location: 'Yadagirigutta, Telangana',
    year: '2020 – 2021',
    type: 'Urban Masterplan',
    category: 'Civic & State',
    scope: 'Sacred urban masterplan, hilltown pedestrian concourse & 4K reel.',
    image: '/projects/yadagirigutta-temple-hilltown.webp',
    isConfidential: true,
    tag: 'Sacred Masterplan',
    bentoSpan: 'col-span-1 md:col-span-1 lg:col-span-1 row-span-1',
    bentoHighlight: 'Chief Minister Sanction'
  },
  {
    id: 'balinese-resort-villa',
    title: 'Balinese Tropical Luxury Resort Villa & Pavilion',
    clientOrContext: 'Private Resort Developer / Manila Visuals',
    location: 'Eco-Resort Belt',
    year: '2023 – 2024',
    type: 'Architectural Design',
    category: 'Residential',
    scope: 'Thatched-roof Balinese architecture, infinity reflection pool & living pavilion.',
    image: '/projects/manila/balinese-luxury-resort-villa-exterior.webp',
    isConfidential: true,
    tag: 'Tropical Luxury',
    bentoSpan: 'col-span-1 md:col-span-2 lg:col-span-2 row-span-1',
    bentoHighlight: 'Infinity Reflection Waterscape'
  },
  {
    id: 'big-red-group-hq',
    title: 'Big Red Group Commercial Headquarters',
    clientOrContext: 'Big Red Group / Manila Visuals',
    location: 'Prime Business District',
    year: '2023 – 2024',
    type: 'Architectural Design',
    category: 'Commercial',
    scope: 'Grade-A corporate HQ, double-height glazed atrium & rooftop terrace.',
    image: '/projects/manila/big-red-group-commercial-hq.webp',
    isConfidential: true,
    tag: 'Corporate HQ',
    bentoSpan: 'col-span-1 md:col-span-1 lg:col-span-1 row-span-1',
    bentoHighlight: 'Double-Height Glazed Atrium'
  },
  {
    id: 'gachibowli-residence',
    title: 'TNGOs Colony Commercial-Residential Complex',
    clientOrContext: 'AGNAA Built Execution',
    location: 'Gachibowli, Hyderabad',
    year: '2021 – 2024',
    type: 'Built Execution',
    category: 'Residential',
    scope: '8,100 Sq. Ft G+3+Penthouse built execution complex with ground retail.',
    image: '/projects/gachibowli-tngos-facade.webp',
    isConfidential: true,
    tag: 'Built Execution',
    bentoSpan: 'col-span-1 md:col-span-1 lg:col-span-1 row-span-1',
    bentoHighlight: '8,100 Sq. Ft Built in Gachibowli'
  },
  {
    id: 'siri-construction-pitch-films',
    title: '100+ Architectural Films & Spatial Visualizers',
    clientOrContext: 'Siri Construction & Manila Visuals Collaborative',
    location: 'National & Regional',
    year: '2020 – 2026',
    type: '3D Cinema & Video',
    category: 'Real Estate & Media',
    scope: 'High-impact 3D architectural walkthroughs, pitch films & investor reels.',
    image: '/projects/siri-construction-pitch.webp',
    isConfidential: true,
    tag: '100+ Video Films',
    bentoSpan: 'col-span-1 md:col-span-2 lg:col-span-2 row-span-1',
    bentoHighlight: '100+ Cinematic 3D Investor Walkthroughs'
  }
];

// ── MASTER ARCHITECTURAL LEDGER (ALL 42+ VERIFIED COMMISSIONS) ──
const ARCHIVE_REGISTRY: LedgerItem[] = [
  // ── CIVIC & STATE LANDMARKS ──
  {
    id: 'nizamuddin-dargah-aga-khan',
    title: 'Nizamuddin Dargah Heritage & Museum Exhibit Film',
    clientOrContext: 'Aga Khan Trust for Culture (AKTC)',
    location: "Humayun's Tomb Museum, Delhi",
    year: '2021 – Present',
    type: '3D Cinema & Video',
    category: 'Civic & State',
    scope: 'Permanent Daily Loop Museum Exhibit Film & Cultural Documentation',
    image: '/projects/nizamuddin-aktc-heritage.webp',
    isConfidential: true,
    tag: 'UNESCO World Heritage'
  },
  {
    id: 'patiala-heritage-punjab-cm',
    title: 'Patiala Heritage & Urban Corridor Revitalization',
    clientOrContext: "Hon'ble Chief Minister of Punjab",
    location: 'Patiala, Punjab',
    year: '2020 – 2021',
    type: 'Urban Masterplan',
    category: 'Civic & State',
    scope: 'State Urban Masterplan & Heritage Revitalization (Official Government Work Order)',
    image: '/projects/patiala-work-order.webp',
    isConfidential: true,
    tag: 'Official Govt Order'
  },
  {
    id: 'yadagirigutta-telangana-cm',
    title: 'Yadagirigutta Sacred Temple Corridor Masterplan',
    clientOrContext: "Hon'ble Chief Minister of Telangana / YTDA",
    location: 'Yadagirigutta, Telangana',
    year: '2020 – 2021',
    type: 'Urban Masterplan',
    category: 'Civic & State',
    scope: 'Sacred Urban Masterplan, Hilltown Pedestrian Concourse & 4K Visualization',
    image: '/projects/yadagirigutta-temple-hilltown.webp',
    isConfidential: true,
    tag: 'Sacred Masterplan'
  },
  {
    id: 'sunder-nursery-garden-house',
    title: 'Sunder Nursery Ecological Garden House & Pavilion',
    clientOrContext: 'Aga Khan Heritage Buffer / Manila Visuals',
    location: 'Sunder Nursery Heritage Park, Delhi',
    year: '2021 – 2023',
    type: 'Architectural Design',
    category: 'Civic & State',
    scope: 'Ecological Heritage Glass Pavilion, Conservatory Framing & Botanical Buffer',
    image: '/projects/manila/sunder-nursery-garden-house.webp',
    isConfidential: true,
    tag: 'UNESCO Buffer'
  },
  {
    id: 'iccc-smart-city-centre',
    title: 'Integrated Command & Control Centre (ICCC)',
    clientOrContext: 'Smart Cities Mission / Manila Visuals',
    location: 'Smart City Metro Hub',
    year: '2022 – 2023',
    type: 'Architectural Design',
    category: 'Civic & State',
    scope: 'High-Security Central Operations Facility, Kinetic Louvered Facade & Civic Plaza',
    image: '/projects/manila/iccc-smart-city-centre.webp',
    isConfidential: true,
    tag: 'Smart City Operations'
  },
  {
    id: 'national-academy-archery',
    title: 'National Academy of Archery & Sports Arena',
    clientOrContext: 'National Sports Council / Manila Visuals',
    location: 'National Sports Complex',
    year: '2022 – 2023',
    type: 'Architectural Design',
    category: 'Civic & State',
    scope: 'Olympic-Standard Archery Training Arena, Tensile Canopy & Spectator Seating',
    image: '/projects/manila/national-academy-archery.webp',
    isConfidential: true,
    tag: 'Olympic Academy'
  },
  {
    id: 'olympic-sports-complex-stadium',
    title: 'Olympic Sports Complex & 40,000-Seat Stadium',
    clientOrContext: 'State Sports Authority / Manila Visuals',
    location: 'Regional Sports City',
    year: '2022 – 2024',
    type: 'Architectural Design',
    category: 'Civic & State',
    scope: '40,000-Seat Multi-Sport Stadium, Atmospheric Floodlit Concourses & Arena Facade',
    image: '/projects/manila/olympic-sports-stadium-facade.webp',
    isConfidential: true,
    tag: 'Olympic Arena'
  },
  {
    id: 'olympic-sports-complex-aerial',
    title: 'Olympic Sports Complex Master Aerial Concourse',
    clientOrContext: 'Sports Infrastructure Council',
    location: 'Regional Sports City',
    year: '2022 – 2024',
    type: 'Urban Masterplan',
    category: 'Civic & State',
    scope: 'Masterplan Aerial Spatial Integration, Transit Plazas & Athletic Track Circulation',
    image: '/projects/manila/olympic-sports-complex-aerial.webp',
    isConfidential: true,
    tag: 'Athletic Masterplan'
  },
  {
    id: 'thub-incubation-campus',
    title: 'T-Hub Phase II Incubation Center & Campus',
    clientOrContext: 'Telangana Tech & Innovation Hub',
    location: 'Raidurg, Hyderabad',
    year: '2020 – 2022',
    type: 'Architectural Design',
    category: 'Civic & State',
    scope: 'Fractal Menger Sponge Massing & Stepped Terraced Floor Plates',
    image: '/projects/thub-perspective.webp',
    isConfidential: true,
    tag: 'Innovation Hub'
  },
  {
    id: 'bihar-sharif-flyover',
    title: 'Flyover Bihar Sharif & Civic Infrastructure Alignment',
    clientOrContext: 'Bihar State Government',
    location: 'Bihar',
    year: '2020 – 2021',
    type: 'Urban Masterplan',
    category: 'Civic & State',
    scope: 'Civic Infrastructure, Flyover Alignment & Urban Housing Developments',
    image: '/projects/bihar-sharif-flyover.webp',
    isConfidential: true,
    tag: 'Civic Infrastructure'
  },
  {
    id: 'aramaisamma-temple',
    title: 'Aramaisamma Sacred Temple Shrine & Vimana Gopuram',
    clientOrContext: 'Temple Trust & Community',
    location: 'Telangana',
    year: '2023',
    type: 'Architectural Design',
    category: 'Civic & State',
    scope: 'Traditional Dravidian Elevation, Vimana Gopuram & Ceremonial Concourse',
    image: '/projects/aramaisamma-temple.webp',
    tag: 'Sacred Architecture'
  },

  // ── 3D CINEMA VIDEOS & EDITED FILM COMMISSIONS ──
  {
    id: 'siri-construction-pitch-films',
    title: '100+ Architectural 3D Cinema Films & Investor Reels',
    clientOrContext: 'Siri Construction & Manila Visuals Collaborative',
    location: 'National & Regional',
    year: '2020 – 2026',
    type: '3D Cinema & Video',
    category: 'Real Estate & Media',
    scope: 'High-Impact 3D Architectural Walkthroughs, Pitch Visualizations & Cinema Reels',
    image: '/projects/siri-construction-pitch.webp',
    isConfidential: true,
    tag: '100+ Films Edited'
  },
  {
    id: 'marvella-cinematic-flythrough',
    title: 'Marvella 30-Storey Tower Drone Cinematic Flythrough',
    clientOrContext: 'Marvella Living / Manila Visuals',
    location: 'Luxury Living Sector',
    year: '2023 – 2024',
    type: '3D Cinema & Video',
    category: 'Real Estate & Media',
    scope: '3D Drone Flight Simulation, Balcony Aerodynamics & Sunset Lighting Reel',
    image: '/projects/manila/marvella-luxury-penthouse-balconies.webp',
    isConfidential: true,
    tag: '3D Drone Video'
  },
  {
    id: 'balinese-resort-360-tour',
    title: 'Balinese Tropical Resort Villa 360° Virtual Walkthrough',
    clientOrContext: 'Private Eco-Resort Client / Manila Visuals',
    location: 'Eco-Resort Belt',
    year: '2023 – 2024',
    type: '3D Cinema & Video',
    category: 'Real Estate & Media',
    scope: 'Interactive 360° Panoramic Video Walkthrough & Water Reflection Simulation',
    image: '/projects/manila/balinese-luxury-villa-panoramic-pool.webp',
    isConfidential: true,
    tag: '360° Walkthrough Video'
  },
  {
    id: 'yadagirigutta-concourse-film',
    title: 'Yadagirigutta Sacred Concourse 4K Drone Simulation',
    clientOrContext: 'Telangana CMO / YTDA',
    location: 'Yadagirigutta, Telangana',
    year: '2021',
    type: '3D Cinema & Video',
    category: 'Real Estate & Media',
    scope: 'Pilgrimage Concourse Flow, Ceremonial Lighting & 4K Aerial Sequence',
    image: '/projects/yadagirigutta-temple-hilltown.webp',
    isConfidential: true,
    tag: '4K Government Reel'
  },
  {
    id: 'big-red-group-hq-video',
    title: 'Big Red Group Commercial HQ Architectural Cinema Reel',
    clientOrContext: 'Big Red Group / Manila Visuals',
    location: 'Prime Business District',
    year: '2023',
    type: '3D Cinema & Video',
    category: 'Real Estate & Media',
    scope: 'Double-Height Atrium Flythrough, Sun-Study Shadow Reel & Corporate Identity Film',
    image: '/projects/manila/big-red-group-commercial-hq.webp',
    isConfidential: true,
    tag: 'Corporate Film Reel'
  },

  // ── RESIDENTIAL ARCHITECTURE & BUILT WORKS ──
  {
    id: 'gachibowli-residence',
    title: 'TNGOs Colony Commercial-Residential Complex (Built Execution)',
    clientOrContext: 'AGNAA Built Execution',
    location: 'Gachibowli, Hyderabad',
    year: '2021 – 2024',
    type: 'Built Execution',
    category: 'Residential',
    scope: '8,100 Sq. Ft G+3+Penthouse Built Complex with Commercial Ground Floor',
    image: '/projects/gachibowli-tngos-facade.webp',
    isConfidential: true,
    tag: 'Built Execution'
  },
  {
    id: 'marvella-luxury-tower',
    title: 'Marvella 30-Storey Luxury Residential High-Rise Tower',
    clientOrContext: 'Marvella Living / Manila Visuals',
    location: 'Luxury Residential Sector',
    year: '2023 – 2024',
    type: 'Architectural Design',
    category: 'Residential',
    scope: '30-Floor Iconic Tower, Cantilevered Aerodynamic Balconies & Sky Amenity Lounge',
    image: '/projects/manila/marvella-luxury-residences-tower.webp',
    isConfidential: true,
    tag: '30-Storey Tower'
  },
  {
    id: 'balinese-resort-villa',
    title: 'Balinese Tropical Luxury Resort Villa & Pavilion',
    clientOrContext: 'Private Resort Developer / Manila Visuals',
    location: 'Eco-Resort Belt',
    year: '2023 – 2024',
    type: 'Architectural Design',
    category: 'Residential',
    scope: 'Thatched-Roof Balinese Architecture, Infinity Reflection Pool & Open Living Pavilions',
    image: '/projects/manila/balinese-luxury-resort-villa-exterior.webp',
    isConfidential: true,
    tag: 'Tropical Resort Villa'
  },
  {
    id: 'classical-colonial-stone-mansion',
    title: 'Classical Neo-Colonial Sandstone & Stucco Estate',
    clientOrContext: 'Private HNW Client / Manila Visuals',
    location: 'Prime Suburban Enclave',
    year: '2022 – 2023',
    type: 'Architectural Design',
    category: 'Residential',
    scope: '12,000 Sq. Ft Classical Sandstone & Stucco Mansion, Symmetrical Balustrades',
    image: '/projects/manila/classical-colonial-stone-mansion.webp',
    isConfidential: true,
    tag: 'Classical Manor'
  },
  {
    id: 'mediterranean-tuscan-villa',
    title: 'Tuscan Mediterranean Courtyard Villa',
    clientOrContext: 'Abhijeeth Residence / Manila Visuals',
    location: 'Private Residential Enclave',
    year: '2023',
    type: 'Architectural Design',
    category: 'Residential',
    scope: 'Spanish Tile Hipped Roofs, Rustic Stone Clad Central Bay & Wrought Iron Loggias',
    image: '/projects/manila/mediterranean-tuscan-villa.webp',
    isConfidential: true,
    tag: 'Mediterranean Villa'
  },
  {
    id: 'contemporary-urban-townhouse',
    title: 'Contemporary Urban Duplex Townhouse (House 9)',
    clientOrContext: 'Private Urban Residence / Manila Visuals',
    location: 'Gated Residential Community',
    year: '2023 – 2024',
    type: 'Architectural Design',
    category: 'Residential',
    scope: 'Minimalist Cantilevered Duplex, Glass Garden Balcony & Integrated Entry Gateway',
    image: '/projects/manila/contemporary-urban-townhouse-duplex.webp',
    isConfidential: true,
    tag: 'Modern Duplex'
  },
  {
    id: 'jubilee-hills-renovation',
    title: 'Jubilee Hills Villa Facade Retrofit & Staircase Engineering',
    clientOrContext: 'Private Villa Client (Rama - Srinija)',
    location: 'Jubilee Hills, Hyderabad',
    year: '2023',
    type: 'Architectural Design',
    category: 'Residential',
    scope: 'Luxury Elevation Retrofit, Vastu Staircase Engineering & Turnkey Interior',
    image: '/projects/jubilee-hills-villa.webp',
    isConfidential: true,
    tag: 'Luxury Renovation'
  },
  {
    id: 'banjara-hills-suresh-reddy',
    title: 'Banjara Hills Residence & Vastu Layout Plans',
    clientOrContext: 'Mr. Suresh Reddy',
    location: 'Banjara Hills, Hyderabad',
    year: '2023',
    type: 'Architectural Design',
    category: 'Residential',
    scope: 'Luxury Residence Floor Layout, Working Drawings & Vastu Re-alignment',
    image: '/projects/banjara-hills-residence.webp',
    isConfidential: true,
    tag: 'Banjara Hills Estate'
  },
  {
    id: 'mokila-villa-design',
    title: 'Mokila Luxury Villa & Tensile Carport Canopy',
    clientOrContext: 'Private Villa Client',
    location: 'Mokila, Hyderabad',
    year: '2023',
    type: 'Architectural Design',
    category: 'Residential',
    scope: 'Architectural Layout, Tensile Carport Canopy & Integrated Garden Courtyard',
    image: '/projects/mokila-villa-canopy.webp',
    tag: 'Luxury Villa'
  },
  {
    id: 'tanda-contemporary-residence',
    title: 'Tanda Contemporary Residence & Cylindrical Column',
    clientOrContext: 'Private Residence Client',
    location: 'Telangana',
    year: '2023',
    type: 'Architectural Design',
    category: 'Residential',
    scope: 'Modern Residence Elevation with Signature Cylindrical Concrete Column',
    image: '/projects/tanda-home-circle.webp',
    tag: 'Contemporary Home'
  },
  {
    id: 'modernist-brick-apartments',
    title: 'Modernist Brick Urban Residences (G+4 Stilt+4)',
    clientOrContext: 'Housing Consortium / Manila Visuals',
    location: 'Metro Residential Sector',
    year: '2022 – 2023',
    type: 'Architectural Design',
    category: 'Residential',
    scope: 'Stilt+4 Premium Urban Apartments, Wirecut Brick Pilasters & Cantilevered Balconies',
    image: '/projects/manila/modernist-brick-urban-residences.webp',
    isConfidential: true,
    tag: 'Boutique Apartments'
  },
  {
    id: 'boutique-residential-apartments',
    title: 'Boutique Terraced Residential Living (G+4)',
    clientOrContext: 'Residential Developer / Manila Visuals',
    location: 'Urban Living Sector',
    year: '2023',
    type: 'Architectural Design',
    category: 'Residential',
    scope: 'Multi-Tier Balconied Urban Residences, Textured Terracotta Brick & Corner Planters',
    image: '/projects/manila/modern-boutique-residential-apartments.webp',
    isConfidential: true,
    tag: 'Terraced Living'
  },

  // ── TURNKEY INTERIORS & COMMERCIAL HOSPITALITY ──
  {
    id: 'curated-penthouse-interior',
    title: 'Curated Luxury Penthouse Living & Formal Dining Suite',
    clientOrContext: 'Private Penthouse / Manila Visuals',
    location: 'Metropolitan Penthouse',
    year: '2023 – 2024',
    type: 'Turnkey Interior',
    category: 'Residential',
    scope: 'Fluted Brass Chandelier, Custom Oriental Mural Art, French Oak Joinery & Marble Floors',
    image: '/projects/manila/curated-luxury-residence-living-interior.webp',
    isConfidential: true,
    tag: 'Luxury Penthouse Suite'
  },
  {
    id: 'sculptural-stair-atrium',
    title: 'Double-Height Sculptural Staircase Atrium & Zen Garden',
    clientOrContext: 'Private Villa / Manila Visuals',
    location: 'Luxury Villa Enclave',
    year: '2023',
    type: 'Turnkey Interior',
    category: 'Residential',
    scope: 'Cantilevered Treads, Frameless Glass Balustrade, River Pebble Bed & Bronze Sculpture',
    image: '/projects/manila/double-height-sculptural-atrium-lobby.webp',
    isConfidential: true,
    tag: 'Sculptural Atrium'
  },
  {
    id: 'tausif-daycare-interiors',
    title: 'Tausif Child Development & Sensory Playzone Interiors',
    clientOrContext: 'Institutional Client Tausif',
    location: 'Hyderabad',
    year: '2024',
    type: 'Turnkey Interior',
    category: 'Institutional',
    scope: '30+ Enscape Interior Scenes, Reception, Interactive Sensory Zones & Acoustic Seating',
    image: '/projects/tausif-daycare-playzone.webp',
    isConfidential: true,
    tag: '30+ Enscape Scenes'
  },
  {
    id: 'sai-koushik-apartment-interiors',
    title: 'Sai Koushik Turnkey Luxury Apartment Interiors',
    clientOrContext: 'Sai Koushik',
    location: 'Hyderabad',
    year: '2023 – 2024',
    type: 'Turnkey Interior',
    category: 'Residential',
    scope: 'Biophilic Living Room, Turnkey Woodwork & Acoustic False Ceiling',
    image: '/projects/sai-apartment-interior.webp',
    tag: 'Turnkey Interiors'
  },
  {
    id: 'sai-koushik-terrace-deck',
    title: 'Penthouse Biophilic Skydeck & Terrace Pergola',
    clientOrContext: 'Sai Koushik',
    location: 'Hyderabad',
    year: '2023 – 2024',
    type: 'Turnkey Interior',
    category: 'Residential',
    scope: 'Pergola Skydeck, Green Planters, Ambient Deck Lighting & Outdoor Lounge',
    image: '/projects/sai-terrace-deck.webp',
    tag: 'Rooftop Skydeck'
  },
  {
    id: 'big-red-group-hq',
    title: 'Big Red Group Commercial Corporate Headquarters',
    clientOrContext: 'Big Red Group / Manila Visuals',
    location: 'Prime Business District',
    year: '2023 – 2024',
    type: 'Architectural Design',
    category: 'Commercial',
    scope: 'Grade-A Commercial Corporate HQ, Double-Height Glazed Atrium & Rooftop Deck',
    image: '/projects/manila/big-red-group-commercial-hq.webp',
    isConfidential: true,
    tag: 'Corporate HQ Tower'
  },
  {
    id: 'shopping-mall-promenade',
    title: 'Grand Retail Promenade & Commercial Shopping Mall',
    clientOrContext: 'Commercial Developer / Manila Visuals',
    location: 'High-Street Retail District',
    year: '2023 – 2024',
    type: 'Architectural Design',
    category: 'Commercial',
    scope: '150,000 Sq. Ft Shopping Promenade, Glass Pedestrian Walkways & Anchor Showrooms',
    image: '/projects/manila/commercial-shopping-mall-promenade.webp',
    isConfidential: true,
    tag: 'Commercial Mall'
  },
  {
    id: 'shopping-mall-facade',
    title: 'Commercial Retail Promenade Facade & Public Plaza',
    clientOrContext: 'Commercial Developer / Manila Visuals',
    location: 'Retail Boulevard',
    year: '2023 – 2024',
    type: 'Architectural Design',
    category: 'Commercial',
    scope: 'Architectural Glazing, Multi-Tier Signage Louvers & Pedestrian Public Plaza',
    image: '/projects/manila/commercial-retail-mall-facade.webp',
    isConfidential: true,
    tag: 'Retail Plaza'
  },
  {
    id: 'tech-corporate-workspace',
    title: 'Tech Enterprise Agile Workspace Floor Fitout',
    clientOrContext: 'Technology Group / Manila Visuals',
    location: 'Tech SEZ Zone',
    year: '2023 – 2024',
    type: 'Turnkey Interior',
    category: 'Commercial',
    scope: 'Agile Open Office, Suspended Linear Acoustic Luminaires, Ergonomic Pods & Focus Zones',
    image: '/projects/manila/tech-corporate-collaborative-workspace.webp',
    isConfidential: true,
    tag: 'Tech Workspace'
  },
  {
    id: 'executive-lounge-cafe',
    title: 'Executive Biophilic Lounge & Acoustic Cafe',
    clientOrContext: 'Corporate Tower / Manila Visuals',
    location: 'Corporate HQ Atrium',
    year: '2023 – 2024',
    type: 'Turnkey Interior',
    category: 'Commercial',
    scope: 'Parametric Timber Slat Screening, Executive Barista Bar & Scandinavian Breakout Lounge',
    image: '/projects/manila/executive-lounge-acoustic-cafe.webp',
    isConfidential: true,
    tag: 'Acoustic Lounge'
  },
  {
    id: 'zostel-dodo-hostel',
    title: 'Zostel DODO Hospitality Youth Hostel',
    clientOrContext: 'Zostel / DODO Hospitality',
    location: 'Telangana',
    year: '2022',
    type: 'Architectural Design',
    category: 'Commercial',
    scope: 'Youth Hospitality Space Planning, Modular Bunk Pods & Communal Cafe',
    image: '/projects/zostel-dodo-hostel.webp',
    tag: 'Boutique Hospitality'
  },
  {
    id: 'shawarma-hub-retail',
    title: 'Shawarma Hub Commercial Retail Dining Fitout',
    clientOrContext: 'IMRAN Food & Retail Group',
    location: 'Hyderabad',
    year: '2023',
    type: 'Turnkey Interior',
    category: 'Commercial',
    scope: 'Commercial QSR Kitchen Layout, Customer Seating & Brand Identity Interior',
    image: '/projects/shawarma-hub-retail.webp',
    tag: 'Commercial QSR'
  },
  {
    id: 'yogesh-boutique-retail',
    title: 'Yogesh High-Street Commercial Boutique Fitout',
    clientOrContext: 'Yogesh Commercial Client',
    location: 'Hyderabad High Street',
    year: '2023',
    type: 'Turnkey Interior',
    category: 'Commercial',
    scope: 'Commercial Boutique Fitout, Display Geometry & Track Spotlighting',
    image: '/projects/yogesh-retail-shop.webp',
    tag: 'Retail Boutique'
  },

  // ── INSTITUTIONAL & HEALTHCARE ──
  {
    id: 'aiims-safdarjung-delhi',
    title: 'AIIMS Safdarjung Apex Healthcare Hospital Complex',
    clientOrContext: 'Ministry of Health / Manila Visuals',
    location: 'Safdarjung, New Delhi',
    year: '2021 – 2022',
    type: 'Architectural Design',
    category: 'Institutional',
    scope: 'Multi-Block Tertiary Healthcare Campus, Emergency Trauma Wing & Facade Engineering',
    image: '/projects/manila/aiims-safdarjung.webp',
    isConfidential: true,
    tag: 'Apex Healthcare Campus'
  },
  {
    id: 'central-public-library',
    title: 'Central Public & Academic Research Library',
    clientOrContext: 'Civic Knowledge Foundation / Manila Visuals',
    location: 'Institutional District',
    year: '2022 – 2023',
    type: 'Architectural Design',
    category: 'Institutional',
    scope: 'Monolithic Architectural Concrete Facade, Sunken Reading Pavilions & Research Stacks',
    image: '/projects/manila/central-public-library.webp',
    isConfidential: true,
    tag: 'Research Library'
  },
  {
    id: 'apex-k12-educational-campus',
    title: 'Apex 12-Acre K-12 Institutional Educational Campus',
    clientOrContext: 'Progressive Educational Trust / Manila Visuals',
    location: 'Education City',
    year: '2023 – 2024',
    type: 'Architectural Design',
    category: 'Institutional',
    scope: '12-Acre Masterplan, Curved Brick Academic Wings, Central Courtyard & Bus Terminal',
    image: '/projects/manila/institutional-academic-campus-aerial.webp',
    isConfidential: true,
    tag: '12-Acre Campus'
  },
  {
    id: 'multispecialty-healthcare-nursing-home',
    title: 'Multi-Specialty Clinical Healthcare Center (50-Bed)',
    clientOrContext: 'Healthcare Consortium / Manila Visuals',
    location: 'Urban Healthcare Sector',
    year: '2022 – 2023',
    type: 'Architectural Design',
    category: 'Institutional',
    scope: '50-Bed Specialized Medical Facility, Emergency Circulation Ramp & Inpatient Suites',
    image: '/projects/manila/multispecialty-healthcare-nursing-home.webp',
    isConfidential: true,
    tag: 'Specialty Healthcare'
  },
  {
    id: 'cambridge-school-campus',
    title: 'Cambridge Public School Master Campus (28,000 Sq. Ft)',
    clientOrContext: 'Educational Trust',
    location: 'Lingampally, Hyderabad',
    year: '2023',
    type: 'Architectural Design',
    category: 'Institutional',
    scope: '28,000 Sq. Ft Academic Masterplan, Activity Hub & Sports Grounds',
    image: '/projects/cambridge-school-campus.webp',
    tag: 'Academic Campus'
  },
  {
    id: 'study-square-academy',
    title: 'STUDY SQUARE Educational Institute',
    clientOrContext: 'Prashanth',
    location: 'Telangana',
    year: '2024',
    type: 'Turnkey Interior',
    category: 'Institutional',
    scope: 'Institutional Classrooms, Administrative Hub & High-Density Space Planning',
    image: '/projects/study-square-institute.webp',
    tag: 'Academic Institute'
  },

  // ── STATUTORY & COMPUTATIONAL ──
  {
    id: 'laxman-house-tgbpass',
    title: 'Laxman House TG-bPASS Statutory Municipal Sanctions',
    clientOrContext: 'Private Development Client',
    location: 'Hyderabad Municipal Limits',
    year: '2024',
    type: 'Statutory Sanction',
    category: 'Real Estate & Media',
    scope: 'TG-bPASS Statutory Sanctions, Municipal Liaison & Approved Building Drawing Sets',
    image: '/projects/laxman-house-tgbpass.webp',
    isConfidential: true,
    tag: 'TG-bPASS Sanctions'
  },
  {
    id: 'aa-algorithmic-porosity',
    title: 'AA Computational Spatial Porosity Studies (Menger Sponge)',
    clientOrContext: 'AGNAA Spatial Lab • SPA Delhi',
    location: 'London / New Delhi',
    year: '2020 – 2025',
    type: 'Architectural Design',
    category: 'Real Estate & Media',
    scope: 'Subtractive 3D Menger Sponge Boolean Voxel System Encoding PORTFOLIO',
    image: '/projects/menger-portfolio-cube.webp',
    isConfidential: true,
    tag: 'Parametric Engine'
  }
];

export default function SleekAppleBentoPortfolioPage() {
  const [filterType, setFilterType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [previewImage, setPreviewImage] = useState<{ src: string; title: string } | null>(null);

  // Directly connects client to Ar. Sridhar on WhatsApp
  const connectOnWhatsApp = (item: LedgerItem) => {
    const text = `Hi Ar. Sridhar, I am reviewing the AGNAA Architectural Archive.\n\n` +
      `• Reference: ${item.title}\n` +
      `• Typology: ${item.type} (${item.category})\n` +
      `• Context / Location: ${item.location}\n` +
      `• Year / Timeline: ${item.year}\n\n` +
      `Could you please share the project drawings, video walkthrough, and details personally?`;

    const waUrl = `https://wa.me/918826214348?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  };

  const directGeneralWhatsApp = () => {
    const text = `Hi Ar. Sridhar, I am reviewing the AGNAA Architectural Portfolio & Archive and would like to connect directly regarding an architectural project.`;
    window.open(`https://wa.me/918826214348?text=${encodeURIComponent(text)}`, '_blank');
  };

  const typesList = [
    { label: 'All Works', value: 'All', count: ARCHIVE_REGISTRY.length },
    { label: '3D Cinema & Videos', value: '3D Cinema & Video', count: ARCHIVE_REGISTRY.filter(x => x.type === '3D Cinema & Video').length },
    { label: 'Architectural Design', value: 'Architectural Design', count: ARCHIVE_REGISTRY.filter(x => x.type === 'Architectural Design').length },
    { label: 'Built Execution', value: 'Built Execution', count: ARCHIVE_REGISTRY.filter(x => x.type === 'Built Execution').length },
    { label: 'Urban Masterplans', value: 'Urban Masterplan', count: ARCHIVE_REGISTRY.filter(x => x.type === 'Urban Masterplan').length },
    { label: 'Turnkey Interiors', value: 'Turnkey Interior', count: ARCHIVE_REGISTRY.filter(x => x.type === 'Turnkey Interior').length },
    { label: 'Statutory Sanctions', value: 'Statutory Sanction', count: ARCHIVE_REGISTRY.filter(x => x.type === 'Statutory Sanction').length },
  ];

  const filteredItems = ARCHIVE_REGISTRY.filter(item => {
    const matchesType = filterType === 'All' || item.type === filterType;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || 
      item.title.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q) ||
      item.clientOrContext.toLowerCase().includes(q) ||
      item.scope.toLowerCase().includes(q) ||
      (item.tag && item.tag.toLowerCase().includes(q));
    return matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#000000] text-[#f5f5f7] font-sans selection:bg-white selection:text-black pb-32 relative overflow-hidden">
      
      {/* ── APPLE RADIAL TOP LUMINANCE ── */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[550px] pointer-events-none opacity-30 z-0"
        style={{
          background: 'radial-gradient(ellipse 65% 50% at 50% 0%, rgba(255, 255, 255, 0.16), transparent 75%)'
        }}
      />

      <div className="relative z-10 pt-32 sm:pt-40 px-5 sm:px-10 lg:px-16 max-w-[1440px] mx-auto space-y-24">
        
        {/* ── 1. APPLE EDITORIAL HEADER ── */}
        <header className="space-y-6 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-[10px] font-mono tracking-[0.22em] text-neutral-300 uppercase shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>AGNAA Architectural Ledger • 2015–2026</span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-light tracking-[-0.04em] text-white">
            PORTFOLIO <span className="text-neutral-500 font-extralight">& ARCHIVE</span>
          </h1>

          <p className="text-neutral-400 text-base sm:text-lg font-normal max-w-2xl mx-auto leading-relaxed">
            International UNESCO museum exhibits, chief ministerial urban corridors, and spatial visualization partnerships with Manila Visuals.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button 
              onClick={directGeneralWhatsApp}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-all cursor-pointer shadow-lg"
            >
              <MessageCircle size={14} />
              <span>Direct WhatsApp: Ar. Sridhar</span>
              <ArrowUpRight size={13} />
            </button>

            <span className="px-3.5 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-neutral-400">
              {ARCHIVE_REGISTRY.length}+ Verified Commissions
            </span>
          </div>
        </header>

        {/* ── 2. SLEEK APPLE BENTO GRID (THE VISUAL VITRINE) ── */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-white/[0.08] pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-400 flex items-center gap-2">
                <Sparkles size={12} className="text-neutral-300" /> Visual Proof Vitrine
              </span>
              <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-white mt-1">
                Selected Works Bento
              </h2>
            </div>
            <span className="text-xs font-mono text-neutral-500">
              Ultra-Light WebP • Tap any card to connect on WhatsApp
            </span>
          </div>

          {/* Apple Asymmetric Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px] sm:auto-rows-[320px]">
            {BENTO_WORKS.map((card, idx) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                onClick={() => connectOnWhatsApp(card)}
                className={`group relative rounded-[28px] sm:rounded-[32px] overflow-hidden bg-[#08080a] border border-white/[0.08] hover:border-white/[0.25] transition-all duration-500 flex flex-col justify-end p-6 sm:p-8 cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.9)] ${card.bentoSpan || 'col-span-1 row-span-1'}`}
              >
                {/* Background WebP Image */}
                {card.image && (
                  <div className="absolute inset-0 z-0 bg-black overflow-hidden">
                    <img 
                      src={card.image} 
                      alt={card.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                    />
                    {/* Apple Multi-Stop Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent opacity-70" />
                  </div>
                )}

                {/* Top Badges */}
                <div className="absolute top-5 left-5 right-5 z-10 flex items-center justify-between text-[10px] font-mono pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 text-white font-medium tracking-wider">
                    {card.tag || card.type}
                  </span>

                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xl text-neutral-300 border border-white/5">
                    {card.year}
                  </span>
                </div>

                {/* Bottom Card Content */}
                <div className="relative z-10 space-y-2 mt-auto">
                  <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-neutral-400">
                    {card.clientOrContext} • {card.location}
                  </div>

                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-light text-white tracking-tight group-hover:text-neutral-200 transition-colors leading-tight">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed line-clamp-2 max-w-xl">
                    {card.scope}
                  </p>

                  {/* Hover Quick Action Pill */}
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-neutral-400">
                      {card.bentoHighlight}
                    </span>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-black text-xs font-semibold opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all shadow-md">
                      <span>WhatsApp Ar. Sridhar</span>
                      <ArrowUpRight size={12} />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── 3. MASTER ARCHITECTURAL LEDGER (MINIMAL TEXT REGISTRY) ── */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-white/[0.08] pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-400">
                Complete Studio Index
              </span>
              <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-white mt-1">
                The Master Architectural Ledger
              </h2>
            </div>
            <span className="text-xs font-mono text-neutral-500">
              Basic text archive of all 42+ verified commissions & video edits
            </span>
          </div>

          {/* Controls: Filter Pills & Search */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-2.5 rounded-2xl bg-[#08080a] border border-white/[0.08]">
            <div className="flex flex-wrap items-center gap-1">
              {typesList.map(type => (
                <button
                  key={type.value}
                  onClick={() => setFilterType(type.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                    filterType === type.value
                      ? 'bg-white text-black font-semibold shadow-sm'
                      : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <span>{type.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${filterType === type.value ? 'bg-black/10 text-black' : 'bg-white/[0.06] text-neutral-400'}`}>
                    {type.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Instant Search */}
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search archive or video..."
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-neutral-500 outline-none focus:border-white/30 transition-colors font-mono"
              />
            </div>
          </div>

          {/* Minimalist Text Ledger Table */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#050507] overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.08] text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 bg-white/[0.015]">
                    <th className="py-3.5 px-5 w-28">Timeline</th>
                    <th className="py-3.5 px-5">Work / Commission</th>
                    <th className="py-3.5 px-5">Client / Context</th>
                    <th className="py-3.5 px-5 hidden md:table-cell">Location</th>
                    <th className="py-3.5 px-5 hidden sm:table-cell">Typology</th>
                    <th className="py-3.5 px-5 text-right">Direct Inquiry</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/[0.04] text-xs">
                  {filteredItems.map(item => (
                    <tr 
                      key={item.id}
                      onClick={() => connectOnWhatsApp(item)}
                      className="hover:bg-white/[0.03] transition-colors group cursor-pointer"
                    >
                      {/* Timeline */}
                      <td className="py-3.5 px-5 font-mono text-[11px] text-neutral-400 whitespace-nowrap">
                        {item.year}
                      </td>

                      {/* Work Title & Scope */}
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-white group-hover:text-neutral-200 transition-colors">
                            {item.title}
                          </span>
                          {item.image && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setPreviewImage({ src: item.image!, title: item.title });
                              }}
                              className="text-neutral-500 hover:text-white p-1 rounded transition-colors"
                              title="Preview 4K Render"
                            >
                              <Eye size={12} />
                            </button>
                          )}
                          {item.isConfidential && (
                            <span className="px-1.5 py-0.5 rounded text-[8px] font-mono tracking-widest uppercase bg-white/[0.06] text-neutral-400 border border-white/5">
                              Protected
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-neutral-500 mt-0.5 font-normal line-clamp-1">
                          {item.scope}
                        </div>
                      </td>

                      {/* Client / Context */}
                      <td className="py-3.5 px-5 text-neutral-300 font-normal">
                        {item.clientOrContext}
                      </td>

                      {/* Location */}
                      <td className="py-3.5 px-5 text-neutral-400 font-mono text-[11px] whitespace-nowrap hidden md:table-cell">
                        {item.location}
                      </td>

                      {/* Typology */}
                      <td className="py-3.5 px-5 hidden sm:table-cell">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/[0.03] border border-white/[0.06] text-neutral-300 whitespace-nowrap">
                          {item.type}
                        </span>
                      </td>

                      {/* Direct WhatsApp Action */}
                      <td className="py-3.5 px-5 text-right whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-neutral-300 group-hover:text-white group-hover:underline transition-colors">
                          <span>Inquire on WhatsApp</span>
                          <ArrowUpRight size={11} />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredItems.length === 0 && (
              <div className="py-12 text-center text-xs font-mono text-neutral-500">
                No matching projects or video files found.
              </div>
            )}
          </div>
        </section>

        {/* ── 4. FOOTER ── */}
        <footer className="pt-10 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div>
            AGNAA Architectural Archive • Directed by Ar. Sridhar Chauhan (CA/2023/161405)
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={directGeneralWhatsApp}
              className="text-neutral-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>WhatsApp Direct: +91 88262 14348</span>
              <ArrowUpRight size={12} />
            </button>
          </div>
        </footer>

      </div>

      {/* ── 5. QUICK IMAGE PREVIEW LIGHTBOX ── */}
      <AnimatePresence>
        {previewImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewImage(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl w-full bg-[#0a0a0c] border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10"
            >
              <button 
                onClick={() => setPreviewImage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-neutral-300 hover:text-white transition-colors z-20 cursor-pointer"
              >
                <X size={16} />
              </button>

              <div className="aspect-[16/10] bg-black">
                <img 
                  src={previewImage.src} 
                  alt={previewImage.title}
                  className="w-full h-full object-cover" 
                />
              </div>

              <div className="p-5 bg-[#08080a] flex items-center justify-between border-t border-white/10">
                <span className="text-sm font-medium text-white truncate mr-4">
                  {previewImage.title}
                </span>
                <button
                  onClick={() => {
                    const found = ARCHIVE_REGISTRY.find(x => x.image === previewImage.src);
                    if (found) connectOnWhatsApp(found);
                    setPreviewImage(null);
                  }}
                  className="px-4 py-2 rounded-full bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-colors cursor-pointer shrink-0 flex items-center gap-1"
                >
                  <MessageCircle size={13} />
                  <span>WhatsApp Ar. Sridhar</span>
                  <ArrowUpRight size={12} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
