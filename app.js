console.log('Starting app.');
const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

var notes = require('./notes.js');
var command = process.argv[2];
var argv = yargs.argv;
console.log('Command:', command);
var title = argv._[0];
console.log('yargs', argv);
if(command==='add'){
    var note = notes.addNote(argv.title,argv.body);
    if(note){
        console.log(`Note created`);
        notes.logNote(note);
    }else{
        console.log(`Choose a different title.`)
    }
}else if(command === 'list'){
    notes.getAll();
}else if(command==='read'){
    var requiredNote = notes.getNote(argv.title);
    if(requiredNote){
        console.log('Getting the required note.');
        notes.logNote(requiredNote);
    }
    else{
        console.log('Note not found.');
    }
}else if(command==='remove'){
    var filteredNote = notes.removeNote(argv.title);
    if(filteredNote){
        console.log(`Note removed`);
    }else{
        console.log('Not found');
    }
}else{
    console.log('Command not recognized.');
}