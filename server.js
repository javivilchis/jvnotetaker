// Require/import the HTTP module
const express = require('express');
const path = require('path');
const http = require('http');

// Deffine the express app
const app = express();
// Define a port to listen for incoming requests
const PORT = 8080;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//notes object
const notes = [
     {
          title: 'yoda',
          text: 'Yoda'
     }
];
// Routes

// Basic route that sends the user first to the AJAX Page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '.index.html')));

app.get('/all', (req, res) => res.sendFile(path.join(__dirname, 'notes.html')));

// Displays all notes
app.get('/api/notes', (req, res) => res.json(notes));

// Displays a single note or returns false
app.get('/api/notes/:note', (req, res) => {
  const chosen = req.params.title;

  console.log(chosen);

  /* Check each character routeName and see if the same as "chosen"
   If the statement is true, send the character back as JSON,
   otherwise tell the user no character was found */

  for (let i = 0; i < notes.length; i++) {
    if (chosen === notes[i].routeName) {
      return res.json(notes[i]);
    }
  }

  return res.json(false);
});

// Create New Characters - takes in JSON input
app.get('/api/notes', (req, res) => {

     const newNote = req.body;

     // Using a RegEx Pattern to remove spaces from newCharacter
     // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
     newNote.routeName = newNote.title.replace(/\s+/g, '').toLowerCase();
     console.log(newNote);

     notes.push(newNote);
     res.json(newNote);
});
// Create New Characters - takes in JSON input
app.post('/api/notes', (req, res) => {

     const newNote = req.body;

     // Using a RegEx Pattern to remove spaces from newCharacter
     // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
     newNote.routeName = newNote.title.replace(/\s+/g, '').toLowerCase();
     console.log(newNote);

     notes.push(newNote);
     res.json(newNote);
});
// Create New Characters - takes in JSON input
app.delete('/api/notes', (req, res) => {

     const newNote = req.body;

     // Using a RegEx Pattern to remove spaces from newCharacter
     // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
     newNote.routeName = newNote.title.replace(/\s+/g, '').toLowerCase();
     console.log(newNote);

     notes.push(newNote);
     res.json(newNote);
});

const handleRequest = (req, res) => {
     // Capture the url the request is made to
     const path = req.url;
   
     // Depending on the URL, display a different HTML file.
     switch (path) {
       case '/':
         return displayRoot(res);
   
       case '/portfolio':
         return displayPortfolio(res);
   
       default:
         return display404(path, res);
     }
   };

const server = http.createServer(handleRequest);

// Start our server so that it can begin listening to client requests.
server.listen(PORT, () => {
  // Log (server-side) when our server has started
  console.log(`Server listening on: http://localhost:${PORT}`);
});
