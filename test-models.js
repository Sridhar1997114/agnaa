const https = require('https');
require('dotenv').config({path: '.env.local'});
const key = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

if(!key) {
  console.log("No key found in .env.local");
  process.exit(1);
}

https.get(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const parsed = JSON.parse(data);
      if (parsed.models) {
        console.log('Available models:');
        parsed.models.forEach(m => console.log(m.name));
      } else {
        console.log('API Response (No Models Array):', JSON.stringify(parsed, null, 2));
      }
    } catch(e) {
      console.log('Raw response:', data);
    }
  });
}).on('error', err => console.error(err));
