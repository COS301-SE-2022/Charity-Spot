import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Navbar,Nav} from 'react-bootstrap'
import CS from '../../../../libs/client/shared/assets/CS.png'

import { getCookie, removeCookie} from 'typescript-cookie'

const ID = getCookie('ID');
const ID_EXT = getCookie('ID_EXT');

function Navigation() {

  const [assist,setAssist] = useState(false);
  const [need,setNeed] = useState(false);
  const [log, setLog] = useState(false);

  function checkIfUserLogIn(){

    if(ID == undefined){
      return;
    }
    setLog(true);

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
    if(ID_EXT == "assist"){
      setAssist(true)
    }
    else if(ID_EXT == "need"){
      setNeed(true);
    }
    return false;
  }

  function removeForeignCookie(){
    removeCookie('foreignID');
  }

  useEffect(() => {
    console.log("hellob");
    checkIfUserLogIn();
    checkID();
  },[]);

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

          { !log &&<Nav.Link as={Link} to={"/login"} onClick={()=>{removeForeignCookie();}}>Login</Nav.Link>}
          <Nav.Link as={Link} to={"/home"} onClick={()=>{removeForeignCookie();}}>Home</Nav.Link> 
          { log &&<Nav.Link as={Link} to={"/profile"} onClick={()=>{removeForeignCookie(); window.location.replace('/profile')}}>Profile</Nav.Link>}
          { assist && <Nav.Link as={Link} to={"/donate"} onClick={()=>{removeForeignCookie();}}>Donate</Nav.Link>}
          { /*checkIfUserLogIn() && <Nav.Link as={Link} to='#' onClick={() => {logout()}}>Logout</Nav.Link>}*/}
          { need && <Nav.Link as={Link} to={"/itemRequest"} onClick={()=>{removeForeignCookie();}}>Ask</Nav.Link>}
          { log && <Nav.Link as={Link} to={"chatHistory"}>Chat History</Nav.Link>}
        </Nav>
      </Navbar.Collapse>
  </Navbar>
  </div>
  )
}

export default Navigation