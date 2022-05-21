import React,{useState,useEffect} from 'react'
import './profile.css'
import userprofile from '../../../shared/assets/userprofile.png'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import ListGroup from 'react-bootstrap/esm/ListGroup';
let fullCookie = document.cookie.split("="); 
 let IdCookie = fullCookie[1];

async function APICall(usrID:string){
    
  const query = (`query {
    OrgProfile(userID:"${usrID}"){
      Email
      Name
      Date
      Location
    }
  }`);
    
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
          }).then(r => r.json())
          .then((data) => 
            All_data = data
            );
            
         return JSON.stringify(All_data);
         console.log(All_data);

}

let Loc = '';

export function Profile() {
  let [OEmail, setOEmail] = useState('');
  let [OName,setOName] = useState('');
  let [ODate,setODate] = useState('');
  let [OLocation,setOLocation] = useState('');

  let hanndlesubmit = (event: { preventDefault: () => void; }) =>{
    event.preventDefault();

    document.cookie = "ID= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = '/login'; 

  }

  const displayData = async() =>{

    const response = JSON.parse(await APICall(IdCookie));
    console.log(response.data.OrgProfile);
    let allData = response.data.OrgProfile;
    const {Email,Name,Date,Location} = allData;
    
    setOEmail(Email);
    setOName(Name);
    setODate(Date);
    setOLocation(Location);
    
  }

  useEffect(() => {
    displayData();
   },[]);

  
  return (
    <div className='profile-page'>


      <br/>
        <h1 style ={{color: '#1458b3'}}> { OName }</h1>

        <Tabs>
          <TabList>
            <Tab>Profile Page</Tab>
            <Tab>Donate an Item</Tab>
            <Tab>Profile Settings</Tab>
          </TabList>
        </Tabs>

        <div className='profile-main'>

          <div className='user-left'>
          <div className='prof-pic'>
            {/*<img src={userprofile} alt="" id="profile-pic"/>*/}
            <img src="https://firebasestorage.googleapis.com/v0/b/cos301-storage-test.appspot.com/o/logo.png?alt=media&token=658a4502-2b08-47bf-8cb2-fe7eacbf8c3e" alt="" id="profile-pic"></img>
          </div>
          <form onSubmit={hanndlesubmit}>
              <button type='submit' id='logout1'>Log out</button>
          </form>
          </div>
          <div className='user-right'>
            <br/><br/>
          <ListGroup variant="flush" >
            <ListGroup.Item style={{ backgroundColor: 'transparent', height: '70px', color: '#104283' }}></ListGroup.Item>
            <ListGroup.Item style={{ backgroundColor: 'transparent', height: '70px', color: '#104283' }}>Email: { OEmail}</ListGroup.Item>
            {/*<ListGroup.Item style={{ backgroundColor: 'transparent', height: '70px' , color: '#104283'}}>Name: { OName }</ListGroup.Item>*/}
            <ListGroup.Item style={{ backgroundColor: 'transparent', height: '70px' , color: '#104283'}}>Date Registered: { ODate }</ListGroup.Item>
            <ListGroup.Item style={{ backgroundColor: 'transparent', height: '70px' , color: '#104283'}}>Location: { OLocation}</ListGroup.Item>
            <ListGroup.Item style={{ backgroundColor: 'transparent', height: '70px' , color: '#104283'}}>Rating: 5.0</ListGroup.Item>
          </ListGroup>
          </div>
      </div>
    </div>
  )
}

export default Profile