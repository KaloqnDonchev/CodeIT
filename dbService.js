const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: `${process.env.PASSWORD}`,
    database: 'codeit'
})