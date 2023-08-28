const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Define your API routes for handling notes
app.get('/api/notes', (req, res) => {
    // Implement logic to get notes from a database or data source
    // Return the notes as JSON
    const notes = [
        // Example note objects
        { id: 1, title: "Note 1", text: "This is the first note." },
        { id: 2, title: "Note 2", text: "This is the second note." }
    ];

    res.json(notes);
});

// Implement POST and DELETE routes for adding and deleting notes

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
