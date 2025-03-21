// This script starts a local backend server for Decap CMS
// Run with: node start-local-backend.js

const { exec } = require('child_process');
const path = require('path');

console.log('Starting Decap CMS local backend server...');

// Run the local decap-server from node_modules
const command = 'npx decap-server';

// Execute the command
const process = exec(command);

// Log output
process.stdout.on('data', (data) => {
  console.log(data);
});

process.stderr.on('data', (data) => {
  console.error(data);
});

process.on('close', (code) => {
  console.log(`Local backend server exited with code ${code}`);
});

console.log('Local backend server started. You can now use the CMS at /admin');
console.log('Press Ctrl+C to stop the server');
