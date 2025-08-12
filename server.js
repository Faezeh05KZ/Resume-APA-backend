// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'resume-data.json');

app.use(cors());
app.use(bodyParser.json());

// server.js

app.get('/api/resume', (req, res) => {

    console.log('GET request received by server! Sending resume information...'); 
  
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Server Error: Could not read data file.');
    }
    res.json(JSON.parse(data));
  });
});

app.post('/api/resume', (req, res) => {
  const newResumeData = req.body;
  fs.writeFile(DATA_FILE, JSON.stringify(newResumeData, null, 2), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Server Error: Could not save data.');
    }
    res.status(200).send('Data saved successfully.');
  });
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});