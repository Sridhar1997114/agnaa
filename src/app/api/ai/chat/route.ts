import { NextRequest, NextResponse } from 'next/server';

const AGNAA_SYSTEM_PROMPT = `You are Agnaa Design Studio AI – Architect Sridhar's elite digital assistant.

MANDATORY CONSTRAINTS:
1. DOMAIN ONLY: Architecture, interiors, construction, materials, Vikarabad agroforestry projects, labor platform, G+5 RERA specs.
2. REJECT off-topic queries with: "Focusing on architectural excellence. For other inquiries, contact Agnaa: +91-8179261230 | hello@agnaa.in"
3. PROFESSIONAL: Architect tone – precise, confident, visionary. Apple Keynote-level clarity.
4. BRAND: End EVERY response with: "– Agnaa Design Studio | Transform visions into structures™"

RESPONSE FORMAT:
1. Insight Bullet (1-3 specs/ideas, precise and factual)
2. Visualization ("Imagine floor-to-ceiling glass..." or "Picture contour bunds feeding drip-irrigated mango...")
3. Next Question ("Budget range? Timeline? Site size?")
4. Signature: – Agnaa Design Studio | Transform visions into structures™

KNOWLEDGE BASE:
- Vikarabad Agroforestry 10/30/10/50 Model:
  - 10% Pure Forest: Teak (26), Sandalwood (27) – Plant-a-Legacy Rs.300-500/yr. Climate: 42-45C, 900mm rain.
  - 30% Agroforestry: Mango, Guava, Amla, Moringa – TreeShare Rs.400-2k/yr dividend.
  - 50% Farming: Jowar, Bajra, Ragi (2 crops/yr) – PlotShare Rs.242/unit/yr.
  - 10% Pond: 4,356 sqft rainwater tank (1.3M L) AquaShare Rs.55k/yr. Water First approach.
- Real Estate & G+5: Pre-Launch EOI Rs.25k refundable. G+5 Rules: <21m height, 2-3m setbacks, Fire NOC. TDR available.
- Construction Platform (Uber-for-Labour): Elite Mason Rs.1,040/day, Standard Rs.800. Agnaa Pro salaried Rs.25-30k/mo. Voice MVP in Telugu/Hindi.
- Ecosystem: AGNAA ARCHITECTS (Design) > ASSEMBLY (Construction) > ATLAS (Commerce) > ATMAN (Soul).`;

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const { messages }: { messages: ChatMessage[] } = await req.json();

    // 5-Reply Limit
    const userCount = messages.filter((m) => m.role === 'user').length;
    if (userCount > 5) {
      return NextResponse.json({
        reply:
          'Enjoyed assisting your vision! For a personalized deep dive and custom design, please contact Agnaa Studio directly: +91-8179261230 | hello@agnaa.in\n\n– Agnaa Design Studio | Transform visions into structures™',
      });
    }

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    // Build Gemini contents array (user/model alternating)
    const contents = messages.map((m) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    const finalSuffix =
      userCount === 5
        ? '\n\n(This is your final reply. Tell the user consultation is needed for deeper design.'
        : '';

    const body = {
      systemInstruction: {
        parts: [{ text: AGNAA_SYSTEM_PROMPT + finalSuffix }],
      },
      contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      },
    };

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const geminiRes = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!geminiRes.ok) {
      const errorText = await geminiRes.text();
      console.error(`Gemini API Error (HTTP ${geminiRes.status}):`, errorText);
      try {
        const errorData = JSON.parse(errorText);
        return NextResponse.json(
          { error: errorData.error?.message || 'Failed to get response from Gemini' },
          { status: geminiRes.status }
        );
      } catch (e) {
        return NextResponse.json(
          { error: 'Failed to parse Gemini error response' },
          { status: 500 }
        );
      }
    }

    const data = await geminiRes.json();
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!responseText) {
      console.error('Empty response from Gemini:', JSON.stringify(data));
      return NextResponse.json(
        { error: 'Gemini returned an empty response' },
        { status: 500 }
      );
    }

    return NextResponse.json({ reply: responseText });
  } catch (error: unknown) {
    console.error('Chat error:', error);
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
