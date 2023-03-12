const config = {
    app: {
      port: 3000
    }
};

const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'codeit',
    password: 'root123',
    port: '5432'
});


module.exports = { client, config };