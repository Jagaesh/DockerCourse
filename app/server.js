const express = require('express');
const path = require('path');
const fs = require('fs');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

// MongoDB connection URLs
const mongoUrlLocal = "mongodb://localhost:27017";
const mongoUrlDocker = "mongodb://admin:password@mongo";

// MongoDB options
const mongoClientOptions = {}; // Removed deprecated options

// Database name
const databaseName = "my-db";

// Update profile endpoint
app.post('/update-profile', async (req, res) => {
  const userObj = req.body;
  const client = new MongoClient(mongoUrlDocker, mongoClientOptions);

  try {
    await client.connect();
    const db = client.db(databaseName);
    userObj['userid'] = 1;

    const myquery = { userid: 1 };
    const newvalues = { $set: userObj };

    await db.collection("users").updateOne(myquery, newvalues, { upsert: true });

    // Send response
    res.send(userObj);
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).send('Error updating profile');
  } finally {
    await client.close();
  }
});

// Get profile endpoint
app.get('/get-profile', async (req, res) => {
  const client = new MongoClient(mongoUrlDocker, mongoClientOptions);
  let response = {};

  try {
    await client.connect();
    const db = client.db(databaseName);

    const myquery = { userid: 1 };
    response = await db.collection("users").findOne(myquery);

    // Send response
    res.send(response ? response : {});
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).send('Error retrieving profile');
  } finally {
    await client.close();
  }
});

// Start the server
app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
