const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

import handleRegister from './controllers/register.js';
import handleSignIn from'./controllers/signIn.js';
import handleProfileGet from './controllers/profile.js';
import { handleImage, handleApiCall } from './controllers/image.js';

const db = knex({
  client: 'pg',
  connection: {
    host : 'dpg-cnk2poq1hbls739r5dbg-a.frankfurt-postgres.render.com',
    user : 'face_recognition_app_db_kww4_user',
    port : 5432,
    password : 'IgT2IwY3p0V47vDQpv7lFcdbUgwVVKKs',
    database : 'face_recognition_app_db_kww4'
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