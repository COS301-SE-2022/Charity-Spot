import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Navbar,Nav} from 'react-bootstrap'
import CS from '../../../../libs/client/shared/assets/CS.png'



function Navigation() {

  const [showLogin, setShowLogin] = React.useState(false);
  const [showProfile, setShowProfile] = React.useState(false);
  const [showDonate, setShowDonate] = React.useState(false);

  useEffect(() => {
    if (window.location.pathname === '/profile') {
      console.log("working!");
      setShowLogin(false);
      setShowProfile(true);
      setShowDonate(true);
      
    }

    if (window.location.pathname === '/login') {
      console.log("working!");
      setShowProfile(false);
      setShowDonate(false);
    }

    if (window.location.pathname === '/home') {
      console.log("working!");
      setShowProfile(true);
      setShowLogin(false);
      setShowDonate(true);
    }

   },[]);


  return (
    <div>
    <Navbar expand="lg" style={{ backgroundColor: '#dcdfe3', height: '80px',zIndex: 2 }}>
    <div className='logo-class'>
            <img src={CS} alt='' id='logo-nav-id'/>
     </div>
      <Navbar.Brand style={{ color: '#1458b3', }} as={Link} to = {"/"} >Charity-Spot</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav style={{ backgroundColor: '#dcdfe3', }}className="me-auto">      
          <Nav.Link as={Link} to={"/home"}>Home</Nav.Link>
          { showLogin ? <Nav.Link as={Link} to={"/login"}>Login</Nav.Link> : null}
          { showProfile ? <Nav.Link as={Link} to={"/profile"}>Profile</Nav.Link> : null}
          { showDonate ? <Nav.Link as={Link} to={"/donate"}>Donate</Nav.Link> : null }
          
        </Nav>
      </Navbar.Collapse>
  </Navbar>
  </div>
  )
}

export default Navigation