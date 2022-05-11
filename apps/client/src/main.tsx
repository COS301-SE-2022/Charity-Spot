import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';

import 'bootstrap/dist/css/bootstrap.min.css';

import './styles.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
      <App />
);