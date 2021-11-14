const mysql = require("mysql");

//insures that the .env file is only run in a development environment and not a production environment
if (process.env.NODE_ENV !== "production") {
  //requires the the .env file configuration be run first hiding all info hidden via the .env file
  require("dotenv").config();
}

const db = mysql.createPool({
  user: process.env.MSQLUSER,
  host: process.env.MSQLHOST,
  password: process.env.MSQLPASSWORD,
  database: process.env.MSQLDATABASE,
});

if(db){
  console.log("Database Connected")
}

module.exports = db;
