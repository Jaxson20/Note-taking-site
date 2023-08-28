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

// GET a specific note by ID
router.get('/api/notes/:id', (req, res) => {
  const notes = readData();
  const note = notes.find((note) => note.id === parseInt(req.params.id));
  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }
  res.json(note);
});

// new note
router.post('/api/notes', (req, res) => {
  const { title, text } = req.body;
  if (!title || !text) {
    return res.status(400).json({ message: 'Title and text are required' });
  }

  const notes = readData();
  const newNote = {
    id: Date.now(), 
    title,
    text,
  };
  notes.push(newNote);
  writeData(notes);

  res.status(201).json(newNote);
});

// PUT (update) a note by ID
router.put('/api/notes/:id', (req, res) => {
  const notes = readData();
  const { id } = req.params;
  const { title, text } = req.body;

  const updatedNoteIndex = notes.findIndex((note) => note.id === parseInt(id));

  if (updatedNoteIndex === -1) {
    return res.status(404).json({ message: 'Note not found' });
  }

  if (!title || !text) {
    return res.status(400).json({ message: 'Title and text are required' });
  }

  const updatedNote = {
    id: parseInt(id),
    title,
    text,
  };

  notes[updatedNoteIndex] = updatedNote;
  writeData(notes);

  res.json(updatedNote);
});

// DELETE a note by ID
router.delete('/api/notes/:id', (req, res) => {
  const notes = readData();
  const { id } = req.params;

  const deletedNoteIndex = notes.findIndex((note) => note.id === parseInt(id));

  if (deletedNoteIndex === -1) {
    return res.status(404).json({ message: 'Note not found' });
  }

  notes.splice(deletedNoteIndex, 1);
  writeData(notes);

  res.sendStatus(204); 
});

module.exports = router;
