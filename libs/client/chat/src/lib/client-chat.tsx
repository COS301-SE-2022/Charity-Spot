import styles from './client-chat.module.css';
import {Bubble} from './Bubble';

import { ReactChild, ReactFragment, ReactPortal, useEffect, useState } from 'react';
import { getCookie } from 'typescript-cookie';

let move: any;
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

  const sendMessage = (message: string) => {
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
          return (
            <div>
              <h1>Chats with {getCookie('RUNNER_N')}</h1>
              <button className={styles["sndBT"]} onClick={()=>{onClickBack(); move = renderingDet;}}type="button">Back</button>
            </div>
          ) 
        }    
      })()}
      </div>
    )
}

export default ClientChat;











// let loopCount = 0;

//   class Bubbles {
//     typeM: string = "";
//     mess: string | undefined = "";
//   }

//   const [inputVal, setInputVal] = useState<string>();

//   const [Bubb, addBubb] = useState<any[]>([]);
  
//   //Still need to add function for receiving new messages
//   const sendMess = () => {

//     let tempB: Bubbles = new Bubbles();
//     tempB.typeM = "R";
//     tempB.mess = inputVal;

//     let newArr = [...Bubb, tempB]

//     addBubb(newArr);

//   }

//   useEffect(() => {

//     const botRef = document.getElementById("b1");

//     loopCount = 0;

//     if(Bubb.length == 0){

//       let prevMess : any = [];

//       //Get all of the previous messages that were send in this chat

//       for(let i=0; i<3; i++){
//         let tempB: Bubbles = new Bubbles();
//         tempB.typeM = "R";
//         tempB.mess = "This is a right bubble" + i;
        
//         prevMess.push(tempB);
//       }

//       for(let i=0; i<3; i++){
//         let tempB: Bubbles = new Bubbles();
//         tempB.typeM = "L";
//         tempB.mess = "This is a left bubble" + i;
        
//         prevMess.push(tempB);
//       }

//       for(let i=0; i<1; i++){
//         let tempB: Bubbles = new Bubbles();
//         tempB.typeM = "R";
//         tempB.mess = "This is a right bubble again" + i;
        
//         prevMess.push(tempB);
//       }
      
//       addBubb(prevMess);

//       setTimeout(() => { botRef?.scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'start' })}, 500)

//     }
//     else{

//       botRef?.scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'start' })
      
//     }

//   })

  

//   return (
    
//     <div className={styles["bodyC"]}>
//       <br/>
//       <div className={styles["topbar"]}><div className={styles["ToFrom"]}>From: </div><div className={styles["senderName"]}>malana</div><div className={styles["ToFrom"]}>To: </div>
//              <div className={styles["recieverName"]}> <select name="orgs" id="rgorgnm1" className={styles["sendOptions"]}>
//                     <option value=" Name of Organization">Organization Name</option>
//                     <option value="Other Organizations">Other Organizations</option>  
//               </select>
//               </div> 
//         </div><br/>
//       <div id = "mainMW" className={styles["messages"]}>

//         {Bubb.map(function(B){

//           loopCount++;

//           return(
//             <Bubble key={loopCount} inState={[B.mess, B.typeM]}/>
//           )

//         })}

//         <br/>
        
//         <div id="b1" />

//       </div>      

//       <input className={styles["myText"]}type="text" name="fname" placeholder='Type a message..' onChange={(e) => {setInputVal(e.target.value)}}/> 
//       <button className={styles["sndBT"]} onClick={()=>{sendMess()}}type="button">Send</button> 
//       <br />

//     </div>
//   );