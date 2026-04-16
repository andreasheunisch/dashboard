const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: 'tests',
  use: {
    baseURL: 'http://localhost:3000',
  },
  webServer: {
    command: 'node server.js',
    port: 3000,
    reuseExistingServer: true,
  },
});
