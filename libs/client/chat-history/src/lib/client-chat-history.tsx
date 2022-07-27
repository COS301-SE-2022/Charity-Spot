import styles from './client-chat-history.module.css';
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

       let resultString = JSON.stringify(result);
      let resultFin = JSON.parse(resultString);

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
    <div className={styles['container']}>
      <br/><br/>
      <div className='title'><h2>Your active chat sessions:</h2></div>

      {activeChats.map(function(A){

        return(
          <div>
            <br/>
              <Link to ='/chat' className='rgLink'><button id='delivGo' onClick={()=>{setSelection(A.orgID);}}>{A.orgName}</button></Link>
            <br/>
          </div>
        )

})}
    </div>
  );
}

export default ClientChatHistory;
