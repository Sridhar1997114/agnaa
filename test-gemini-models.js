const apiKey = "AIzaSyDxpnTUUUL3H1l9RKwN3IqUmKNha1JiW5s";
const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

fetch(geminiUrl)
  .then(res => res.text())
  .then(console.log)
  .catch(console.error);
