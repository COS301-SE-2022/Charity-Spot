import styles from './client-chat.module.css';
import {Bubble} from './Bubble';

import { ReactChild, ReactFragment, ReactPortal, useEffect, useState } from 'react';
import { getCookie } from 'typescript-cookie';

let move: any;
let loopCount: number;
document.cookie = `RENDER=00`;

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
  //chatArea
  class Bubbles {
    typeM: string | undefined = "";
    mess: string | undefined = "";
  }

  const [inputVal, setInputVal] = useState<string>();
  const [Bubb, addBubb] = useState<any[]>([]);

  const sendMessage = () => {
    if(inputVal !== undefined) {
      const tempB: Bubbles = new Bubbles();
      tempB.typeM = "R";
      tempB.mess = inputVal;

      const newArr = [...Bubb, tempB]

      API_link(sendMessageQuery(tempB.mess), "");

      addBubb(newArr);
    } else 
      return;
  }

  //renderingDATA
  const [result, setResult] = useState<string>("");

  useEffect(() =>{
    if(renderingDet === "00" || renderingDet === "01") {
      API_link(threadsQuery(), "").then(data => {
        setResult(data);
      })
    } else {
      API_link(threadQuery(), "").then(data => {
        setResult(data);
      })
    }
  }, [result]);


  //QUERIES
  const threadsQuery = () => {
    return `
      query{
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
  }

  const threadQuery = () => {
    return `
      query{
        RetrieveMessages(
          userID: "${getCookie('ID')}",
          with_ID: "${getCookie('RUNNER')}",
          whois: "${getCookie('ID_EXT')}"
        ) {
          Reciever
          Sender
          Message
        }
      }`;
  }

  const sendMessageQuery = (message: string) => {
    return `
    query{
      Send(
        senderID: "${getCookie('ID')}",
        receiverID: "${getCookie('RUNNER')}",
        sentBy: "${getCookie('ID_EXT')}",
        message: "${message}"
        ){
        Reciever
        Sender
        Message
        }
      }`;
  }

  move = getCookie('RENDER');

  //SWITCH UI
  const [renderingDet, setRenderVal] = useState<string>("00");

  const changeState = () => {
    if(move === "00" || move === "01") 
      move = "10";
    else if (move === "10")
      move = "01";

    setRenderVal(move);
    setResult("");
  }

  //UI - ACCESS
  const onClickThreads = (clicked: string, clicked_n: string) => {
    document.cookie = `RUNNER=${clicked}`;
    document.cookie = `RUNNER_N=${clicked_n}`
    document.cookie = `RENDER=10`;
    changeState();
  }

  const onClickBack = () => {
    document.cookie = `RENDER=01`;
    addBubb([]);
    changeState();
  }


  //RENDER
  if(renderingDet === "00" || renderingDet === "01")
    return (
      <div className={styles["bodyC"]}>
        {(() => {
          if(result === "")
            return <h1>LOADING CHAT...</h1>
          
          else {
            const threads = JSON.parse(result).data.RetrieveThreads.Threads;
            return (
              <div>
                <h1>Active Chats</h1>
                
                  {
                    threads.map((thread_: any) => (
                      <>
                      <button className={styles["sndBT"]} onClick={()=>{onClickThreads(`${thread_.Message}`, `${thread_.Sender}`); move = renderingDet;}}type="button" key={thread_.Message}>{thread_.Sender}</button><br/><br/>
                      </>
                    ))
                  }
              </div>
            )  
          }   
        })()}
      </div>
    )
  else 
    return (
      <div className={styles["bodyC"]}>
      {(() => {
        if(result === "")
          return <h1>LOADING CHAT...</h1>
       
        else {
          const retrive = () => {
            const botRef = document.getElementById("b1");

            const thread = JSON.parse(result).data.RetrieveMessages.Message;
            const messages = thread.split("\n");
            const bubbleMessages = [];

            for(const m of messages) {
              const tempB: Bubbles = new Bubbles();
              const line = m.split(" - ");
              const creds = line[0].split("_");

              if(creds[0].split("[")[1] === getCookie("RUNNER"))
                tempB.typeM = "L";
              else
                tempB.typeM = "R";

              tempB.mess = line[1];
              
              bubbleMessages.push(tempB);
            }

            addBubb(bubbleMessages);

            setTimeout(() => { botRef?.scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'start' })}, 500);
          }


          return (
            <>
              <div>
                <h1>Chatting with {getCookie('RUNNER_N')}</h1>
                <button className={styles["sndBT"]} onClick={()=>{onClickBack(); move = renderingDet;}}type="button">Back</button>
                <button className={styles["sndBT"]} onClick={()=>{retrive()}}type="button">History</button> 
              </div>

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

                <input className={styles["myText"]}type="text" name="fname" placeholder='Type a message..' onChange={(e) => {setInputVal(e.target.value)}}/> 
                <button className={styles["sndBT"]} onClick={()=>{sendMessage()}}type="button">Send</button> 
                <br />
            </>
          ) 
        }    
      })()}
      </div>
    )
}

export default ClientChat;