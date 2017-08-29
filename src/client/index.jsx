import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './app';
import { APP_CONTAINER_SELECTOR } from '../shared/config';
import { BrowserRouter } from 'react-router-dom';

const rootEl = document.querySelector(APP_CONTAINER_SELECTOR);

const wrapApp = AppComponent =>
  <BrowserRouter>
    <AppContainer>
      <AppComponent />
   </AppContainer>
  </BrowserRouter>;

ReactDOM.render(wrapApp(App), rootEl);

if (module.hot) {
  module.hot.accept('./app', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./app').default
    ReactDOM.render(wrapApp(NextApp), rootEl)
  })
};
