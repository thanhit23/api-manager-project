import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongooses from 'mongoose';
import bodyParser from 'body-parser';
import pkg from 'http-proxy-middleware';

import authRoute from './routes/authen.js';
import employeeRouter from './routes/employee.js';
import userRoute from './routes/user.js';
import middlewaresAuthor from './middlewares/auth.js';

dotenv.config();

const app = express();
const { createProxyMiddleware } = pkg;

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
app.use(express.static('resources'));

app.get('/', (_, res) => res.send('API OK'))
app.use('/v1/auth', authRoute);
app.use('/v1/employee', employeeRouter);
app.use('/v1/user', middlewaresAuthor.verifyToken, userRoute);
app.use(
  '/file',
  createProxyMiddleware({
    target: process.env.URL_UPLOAD_FILE,
    changeOrigin: true,
    logger: console,
  })
);

app.listen(process.env.PORT || 8800, () => {
  console.log('Server running');
})
