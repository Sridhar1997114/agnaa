const fs = require('fs');
const path = require('path');

const targets = [
  path.join(__dirname, 'src', 'app', 'api', 'ai', 'chat', 'route.ts'),
  path.join(__dirname, 'src', 'app', 'api', 'chat', 'route.ts'),
  path.join(__dirname, 'src', 'pages', 'api', 'chat.ts')
];

const dirs = [
  path.join(__dirname, 'src', 'app', 'api', 'ai', 'chat'),
  path.join(__dirname, 'src', 'app', 'api', 'ai'),
  path.join(__dirname, 'src', 'app', 'api', 'chat'),
  path.join(__dirname, 'src', 'pages', 'api'),
  path.join(__dirname, 'src', 'pages')
];

targets.forEach(f => {
  try {
    if (fs.existsSync(f)) {
      fs.unlinkSync(f);
      console.log('Deleted file:', f);
    }
  } catch (e) {
    console.error('Failed to delete file:', f, e.message);
  }
});

dirs.forEach(d => {
  try {
    if (fs.existsSync(d)) {
      fs.rmdirSync(d);
      console.log('Removed directory:', d);
    }
  } catch (e) {
    console.warn('Could not remove directory (might not be empty):', d);
  }
});
