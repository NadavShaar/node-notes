const chalk = require('chalk');
const fs = require("fs");

const readNote = (noteTitle) => {
    const notes = loadNotes();
    let noteToRead = notes.find(note => note.title.toLowerCase() === noteTitle.toLowerCase());
    if(!noteToRead) return console.log(chalk.red.inverse("Note not found"));

    console.log(chalk.blue.inverse(noteToRead.title));
    console.log(noteToRead.body);
};

const addNote = (title, body) => {
    const notes = loadNotes();

    // Checking if the new note's title exists already
    if(notes.find(n => n.title.toLowerCase() === title.toLowerCase())) return console.log(chalk.red.inverse("Note title taken!"));

    notes.push({ title, body });

    saveNotes(notes);
    console.log(chalk.green.inverse("New note added!"));
};

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);

    fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {

    try {
        const dataBuffer = fs.readFileSync("notes.json");
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);

    } catch (err) {
        // console.error(err);
        return [];
    }

};

const listNotes = () => {
    let notes = loadNotes();

    notes.forEach(note => console.log(chalk.yellow.inverse(note.title)));
};

const deleteNote = (noteTitle) => {
    let notes = loadNotes();

    let noteIndex = notes.findIndex(n => n.title.toLowerCase() === noteTitle.toLowerCase());
    if(noteIndex === -1) return console.log(chalk.red.inverse("There is no such note to delete!"));

    notes.splice(noteIndex, 1);
    saveNotes(notes);
    console.log(chalk.green.inverse("Note deleted successfully"));
};

module.exports = {
    addNote,
    deleteNote,
    listNotes,
    readNote
};