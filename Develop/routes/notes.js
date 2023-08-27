const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Helper function to read and parse the JSON data from db.json
function readData() {
  const data = fs.readFileSync(path.join(__dirname, '..', 'db.json'), 'utf8');
  return JSON.parse(data);
}

// Helper function to write JSON data back to db.json
function writeData(data) {
  fs.writeFileSync(path.join(__dirname, '..', 'db.json'), JSON.stringify(data, null, 2));
}

// GET all notes
router.get('/api/notes', (req, res) => {
  const notes = readData();
  res.json(notes);
});


