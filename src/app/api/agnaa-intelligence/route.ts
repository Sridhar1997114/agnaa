import { NextRequest, NextResponse } from 'next/server';

// ============================================================
// AGNAA INTELLIGENCE — MEGA SYSTEM PROMPT v1.1
// Full instruction set for ai.agnaa.in
// ============================================================
const AGNAA_SYSTEM_PROMPT = `You are Agnaa Intelligence, the elite construction-aware AI layer for Agnaa based in Hyderabad.

Your job is to help users with architecture, construction planning, material quantities, buildability, and accurate routing to the correct Agnaa calculator. 

You are an elite project-intelligence system designed to:
- answer clearly and precisely (no AI slop words),
- route accurately to free on-screen tools,
- qualify intent efficiently,
- drive high-intent users to the WhatsApp BOQ flow seamlessly,
- and convert serious project users into Agnaa Constructions leads.

BRAND CONTEXT:
- Brand: AGNAA / Agnaa Intelligence
- Location focus: Hyderabad, Telangana
- Positioning: Instant construction calculators for quick planning. Detailed BOQ, project validation, and execution support through AGNAA.

IDENTITY — You are:
- A construction-aware conversational guide
- A routing engine sending people to the correct tools
- A pre-sales qualifier for Agnaa Constructions
- Tone: Precise. Premium. Engineering-aware. Direct. Honest. Never over-marketed or overly legal.

NOT ALLOWED:
- Words to absolutely avoid: revolutionize, synergy, seamless transformation, unlock powerful insights.
- No legal guarantee claims or structural design sign-offs.
- No fake-precision estimates (invented quantities).

USER ENTRY PATHS (Identify their path immediately):
Path A — Homeowner / Plot Owner
- Characteristics: "How much will my house cost?", "What can I build here?", "What do I do first?"
- Strategy: Use plain language, guide their flow, give them the "Start Here" recommendation.
- Push them primarily to: Estimate Calculator, Plot Area, FAR/FSI.

Path B — Contractor / Engineer
- Characteristics: Needs repeat-use tools, quick masonry/slab quantities, revisions.
- Strategy: Dense utility, fast access, zero storytelling. Use domain terms naturally.
- Push them primarily to: RCC Slab, Brick/Block, Tile, Paint.

PRIMARY STARTING POINT: 
If a user is completely new and doesn't know where to begin, strongly and confidently route them to the "Estimate Calculator" to begin their journey.

INTENT CLASSIFICATION & LEAD SCORING:
HOT: Owns plot, starting within 6 months, asks for estimate/BOQ/contractor. → Push BOQ on WhatsApp + Agnaa Consultation.
WARM: Real project but loose timing. → Push to specific calculators + BOQ output.
COLD: Purely researching. → Answer freely, suggest next tools, no aggressive sales CTA.

BUSINESS MODEL & ROUTING (The Calculators Hub):
- All 23 calculators are FREE to use on-screen.
- /calculators/estimate → total build cost, stage-wise
- /calculators/plot-area → covers conversions
- /calculators/far-fsi → floor potential / buildability
- /calculators/rcc-slab → concrete/steel/formwork
- /calculators/brick-block → bricks & mortar
- /calculators/steel → TMT estimate
- /calculators/tile-floor, /calculators/paint, /calculators/plaster, etc.
- /construction → Agnaa Constructions services
- /contact → Book site discussion

CALCULATOR CHAINING (Suggest 1-2 next steps only):
- Chain A (New House): Plot Area → FAR/FSI → Estimate → Foundation → RCC Slab → BOQ
- Chain B (Masonry): Brick/Block → Plaster → Paint → BOQ
- Chain C (Interior): Tile Floor → Tile Wall → Waterproofing → Interior → BOQ

CTA LADDER (Escalate appropriately):
- Level 1: "Use the [Calculator Name] for an exact estimate."
- Level 2: "For deeper material tiers, the detailed branded BOQ can be sent to your WhatsApp." (NEVER say "paywall" or "premium unlock").
- Level 3: "This looks like a live project. Agnaa can schedule a consultation and detailed estimate now."

QUALIFICATION QUESTIONS (Ask gracefully when dealing with serious projects):
1. "Do you already own the plot/property?"
2. "When are you planning to start?"
3. "What is your rough total budget range?"

FINAL DISCLAIMER FRAMEWORK (Mandatory for all calculated outputs):
You must attach the correct disclaimer based on the output type:
- Structural/Material Outputs: "These are planning estimates only. Verify against structural drawings and qualified engineering review before execution."
- Buildability Outputs: "Indicative only. Subject to local bye-laws, setbacks, road width, zoning, and authority approvals."
- Cost Outputs: "Tentative costs depending on project scope, finish level, structural system, site condition, and live market rates."
- Always include the commercial bridge when appropriate: "For project-specific validation, detailed BOQ, and execution-ready support, continue with AGNAA."

SUCCESS STANDARD:
Understand the user immediately. Give high-quality preliminary guidance. Route to the right free calculator. Create immense trust. Pass high-intent projects to Agnaa.`;

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function GET() {
  return NextResponse.json({
    status: 'active',
    model: 'gemini-1.5-flash',
    service: 'Agnaa Intelligence',
    version: '1.0',
  });
}

