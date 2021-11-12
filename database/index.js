const mysql = require("mysql");

//insures that the .env file is only run in a development environment and not a production environment
if (process.env.NODE_ENV !== "production") {
  //requires the the .env file configuration be run first hiding all info hidden via the .env file
  require("dotenv").config();
}

// const db = mysql.createConnection({
//   host: process.env.MSQLHOST,
//   user: process.env.MSQLUSER,
//   password: process.env.MSQLPASSWORD,
//   database: process.env.MSQLDATABASE,
// });

const db = mysql.createConnection({
  host: process.env.HEROKUMSQLHOST,
  user: process.env.HEROKUMSQLUSER,
  password: process.env.HEROKUMSQLPASSWORD,
  database: process.env.HEROKUMSQLDATABASE,
});

db.connect(function (err) {
  if (err) {
    throw err;
  }
  console.log("Database Connected");
});

module.exports = db;
