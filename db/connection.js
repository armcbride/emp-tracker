const util = require("util");
const mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Aa6844598",
    database: "emp_tracker"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
  });

  connection.query = util.promisify(connection.query);

  module.exports = connection;