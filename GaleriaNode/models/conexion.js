var mysql = require('mysql');
port = process.env.PORT || 4205;

var connection = mysql.createConnection({
    host: 'den1.mysql6.gear.host',
    user: 'galeria',
    password: 'Rt0Ph5!6W-R1',
    database: 'galeria',
    insecureAuth: true
});

connection.connect();

module.exports = connection;