const apiKey = "AIzaSyDxpnTUUUL3H1l9RKwN3IqUmKNha1JiW5s";
const model = "gemini-2.0-flash";
const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

const body = {
  system_instruction: {
    parts: [{ text: "You are Agnaa AI assistant." }],
  },
  contents: [
    {
      role: "user",
      parts: [{ text: "Hello, who are you?" }],
    },
  ],
};

async function test() {
  console.log(`Testing ${model}...`);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Error response:", JSON.stringify(data, null, 2));
    } else {
      console.log("Success response:", JSON.stringify(data, null, 2));
    }
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

test();
