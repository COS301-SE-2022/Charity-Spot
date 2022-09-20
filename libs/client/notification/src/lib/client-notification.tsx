import styles from './client-notification.module.css';
import {Link} from 'react-router-dom';
import { FaCheck, FaBinoculars,FaBellSlash } from 'react-icons/fa';
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
      Delivery{
        id_1
        id_2
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

  console.log(receiver);
  
  return receiver.data.receiver;
}

function setSelection(ID : any){
  setCookie("foreignID", ID);
}


export function ClientNotification() {

  const [activeNot, addactiveNot] = useState<any[]>([]);

  const [empty, setEmpty] = useState(false);

  class activeNotC{
    ID : string = "";
    Name : string = "";
    Picture : string = "";
    Type : string = "";
  }

  async function getActiveNot(){

    const uID = getCookie("ID");
    const uType = getCookie("ID_EXT");

    let notifications = await fetchNotifications(uID, uType);

    console.log(notifications);

    let activeList : any = [];

    for(const thre of notifications.data.notifications.Threads) {
      const userDetails = await fetchUser(thre.Reciever);
      
      let temp = new activeNotC();
      temp.ID = userDetails.ID;
      temp.Name = userDetails.Name;
      temp.Picture = userDetails.ProfilePicture;
      temp.Type = "message";

      activeList.push(temp);

    }

    for(const thre of notifications.data.notifications.Delivery) {
      const userDetails = await fetchUser(thre.id_1);

      let temp = new activeNotC();
      temp.ID = userDetails.ID;
      temp.Name = userDetails.Name;
      temp.Picture = userDetails.ProfilePicture;
      temp.Type = "delivery";

      activeList.push(temp);

    }

    if(notifications.data.notifications.Threads.length == 0 && notifications.data.notifications.Delivery.length == 0){
      setEmpty(true);
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

            { empty &&<h1 style={{'color':'#6d6d6e'}}><br/><br/><br/>You have no notifications <FaBellSlash/></h1>}

            {activeNot.map(function(A){

              return(

              <div className='notiMain'>
                <div className='notiLeft'>
                  <br/><br/>
                  {/* <div className="load"></div> */}
                <img src={A.Picture} alt="" id="notiprofile-pic"></img>
                
                </div>
                <div className='notiRight'>
                  <br></br>
                  
                  <div > <div className='noticov2'>
                    <div className='messageContent'>
                    <div className='noticov'><h2>{A.Name}</h2></div>
                    {A.Type == "message" && <h5 >{A.Name} sent a message</h5>}
                    {A.Type == "delivery" && <h5 >{A.Name} scheduled a delivery</h5>}
                    </div>
                    </div>
                    </div>
                  <div><h4></h4></div>
                {/*<button id='notiMark'>Mark Read <FaCheck/></button>*/}
                {A.Type == "message" &&<Link to ='/chat' className='rgLink'><button id='chatHistGo' onClick={()=>{setSelection(A.ID);}}>View <FaBinoculars/></button></Link>}
                {A.Type == "delivery" &&<Link to ='/donationSchedule' className='rgLink'><button id='chatHistGo' onClick={()=>{setSelection(A.ID);}}>View <FaBinoculars/></button></Link>}
                </div>
              </div>

            )})}

            <br/>

    </div>
  );
}

export default ClientNotification;
