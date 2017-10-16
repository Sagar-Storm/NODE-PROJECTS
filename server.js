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
    next();
});


app.get('/', (req, res) => {
    res.send('<h1> I love you Vinay, why are you so awesome ? </h1>')
});


app.get('/about', (req, res) => {
    res.send('<h1> About page </h1>');
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("server up running on " + port);
})