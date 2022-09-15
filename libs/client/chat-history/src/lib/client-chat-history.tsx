import styles from './client-chat-history.module.css';
import "./chathistory.css";
import { getCookie } from 'typescript-cookie';

import { useEffect, useState } from 'react';

import {Link} from 'react-router-dom'

import {setCookie} from 'typescript-cookie'

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
          }
        }
      }`;


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

      const resultString = JSON.stringify(result);
      const resultFin = JSON.parse(resultString);

      return resultFin.data.RetrieveThreads.Threads;

}

function setSelection(ID : any){
  setCookie("foreignID", ID);
}



export function ClientChatHistory() {

  const [activeChats, addactiveChat] = useState<any[]>([]);

  class activeChatC{
    orgID : string = "";
    orgName : string = "";
  }

  async function getActiveChats(){

    let active = await getActiveChatsAPI();

    console.log(active);

    let activeList : any = [];

    for(let i=0; i<active.length;i++){

      let temp = new activeChatC();
      temp.orgID = active[i].Reciever;
      temp.orgName = active[i].Message;

      activeList.push(temp);

    }

    addactiveChat(activeList);
    
  }

  useEffect(() => {
    getActiveChats();
  }, [])


  return (
    <div >
      <br/><br/>
      <div className='title'><h2>Your active chat sessions:</h2></div>

      {activeChats.map(function(A){

        return(
          <div>
            <br/>
              <div className='chatHist'>
                <div className='chatHistLeft'>
                  <br/><br/>
                <img src="https://firebasestorage.googleapis.com/v0/b/cos301-storage-test.appspot.com/o/logo.png?alt=media&token=658a4502-2b08-47bf-8cb2-fe7eacbf8c3e" alt="" id="chatprofile-pic"></img>
                
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
