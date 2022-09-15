import React,{useState,useEffect} from 'react'
import './profile.css'
import userprofile from '../../../shared/assets/userprofile.png'

import 'react-tabs/style/react-tabs.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUserAlt,FaEdit,FaPen,FaHistory } from 'react-icons/fa'

import ListGroup from 'react-bootstrap/esm/ListGroup';

import {ModalMap} from './modal-map';

import { getCookie, setCookie, removeCookie } from 'typescript-cookie'
import {Link} from 'react-router-dom'

import ItemHistory from './item-history';

import CommentBlock from './commentBlock';

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
      AvgRating
      Description
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

            console.log(All_data)
            
         return JSON.stringify(All_data);

}

//EDIT_PAGE
async function API_EDIT_Call(id:any, orgName: string, loc: string, picture: string, password: string, description: string, email : string) {
  const query = (`query{
    OrgEditProfile(
      id: "${id}",
      orgName: "${orgName}",
      loc: "${loc}",
      picture: "${picture}",
      password: "${password}",
      description: "${description}",
      email: "${email}"
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

  //return JSON.stringify(act_data);
}

/*

query{
  getAllProfInfo(id :"cl7wjsr500032dgchh6vcmzhx"){
    Clients
    ClientNames
    Ratings
    Comments
    Avg
  }
}

*/

async function commentRatingAPICall(comment : any, rating : any){

  let ID = getCookie('ID');
  let foreignID = getCookie('foreignID');

  console.log(ID);
  console.log(foreignID);

  const query = (`query{
    addCommentRating(
      assist_id: "${foreignID}",
      need_id: "${ID}",
      comment: "${comment}",
      rating: ${rating}
    ) {
      AssistID
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

    console.log(act_data);

}

async function getType(usrID:string){
    
  const query = (`query {
    OrgProfile(userID:"${usrID}"){
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

          let val = JSON.parse((JSON.stringify(All_data)));
            
         return val.data.OrgProfile.Internal;

}




export function Profile() {
  const [show, setShow] = useState(false);

  const [location, setLocation] = useState({ lat: -26.195246, lng: 28.034088});

  const [OEmail, setOEmail] = useState('');
  const [OName,setOName] = useState('');
  const [ODate,setODate] = useState('');
  const [OLocation,setOLocation] = useState('');
  const [Picture,setOPicture] = useState('');
  const [ODesc, setODesc] = useState('');

  
  const [NewOName,setNewOName] = useState('undefined');
  const [NewOLocation,setNewOLocation] = useState({ lat: -26.195246, lng: 28.034088});
  const [NewOPass,setNewOPass] = useState('undefined');
  const [NewOPassC,setNewOPassC] = useState('undefined');
  const [NewDesc, setNewDesc] = useState('undefined');

  //const [NewPicture,setNewOPicture] = useState('');
  const [editView, setEditView] = useState(true);

  const [delButton, setdelButton] = useState(true);
  const [chatButton, setchatButton] = useState(true);

  const [commentRate, setCommentRate] = useState(1);
  const [comment, setComment] = useState('');

  const [avgRating, setAvgRating] = useState(new Array(5).fill(false));
  const [avgRNum, setAvgRNum] = useState(0);

  const [commentState, setCommentState] = useState(0);

  const [type, setType] = useState(true);


  const hanndlesubmit = (event: { preventDefault: () => void; }) =>{
    event.preventDefault();

    removeCookie('ID');
    window.location.href = '/login'; 

  }

  const handlesubmitComment = (async (event : any) => {

    event.preventDefault();

    (document.getElementById("commentForm") as HTMLFormElement).reset();

    await commentRatingAPICall(comment, commentRate).then(()=>{setCommentState(commentState+1);});
    
  });

  const handlesumbitUpdate = async () => {

    (document.getElementById('editLeftDiv') as HTMLDivElement).style.display = "none";
    (document.getElementById('editRightDiv') as HTMLDivElement).style.display = "none";
    (document.getElementById('editLoad') as HTMLDivElement).style.display = "block";

    let Locationval = "undefined";

    if(!(NewOLocation.lat == -26.195246 && NewOLocation.lng == 28.034088)){
      Locationval = NewOLocation.lat + "," + NewOLocation.lng;
    }

    if(NewOPass != NewOPassC){
      alert("password do not match");
      return;
    }

    if(NewOName == "undefined" && Locationval == "undefined" && NewOPass == "undefined" && NewOPassC == "undefined" && NewDesc == "undefined"){
      return;
    }

    await API_EDIT_Call(IdCookie, NewOName, Locationval, "undefined", NewOPass, NewDesc, OEmail).then(()=>{
      setCommentState(commentState+1);

      (document.getElementById('editLeftDiv') as HTMLDivElement).style.display = "block";
      (document.getElementById('editRightDiv') as HTMLDivElement).style.display = "block";
      (document.getElementById('editLoad') as HTMLDivElement).style.display = "none";
      
    });

    (document.getElementById("edit-Form") as HTMLFormElement).reset();
    (document.getElementById("nDesc") as HTMLInputElement).value = "";

    
  }

  const displayData = async() =>{

    let foreignType = true;

    if(IdCookie != undefined){

      const foreinCookie = getCookie("foreignID");
      let response = null;

      if(foreinCookie != undefined){        
        if(foreinCookie!=IdCookie){
          setEditView(false);

          if(await getType(foreinCookie) == 'ASSIST'){
            foreignType = false;
          }

          //typeTemp = false;
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
      const {Email,Name,Date,Location,Picture,Internal, Description} = allData;

      console.log(allData);

      //console.log(Internal);
      
      //if(Internal == "ASSIST") {
        setOName(Name);
        setOEmail(Email);
        setODate(Date);
        setOLocation(Location);
        setOPicture(Picture);
        setODesc(Description);

        let rating = new Array(5).fill(false);
        rating[allData.AvgRating-1] = true;
        setAvgRating(rating);
        setAvgRNum(allData.AvgRating);
      //} else
        //setOName("DEMO4");

      let currType = getCookie("ID_EXT")

      if(currType == "NEED"){
        setdelButton(false);
      }

      //console.log(foreignType);

      if(currType == "ASSIST" && !foreignType){
        setType(false);
      }

    }

  }

  useEffect(() => {
    setEditView(true);
    displayData();
   },[commentState]);
  
  return (
    <div>

            <div className="wrapperProfile">
                <br/><br/>
                  <input type ="radio" name="sliderProf" id='profTab' defaultChecked ></input>
                  <input type ="radio" name="sliderProf" id='blog' ></input>
                  <input type ="radio" name="sliderProf" id='items' ></input>
                  {(type &&<nav>
                    <label htmlFor= "profTab" className='profTab' ><FaUserAlt/> Profile  </label>
                    {( editView && <label htmlFor= "blog" className='blog'> <FaEdit/> Edit </label> )}
                    {(!editView && <label htmlFor= "blog" className='blog'> <FaHistory/> Items </label> )}
                    <div className='sliderProf'></div>
                  </nav>)}
            <section>
              
            <div className='content content-1'>

            <div className='title'><h1>{OName}</h1></div>

            <div className="profile-main">

              <div className='user-left'>
                <div className='prof-pic'>
                  <img src="https://firebasestorage.googleapis.com/v0/b/cos301-storage-test.appspot.com/o/logo.png?alt=media&token=658a4502-2b08-47bf-8cb2-fe7eacbf8c3e" alt="" id="profile-pic"></img>
                  
                </div>
                {/*( editView &&<form onSubmit={hanndlesubmit}>
                    <button type='submit' id='logout1'>Log out</button>
                </form>)*/}
                <h3 className='headings' >About Us</h3>
                <div className="cover3">
                  
                  {/*<p>We have been in the food business for 10 years, particularly focusing on poultry. We offer Chicken intenstines, feet and breasts</p>*/}
                  <p>{ODesc}</p>
                </div>
                <h3 className='headings' >Reviews</h3>
                <div className='pcomments'>

                { ( (!editView || type) &&<div className='pcomment'><b><p>Leave a review!</p></b>

                  <form id="commentForm" onSubmit={handlesubmitComment}>

                    <input type ="text" placeholder='comment' onChange ={(e)=>{setComment(e.target.value)}}></input>

                      <div className="rated">
                          
                        <input type="radio" id="star55" name="rate33" value="5" onClick={() => {setCommentRate(5)}}/>
                        <label htmlFor="star55" title="text"></label>
                        <input type="radio" id="star44" name="rate33" value="4" onClick={() => {setCommentRate(4)}}/>
                        <label htmlFor="star44"title="text"></label>
                        <input type="radio" id="star33"  name="rate33" value="3" onClick={() => {setCommentRate(3)}}/>
                        <label  htmlFor="star33" title="text"></label>
                        <input type="radio" id="star22" name="rate33" value="2" onClick={() => {setCommentRate(2)}}/>
                        <label  htmlFor="star22" title="text"></label>
                        <input type="radio" id="star11" name="rate33" value="1" onClick={() => {setCommentRate(1)}}/>
                        <label  htmlFor="star11" title="text"></label>

                      </div>

                      <button type='submit' id='upt_but' >Submit Review</button>

                      <br/><br/>

                  </form>

                      {/*<br></br>
                      <p>This organization is fast and reliable, The delievered the frozen chicken in time</p>*/}
                </div>)} 

                {/*<div className='pcomment'><div className='commentPic'><h4>HF</h4></div><b><p>Helping Foundation</p></b><br></br>
                  <div className="ratedsmall"> 
                        <input type="radio" id="star55" name="rate3" value="5" disabled />
                        <label htmlFor="star55" title="text"></label>
                        <input type="radio" id="star44" name="rate3" value="4"  disabled/>
                        <label htmlFor="star44"title="text"></label>
                        <input type="radio" id="star33" checked = {true} name="rate3" value="3"  disabled />
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
                    </div>*/}     
        
                    </div>

                <CommentBlock state={commentState}></CommentBlock>
            </div>



              <div className='user-right'>
                <br/><br/>

                <div className="cover">Name: { OName}</div>        
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

                    <p>Average Rating {avgRNum}</p>
                    <div className="rate"> 
                      <input type="radio" id="star5" name="rate1" value="5" disabled checked = {avgRating[4]}/>
                      <label htmlFor="star5" title="text"></label>
                      <input type="radio" id="star4" name="rate1" value="4" disabled checked = {avgRating[3]}/>
                      <label htmlFor="star4"title="text"></label>
                      <input type="radio" id="star3" name="rate1" value="3" disabled checked = {avgRating[2]}/>
                      <label  htmlFor="star3" title="text"></label>
                      <input type="radio" id="star2" name="rate1" value="2" disabled checked = {avgRating[1]}/>
                      <label  htmlFor="star2" title="text"></label>
                      <input type="radio" id="star1" name="rate1" value="1" disabled checked = {avgRating[0]}/>
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
                        {/*<div className='title'><h1>Edit</h1></div>*/}

                        <div className='editor-main'>

                          <div className='editor-left' id ="editLeftDiv">
                          <label className='rglabel'>Upload a new profile picture:</label>
                          <br/><br/><br/>
                          <div className='edit-pic'>
                            <img src={userprofile} alt="" id="editor-pic"/>
                          </div>
                          {/*<form onSubmit={hanndlesubmit}>
                              <button type='submit' id='logout1'>Log out</button>
                            </form>*/}

                          <label className='rglabel'>Update your description:</label>
                          <textarea id="nDesc" onChange ={(e)=>{setNewDesc(e.target.value)}}></textarea>

                          <input id='upt_but' type="submit" value="Update Profile" onClick={(e) => { e.preventDefault(); handlesumbitUpdate();}}/>  <FaPen color='transparent'/>  
                          </div>
                          <div className='editor-right' id ="editRightDiv">
                            <label className='rglabel'>Enter the fields you would like to update:</label>
                            <br/><br/><br/>
                            <div className='updater'>
                              <form id="edit-Form"/*onSubmit={(e) => { e.preventDefault(); handlesumbitUpdate();}*/>

                                <div className='user-box1'>
                                  <label className='rglabel'>Name</label>
                                  <input className="in1" type ="text" placeholder=' Name'defaultValue={OName} onChange ={(e)=>{setNewOName(e.target.value)}}></input>  
                                  <FaPen color='#1458b3'/>
                                </div>
                                
                                {/*<div className='user-box2'>
                                  <label className='rglabel'>Location</label>
                                  <input className="in3" type ="text" placeholder=' Address' defaultValue={OLocation} onChange ={(e)=>{setNewOLocation(e.target.value)}}></input> 
                                  <FaPen color='#1458b3'/>
                                </div>*/}

                                <div className='user-box2'>
                                <label className='rglabel'>Location</label>
                                  <button type="button" id="locButton" className="custom-file-upload" onClick={() => {setTimeout(() => setShow(true), 100);}}>
                                    Select your location
                                  </button>
                                </div>



                                <div className='user-box3'>
                                  <label className='rglabel'>Password</label>
                                  <input className="in4" type ="password" placeholder=' Password' defaultValue = "" onChange ={(e)=>{setNewOPass(e.target.value)}}></input> 
                                  <FaPen color='#1458b3'/>
                                </div> 

                                <div className='user-box4'>
                                  <label className='rglabel'>Password</label>
                                  <input className="in5" type ="password" placeholder=' Confirm Password' onChange ={(e)=>{setNewOPassC(e.target.value)}}></input> 
                                  <FaPen color='#1458b3'/>
                                </div> 

                                {/*<input id='upt_but'type="submit" value="Update"/>  <FaPen color='transparent'/>*/}  

                              </form>
                            </div>  
                          </div>
                          
                          
                          
                          <div id="editLoad" className="loader"></div>
                          

                          

                      </div>

                      <ModalMap inState={[show, setShow, setNewOLocation, NewOLocation]}></ModalMap>
                        </div>)}

                        {( !editView && <div className='content content-2'> 
                          <ItemHistory></ItemHistory>
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