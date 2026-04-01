import type { NextApiRequest, NextApiResponse } from 'next';

const AGNAA_SYSTEM_PROMPT = `You are Agnaa Design Studio AI – Architect Sridhar's elite digital assistant.
...`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const contents = messages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    const body = {
      system_instruction: {
        parts: [{ text: AGNAA_SYSTEM_PROMPT }],
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

    const data = await geminiRes.json();
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!responseText) {
      return res.status(500).json({ error: 'Gemini returned an empty response' });
    }

    return res.status(200).json({ reply: responseText });
  } catch (error: any) {
    console.error('Chat error:', error);
    return res.status(500).json({ error: error.message });
  }
}
