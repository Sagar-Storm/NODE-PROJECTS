console.log('starting notes.js');

const fs = require('fs');

var fetchNotes = function() {
    try {
      var noteString = fs.readFileSync('json-data.json');
      return  JSON.parse(noteString);
    } catch(e) {
      console.log('exception caught');
      return [];
    }
};

var saveNotes = function(notes) {
  console.log('saving');
  fs.writeFileSync('json-data.json', JSON.stringify(notes));
};

var addNote = function(title, body) {
  console.log("Adding a new title and body ", title, body);
  var notes = fetchNotes();
  if(notes.length === 0) {
    console.log("The file didnt exist and hence was created");
  }
  var note = {
    title,
    body,
  };

  var duplicateNotes = notes.filter(function(note) {
    return note.title === title;
  });
  if(duplicateNotes.length === 0) {
    console.log('no dup');
    notes.push(note);
    saveNotes(notes);("removea note" + title);
    return note;
  }
  return null;
};


var getAll = function() {
  console.log("getting all lists");
  return fetchNotes();
}

var getNote = function(title) {
  var notes = fetchNotes();
  console.log("gettin a note" + title);
  var noteWithTitle = notes.filter(function(note){
    return note.title === title;
  });

  if(noteWithTitle.length != 0) {
    return noteWithTitle[0];
  }
}

var removeNote= function(title) {
  console.log("removea note" + title);
  var notes = fetchNotes();
  var filteredNotes = notes.filter(function(note) {
    return note.title != title;
  });
  saveNotes(filteredNotes);
  if(notes.length === filteredNotes.length) {
    return false;
  } else {
    return true;
  }
}

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
};
