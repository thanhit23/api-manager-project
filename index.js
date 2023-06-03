import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongooses from 'mongoose';
import bodyParser from 'body-parser';
import pkg from 'http-proxy-middleware';

import userRoute from './routes/user.js';
import taskRouter from './routes/task.js';
import authRoute from './routes/authen.js';
import projectRouter from './routes/project.js';
import employeeRouter from './routes/employee.js';
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
app.use('/auth', authRoute);
app.use('/v1/project', middlewaresAuthor.verifyToken, projectRouter);
app.use('/v1/employee', middlewaresAuthor.verifyToken, employeeRouter);
app.use('/v1/task', middlewaresAuthor.verifyToken, taskRouter);
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
