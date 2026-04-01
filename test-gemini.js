const apiKey = "AIzaSyDxpnTUUUL3H1l9RKwN3IqUmKNha1JiW5s";
const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

const body = {
  system_instruction: {
    parts: [{ text: "You are a helpful assistant" }],
  },
  contents: [
    {
      role: 'user',
      parts: [{ text: "Hello" }],
    }
  ],
  generationConfig: {
    temperature: 0.65,
    maxOutputTokens: 1024,
    topP: 0.9,
  },
};

fetch(geminiUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
})
  .then(res => res.text().then(text => ({ status: res.status, text })))
  .then(console.log)
  .catch(console.error);
