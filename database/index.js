const mysql = require("mysql");

//insures that the .env file is only run in a development environment and not a production environment
if (process.env.NODE_ENV !== "production") {
  //requires the the .env file configuration be run first hiding all info hidden via the .env file
  require("dotenv").config();
}

// const db = mysql.createConnection({
//   host: process.env.MSQLHOST || "us-cdbr-east-04.cleardb.com",
//   user: process.env.MSQLUSER || "b140cd93893df7",
//   password: process.env.MSQLPASSWORD || "2594891a",
//   database: process.env.MSQLDATABASE || "heroku_f8f9e414a772132",
// });

const db = mysql.createConnection({
  host: "us-cdbr-east-04.cleardb.com",
  user: "b140cd93893df7",
  password: "2594891a",
  database: "heroku_f8f9e414a772132",
});

db.connect(function (err) {
  if (err) {
    throw err;
  }
  console.log("Database Connected");
});

module.exports = db;
