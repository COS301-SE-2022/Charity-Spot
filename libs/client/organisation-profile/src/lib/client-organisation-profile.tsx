import React,{useState,useEffect} from 'react'
import './profile.css'
import userprofile from '../../../shared/assets/userprofile.png'


import 'react-tabs/style/react-tabs.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUserAlt,FaEdit,FaPen } from 'react-icons/fa'

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
  <div className="wrapper">
    <br/><br/>
      <input type ="radio" name="slider" id='home' defaultChecked ></input>
      <input type ="radio" name="slider" id='blog' ></input>
      {/* <input type ="radio" name="slider" id='code' ></input>
      <input type ="radio" name="slider" id='help' ></input> */}
      <nav>
        <label htmlFor= "home" className='home' onClick ={()=>{}}><FaUserAlt/> Profile  </label>
        <label htmlFor= "blog" className='blog'> <FaEdit/> Edit </label>
        <div className='slider'></div>
      </nav>
<section>
  <div className='content content-1'>
        <div className='title'><h2>Profile</h2></div>

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
          <ListGroup.Item style={{ backgroundColor: 'transparent', height: '70px' , color: '#104283'}}>Name: { OName }</ListGroup.Item>
            {/* <ListGroup.Item style={{ backgroundColor: 'transparent', height: '70px', color: '#104283' }}></ListGroup.Item> */}
            <ListGroup.Item style={{ backgroundColor: 'transparent', height: '70px', color: '#104283' }}>Email: { OEmail}</ListGroup.Item>
            <ListGroup.Item style={{ backgroundColor: 'transparent', height: '70px' , color: '#104283'}}>Date Registered: { ODate }</ListGroup.Item>
            <ListGroup.Item style={{ backgroundColor: 'transparent', height: '70px' , color: '#104283'}}>Location: { OLocation}</ListGroup.Item>
            <ListGroup.Item style={{ backgroundColor: 'transparent', height: '70px' , color: '#104283'}}>Rating: 5.0</ListGroup.Item>
          </ListGroup>
          </div>
      </div>
   </div> 
   
   


      

  <div className='content content-2'>
            <div className='title'><h2>Edit Profile</h2></div>

            <div className='editor-main'>

              <div className='editor-left'>
              <div className='edit-pic'>
                <img src={userprofile} alt="" id="editor-pic"/>
              </div>
              <form onSubmit={hanndlesubmit}>
                  <button type='submit' id='logout1'>Log out</button>
              </form>
              </div>
              <div className='editor-right'>
                <br/><br/>
                <div className='updater'>
                  <form onSubmit={hanndlesubmit}>
                    <div className='user-box1'>
                      {/* <label htmlFor=''>OrgName</label><br/> */}
                      <input className="in1" type ="text" placeholder='Name'defaultValue={OName} ></input>  
                      <FaPen color='#1458b3'/>
                    </div>
                    <div className='user-box2'>
                      {/* <label htmlFor=''>Email</label> */}
                      <input className="in2" type ="email" placeholder='Email'defaultValue={OEmail}></input> 
                      <FaPen color='#1458b3'/>
                    </div>  
                    <div className='user-box3'>
                      {/* <label htmlFor=''>Address</label> */}
                      <input className="in3" type ="text" placeholder='Address' defaultValue={OLocation}></input> 
                      <FaPen color='#1458b3'/>
                    </div>                                
                    <div className='user-box4'>
                      {/* <label htmlFor=''>Org Password</label> */}
                      <input className="in4" type ="password" placeholder='Password'></input> 
                      <FaPen color='#1458b3'/>
                    </div>      
                    <div className='user-box5'>
                      {/* <label htmlFor=''>confirm password</label> */}
                      <input className="in5" type ="password" placeholder='Confirm Password'></input> 
                      <FaPen color='#1458b3'/>
                    </div> 
                    <input id='upt_but'type="submit" value="Update"/>                                                                                       
                  </form>
                </div>  
              </div>
          </div>
            </div>
  </section>
 </div>   
  )
}

export default Profile