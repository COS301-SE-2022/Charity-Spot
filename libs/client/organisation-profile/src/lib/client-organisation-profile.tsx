import React,{useState,useEffect} from 'react'
import './profile.css'
import userprofile from '../../../shared/assets/userprofile.png'

import 'react-tabs/style/react-tabs.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUserAlt,FaEdit,FaPen } from 'react-icons/fa'

import ListGroup from 'react-bootstrap/esm/ListGroup';

import { getCookie, setCookie, removeCookie } from 'typescript-cookie'

const IdCookie = getCookie('ID');

async function APICall(usrID:string){
    
  const query = (`query {
    OrgProfile(userID:"${usrID}"){
      Email
      Name
      Date
      Location
      Picture
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

}

//EDIT_PAGE
async function API_EDIT_Call(id:string, orgName: string, loc: string, picture: string, password: string) {
  const query = (`query{
    OrgEditProfile(
      id: "${id}",
      orgName: "${orgName}",
      loc: "${loc}",
      picture: "${picture}",
      password: "${password}"
    ) {
      Email
      Name
      Date
      Location
      Picture
    }
  }`);

  let act_data = undefined;

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
      act_data = data
    );

  return JSON.stringify(act_data);
}



export function Profile() {
  const [OEmail, setOEmail] = useState('');
  const [OName,setOName] = useState('');
  const [ODate,setODate] = useState('');
  const [OLocation,setOLocation] = useState('');
  const [Picture,setOPicture] = useState('');

  
  const [NewOName,setNewOName] = useState('undefined');
  const [NewOLocation,setNewOLocation] = useState('undefined');
  const [NewOPass,setNewOPass] = useState('undefined');
  const [NewOPassC,setNewOPassC] = useState('undefined');

  //const [NewPicture,setNewOPicture] = useState('');
  const [tempView, setTempView] = useState(true);


  const hanndlesubmit = (event: { preventDefault: () => void; }) =>{
    event.preventDefault();

    removeCookie('ID');
    window.location.href = '/login'; 

  }

  const handlesumbitUpdate = async () => {

    if(NewOName == "undefined" && NewOLocation == "undefined" && NewOPass == "undefined" && NewOPassC == "undefined"){
      console.log("No changes");
      return;
    }

    if(NewOPass != NewOPassC){
      alert("password do not match");
      return;
    }

    if(IdCookie != undefined){
      await API_EDIT_Call(IdCookie, NewOName, NewOLocation, "undefined", NewOPass);
    }

    displayData();
    
  }

  const displayData = async() =>{

    if(IdCookie != undefined){

      let testCookie = getCookie("tempID");

      let cookieCall = IdCookie;

      if(testCookie != undefined){        
        removeCookie("tempID");
        setTempView(false);
        cookieCall = testCookie;
      }

      const response = JSON.parse(await APICall(cookieCall));
      const allData = response.data.OrgProfile;
      const {Email,Name,Date,Location,Picture} = allData;
      
      setOEmail(Email);
      setOName(Name);
      setODate(Date);
      setOLocation(Location);
      setOPicture(Picture);

    }

  }

  useEffect(() => {
    setTempView(true);
    displayData();
   },[]);

  
  return (
  <div className="wrapperProfile">
    <br/><br/>
      <input type ="radio" name="sliderProf" id='profTab' defaultChecked ></input>
      <input type ="radio" name="sliderProf" id='blog' ></input>
      {( tempView && <nav>
        <label htmlFor= "profTab" className='profTab' ><FaUserAlt/> Profile  </label>
        <label htmlFor= "blog" className='blog'> <FaEdit/> Edit </label>
        <div className='sliderProf'></div>
      </nav>)}
<section>
  <div className='content content-1'>
        <div className='title'><h1>Profile</h1></div>

        <div className='profile-main'>

          <div className='user-left'>
          <div className='prof-pic'>
            {/*<img src={Picture} alt="" id="profile-pic"/>*/}
            <img src="https://firebasestorage.googleapis.com/v0/b/cos301-storage-test.appspot.com/o/logo.png?alt=media&token=658a4502-2b08-47bf-8cb2-fe7eacbf8c3e" alt="" id="profile-pic"></img>
          </div>
          {( tempView &&<form onSubmit={hanndlesubmit}>
              <button type='submit' id='logout1'>Log out</button>
          </form>)}
          </div>
          <div className='user-right'>
            <br/><br/>
             <div className="cover">Name: { OName }</div>
              <div className="cover">Email: { OEmail}</div>
              <div className="cover">Date Registered: { ODate }</div>
              <div className="cover">Location: { OLocation}</div>
              <div className="cover">Rating: 6.0</div>

              <div className="cover2"> 
                  <p>Rate Organization</p>
                  <div className="rate"> 
                    <input type="radio" id="star5" name="rate" value="5" />
                    <label htmlFor="star5" title="text"></label>
                    <input type="radio" id="star4" name="rate" value="4" />
                    <label htmlFor="star4" title="text"></label>
                    <input type="radio" id="star3" name="rate" value="3" />
                    <label  htmlFor="star3" title="text"></label>
                    <input type="radio" id="star2" name="rate" value="2" />
                    <label  htmlFor="star2" title="text"></label>
                    <input type="radio" id="star1" name="rate" value="1" />
                    <label  htmlFor="star1" title="text"></label>
                  </div>
              </div>
              
          </div>
      </div>
   </div> 
   
   


      

  {( tempView && <div className='content content-2'>
            <div className='title'><h1>Edit</h1></div>

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
                  <form onSubmit={(e) => { e.preventDefault(); handlesumbitUpdate();}}>
                    <div className='user-box1'>
                      <input className="in1" type ="text" placeholder='Name'defaultValue={OName} onChange ={(e)=>{setNewOName(e.target.value)}}></input>  
                      <FaPen color='#1458b3'/>
                    </div>
                    
                    <div className='user-box2'>
                      <input className="in3" type ="text" placeholder='Address' defaultValue={OLocation} onChange ={(e)=>{setNewOLocation(e.target.value)}}></input> 
                      <FaPen color='#1458b3'/>
                    </div>                                
                    <div className='user-box3'>
                      <input className="in4" type ="password" placeholder='Password' defaultValue = "" onChange ={(e)=>{setNewOPass(e.target.value)}}></input> 
                      <FaPen color='#1458b3'/>
                    </div>      
                    <div className='user-box4'>
                      <input className="in5" type ="password" placeholder='Confirm Password' onChange ={(e)=>{setNewOPassC(e.target.value)}}></input> 
                      <FaPen color='#1458b3'/>
                    </div> 
                    <input id='upt_but'type="submit" value="Update"/>                                                                                       
                  </form>
                </div>  
              </div>
          </div>
            </div>)}
  </section>
 </div>   
  )
}

export default Profile