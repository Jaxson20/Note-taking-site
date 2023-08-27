const express = require('express');
const fs = require('fs');
const path = require("path");

const app =express();
const PORT = process.env.PORT || 3001;
//middleware
app.use(express.json());

app.use(express.static('public'));
//landing page
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});
//notes route
app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'))
});

//starting server:)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});