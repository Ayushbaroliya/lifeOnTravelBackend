require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
app.use(express.json({ limit: '50mb' }));

// Helper to mimic Vercel's (req, res) signature
const runVercelRoute = (routePath) => {
  const handler = require(path.join(__dirname, 'api', routePath));
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  };
};

// Map API routes
app.all('/api/login', runVercelRoute('login.js'));
app.all('/api/data', runVercelRoute('data.js'));
app.all('/api/upload', runVercelRoute('upload.js'));

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Local development server running at http://localhost:${PORT}`);
});
