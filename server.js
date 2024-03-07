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
    connectionString: process.env.DATABASE_URL,
    host : process.env.DATABASE_HOST,
    user : process.env.DATABASE_USER,
    port : 5432,
    password : process.env.DATABASE_PW,
    database : process.env.DATABASE_DB
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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});