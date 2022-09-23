import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Navbar,Nav} from 'react-bootstrap'
import CS from '../../../../libs/client/shared/assets/CS.png'
import './navbarrr.css';
import { FaBell, FaSignOutAlt } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import { getCookie, removeCookie} from 'typescript-cookie'

import { host } from '../../../../config'

const ID = getCookie('ID');
const ID_EXT = getCookie('ID_EXT');

async function APICall () {

    const query = `query{
      checkNotification(ID: "${ID}", Type: "${ID_EXT}")
    }`;

  let result = null;

  await fetch(`http://${host.host}:3333/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query
    })
  }).then(r => r.json()).then(data => 
          result = data
   );

   return JSON.parse(JSON.stringify(result)).data.checkNotification;
}

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
    if(ID_EXT === "ASSIST"){
      setAssist(true)
    }
    else if(ID_EXT === "NEED"){
      setNeed(true);
    }
    return false;
  }

  function removeForeignCookie(aLink : string){

    //REDUNDENT
    if(getCookie('foreignID') !== undefined){
      removeCookie('foreignID');
      if(aLink === 'b'){
        window.location.replace('/profile'); //NEEDED REGARDLESS OF REDUNDENCY
      }
    }

  }

  async function checkNotification(buttonClick: boolean){

    if(buttonClick){
      (document.getElementById("notButton") as HTMLButtonElement).style.color = "#1458b3";
      return;
    }

    if(ID == undefined || ID_EXT == undefined){
      return;
    }

    await APICall().then((val) => {

      if(val){
        (document.getElementById("notButton") as HTMLButtonElement).style.color = "red";
      }
      else{
        (document.getElementById("notButton") as HTMLButtonElement).style.color = "#1458b3";
      }

    });


  }

  useEffect(() => {
    checkNotification(false);
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
        <Nav defaultActiveKey={"home"} style={{ backgroundColor: '#dcdfe3'}} className="me-auto" variant="pills" >      

          { !log &&<Nav.Link style={{color: "#1458b3", fontWeight: "425"}} eventKey="login" as={Link} to={"/login"} onClick={()=>{removeForeignCookie('a');}}>Login</Nav.Link>}
          { log && <Nav.Link eventKey="home" as={Link} to={"/home"} onClick={()=>{removeForeignCookie('a'); checkNotification(false);}}>Home</Nav.Link>}
          { log &&<Nav.Link eventKey="profile" as={Link} to={"/profile"} onClick={()=>{removeForeignCookie('b'); checkNotification(false);}}>Profile</Nav.Link>}
          { assist && <Nav.Link eventKey="donate" as={Link} to={"/donate"} onClick={()=>{removeForeignCookie('a'); checkNotification(false);}}>Donate</Nav.Link>}
          { need && <Nav.Link eventKey="itemRequest" as={Link} to={"/itemRequest"} onClick={()=>{removeForeignCookie('a'); checkNotification(false);}}>Find</Nav.Link>}
          { log && <Nav.Link eventKey="chatSession" as={Link} onClick={()=>{checkNotification(false);}} to={"/chatSessions"}>Chat Sessions</Nav.Link>}
          { log && <Nav.Link eventKey="donationSchedule" as={Link} onClick={()=>{checkNotification(false);}} to={"/donationSchedule"}>Donation Schedule</Nav.Link>}
          
        </Nav>

        { log && <Nav style={{ backgroundColor: '#dcdfe3'}} className="ms-auto">
        <Nav.Link as={Link} to={"/notifications"}><Button id="notButton" variant="pills"  style={{ color: '#1458b3'}} onClick={()=>{checkNotification(true);}} ><FaBell/></Button></Nav.Link>
          <Nav.Link><Button variant="outline-danger" onClick={()=>{logOut();}}>Log Out</Button></Nav.Link>
        </Nav>}

      </Navbar.Collapse>
  </Navbar>
  </div>
  )
}

export default Navigation