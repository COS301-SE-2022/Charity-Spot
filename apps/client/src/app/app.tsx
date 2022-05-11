import React from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Navigation from './Navigation';
import ClientLogin from './pages/ClientLogin';
import Home from './pages/Home';
import Register from './pages/register';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Router>
      <Navigation/>
        <Routes>
          <Route path ="/" element = { <Home/>}/>
          <Route path = "/login" element = {<ClientLogin/>}/>
          <Route path = "/register" element ={<Register/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
