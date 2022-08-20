import styles from './client-notification.module.css';
import {Link} from 'react-router-dom';
import { FaCheck, FaBinoculars } from 'react-icons/fa';
import "./notifiii.css";

import {getCookie, setCookie} from 'typescript-cookie'

import { useEffect, useState } from 'react';

async function APICall (query: string) {
  //may need to be refined - this is just a template
  let result = null;

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
          result = data
   );

   return JSON.parse(JSON.stringify(result));
}

async function fetchNotifications(user_id: any, whois: any) {

  const query = `query{
    notifications(user_id: "${user_id}", whois: "${whois}") {
      ID
      Threads {
        Reciever
      }
    }
  }`;

  console.log(query);

  return await APICall(query);
}

async function fetchUser(receiver_id: string) {

  const query = `query{
      receiver(receiver_id: "${receiver_id}") {
        ID
        Name
        ProfilePicture
      }
    }`;

  const receiver = await APICall(query);
  
  return receiver.data.receiver;
}

function setSelection(ID : any){
  setCookie("foreignID", ID);
}


export function ClientNotification() {

  const [activeNot, addactiveNot] = useState<any[]>([]);

  class activeNotC{
    ID : string = "";
    Name : string = "";
    Picture : string = "";
  }

  async function getActiveNot(){

    const uID = getCookie("ID");
    const uType = getCookie("ID_EXT");

    let notifications = await fetchNotifications(uID, uType);

    let activeList : any = [];

    for(const thre of notifications.data.notifications.Threads) {
      const userDetails = await fetchUser(thre.Reciever);
      
      let temp = new activeNotC();
      temp.ID = userDetails.ID;
      temp.Name = userDetails.Name;
      temp.Picture = userDetails.ProfilePicture;

      activeList.push(temp);

    }

    addactiveNot(activeList);

  }

  useEffect(() => {
    getActiveNot();
  }, [])

  return (
    <div>
            <br/>
            <h2 style={{'color':'#1458b3'}}>Notifications</h2>

            {activeNot.map(function(A){

              return(

              <div className='notiMain'>
                <div className='notiLeft'>
                  <br/><br/>
                  {/* <div className="load"></div> */}
                <img src="https://firebasestorage.googleapis.com/v0/b/cos301-storage-test.appspot.com/o/logo.png?alt=media&token=658a4502-2b08-47bf-8cb2-fe7eacbf8c3e" alt="" id="notiprofile-pic"></img>
                
                </div>
                <div className='notiRight'>
                  <br></br>
                  
                  <div > <div className='noticov2'>
                    <div className='messageContent'>
                    <div className='noticov'><h2>{A.Name}</h2></div>
                    <h5 >{A.Name} sent a message</h5></div>
                    </div>
                    </div>
                  <div><h4></h4></div>
                {/*<button id='notiMark'>Mark Read <FaCheck/></button>*/}
                <Link to ='/chat' className='rgLink'><button id='chatHistGo' onClick={()=>{setSelection(A.ID);}}>View <FaBinoculars/></button></Link>
                </div>
              </div>

            )})}

            <br/>

    </div>
  );
}

export default ClientNotification;
