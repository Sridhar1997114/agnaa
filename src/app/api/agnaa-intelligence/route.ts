import { NextRequest, NextResponse } from 'next/server';
import { AGNAA_SYSTEM_PROMPT } from './systemPrompt';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

export async function GET() {
  return NextResponse.json({
    status: 'active',
    model: 'gemini-1.5-flash',
    service: 'Agnaa Intelligence',
    version: '2.5',
    engine: 'Direct Fetch (Core Integrated)'
  });
}

export async function POST(req: NextRequest) {
  try {
    const { messages }: { messages: ChatMessage[] } = await req.json();

    // 10-message escalation logic
    const userCount = messages.filter((m) => m.role === 'user').length;
    if (userCount > 10) {
      return NextResponse.json({
        reply: "We've covered a lot of ground! For a detailed estimate, full BOQ, or to speak with Agnaa Architects directly, the next best step is a formal consultation.\n\n📞 +91-8179261230 | [hello@agnaa.in](mailto:hello@agnaa.in)",
        options: [{ label: 'Contact Agnaa', link: '/contact' }]
      });
    }

    const userMessages = messages.filter((m) => m.role === 'user');
    const lastUserMessage = userMessages[userMessages.length - 1];

    if (!lastUserMessage) {
      return NextResponse.json({ reply: "How can I help you today?" });
    }

    if (!apiKey) {
      console.error('GOOGLE_GENERATIVE_AI_API_KEY is missing.');
      return NextResponse.json({ 
        reply: 'AGNAA Intelligence is currently undergoing maintenance. Please contact +91-8179261230 for immediate assistance.' 
      });
    }

    // Direct fetch implementation to bypass SDK dependency issues
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
    // Prepare history for Gemini API format
    const contents = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const body = {
      systemInstruction: {
        parts: [{ text: AGNAA_SYSTEM_PROMPT }],
      },
      contents: contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
        topP: 0.9,
      },
    };

    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API Error:', errorData);
      
      if (response.status === 429) {
        return NextResponse.json({ 
          reply: "I am experiencing heavy traffic right now! My systems are temporarily delayed. For exact cost breakdowns, please use our [Home Cost Estimate](https://agnaa.in/estimate)." 
        });
      }
      throw new Error(`Gemini API responded with status ${response.status}`);
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "I apologize, I couldn't generate a response. Please try asking again.";

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('Agnaa Intelligence Error:', error);
    return NextResponse.json({ 
      reply: 'An error occurred while connecting to the core intelligence network. Please try again or reach out to hello@agnaa.in.'
    }, { status: 500 });
  }
}
