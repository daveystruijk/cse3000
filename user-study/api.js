const serverless = require('serverless-http');
const express = require('express');
const path = require('path');
const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('1234567890abcdef', 6);

const app = express();
app.use(express.json());

// Serve frontend
app.use('/', express.static(path.join(__dirname, 'frontend', 'dist')));

// Form submit
app.post('/submit', (req, res, _) => {
  const submitCode = 'D52D73BE';

  const measurements = req.body;
  console.log({ ...measurements, submitCode }); // Will log json cloudwatch, good enough for now

  return res.status(200).json({
    submitCode: submitCode,
  });
});

module.exports.handler = serverless(app);
