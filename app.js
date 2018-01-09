const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

var title = {
  describe: 'Title of Note',
  demand: true,
  alias: 't'
};

var body = {
  describe: 'Describe the note you are adding',
  demand: true,
  alias: 'b'
};

const argv = yargs.
  command('add', 'Add a new note', {
    title,
    body
  })
  .command('list','Lists all notes')
  .command('read','Read a note', {
    title
  })
  .command('remove','Remove a given list item given the title',{
    title
  })
  .help().argv;


var command = process.argv[2];


if (command == 'add') {
  var note = notes.addNote(argv.title, argv.body);
  if (note === null) {
    console.log("note wasnt created, title already exists");
  } else {
    console.log('note was created successfully with the title ' + note.title);
  }
} else if (command == 'list') {

  var lists = notes.getAll();
  console.log('Printing ${lists.length} note(s)');
  lists.forEach(function(note) {
    console.log(note.title + " " + note.body);
  });

} else if (command == 'read') {
  var note = notes.getNote(argv.title);
  if (note) {
    console.log(note.title + " ");
  } else {
    console.log('not found');
  }

} else if (command == 'remove') {
  var isremoved = notes.removeNote(argv.title);
  console.log(isremoved ? "yes removed" : "not removed");
} else {
  console.log('not recognized');
}
