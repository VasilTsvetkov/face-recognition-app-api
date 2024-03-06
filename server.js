import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';

import handleRegister from './controllers/register.js';
import handleSignIn from'./controllers/signIn.js';
import handleProfileGet from './controllers/profile.js';
import { handleImage, handleApiCall } from './controllers/image.js';

const db = knex({
  client: 'pg',
  connection: {
    connectionString: 'postgres://face_recognition_app_db_kww4_user:IgT2IwY3p0V47vDQpv7lFcdbUgwVVKKs@dpg-cnk2poq1hbls739r5dbg-a/face_recognition_app_db_kww4',
    host : 'dpg-cnk2poq1hbls739r5dbg-a',
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

app.post('/signin', (req, res) => { handleSignIn(req, res, db, bcrypt) });

app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt) });

app.get('/profile/:id', (req, res) => { handleProfileGet(req, res, db) });

app.put('/image', (req, res) => { handleImage(req, res, db ) });

app.post('/imageurl', (req, res) => { handleApiCall(req, res ) });

app.listen(3000, () => {
	console.log("app works");
})