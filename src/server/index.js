import compression from 'compression';
import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import parser from 'body-parser';
import './db/config';
import router from './router';

import { APP_NAME, STATIC_PATH, WEB_PORT } from '../shared/config';
import { isProd } from '../shared/util';
import renderApp from './render-app';

require('babel-core/register');
require('babel-polyfill');

const app = express();


app.use(compression());
app.use(STATIC_PATH, express.static('dist'));
app.use(STATIC_PATH, express.static('public'));

app.use(cors());
app.use(logger('dev'));
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

// app.get('/', (req, res) => {
//   res.send(renderApp(APP_NAME));
// });

router(app);

app.all('*', (req, res) => {
  // res.redirect('/');
  res.send(renderApp(APP_NAME));
});

app.listen(WEB_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${WEB_PORT} ${isProd ? '(production)' :
    '(development).\nKeep "yarn dev:wds" running in an other terminal'}.`);
});
