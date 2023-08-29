const express = require('express');
const app = express();
const path = require('path'); // Import the 'path' module
const port = process.env.PORT || 3000;

// Middleware to serve static files from the "public" directory
app.use(express.static('public'));

// Middleware to parse JSON requests
app.use(express.json());

// Sample in-memory database for storing notes
const notes = [];

// Route handler for the root URL ("/")
app.get('/', (req, res) => {
  // Send the index.html file as the response
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html')); // Use 'path.join' to construct the file path
});

// Route handler for the notes page ("/notes")
app.get('/notes', (req, res) => {
  // Send the notes.html file as the response
  res.sendFile(path.join(__dirname, '..', 'public', 'notes.html')); // Use 'path.join' to construct the file path
});

// Define your other routes and route handlers here
// For example:
// app.get('/api/notes', (req, res) => { ... });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
