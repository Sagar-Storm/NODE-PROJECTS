var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');

var {Todo} = require('./models/todo');

var {User} = require('./models/user');

//var {mTodo} = require('./playground/mongoose-queries');

var app = express();

app.use(bodyParser.json());


app.post('/todos', function(req, res) {
    var todo =  new Todo({
        text: req.body.text
    });
    todo.save().then(function(doc) {
        res.send(doc);
    }, function(err) {
        res.status(400).send(err);
    })
});

app.get('/todos', function(req, res) {
        Todo.find().then(function(todos) {
            res.send({todos});
        }, function(err) {
            res.status(400).send(e);
        })
});

app.get('/todos/:id', (req, res) =>{
    var id = req.params.id;

  

    Todo.findById(id).then(function(todo) {
        if(!todo) {
            return res.status(400).send();
        }
        res.send({todo});
    }, function(err) {
        console.log('error');
        res.status(404).send(e);
    }).catch(function(e) {
        console.log('caugh error');
         res.status(404).send();
    });
}) ;



app.listen(3000, function() {
    console.log('Started on port 3000');
})