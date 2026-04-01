const fs = require('fs');
const https = require('https');

// Manually read .env.local to avoid dependency issues
const envFile = fs.readFileSync('.env.local', 'utf8');
const keyMatch = envFile.match(/GOOGLE_GENERATIVE_AI_API_KEY=["']?([^"'\n\r]+)["']?/);

if (!keyMatch) {
  console.error("Could not find GOOGLE_GENERATIVE_AI_API_KEY in .env.local");
  process.exit(1);
}

const apiKey = keyMatch[1];
console.log(`Using API Key: ${apiKey.substring(0, 10)}...`);

const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

https.get(url, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      if (json.models) {
        console.log("SUCCESS: Available models:");
        json.models.forEach(m => console.log(` - ${m.name}`));
        
        const modelsToTry = [
          'models/gemini-2.0-flash',
          'models/gemini-2.0-flash-lite',
          'models/gemini-1.5-flash-latest',
          'models/gemini-1.5-pro'
        ];
        
        console.log("\nChecking for current required models:");
        modelsToTry.forEach(required => {
          const found = json.models.find(m => m.name === required || m.name === required.replace('models/', ''));
          console.log(`${required}: ${found ? 'FOUND' : 'NOT FOUND'}`);
        });
      } else {
        console.log("ERROR: No models returned from API.");
        console.log(JSON.stringify(json, null, 2));
      }
    } catch (e) {
      console.log("ERROR: Could not parse response.");
      console.log(data);
    }
  });
}).on('error', (err) => {
  console.log("REQUEST ERROR:", err.message);
});
