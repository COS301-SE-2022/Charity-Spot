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
import {Profile} from '@charity-spot/client/organisation-profile';
import {Home} from '@charity-spot/client/home';
import {ClientDonate} from '@charity-spot/client/donate';

function App() {
  return (
    <div className="App">
      <Router>
      <Navigation/>
        <Routes>
          <Route path ="/" element = { <ClientLogin/>}/>
          <Route path = "/login" element = {<ClientLogin/>}/>
          <Route path = "/register" element ={<Register/>}/>
          <Route path = "/profile" element ={<Profile/>}/>
          <Route path = "/home" element ={<Home/>}/>
          <Route path = "/donate" element = {<ClientDonate/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
