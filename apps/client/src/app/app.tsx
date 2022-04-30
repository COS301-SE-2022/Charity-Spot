import styles from './app.module.css';

import { Route, Routes, Link } from 'react-router-dom';

import {ClientLogin} from '@charity-spot/client/login';

export function App() {
  return (
    <>
      
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </div>
      <Routes>

        <Route
          path="/"
          element={
            <div>
              This is the root
            </div>
          }
        />

        <Route
          path="/page-2"
          element={
            <div>
              <ClientLogin></ClientLogin>
            </div>
          }
        />

      </Routes>
      
    </>
  );
}

export default App;
