const https = require('https');
const fs = require('fs');

const envFile = fs.readFileSync('.env.local', 'utf8');
const keyMatch = envFile.match(/GOOGLE_GENERATIVE_AI_API_KEY=["']?([^"'\n\r]+)["']?/);
const apiKey = keyMatch ? keyMatch[1] : null;

if (!apiKey) {
    console.log("CRITICAL: No API Key found in .env.local");
    process.exit(1);
}

console.log("Testing Key:", apiKey);

const options = {
    hostname: 'generativelanguage.googleapis.com',
    path: `/v1beta/models?key=${apiKey}`,
    method: 'GET'
};

const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        console.log("STATUS CODE:", res.statusCode);
        console.log("RESPONSE BODY:");
        console.log(data);
        process.exit(0);
    });
});

req.on('error', (e) => {
    console.error("REQUEST ERROR:", e);
    process.exit(1);
});

req.end();
setTimeout(() => { console.log("Timeout reached"); process.exit(1); }, 10000);
