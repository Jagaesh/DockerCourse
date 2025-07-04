const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Serve static files from the current directory
app.use(express.static(path.join(__dirname, '.')));

// Serve index.html for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Serve profile picture
app.get('/profile-picture', (req, res) => {
  const img = fs.readFileSync(path.join(__dirname, "images/profile-1.jpg"));
  res.writeHead(200, { 'Content-Type': 'image/jpg' });
  res.end(img, 'binary');
});

// Get profile endpoint
app.get('/get-profile', (req, res) => {
  res.json({ name: 'Anna Smith', email: 'anna.smith@example.com', interests: 'coding' });
});

// Update profile endpoint
app.post('/update-profile', express.json(), (req, res) => {
  // Pour le moment on renvoie juste ce qu'on reçoit, sans base MongoDB
  res.json(req.body);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});