import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Navbar,Nav} from 'react-bootstrap'
import CS from '../../../../libs/client/shared/assets/CS.png'
import './navbarrr.css';
import { FaBell } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';

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

  const logOut = () => {
    removeCookie('ID');
    removeCookie('ID_EXT');
    removeCookie('foreignID');

    window.location.href = '/login';
  }

  const checkID = () => {  
    if(ID_EXT == "assist"){
      setAssist(true)
    }
    else if(ID_EXT == "need"){
      setNeed(true);
    }
    return false;
  }

  function removeForeignCookie(aLink : string){

    if(getCookie('foreignID') != undefined){
      removeCookie('foreignID');
      if(aLink == 'b'){
        window.location.replace('/profile')
      }
    }
    
  }

  useEffect(() => {
    console.log("hellob");
    checkIfUserLogIn();
    checkID();
  },[]);

  

  return (
    <div>
    <Navbar expand="lg" style={{ backgroundColor: '#dcdfe3', height: '80px',zIndex: 2 }} >
    <div className='logo-class'>
            <img src={CS} alt='' id='logo-nav-id'/>
     </div>
      <Navbar.Brand style={{ color: '#1458b3', }} as={Link} to = '#'>Charity-Spot</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav style={{ backgroundColor: '#dcdfe3'}} className="me-auto" variant="pills" >      

          { !log &&<Nav.Link  as={Link} to={"/login"} onClick={()=>{removeForeignCookie('a');}}>Login</Nav.Link>}
          <Nav.Link as={Link} to={"/home"} onClick={()=>{removeForeignCookie('a');}}>Home</Nav.Link> 
          { log &&<Nav.Link as={Link} to={"/profile"} onClick={()=>{removeForeignCookie('b');}}>Profile</Nav.Link>}
          { assist && <Nav.Link as={Link} to={"/donate"} onClick={()=>{removeForeignCookie('a');}}>Donate</Nav.Link>}
          { need && <Nav.Link as={Link} to={"/itemRequest"} onClick={()=>{removeForeignCookie('a');}}>Ask</Nav.Link>}
          { log && <Nav.Link as={Link} to={"/chatSessions"}>Chat Sessions</Nav.Link>}
          { log && <Nav.Link as={Link} to={"/deliverySchedule"}>Delivery Schedule</Nav.Link>}
          
        </Nav>

        { log && <Nav style={{ backgroundColor: '#dcdfe3'}} className="ms-auto">
        <Nav.Link><Button variant="outline-danger" onClick={()=>{logOut();}}><FaBell/></Button></Nav.Link>
          <Nav.Link><Button variant="outline-danger" onClick={()=>{logOut();}}>Log Out</Button></Nav.Link>
        </Nav>}

      </Navbar.Collapse>
  </Navbar>
  </div>
  )
}

export default Navigation