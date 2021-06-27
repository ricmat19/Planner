//requires the express framework for this file
const express = require("express");

//requires the Client class from the PostgresSQL npm package
const {Client} = require("pg")

//creates a new instance of the PostgresSQL Client class
const planner = new Client({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    max: 20,
    connectionTimeoutMillis: 0,
    idleTimeoutMillis: 0
})

//runs the asynchronous connect method provided by the Client class
planner.connect()
//run after the connect method completes
.then(() => console.log("Database Connected"))
//runs if the .then errors out and displays the error
.catch(e => console.log(e))
//runs last, after the .then or .catch method has run
.finally(() => planner.end())

//creates a variable to hold the express framework
const app = express();

//uses the Express use() method
//the use() method is used to implement middleware on the server
//middleware used to give the server access to programs front-end files
app.use(express.static(__dirname + "/public"))

//uses the Express listen() method
//the listen() is used to run the server on the specified port
app.listen( 3000, () => { console.log("Server Running") } )