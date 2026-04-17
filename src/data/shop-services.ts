export interface PricingTierData {
  price: number;
  description: string;
  features: string[];
}

export interface ServiceData {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  starter: PricingTierData;
  professional: PricingTierData;
  premium: PricingTierData;
  process: string[];
  faq: { q: string; a: string }[];
}

export const shopServices: Record<string, ServiceData> = {
  'logo-starter-pack': {
    id: 'logo-starter-pack',
    title: 'Logo Starter Pack',
    category: 'Business Core',
    tagline: 'Establish your brand identity with precision and clarity.',
    description: 'A professional logo is the foundation of your brand. We deliver clean, scalable, and meaningful logo designs ready for any application.',
    starter: {
      price: 8000,
      description: 'Quick identity for new founders.',
      features: ['2 Initial Concepts', '1 Revision Round', 'High-res exports', 'Logo usage guide (Basic)']
    },
    professional: {
      price: 15000,
      description: 'Full identity for growing companies.',
      features: ['4 Initial Concepts', '3 Revision Rounds', 'Source Files (AI/SVG)', 'Comprehensive Brand Color Palettes', 'Secondary / Sub-logo versions']
    },
    premium: {
      price: 25000,
      description: 'The highest standard of brand polish.',
      features: ['6 Initial Concepts', 'Unlimited Revisions', 'Full Identity Guidebook', 'Social Media DP/Cover Kit', 'Priority Designer Access']
    },
    process: [
      'Discovery + Research',
      'Concept Generation',
      'Refinement + Grid-level Polish',
      'Final Export + Documentation'
    ],
    faq: [
      { q: 'What files will I receive?', a: 'Depending on the tier, you receive PNG, JPG, SVG, and Adobe Illustrator source files.' },
      { q: 'Can I request more revisions?', a: 'Yes, additional revision rounds can be purchased separately if your package limit is reached.' }
    ]
  },
  'business-card': {
    id: 'business-card',
    title: 'Business Card + Stationery',
    category: 'Business Core',
    tagline: 'Make a tactile impression with architectural-grade layouts.',
    description: 'Our stationery design focuses on typography, spacing, and material readiness. We design for clarity.',
    starter: {
      price: 2000,
      description: 'Fast, clean card layout.',
      features: ['1 Sided Card Design', 'Print-ready PDF', 'QR Code integration', '1 Revision round']
    },
    professional: {
      price: 5000,
      description: 'Complete professional suite.',
      features: ['Double Sided Card', 'Letterhead Design', 'Envelope Design', '3 Revision rounds']
    },
    premium: {
      price: 10000,
      description: 'Unmatched brand stationery.',
      features: ['Full Stationery Set', 'ID Card / Badge Design', 'Special Finish Layouts (Spot UV/Foil)', 'Unlimited Revisions']
    },
    process: [
      'Information gathering',
      'Layout exploration',
      'Pre-press verification',
      'Delivery of print-ready assets'
    ],
    faq: [
      { q: 'Do you handle printing?', a: 'No, we provide the digital print-ready files. You can take these to any high-end printer.' }
    ]
  },
  'social-templates': {
    id: 'social-templates',
    title: 'Social Media Template Pack',
    category: 'Digital Edge',
    tagline: 'Maintain a consistent visual voice across platforms.',
    description: 'Custom Canva or Figma templates that allow you to create professional content in-house with ease.',
    starter: {
      price: 4000,
      description: 'Essential toolkit.',
      features: ['5 Story Templates', '5 Feed Templates', 'Standard Fonts', '1 Month update support']
    },
    professional: {
      price: 8000,
      description: 'Full digital identity.',
      features: ['12 Story + Feed Templates', 'Reel Covers', 'Style Guide for Content', 'Source Links (Canva/Figma)']
    },
    premium: {
      price: 15000,
      description: 'The total creator package.',
      features: ['25 Custom Templates', 'Motion Element Suggestions', 'Bio / Landing Page assets', 'Video tutorial for usage']
    },
    process: [
      'Visual tone matching',
      'Structure design',
      'User-test of templates',
      'Asset link delivery'
    ],
    faq: [
      { q: 'Can I edit these in Canva?', a: 'Yes, we provide editable links for both Canva and Figma users depending on your preference.' }
    ]
  },
  'brochure': {
    id: 'brochure',
    title: 'Company Profile / Brochure',
    category: 'Business Core',
    tagline: 'High-speed clarity for complex information.',
    description: 'We condense your company\'s story into a visually compelling, easy-to-read document.',
    starter: {
      price: 8000,
      description: 'Concise 4-page profile.',
      features: ['4 Optimized Pages', 'Layout + Typography', 'High-res PDF', '1 Revision round']
    },
    professional: {
      price: 15000,
      description: 'Comprehensive 8-12 page profile.',
      features: ['Up to 12 Pages', 'Infographics + Charts', 'Print-ready + Digital versions', '3 Revision rounds']
    },
    premium: {
      price: 25000,
      description: 'Priority-grade editorial design.',
      features: ['Unlimited Pages', 'Premium Custom Illustration', 'Source InDesign Files', 'Unlimited Revisions']
    },
    process: [
      'Content architecture',
      'Drafting + Mockups',
      'Graphic asset creation',
      'Final proofing'
    ],
    faq: [
      { q: 'Do you provide content writing?', a: 'No, you must provide the text content. We provide the visual layout and structure.' }
    ]
  },
  'presentation-deck': {
    id: 'presentation-deck',
    title: 'Presentation Deck Design',
    category: 'Business Core',
    tagline: 'Command the room with high-impact visuals.',
    description: 'Pitch decks, sales presentations, or keynote slides designed to hold attention and drive action.',
    starter: {
      price: 8000,
      description: 'Clean 10-slide deck.',
      features: ['10 Custom Slides', 'Modern Typography', 'PDF Export', '1 Revision round']
    },
    professional: {
      price: 18000,
      description: 'Polished 25-slide deck.',
      features: ['25 Custom Slides', 'Custom Icons', 'Editable PPT/Keynote files', '3 Revision rounds']
    },
    premium: {
      price: 35000,
      description: 'Investor-ready masterpiece.',
      features: ['Unlimited Slides', 'Slide Animations', 'Narration / Script consultation', 'Unlimited Revisions']
    },
    process: [
      'Flow review',
      'Style selection',
      'Slide-by-slide production',
      'Final delivery'
    ],
    faq: [
      { q: 'Can I edit the slides myself later?', a: 'Yes, for Professional and Premium tiers we provide the native editable files.' }
    ]
  },
  'landing-page': {
    id: 'landing-page',
    title: 'Landing Page Design',
    category: 'Digital Edge',
    tagline: 'Optimized for high-fidelity conversion.',
    description: 'Visual design for landing pages that doesn\'t just look good, but works hard to convert.',
    starter: {
      price: 16000,
      description: 'Single-section design.',
      features: ['Mobile + Desktop Layouts', 'Conversion Focused UI', 'Source Figma File', '1 Revision round']
    },
    professional: {
      price: 32000,
      description: 'Full multi-section landing.',
      features: ['Full Page (Up to 8 sections)', 'Custom Iconography', 'Interactive Prototypes', '3 Revision rounds']
    },
    premium: {
      price: 64000,
      description: 'Total digital experience.',
      features: ['Unlimited Sections', 'High-end Illustration/Graphics', 'Copywriting Consultation', 'No-code Implementation (Optional)']
    },
    process: [
      'User flow mapping',
      'Wireframing',
      'High-fidelity UI design',
      'Handoff'
    ],
    faq: [
      { q: 'Is development included?', a: 'Starter and Professional focus on design files. Premium tier offers implementation options.' }
    ]
  },
  'wedding-invite': {
    id: 'wedding-invite',
    title: 'Wedding Invitation Design',
    category: 'Emotional Edge',
    tagline: 'Timeless aesthetics for your once-in-a-lifetime.',
    description: 'We move away from cluttered designs toward architectural elegance and refined emotion.',
    starter: {
      price: 2000,
      description: 'Modern digital invitation.',
      features: ['Single Page (Digital)', 'Premium Typography', 'WhatsApp Ready', '1 Revision round']
    },
    professional: {
      price: 5000,
      description: 'Classic physical-digital mix.',
      features: ['3 Card Set design', 'Monogram creation', 'Print-ready layout', '3 Revision rounds']
    },
    premium: {
      price: 12000,
      description: 'Total event identity.',
      features: ['Full Invitation Suite', 'Venue Map / Illustrations', 'RSVP Digital Portal', 'Unlimited Revisions']
    },
    process: [
      'Aesthetic discovery',
      'Drafting',
      'Details + Embellishment',
      'Delivery'
    ],
    faq: [
      { q: 'Do you design in regional languages?', a: 'Yes, we can design in any language provided you provide the correct text copy.' }
    ]
  },
  'photo-restoration': {
    id: 'photo-restoration',
    title: 'Memorial Photo Restoration',
    category: 'Emotional Edge',
    tagline: 'Healing memories with surgical precision.',
    description: 'Recovering damaged, faded, or torn historical photographs with respect and care.',
    starter: {
      price: 1200,
      description: 'Basic fix.',
      features: ['Fading correction', 'Scratches removal', 'Lighting balance', 'Single photo']
    },
    professional: {
      price: 2500,
      description: 'Repair + Reconstruct.',
      features: ['Torn edges repair', 'Complex facial recovery', 'Background cleaning', 'Up to 3 photos']
    },
    premium: {
      price: 5000,
      description: 'Pristine preservation.',
      features: ['Total reconstruction', 'Colorization (Optional)', 'Archival print readiness', 'Priority handling']
    },
    process: [
      'Scanning advice',
      'Digital repair',
      'Artistic reconstruction',
      'Final high-res export'
    ],
    faq: [
      { q: 'Can you fix very blurry photos?', a: 'We use AI and manual retouching. While we can improve many things, some data loss is permanent. We will advise after seeing the photo.' }
    ]
  }
};
