const http = require('http');
const config = require('./config.js');
const express = require('express');
const cors = require('cors');

const app = express();
const port = config.app.port;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

app.listen(port, () => {
    console.log(`App running on port ${port}`);
})