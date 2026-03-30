import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

async function testGemini() {
  const body = {
    systemInstruction: {
      parts: [{ text: "You are a tester" }],
    },
    contents: [
      {
        role: "user",
        parts: [{ text: "Hello" }],
      }
    ]
  };

  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  console.log("Status:", res.status);
  console.log("Response:", text);
}

testGemini();
