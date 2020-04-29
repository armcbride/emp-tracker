const util = require("util");
const mysql = require("mysql");
require('dotenv').config();
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
    database: "emp_tracker"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
  });

  connection.query = util.promisify(connection.query);

  module.exports = connection;