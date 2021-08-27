const mysql = require("mysql");

const db = mysql.createConnection({
    user: process.env.MYSQLUSER,
    host: process.env.MSQLHOST,
    password: process.env.MSQLPASSWORD,
    database: process.env.MSQLDATABASE,
});

module.exports = db;