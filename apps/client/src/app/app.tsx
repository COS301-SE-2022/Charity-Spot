import React, { useState } from 'react';

import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Navigation from './Navigation';
//import ClientLogin from './pages/ClientLogin';
//import Home from './pages/Home';
//import Register from './pages/register';
//import 'bootstrap/dist/css/bootstrap.min.css';



//import { Route, Routes, Link } from 'react-router-dom';

import {ClientLogin} from '@charity-spot/client/login';
import {Register} from '@charity-spot/client/registration';
import {Home} from '@charity-spot/client/organisation-profile';

function App() {
  return (
    <div className="App">
      <Router>
      <Navigation/>
        <Routes>
          <Route path ="/" element = { <ClientLogin/>}/>
          <Route path = "/login" element = {<ClientLogin/>}/>
          <Route path = "/register" element ={<Register/>}/>
          <Route path = "/profile" element ={<Home/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
