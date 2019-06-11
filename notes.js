console.log('Starting notes.js');
const fs = require('fs');

var fetchNotes = ()=>{
    try{
        var noteString = fs.readFileSync('notes-data.json');
        return JSON.parse(noteString);
    } catch(e){
        return [];
    }
};

var saveNotes=(notes)=>{
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title,body) =>{
    var notes = fetchNotes();
    var note = {
        title,
        body
    };
    var duplicateNote = notes.filter((note)=>note.title === title);
    if(duplicateNote.length === 0){
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};
var getAll = ()=>{
    var notes = fetchNotes();
    var i;
    for(i=0;i<notes.length;i++){
        logNote(notes[i]);
    }
};
var getNote = (title)=>{
    var notes = fetchNotes();
    var requiredNote = notes.filter((note)=>note.title===title);
    return requiredNote[0];
};
var removeNote = (title)=>{
    var notes = fetchNotes();
    var filteredNote = notes.filter((note)=>note.title!==title);
    saveNotes(filteredNote);
    return notes.length!==filteredNote.length;
};
var logNote = (note)=>{
    console.log('------------------');
    console.log(`Title: ${note.title}`);
    console.log(`Body:${note.body}`);
}

module.exports={
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
}