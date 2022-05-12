import React,{useState} from 'react'
import './profile.css'
//import userprofile from'../assets/userprofile.png'
import userprofile from '../../../shared/assets/userprofile.png'

import ListGroup from 'react-bootstrap/esm/ListGroup';

async function APICall(usrID:string){

  const query = (`query {
    OrgProfile(userID:"${usrID}"){
      Email
      Name
      Date
      Location
    }
  }`);

  //console.log(query);
    
       let All_data = "";
  
       await fetch('http://localhost:3333/graphql', {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json',
               'Accept': 'application/json',
             },
             body: JSON.stringify({
               query
             })
          }).then(r => r.json()).then(data => 
            All_data = data
            );
    
         return JSON.stringify(All_data);

}
export function Home() {

  const hanndlesubmit = (event: { preventDefault: () => void; }) =>{
    event.preventDefault();
}

  return (
    <div className='profile-page'>
      <br/>
        <h1 style ={{color: '#1458b3'}}>Profile</h1>
        <div className='profile-main'>

          <div className='user-left'>
          <div className='prof-pic'>
            <img src={userprofile} alt="" id="profile-pic"/>
          </div>
          <form onSubmit={hanndlesubmit}>
              <button type='submit' id='logout1'>Log out</button>
          </form>
          </div>
          <div className='user-right'>
            <br/><br/>
          <ListGroup variant="flush" >
            <ListGroup.Item style={{ backgroundColor: 'transparent', height: '70px', color: '#104283' }}>Type: Organisation</ListGroup.Item>
            <ListGroup.Item style={{ backgroundColor: 'transparent', height: '70px', color: '#104283' }}>Email: Company1@gmail.com</ListGroup.Item>
            <ListGroup.Item style={{ backgroundColor: 'transparent', height: '70px' , color: '#104283'}}>Name: Company One</ListGroup.Item>
            <ListGroup.Item style={{ backgroundColor: 'transparent', height: '70px' , color: '#104283'}}>Date Registered: 05 May 2022</ListGroup.Item>
            <ListGroup.Item style={{ backgroundColor: 'transparent', height: '70px' , color: '#104283'}}>Location: 5 Bekker strt Pretoria</ListGroup.Item>
          </ListGroup>
          </div>
      </div>
    </div>
  )
}

export default Home