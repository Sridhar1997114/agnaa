import { NextRequest, NextResponse } from 'next/server';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// ============================================================
// AGNAA INTELLIGENCE — RULE-BASED CALCULATOR ENGINE
// ============================================================
// A 100% free, 0-latency engine that pattern-matches user intent
// to specific Agnaa construction calculators. No API rate limits.

const RESPONSES = {
  GREETING: "Namaste! I'm Agnaa Intelligence, your construction-aware guide. What can I help you build today?",
  
  ESTIMATE: "To get a detailed, stage-wise construction estimate for your home, please use our comprehensive Estimate Calculator. It covers everything from foundation to finishing.",
  
  PLOT_AREA: "Need to clear up plot dimensions or convert between square yards, gajams, and square feet? Our Plot Area & Conversion tool gives you exact numbers instantly.",
  
  FSI: "Planning to check how much you can legally build on your plot? The FAR/FSI Built-up Potential calculator handles local setbacks and zoning rules to give you the max allowable area.",
  
  RCC: "Calculating concrete and steel quantities? The RCC Slab & Columns calculator gives you precise cement, sand, aggregate, and steel requirements based on your slab area.",
  
  BRICK: "For masonry planning, our Brick & Block work calculator calculates the exact number of bricks or AAC blocks needed, along with the mortar required.",
  
  STEEL: "Need structural steel estimates? The TMT Steel Cost Planner gives tier-wise budgeting (Primary vs. Secondary steel) for your project.",
  
  TILE: "Planning your flooring? The Tile & Flooring calculator estimates the exact tile count, wastage, and mortar mix for your rooms.",
  
  PAINT: "Getting ready for finishes? The Paint & Putty Volume calculator gives you exact primer, putty, and paint requirements for internal and external walls.",
  
  CONSULTATION: "It sounds like you have a serious project! Agnaa Constructions would love to connect. Call us at +91-8179261230 or visit our contact page to schedule a site discussion.",
  
  UNKNOWN: "I am currently running in my lightning-fast rule-based mode! To help you best, are you looking for an **Estimate**, a specific **Material Quantity** (like Bricks, Concrete, Steel), or **Plot/Area** guidance?",
};

function determineResponse(message: string): { reply: string, options?: any[] } {
  const msg = message.toLowerCase();
  
  // Greeting
  if (/^(hi|hello|hey|namaste|start|who are you)/.test(msg)) {
    return {
      reply: RESPONSES.GREETING,
      options: [
        { label: '🏡 Home Cost Estimate', link: '/calculators/estimate' },
        { label: '🧱 Material Quantities', link: '/calculators/brick-block' },
        { label: '📐 Plot Buildability', link: '/calculators/far-fsi' },
      ]
    }
  }

  // Estimate
  if (msg.includes('estimate') || msg.includes('cost') || msg.includes('price') || msg.includes('how much') || msg.includes('budget') || msg.includes('house cost') || msg.includes('construction cost')) {
    return {
      reply: RESPONSES.ESTIMATE,
      options: [{ label: 'Go to Estimate Calculator', link: '/calculators/estimate' }]
    };
  }

  // Plot / Area
  if (msg.includes('plot') || msg.includes('area') || msg.includes('gajam') || msg.includes('square yards') || msg.includes('sqft') || msg.includes('convert')) {
    return {
      reply: RESPONSES.PLOT_AREA,
      options: [{ label: 'Go to Plot Area Calculator', link: '/calculators/plot-area' }]
    };
  }

  // FAR / FSI / Buildability
  if (msg.includes('fsi') || msg.includes('far') || msg.includes('buildability') || msg.includes('setback') || msg.includes('zoning')) {
    return {
      reply: RESPONSES.FSI,
      options: [{ label: 'Go to FAR/FSI Calculator', link: '/calculators/far-fsi' }]
    };
  }

  // RCC / Concrete / Slab
  if (msg.includes('rcc') || msg.includes('slab') || msg.includes('concrete') || msg.includes('cement') || msg.includes('aggregate') || msg.includes('roof')) {
    return {
      reply: RESPONSES.RCC,
      options: [{ label: 'Go to RCC Slab Calculator', link: '/calculators/rcc-slab' }]
    };
  }

  // Bricks / Blocks / Masonry
  if (msg.includes('brick') || msg.includes('block') || msg.includes('aac') || msg.includes('wall') || msg.includes('masonry')) {
    return {
      reply: RESPONSES.BRICK,
      options: [{ label: 'Go to Brick/Block Calculator', link: '/calculators/brick-block' }]
    };
  }

  // Steel / TMT
  if (msg.includes('steel') || msg.includes('tmt') || msg.includes('reinforcement') || msg.includes('iron')) {
    return {
      reply: RESPONSES.STEEL,
      options: [{ label: 'Go to TMT Steel Calculator', link: '/calculators/steel' }]
    };
  }

  // Tile / Flooring
  if (msg.includes('tile') || msg.includes('floor') || msg.includes('marble') || msg.includes('granite')) {
    return {
      reply: RESPONSES.TILE,
      options: [{ label: 'Go to Flooring Calculator', link: '/calculators/tile-floor' }]
    };
  }

  // Paint / Putty
  if (msg.includes('paint') || msg.includes('putty') || msg.includes('color') || msg.includes('primer')) {
    return {
      reply: RESPONSES.PAINT,
      options: [{ label: 'Go to Paint Calculator', link: '/calculators/paint' }]
    };
  }

  // Agnaa Consultation
  if (msg.includes('contact') || msg.includes('call') || msg.includes('consult') || msg.includes('build') || msg.includes('hire') || msg.includes('project') || msg.includes('contractor') || msg.includes('architect')) {
    return {
      reply: RESPONSES.CONSULTATION,
      options: [{ label: 'Contact Agnaa', link: '/contact' }]
    };
  }

  // Default Unknown
  return {
    reply: RESPONSES.UNKNOWN,
    options: [
        { label: '🏡 Estimate Calculator', link: '/calculators/estimate' },
        { label: '📐 FAR / FSI', link: '/calculators/far-fsi' },
        { label: '🧱 Bricks & Auto-Blocks', link: '/calculators/brick-block' },
        { label: '🧪 Concrete / RCC', link: '/calculators/rcc-slab' }
    ]
  };
}

export async function GET() {
  return NextResponse.json({
    status: 'active',
    model: 'agnaa-rule-engine-v1',
    service: 'Agnaa Intelligence',
    version: '1.0',
  });
}

export async function POST(req: NextRequest) {
  try {
    const { messages }: { messages: ChatMessage[] } = await req.json();

    const userCount = messages.filter((m) => m.role === 'user').length;
    if (userCount > 10) {
      return NextResponse.json({
        reply: "We've covered a lot of ground! For a detailed estimate, full BOQ, or to speak with Agnaa directly, the next best step is a construction consultation.\n\n📞 +91-8179261230 | hello@agnaa.in",
        options: [{ label: 'Contact Agnaa', link: '/contact' }]
      });
    }

    const userMessages = messages.filter((m) => m.role === 'user');
    const lastUserMessage = userMessages[userMessages.length - 1];

    if (!lastUserMessage) {
        return NextResponse.json({ reply: "How can I help you today?" });
    }

    // Moderate simulated delay for natural conversational feel
    await new Promise(resolve => setTimeout(resolve, 600));

    const response = determineResponse(lastUserMessage.content);

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Agnaa Local Engine Error:', error);
    return NextResponse.json({ 
      error: error.message || 'Unknown error'
    }, { status: 500 });
  }
}
