const mysql = require('mysql');
const util = require('util');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ums",
});

var query = util.promisify(con.query).bind(con);

module.exports = { query };