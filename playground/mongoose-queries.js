var {mongoose} = require('./../db/mongoose');
var {Todo} = require('./../models/todo');
var {ObjectID} = require('mongodb');


mongoose.Promise = global.Promise;

var id = '9e4c96454bf1a5572ad4b80'

if(ObjectID.isValid(id)) {
    console.log('wrong data');
}

// Todo.find( {
//     _id: id
// }).then(function(todos) {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then(function(todo) {
//     console.log('Todo single', todo);
// })


Todo.findById(id).then(function(doc) {
    if(!doc) {
        return console.log('problem mate');
    }
    console.log('db doc', doc);
}).catch(function(e) {
    console.log(e);
});


module.exports = {
    Todo:Todo,
}