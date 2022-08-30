import React,{useState,useEffect} from 'react'
import './profile.css'
import userprofile from '../../../shared/assets/userprofile.png'

import 'react-tabs/style/react-tabs.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUserAlt,FaEdit,FaPen } from 'react-icons/fa'

import ListGroup from 'react-bootstrap/esm/ListGroup';

import { getCookie, setCookie, removeCookie } from 'typescript-cookie'
import {Link} from 'react-router-dom'

const IdCookie = getCookie('ID');

async function APICall(usrID:string){
    
  const query = (`query {
    OrgProfile(userID:"${usrID}"){
      Email
      Name
      Date
      Location
      Picture
      Internal
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
  const [editView, setEditView] = useState(true);

  const [delButton, setdelButton] = useState(true);
  const [chatButton, setchatButton] = useState(true);


  const hanndlesubmit = (event: { preventDefault: () => void; }) =>{
    event.preventDefault();

    removeCookie('ID');
    window.location.href = '/login'; 

  }

  const handlesumbitUpdate = async () => {

    if(NewOName == "undefined" && NewOLocation == "undefined" && NewOPass == "undefined" && NewOPassC == "undefined"){
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

      const foreinCookie = getCookie("foreignID");
      let response = null;

      if(foreinCookie != undefined){        
        if(foreinCookie!=IdCookie){
          setEditView(false);
        }
        else{
          setchatButton(false);
          setdelButton(false);
        }
        response = JSON.parse(await APICall(foreinCookie));
      }
      else{ 
        response = JSON.parse(await APICall(IdCookie));
        setchatButton(false);
        setdelButton(false);
      }

      const allData = response.data.OrgProfile;
      const {Email,Name,Date,Location,Picture,Internal} = allData;

      //console.log(Internal);
      
      //if(Internal == "ASSIST") {
        setOName(Name);
        setOEmail(Email);
        setODate(Date);
        setOLocation(Location);
        setOPicture(Picture);
      //} else
        //setOName("DEMO4");

      let currType = getCookie("ID_EXT")

      if(currType == "NEED"){
        setdelButton(false);
      }

      //console.log(currType);

    }

  }

  useEffect(() => {
    setEditView(true);
    displayData();
   },[]);
  
  return (
    <div>
    {/*{
      (
        ()=> {
          if(OName == "DEMO4") {
            return (
              <div className='content content-1'>
                <br/><br/>
                <h1>YOU ARE NOT AN ASSISTING ORGANISATION<br/>ALL THIS WILL BE DONE IN DEMO 4</h1>
              </div>
            )
          } else {*
            return (*/}

            <div className="wrapperProfile">
                <br/><br/>
                  <input type ="radio" name="sliderProf" id='profTab' defaultChecked ></input>
                  <input type ="radio" name="sliderProf" id='blog' ></input>
                  {( editView && <nav>
                    <label htmlFor= "profTab" className='profTab' ><FaUserAlt/> Profile  </label>
                    <label htmlFor= "blog" className='blog'> <FaEdit/> Edit </label>
                    <div className='sliderProf'></div>
                  </nav>)}
            <section>
              
            <div className='content content-1'>

            <div className='title'><h1>{OName} Profile</h1></div>

            <div className="profile-main">

              <div className='user-left'>
                <div className='prof-pic'>
                  <img src="https://firebasestorage.googleapis.com/v0/b/cos301-storage-test.appspot.com/o/logo.png?alt=media&token=658a4502-2b08-47bf-8cb2-fe7eacbf8c3e" alt="" id="profile-pic"></img>
                  
                </div>
                {( editView &&<form onSubmit={hanndlesubmit}>
                    <button type='submit' id='logout1'>Log out</button>
                </form>)}
                <h3 className='headings' >About Us</h3>
                <div className="cover3">
                  
                  <p>We have been in the food business for 10 years, particularly focusing on poultry. We offer Chicken intenstines, feet and breasts</p>
                </div>
                <h3 className='headings' >Reviews</h3>
                <div className='pcomments'>

                <div className='pcomment'><div className='commentPic'><h4>HF</h4></div><b><p>Helping Foundation</p></b><br></br>
                  <div className="ratedsmall"> 
                        <input type="radio" id="star55" checked = {true} name="rate3" value="5" disabled />
                        <label htmlFor="star55" title="text"></label>
                        <input type="radio" id="star44"   name="rate3" value="4"  disabled/>
                        <label htmlFor="star44"title="text"></label>
                        <input type="radio" id="star33" name="rate3" value="3"  disabled />
                        <label  htmlFor="star33" title="text"></label>
                        <input type="radio" id="star22" name="rate3" value="2"  disabled/>
                        <label  htmlFor="star22" title="text"></label>
                        <input type="radio" id="star11" name="rate3" value="1"  disabled/>
                        <label  htmlFor="star11" title="text"></label>
                      </div> 
                      <br></br>
                      <p>This organization is fast and reliable, The delievered the frozen chicken in time</p> 
                  </div> 

                  
                <div className='pcomment'><div className='commentPic'><h4>BS</h4></div><b><p>Boys School</p></b><br></br>
                  <div className="ratedsmall"> 
                        <input type="radio" id="star55"  name="rate4" value="5" disabled />
                        <label htmlFor="star55" title="text"></label>
                        <input type="radio" id="star44"   name="rate4" value="4"  disabled/>
                        <label htmlFor="star44"title="text"></label>
                        <input type="radio" id="star33" name="rate4" value="3"  disabled />
                        <label  htmlFor="star33" title="text"></label>
                        <input type="radio" id="star22" name="rate4" value="2"  disabled/>
                        <label  htmlFor="star22" title="text"></label>
                        <input type="radio" id="star11" checked = {true} name="rate4" value="1"  disabled/>
                        <label  htmlFor="star11" title="text"></label>
                      </div> 
                      <br></br>
                      <p> Very dissapointed, they delivered rotten chicken breats :(</p>
                  </div>                
        
                </div>
            </div>



              <div className='user-right'>
                <br/><br/>
                        
                <div className="cover">Email: { OEmail}</div>
                <div className="cover">Date Registered: { ODate }</div>
                <div className="cover">Location: { OLocation}</div>


                <div className="cover2"> 
                    {/* <p>Rate Organization</p>
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
                    </div> */}

                    <p>Average Rating 4.0</p>
                    <div className="rated"> 
                      <input type="radio" id="star5" name="rate" value="5" disabled />
                      <label htmlFor="star5" title="text"></label>
                      <input type="radio" id="star4"  checked = {true} name="rate" value="4"  disabled/>
                      <label htmlFor="star4"title="text"></label>
                      <input type="radio" id="star3" name="rate" value="3"  disabled />
                      <label  htmlFor="star3" title="text"></label>
                      <input type="radio" id="star2" name="rate" value="2"  disabled/>
                      <label  htmlFor="star2" title="text"></label>
                      <input type="radio" id="star1" name="rate" value="1"  disabled/>
                      <label  htmlFor="star1" title="text"></label>
                    </div> 
                </div>



              {( chatButton &&<Link to ='/chat' className='rgLink'><button type='submit' id='chatGo'>Chat</button></Link>)}
              {( delButton &&<Link to ='/scheduleDelivery' className='rgLink'><button type='submit' id='delivGo'>Donate</button></Link>)}
              {/* <button type='submit' id='subGo'>Submit</button> */}

              </div>

            </div>
            </div>
      

              {( editView && <div className='content content-2'>
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
                                <label>Enter Name</label><br/>
                                  <input className="in1" type ="text" placeholder=' Name'defaultValue={OName} onChange ={(e)=>{setNewOName(e.target.value)}}></input>  
                                  <FaPen color='#1458b3'/>
                                </div>
                                
                                <div className='user-box2'>
                                  <input className="in3" type ="text" placeholder=' Address' defaultValue={OLocation} onChange ={(e)=>{setNewOLocation(e.target.value)}}></input> 
                                  <FaPen color='#1458b3'/>
                                </div>                                
                                <div className='user-box3'>
                                  <input className="in4" type ="password" placeholder=' Password' defaultValue = "" onChange ={(e)=>{setNewOPass(e.target.value)}}></input> 
                                  <FaPen color='#1458b3'/>
                                </div>      
                                <div className='user-box4'>
                                  <input className="in5" type ="password" placeholder=' Confirm Password' onChange ={(e)=>{setNewOPassC(e.target.value)}}></input> 
                                  <FaPen color='#1458b3'/>
                                </div> 
                                <input id='upt_but'type="submit" value="Update"/>   <FaPen color='transparent'/>                                                                                     
                              </form>
                            </div>  
                          </div>
                      </div>
                        </div>)}
              </section>
            </div>
        
          {/*}
        }
      ) ()
    }*/}  
   
    </div>
  )
}

export default Profile