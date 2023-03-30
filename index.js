import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongooses from 'mongoose';
import bodyParser from 'body-parser';

import authRoute from './routes/authen.js';
import userRoute from './routes/user.js';
import middlewaresAuthor from './middlewares/auth.js';

dotenv.config();

const app = express();

mongooses.connect(process.env.MONGO_URL, () => {
  console.log('Mongo runing...');
  console.log(`http://localhost:${process.env.PORT}`);
})

const db = mongooses.connection;
 
db.on('error', console.error.bind(console, 'connection error:'));

app.use(cors());
app.options('*', cors())
app.use(bodyParser.json());
app.use(express.json());

app.get('/', (_, res) => res.send('API OK'))

app.use('/v1/auth', authRoute);
app.use('/v1/user', middlewaresAuthor.verifyToken, userRoute);

app.listen(process.env.PORT || 8800, () => {
  console.log('Server running');
})
