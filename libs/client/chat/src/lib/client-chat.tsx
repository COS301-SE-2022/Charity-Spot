import styles from './client-chat.module.css';
import {Bubble} from './Bubble';

import { useEffect, useState } from 'react';

import { getCookie } from 'typescript-cookie';


async function API_link(query: string, id_q: string) {
  let outcome = null;

  await fetch(
    'http://localhost:3333/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query
      })
    }).then(r => r.json()).then(data => 
      outcome = data
  );
  
  return JSON.stringify(outcome);
}




export function ClientChat() {

  const sendMessageQuery = (message: string) => {
    return `
    query{
      Send(
        senderID: "${getCookie('ID')}",
        receiverID: "${getCookie('foreignID')}",
        sentBy: "${getCookie('ID_EXT')}",
        message: "${message}"
        ){
        Reciever
        Sender
        Message
        }
      }`;
  }

  const threadQuery = () => {
    return `
      query{
        RetrieveMessages(
          userID: "${getCookie('ID')}",
          with_ID: "${getCookie('foreignID')}",
          whois: "${getCookie('ID_EXT')}"
        ) {
          Reciever
          Sender
          Message
        }
      }`;
  }

  const nameQuery = () => {
    return `
      query{
        getChatName(
          userID: "${getCookie('foreignID')}",
        ) {
          Message
        }
      }`;
  }

  let loopCount = 0;

  class Bubbles {
    typeM: string = "";
    mess: string | undefined = "";
  }

  const [inputVal, setInputVal] = useState<string>();

  const [Bubb, addBubb] = useState<any[]>([]);

  const [chatName, setChatName] = useState("");
  

  const sendMessage = async () => {
    if(inputVal !== undefined) {
      const tempB: Bubbles = new Bubbles();
      tempB.typeM = "R";
      tempB.mess = inputVal;

      const newArr = [...Bubb, tempB]

      await API_link(sendMessageQuery(tempB.mess), "");

      addBubb(newArr);
    } else 
      return;
  }

  const getMessages = async() => {

    const botRef = document.getElementById("b1");

    if(Bubb.length == 0){

      let result = await API_link(threadQuery(), "");

      console.log(result);

      const thread = JSON.parse(result).data.RetrieveMessages.Message;

      if(thread != null){
        const messages = thread.split("\n");
        const bubbleMessages = [];

        for(const m of messages) {
          const tempB: Bubbles = new Bubbles();
          const line = m.split(" - ");
          const creds = line[0].split("_");

          if(creds[0].split("[")[1] === getCookie("foreignID"))
            tempB.typeM = "L";
          else
            tempB.typeM = "R";

          tempB.mess = line[1];
        
          bubbleMessages.push(tempB);
        }

        addBubb(bubbleMessages);

        setTimeout(() => { botRef?.scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'start' })}, 500);
      }
    }
    else{

      botRef?.scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'start' })
      
    }

  }

  const getName = async() => {

    let result = await API_link(nameQuery(), "");

    setChatName(JSON.parse(result).data.getChatName.Message);

  }

  useEffect(() => {

    getMessages();
    getName();

  }, [])
  

  return (
    
    <div className={styles["bodyC"]}>

      <br/>
      <div className={styles["topbar"]}>
        <div className={styles["ToFrom"]}>Sending Message To: </div>
        <div className={styles["senderName"]} onClick={()=>{window.location.href = '/profile';;}}>{chatName}</div>
      </div>
      <br/>

      <div id = "mainMW" className={styles["messages"]}>

        {Bubb.map(function(B){

          loopCount++;

          return(
            <Bubble key={loopCount} inState={[B.mess, B.typeM]}/>
          )

        })}

        <br/>
        
        <div id="b1" />

      </div>      

      <input className={styles["myText"]}type="text" name="fname" placeholder='Type a message..' onChange={(e) => {setInputVal(e.target.value)}}/> <button className={styles["sndBT"]} onClick={()=>{sendMessage()}}type="button">Send</button> <br />

    </div>
  );
}

export default ClientChat;