const config = {
    app: {
      port: 80
    }
};

const { Client } = require('pg');

// const client = new Client({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'codeit',
//     password: 'root123',
//     port: '5432'
// });

const client = new Client({
  user: process.env.POSTGRES_USER || 'codeit_render_user',
  host: process.env.POSTGRES_HOST || 'dpg-cg7k5t5269v5l62acno0-a.frankfurt-postgres.render.com',
  database: process.env.POSTGRES_DB || 'codeit_render',
  password: process.env.POSTGRES_PASSWORD || 'yl3sNzE5sHyZsyDAjQaQp9bJXfcHEMzG',
  port: process.env.POSTGRES_PORT || '5432',
  ssl: true
});




module.exports = { client, config };