import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Navbar,Nav} from 'react-bootstrap'
import CS from '../../../../libs/client/shared/assets/CS.png'

import { getCookie, setCookie } from 'typescript-cookie'



function Navigation() {

  const checkIfUserLogIn = () => {
    var ID = getCookie('ID');

    if(ID == undefined){
      return false;
    }

    return true;

  }

  return (
    <div>
    <Navbar expand="lg" style={{ backgroundColor: '#dcdfe3', height: '80px',zIndex: 2 }}>
    <div className='logo-class'>
            <img src={CS} alt='' id='logo-nav-id'/>
     </div>
      <Navbar.Brand style={{ color: '#1458b3', }} as={Link} to = {"/login"} >Charity-Spot</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav style={{ backgroundColor: '#dcdfe3', }}className="me-auto">      
          <Nav.Link as={Link} to={"/home"}>Home</Nav.Link> 
          {/*!checkIfUserLogIn()  && <Nav.Link as={Link} to={"/login"}>Login</Nav.Link>*/}
          { checkIfUserLogIn()  && <Nav.Link as={Link} to={"/profile"}>Profile</Nav.Link>}
          { checkIfUserLogIn()  && <Nav.Link as={Link} to={"/donate"}>Donate</Nav.Link>}
        </Nav>
      </Navbar.Collapse>
  </Navbar>
  </div>
  )
}

export default Navigation