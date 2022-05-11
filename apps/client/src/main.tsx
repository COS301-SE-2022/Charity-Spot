/*import { StrictMode } from 'react';
//import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';

import React from 'react';
import ReactDOM from 'react-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
//var Alert = ReactBootstrap.Alert;
root.render(
  <App />
);

/*<StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
</StrictMode>*/

import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/app';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<App />, document.getElementById('root'));