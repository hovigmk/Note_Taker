const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");

const { readFile, writeFile } = fs.promises;

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("./develop/public"));

app.post("./api/notes", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./Develop/db/db.json"));
  console.info(`${req.method} request received to submit a note`);
  const newNote = req.body;
  newNote.id = uuid.v4();
  notes.push(newNote);
  fs.writeFileSync(".Develop/db/db.json", JSON.stringify(notes));
  res.json(notes);
});

// html routes
// app.get('/', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/index.html'))
// );

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
