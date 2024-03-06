const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

import handleRegister from './controllers/register.js';
import handleSignIn from'./controllers/signIn.js';
import handleProfileGet from './controllers/profile.js';
import handleImage, handleApiCall from './controllers/image.js';

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    port : 5432,
    password : '123456',
    database : 'face-recognition-app'
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('Success');
})

app.post('/signin', (req, res) => { signIn.handleSignIn(req, res, db, bcrypt) });

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) });

app.put('/image', (req, res) => { image.handleImage(req, res, db ) });

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res, ) });

app.listen(3000, () => {
	console.log("app works");
})