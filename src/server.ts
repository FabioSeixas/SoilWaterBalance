import 'reflect-metadata';

import express from 'express';
import 'express-async-errors';

import routes from './routes';

import './database';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log('Server Running on port 3333');
});
