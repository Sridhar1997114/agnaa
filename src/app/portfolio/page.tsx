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
    <div className="min-h-screen bg-white text-[#1C1C72] font-sans selection:bg-[#7B2DBF] selection:text-white pb-32 relative overflow-hidden">
      
      {/* ── TOP RADIAL LUMINOUS AMBIENT GLOW ── */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[600px] pointer-events-none opacity-40 z-0"
        style={{
          background: 'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(123, 45, 191, 0.14), rgba(37, 99, 235, 0.08), transparent 75%)'
        }}
      />

      <div className="relative z-10 pt-32 sm:pt-40 px-5 sm:px-10 lg:px-16 max-w-[1440px] mx-auto space-y-24">
        
        {/* ── 1. APPLE EDITORIAL HEADER ── */}
        <header className="space-y-6 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-slate-200/90 text-[10px] sm:text-[11px] font-black tracking-[0.25em] text-[#1C1C72] uppercase shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />
            <Sparkles size={13} className="text-[#7B2DBF]" />
            <span>AGNAA ARCHITECTURAL ARCHIVE • 2015–2026</span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter pb-2 leading-[1.08]">
            <span className="bg-clip-text text-transparent bg-gradient-to-br from-[#1C1C72] via-[#1C1C72] to-[#2563EB]">PORTFOLIO</span>{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#7B2DBF] font-black">& ARCHIVE</span>
          </h1>

          <p className="text-slate-600 text-base sm:text-xl font-bold max-w-2xl mx-auto leading-relaxed">
            International UNESCO heritage exhibits, chief ministerial urban corridors, and luxury residential & commercial landmarks.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <button 
              onClick={directGeneralWhatsApp}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#1C1C72] via-[#2563EB] to-[#7B2DBF] text-white text-xs sm:text-sm font-black hover:opacity-95 transition-all shadow-[0_10px_30px_rgba(28,28,114,0.18)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <MessageCircle size={16} />
              <span>Direct WhatsApp: Ar. Sridhar</span>
              <ArrowUpRight size={15} />
            </button>

            <div className="inline-flex items-center gap-2 px-5 py-4 rounded-full bg-[#F5F5F7] border border-slate-200 text-xs font-black uppercase tracking-wider text-[#1C1C72] shadow-sm">
              <CheckCircle2 size={16} className="text-[#2563EB]" />
              <span>{ARCHIVE_REGISTRY.length}+ Verified Commissions</span>
            </div>
          </div>
        </header>

        {/* ── 2. SLEEK APPLE BENTO GRID (THE VISUAL VITRINE) ── */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200 pb-5">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100/80 text-[#7B2DBF] text-[10px] font-black uppercase tracking-widest mb-2 border border-purple-200/60">
                <Sparkles size={12} /> Apple Pro Visual Proof
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#1C1C72] tracking-tight">
                Selected Works Bento
              </h2>
            </div>
            <span className="text-xs font-bold text-slate-500">
              Retina WebP renders • Click any showcase to connect directly on WhatsApp
            </span>
          </div>

          {/* Apple Asymmetric Bento Grid (Double-Bezel Hardware Machined Aesthetic) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px] sm:auto-rows-[340px]">
            {BENTO_WORKS.map((card, idx) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                onClick={() => connectOnWhatsApp(card)}
                className={`group relative rounded-[32px] sm:rounded-[36px] bg-[#F5F5F7] p-2 sm:p-2.5 border border-slate-200/90 hover:border-[#7B2DBF]/50 shadow-[0_10px_30px_rgba(28,28,114,0.06)] hover:shadow-[0_25px_60px_rgba(123,45,191,0.16)] transition-all duration-500 flex flex-col justify-end cursor-pointer ${card.bentoSpan || 'col-span-1 row-span-1'}`}
              >
                {/* Inner Shell with Image & Multi-Stop Scrim for Maximum Contrast */}
                <div className="relative w-full h-full rounded-[calc(32px-8px)] sm:rounded-[calc(36px-10px)] overflow-hidden bg-slate-950 flex flex-col justify-end p-6 sm:p-8">
                  {card.image && (
                    <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950">
                      <img 
                        src={card.image} 
                        alt={card.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-700 ease-out"
                      />
                      {/* Apple Multi-Stop Scrim for High Contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 via-45% to-transparent opacity-95 group-hover:opacity-90 transition-opacity" />
                      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-transparent opacity-60" />
                    </div>
                  )}

                  {/* Top Glass Badges */}
                  <div className="absolute top-5 left-5 right-5 z-10 flex items-center justify-between text-[11px] pointer-events-none">
                    <span className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-white/60 text-[#1C1C72] font-black uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7B2DBF]" />
                      <span>{card.tag || card.type}</span>
                    </span>

                    <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#1C1C72] font-bold text-[10px] border border-white/60 shadow-sm">
                      {card.year}
                    </span>
                  </div>

                  {/* Bottom Typography & WhatsApp Island CTA */}
                  <div className="relative z-10 space-y-2 mt-auto">
                    <div className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-blue-200 drop-shadow-sm">
                      {card.clientOrContext} • {card.location}
                    </div>

                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight group-hover:text-blue-100 transition-colors leading-tight drop-shadow-md">
                      {card.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed line-clamp-2 max-w-xl drop-shadow-sm">
                      {card.scope}
                    </p>

                    {/* Island Action Bar */}
                    <div className="pt-2 flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-purple-200 truncate hidden sm:inline">
                        {card.bentoHighlight}
                      </span>

                      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#1C1C72] text-xs font-black shadow-lg group-hover:bg-[#7B2DBF] group-hover:text-white transition-all transform group-hover:translate-x-1 shrink-0 ml-auto">
                        <MessageCircle size={13} className="text-[#2563EB] group-hover:text-white" />
                        <span>WhatsApp Ar. Sridhar</span>
                        <ArrowUpRight size={13} />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── 3. MASTER ARCHITECTURAL LEDGER (PRISTINE HIGH-CONTRAST LIGHT SUITE) ── */}
        <section className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#2563EB] text-[10px] font-black uppercase tracking-widest mb-2 border border-blue-100">
                Complete Studio Index
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1C1C72] tracking-tight">
                Master Architectural Ledger
              </h2>
            </div>
            <span className="text-xs font-bold text-slate-500">
              Verified archive of all 42+ commissions, statutory drawings & video walkthroughs
            </span>
          </div>

          {/* Controls: Filter Pills & Search */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-3 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
            <div className="flex flex-wrap items-center gap-1.5">
              {typesList.map(type => (
                <button
                  key={type.value}
                  onClick={() => setFilterType(type.value)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    filterType === type.value
                      ? 'bg-gradient-to-r from-[#1C1C72] via-[#2563EB] to-[#7B2DBF] text-white shadow-md shadow-[#2563EB]/20'
                      : 'bg-[#F5F5F7] text-slate-600 hover:text-[#1C1C72] hover:bg-slate-200/60'
                  }`}
                >
                  <span>{type.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${filterType === type.value ? 'bg-white/20 text-white' : 'bg-white text-slate-500 border border-slate-200'}`}>
                    {type.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Instant Search with Electric Focus Ring */}
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search archive, client, location..."
                className="w-full bg-[#F5F5F7] border border-slate-200 rounded-xl pl-10 pr-3 py-2 text-xs font-semibold text-[#1C1C72] placeholder:text-slate-400 outline-none focus:bg-white focus:border-[#7B2DBF] focus:ring-2 focus:ring-[#7B2DBF]/20 transition-all"
              />
            </div>
          </div>

          {/* Pristine Light Ledger Table */}
          <div className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-[10px] font-black uppercase tracking-[0.2em] text-[#1C1C72] bg-[#F5F5F7]">
                    <th className="py-4 px-6 w-32">Timeline</th>
                    <th className="py-4 px-6">Work / Commission</th>
                    <th className="py-4 px-6">Client / Context</th>
                    <th className="py-4 px-6 hidden md:table-cell">Location</th>
                    <th className="py-4 px-6 hidden sm:table-cell">Typology</th>
                    <th className="py-4 px-6 text-right">Direct WhatsApp</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredItems.map(item => (
                    <tr 
                      key={item.id}
                      onClick={() => connectOnWhatsApp(item)}
                      className="hover:bg-purple-50/30 transition-colors group cursor-pointer"
                    >
                      {/* Timeline */}
                      <td className="py-4 px-6 font-mono text-[11px] text-slate-500 font-bold whitespace-nowrap">
                        {item.year}
                      </td>

                      {/* Work Title & Scope */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#1C1C72] group-hover:text-[#2563EB] transition-colors text-sm">
                            {item.title}
                          </span>
                          {item.image && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setPreviewImage({ src: item.image!, title: item.title });
                              }}
                              className="text-slate-400 hover:text-[#7B2DBF] p-1 rounded-md hover:bg-purple-50 transition-colors"
                              title="Preview 4K Render"
                            >
                              <Eye size={14} />
                            </button>
                          )}
                          {item.isConfidential && (
                            <span className="px-2 py-0.5 rounded text-[8px] font-mono tracking-widest uppercase bg-slate-100 text-slate-600 border border-slate-200 font-bold">
                              Protected
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1 font-medium line-clamp-1">
                          {item.scope}
                        </div>
                      </td>

                      {/* Client / Context */}
                      <td className="py-4 px-6 text-slate-700 font-semibold">
                        {item.clientOrContext}
                      </td>

                      {/* Location */}
                      <td className="py-4 px-6 text-slate-500 font-medium text-[11px] whitespace-nowrap hidden md:table-cell">
                        {item.location}
                      </td>

                      {/* Typology Badge */}
                      <td className="py-4 px-6 hidden sm:table-cell">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap border ${
                          item.type === '3D Cinema & Video' ? 'bg-purple-50 text-[#7B2DBF] border-purple-200' :
                          item.type === 'Architectural Design' ? 'bg-blue-50 text-[#2563EB] border-blue-200' :
                          item.type === 'Built Execution' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                          item.type === 'Urban Masterplan' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                          item.type === 'Turnkey Interior' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                          'bg-indigo-50 text-indigo-700 border-indigo-200'
                        }`}>
                          {item.type}
                        </span>
                      </td>

                      {/* Direct WhatsApp Action */}
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 text-xs font-black text-[#1C1C72] group-hover:text-[#7B2DBF] group-hover:translate-x-0.5 transition-all">
                          <MessageCircle size={13} className="text-[#2563EB]" />
                          <span>Inquire WhatsApp</span>
                          <ArrowUpRight size={13} />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredItems.length === 0 && (
              <div className="py-16 text-center text-sm font-semibold text-slate-400">
                No matching projects or video files found in the archive.
              </div>
            )}
          </div>
        </section>

        {/* ── 4. STATUTORY ACCREDITATION & ARCHITECTURAL CREDENTIALS ── */}
        <section className="rounded-3xl border border-slate-200/90 bg-gradient-to-r from-slate-50 via-white to-slate-50 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1C1C72] to-[#7B2DBF] text-white flex items-center justify-center font-black text-lg shadow-md shrink-0">
              CA
            </div>
            <div>
              <h4 className="text-base font-black text-[#1C1C72]">
                Ar. Sridhar Chauhan <span className="text-xs font-mono font-normal text-slate-500">(CA/2023/161405)</span>
              </h4>
              <p className="text-xs text-slate-500 font-semibold">
                Council of Architecture Registered Architect • School of Planning & Architecture (SPA Delhi, NIRF Rank #1)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={directGeneralWhatsApp}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1C1C72] text-white text-xs font-black hover:bg-[#7B2DBF] transition-all shadow-sm cursor-pointer"
            >
              <MessageCircle size={14} />
              <span>Direct WhatsApp Consultation</span>
              <ArrowUpRight size={13} />
            </button>
          </div>
        </section>

        {/* ── 5. CLEAN FOOTER NOTICE ── */}
        <footer className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500">
          <div>
            AGNAA Architectural Archive • Directed by Ar. Sridhar Chauhan (CA/2023/161405)
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={directGeneralWhatsApp}
              className="text-slate-600 hover:text-[#7B2DBF] transition-colors cursor-pointer flex items-center gap-1 font-bold"
            >
              <span>WhatsApp Direct: +91 88262 14348</span>
              <ArrowUpRight size={12} />
            </button>
          </div>
        </footer>

      </div>

      {/* ── 6. QUICK IMAGE PREVIEW LIGHTBOX (APPLE PRO MODAL) ── */}
      <AnimatePresence>
        {previewImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewImage(null)}
              className="fixed inset-0 bg-[#0D0D14]/75 backdrop-blur-md"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl w-full bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl z-10"
            >
              <button 
                onClick={() => setPreviewImage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/60 text-white hover:bg-slate-900 transition-colors z-20 cursor-pointer"
              >
                <X size={16} />
              </button>

              <div className="aspect-[16/10] bg-slate-950 relative">
                <img 
                  src={previewImage.src} 
                  alt={previewImage.title}
                  className="w-full h-full object-cover" 
                />
              </div>

              <div className="p-5 sm:p-6 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-slate-200">
                <span className="text-sm sm:text-base font-black text-[#1C1C72] truncate max-w-lg">
                  {previewImage.title}
                </span>
                <button
                  onClick={() => {
                    const found = ARCHIVE_REGISTRY.find(x => x.image === previewImage.src);
                    if (found) connectOnWhatsApp(found);
                    setPreviewImage(null);
                  }}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#1C1C72] via-[#2563EB] to-[#7B2DBF] text-white text-xs font-black hover:opacity-95 transition-all cursor-pointer shrink-0 flex items-center gap-2 shadow-md"
                >
                  <MessageCircle size={14} />
                  <span>WhatsApp Ar. Sridhar</span>
                  <ArrowUpRight size={13} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
