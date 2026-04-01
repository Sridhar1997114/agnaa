
async function testGemini() {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) {
    console.error("No API Key");
    return;
  }
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log("Available Models:", JSON.stringify(data, null, 2));
  } catch (e) {
    console.error("Fetch failed", e);
  }
}
testGemini();
