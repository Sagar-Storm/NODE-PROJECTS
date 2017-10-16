const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

//set view engine
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.use( (req, res, next) => {
    var now = new Date().toString();
    console.log('Date is:'+now + req.method + " " + req.url);
    fs.appendFileSync('server.log', now + '\n', function(err) {
        if(err) console.log('error, couldnt append');
    });
    next();
});


app.use( function(req, res, next) {
    res.send('maintainance');

});
app.get('/', (req, res) => {
    res.send({
        name: "sagar",
        college: "UVCE",
    });
});


app.get('/about', (req, res) => {
    res.send('<h1> About page </h1>');
});
const PORT = 3000;
app.listen(PORT)