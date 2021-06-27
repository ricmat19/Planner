//requires the express framework for this file
const express = require("express");
//creates a variable to hold the express framework
const app = express();
const hb = require('express-handlebars');

//uses the Express use() method
//the use() method is used to implement middleware on the server
//middleware used to give the server access to programs front-end files
app.use(express.static('public'));

app.engine('handlebars', hb());
app.set('view engine', 'handlebars');

app.get('/calculator', (req, res) => {
    res.render('calculator', 
    {title: "Calculator",
    css: "css/calculator.css",
    js: "scripts/calculator.js"}); 
})

app.get('/calendar', (req, res) => {
    res.render('calendar', 
    {title: "Calendar",
    css: "css/calendar.css",
    js: "scripts/calendar.js"}); 
})

app.get('/map', (req, res) => {
    res.render('map', 
    {title: "Map",
    css: "css/map.css",
    js: "scripts/map.js"}); 
})

app.get('/todo', (req, res) => {
    res.render('todo', 
    {title: "To Do",
    css: "css/todo.css",
    js: "scripts/todo.js"}); 
})

//uses the Express listen() method
//the listen() is used to run the server on the specified port
app.listen( 3000, () => { console.log("Server Running on port", 3000) } );