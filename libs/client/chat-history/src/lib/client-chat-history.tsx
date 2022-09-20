import styles from './client-chat-history.module.css';
import "./chathistory.css";
import { getCookie } from 'typescript-cookie';

import { useEffect, useState } from 'react';

import {Link} from 'react-router-dom'

import {setCookie} from 'typescript-cookie'

import { host } from '../../../../../config'

async function getActiveChatsAPI(){

  let result = null;

  const query =
      `query{
        RetrieveThreads(
          userID: "${getCookie('ID')}",
          whois: "${getCookie('ID_EXT')}"
        ) {
          Threads {
            Reciever
            Sender
            Message
            ProfilePic
          }
        }
      }`;

      console.log(query);


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

      const resultString = JSON.stringify(result);
      const resultFin = JSON.parse(resultString);

      console.log(resultFin);

      return resultFin.data.RetrieveThreads.Threads;

}

function setSelection(ID : any){
  setCookie("foreignID", ID);
}



export function ClientChatHistory() {

  const [activeChats, addactiveChat] = useState<any[]>([]);

  const [empty, setEmpty] = useState(false);

  class activeChatC{
    orgID : string = "";
    orgName : string = "";
    orgPic : string = "";
  }

  async function getActiveChats(){

    let active = await getActiveChatsAPI();

    console.log(active);

    if(active.length == 0){
      setEmpty(true);
    }

    let activeList : any = [];

    for(let i=0; i<active.length;i++){

      let temp = new activeChatC();
      temp.orgID = active[i].Reciever;
      temp.orgName = active[i].Message;
      temp.orgPic = active[i].ProfilePic;

      activeList.push(temp);

    }

    addactiveChat(activeList);
    
  }

  useEffect(() => {
    getActiveChats();
  }, [])


  return (
    <div >
      <br/>
      <div className='title'>
        <h2>Your active chat sessions:</h2>
        { empty &&<h3 style={{'color':'#6d6d6e'}}> You have no active chats!</h3>}
      </div>

      {activeChats.map(function(A){

        return(
          <div>
            <br/>
              <div className='chatHist'>
                <div className='chatHistLeft'>
                <img src={A.orgPic} className="delSched"></img>
                
                </div>
                <div className='chatHistRight'>
                  <br></br>
                  <div className='chatcov2'><h2>{A.orgName}</h2></div>
                  {/*<div className='widthLimit'> <div className='chatcov2'><h4>Location of Client: Pretoria</h4></div></div>*/}
                  <div className='widthLimit'><div className='chatcov'><h4>Continue your converation with {A.orgName}!</h4></div></div>
                <Link to ='/chat' className='rgLink'><button id='chatHistGo' onClick={()=>{setSelection(A.orgID);}}>Resume chat</button></Link>
                <Link to ='/profile' className='rgLink'><button id='chatHistGo' onClick={()=>{setSelection(A.orgID);}}>View Profile</button></Link>
                </div>
                
              </div>
            <br/>
          </div>
        )

})}
    </div>
  );
}

export default ClientChatHistory;
