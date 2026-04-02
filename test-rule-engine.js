
const testIntents = [
  "Hi",
  "How much to build a house?",
  "plot area gajams",
  "RCC concrete slab",
  "brick wall",
  "contact numbers"
];

async function runTests() {
  for (const intent of testIntents) {
    console.log(`\n--- Testing Intent: "${intent}" ---`);
    try {
      const response = await fetch('http://localhost:3005/api/agnaa-intelligence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: intent }]
        })
      });
      const data = await response.json();
      console.log(`Reply: ${data.reply}`);
      if (data.options) {
        console.log(`Options: ${data.options.map(o => o.label).join(', ')}`);
      }
    } catch (err) {
      console.log(`Error testing "${intent}": ${err.message}`);
    }
  }
}

runTests();
