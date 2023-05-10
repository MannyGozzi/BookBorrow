import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { DataSource } from 'typeorm';

import login from './routes/login';

const dbConfig = require('../ormconfig.json');

// Setting up port
const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: false })); // For body parser
app.use(bodyParser.json());
app.use(cookieSession({
  name: 'mysession',
  keys: ['vueauthrandomkey'],
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
}));

const AppDataSource = new DataSource(dbConfig);

// wire up all the routes
app.use(login());

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (_req, res) => {
  res.send('hello world');
});

AppDataSource.initialize().then(() => {
  app.set('datasource', AppDataSource)
  app.listen(PORT, () => console.log('Example app listening on port 3000!'));
});
