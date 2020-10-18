//requires the express framework for this file
const express = require("express");

//creates a variable to hold the express framework
const app = express();

//uses the Express use() method
//the use() method is used to implement middleware on the server
//middleware used to give the server access to programs front-end files
app.use(express.static(__dirname + "/public"))

//uses the Express listen() method
//the listen() is used to run the server on the specified port
app.listen( 3000, () => { console.log("Server Running") } )