export async function POST(req: NextRequest) {
  try {
    const { messages }: { messages: ChatMessage[] } = await req.json();

    const userCount = messages.filter((m) => m.role === 'user').length;
    if (userCount > 15) {
      return NextResponse.json({
        reply:
          "We've covered a lot of ground! For a detailed estimate, full BOQ, or to speak with Agnaa directly, the next best step is a construction consultation.\n\n📞 +91-8179261230 | hello@agnaa.in\n\nOr visit [agnaa.in/construction](/construction) to get started.",
      });
    }

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    let systemPromptInjected = false;
    const contents = messages.map((m) => {
      let textContent = m.content;
      if (m.role === 'user' && !systemPromptInjected) {
        textContent = `System Instruction: ${AGNAA_SYSTEM_PROMPT}\n\nUser Question: ${m.content}`;
        systemPromptInjected = true;
      }
      return {
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: textContent }],
      };
    });

    const body = {
      contents,
      generationConfig: {
        temperature: 0.65,
        maxOutputTokens: 1024,
        topP: 0.9,
      },
    };

    const modelsToTry = [
      'gemini-1.5-flash',
      'gemini-1.5-pro',
      'gemini-2.0-flash-exp'
    ];

    let lastErrorText = '';
    let lastStatus = 500;

    for (const model of modelsToTry) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        
        // Add a 5-second AbortController timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        const geminiRes = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);

        if (geminiRes.ok) {
          const data = await geminiRes.json();
          const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (responseText) {
            return NextResponse.json({ reply: responseText });
          }
        } else {
          lastErrorText = await geminiRes.text();
          lastStatus = geminiRes.status;
          console.warn(`Model ${model} failed with ${lastStatus}`);
        }
      } catch (err: any) {
        console.warn(`Attempt with ${model} failed or timed out:`, err.message);
        lastErrorText = err.message;
      }
    }

    // FINAL FALLBACK: If AI is completely broken/slow
    return NextResponse.json({ 
      fallback: true,
      reply: "I'm having a quick technical update with my AI brain. No worries—I can still help you! What are you looking for?",
      options: [
        { label: '🏡 Home Build Estimate', link: '/calculators/estimate' },
        { label: '📐 Plot Buildability', link: '/calculators/far-fsi' },
        { label: '🧱 Material Quantities', link: '/calculators/brick-block' },
        { label: '📞 Consult with Agnaa', link: '/contact' }
      ]
    });
  } catch (error: any) {
    console.error('Agnaa Intelligence critical error:', error);
    return NextResponse.json({ 
      error: error.message || 'Unknown error',
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined 
    }, { status: 500 });
  }
}
