require('dotenv').config();
const config = require('./config.js');
const express = require('express');
const cors = require('cors');
const client = require('./dbService.js');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const port = config.app.port;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

client.connect((err) => {
    if (err) {
        throw err;
    };
    console.log('MYSQL connected');
});

function isEmail(email) {
    var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (email !== '' && email.match(emailFormat)) { return true; }
    
    return false;
}

app.get('/countries', (req, res) => {
    client.query('SELECT * FROM countries').then(result => {
        let countries = [];
        result.rows.forEach(row => {
            countries.push(row.country);
        });
        res.json(countries);
    });
});

app.post('/register', async (req, res) => {
    ({ email, username, realname, password, birthdate } = req.body);
    if (password.length < 6) return res.json('Invalid password');
    if (!isEmail(email)) return res.json('Invalid email');
    const cryptedPassword = await bcrypt.hash(password, 10);
    const insertQuery = `INSERT INTO users(email, username, realname, password, birthdate) 
                       VALUES('${email}', '${username}', '${realname}', '${cryptedPassword}', '${birthdate}')`;

    const userDetails = [email, username];

    client.query(insertQuery, (err, result) => {
        if (err) {
            console.log(err.message);
            return;
        }
        res.json(userDetails);
        res.sendFile(__dirname + '/public/home-page.html');
    });
    client.end;
});

app.post('/login', async (req, result) => {
    ({ emailOrUsername, password } = req.body);

    const selectQuery = `SELECT email, username, password FROM users WHERE email='${emailOrUsername}' OR username='${emailOrUsername}'`;

    try {
        const queryResult = await client.query(selectQuery);    
        const userEmailLogin = queryResult.rows[0].email;
        const usernameLogin = queryResult.rows[0].username;
        const userDetails = [userEmailLogin, usernameLogin];
        const cryptedPass = queryResult.rows[0].password;

        if (await bcrypt.compare(password, cryptedPass)) {
            console.log(111111);
            result.json(userDetails);
        } else {
            result.json('Incorrect password')
        }
    } catch (err) {
        throw new Error('Failed to do');
    }

    client.end();
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
})