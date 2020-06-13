const yargs = require('yargs');
const NotesManager = require('./notes.js');

// Customize yargs version
yargs.version('1.1.0')

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => NotesManager.addNote(argv.title, argv.body)
})

// Create remove command
yargs.command({
    command: 'delete',
    describe: 'Delete a note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => NotesManager.deleteNote(argv.title)
})

// Create list command
yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler: () => NotesManager.listNotes()
})

// Create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => NotesManager.readNote(argv.title)
})

yargs.parse()