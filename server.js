const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");
const uuid = require("uuid");

const { readFile, writeFile } = fs.promises;

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("./Develop/public"));

app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./Develop/db/db.json"));
});

app.post("/api/notes", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./Develop/db/db.json"));
  console.info(`${req.method} request received to submit a note`);
  const newNote = req.body;
  newNote.id = uuid.v4();
  notes.push(newNote);
  fs.writeFileSync("./Develop/db/db.json", JSON.stringify(notes));
  res.json(notes);
});

app.delete("/api/notes/:id", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./Develop/db/db.json"));
  console.info(`${req.method} request received to delete a note`);
  const delNote = notes.filter((rmvNote) => rmvNote.id !== req.params.id);
  fs.writeFileSync("./Develop/db/db.json", JSON.stringify(delNote));
  res.json(delNote);
});

// html routes
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/Develop/public/index.html"))
);
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/Develop/public/notes.html"))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
