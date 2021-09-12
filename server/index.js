//requires the express framework for this file
const express = require("express");
const cors = require("cors");
//creates a variable to hold the express framework
const app = express();
const plannerRouter = require('./routes/planner');
const booksRouter = require('./routes/books');
const googleDriveRouter = require('./routes/googleDrive')

//insures that the .env file is only run in a development environment and not a production environment
if(process.env.NODE_ENV !== 'production'){
    //requires the the .env file configuration be run first hiding all info hidden via the .env file
    require('dotenv').config();
}

//allows for different domains to communicate
app.use(cors());

//Middleware: Puts the json data in a pages body in a req object, parses the data
app.use(express.json());

//uses the Express use() method
//the use() method is used to implement middleware on the server
//middleware used to give the server access to programs front-end files
app.use(express.static('public'));

app.use(express.urlencoded({extended: false}));

app.use(plannerRouter);
app.use(booksRouter);
app.use(googleDriveRouter);

//uses the Express listen() method
//the listen() is used to run the server on the specified port
app.listen( 3000, () => { console.log("Server Running on port", 3000) } );