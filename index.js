import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongooses from 'mongoose';
import bodyParser from 'body-parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import authRoute from './routes/authen.js';
import userRoute from './routes/user.js';
import middlewaresAuthor from './middlewares/auth.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

mongooses.connect(process.env.MONGO_URL, () => {
  console.log('Mongo runing...');
  console.log(`http://localhost:${process.env.PORT}`);
})

const db = mongooses.connection;
 
db.on('error', console.error.bind(console, 'connection error:'));

app.set('view engine', 'ejs');
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static('resources'));
app.use('/js', express.static(__dirname + 'resources/js'));

app.get('/', (_, res) => res.render('home.ejs'))
app.get('/login', (_, res) => res.render('login.ejs'))
app.get('/register', (_, res) => res.render('register.ejs'));
app.get('/product-add', (_, res) => res.render('addProduct.ejs'))
app.get('/book/:id', (_, res) => res.render('productDetail.ejs'))

app.use('/v1/auth', authRoute);
app.use('/v1/user', middlewaresAuthor.verifyToken, userRoute);

app.listen(process.env.PORT || 8800, () => {
  console.log('Server running');
})
