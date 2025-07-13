const { spawn } = require('child_process');
const path = require('path');

// Change to the project directory
process.chdir(path.join(__dirname));

// Start Next.js dev server
const next = spawn('npx', ['next', 'dev', '--port', '3001'], {
  stdio: 'inherit',
  shell: true
});

next.on('close', (code) => {
  console.log(`Next.js dev server exited with code ${code}`);
});