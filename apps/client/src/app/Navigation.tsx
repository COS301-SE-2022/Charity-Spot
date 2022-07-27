import React,{useState,useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Navbar,Nav} from 'react-bootstrap'
import CS from '../../../../libs/client/shared/assets/CS.png'

import { getCookie, removeCookie} from 'typescript-cookie'

const ID = getCookie('ID');
const ID_EXT = getCookie('ID_EXT');

function Navigation() {

  const navigate = useNavigate();


  const checkIfUserLogIn = () => {
    return ID !== undefined;
  }

  /*const logout = () => {
    if(document.cookie.split(";").length > 0)
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*///, "=;expires=" + new Date().toUTCString() + ";path=/");
      //}); 
      

      //window.location.replace('/login');
  //}*/

  const checkID = () => {  
    if(checkIfUserLogIn())
      return ID_EXT === "ORG";

    return false;
  }

  function removeForeignCookie(){
    removeCookie('foreignID');
  }

  return (
    <div>
    <Navbar expand="lg" style={{ backgroundColor: '#dcdfe3', height: '80px',zIndex: 2 }}>
    <div className='logo-class'>
            <img src={CS} alt='' id='logo-nav-id'/>
     </div>
      <Navbar.Brand style={{ color: '#1458b3', }} as={Link} to = '#'>Charity-Spot</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav style={{ backgroundColor: '#dcdfe3'}} className="me-auto">      

          {!checkIfUserLogIn()  && <Nav.Link as={Link} to={"/login"} onClick={()=>{removeForeignCookie();}}>Login</Nav.Link>}
          <Nav.Link as={Link} to={"/home"} onClick={()=>{removeForeignCookie();}}>Home</Nav.Link> 
          { checkIfUserLogIn()  && <Nav.Link as={Link} to={"/profile"} onClick={()=>{removeForeignCookie(); window.location.replace('/profile')}}>Profile</Nav.Link>}
          { checkID()  && <Nav.Link as={Link} to={"/donate"} onClick={()=>{removeForeignCookie();}}>Donate</Nav.Link>}
          { /*checkIfUserLogIn() && <Nav.Link as={Link} to='#' onClick={() => {logout()}}>Logout</Nav.Link>}*/}
          { checkIfUserLogIn()  && <Nav.Link as={Link} to={"/itemRequest"} onClick={()=>{removeForeignCookie();}}>Ask</Nav.Link>}
          <Nav.Link as={Link} to={"chatHistory"}>Chat History</Nav.Link>
        </Nav>
      </Navbar.Collapse>
  </Navbar>
  </div>
  )
}

export default Navigation