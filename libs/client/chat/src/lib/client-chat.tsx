import styles from './client-chat.module.css';
import {Bubble} from './Bubble';

import { useEffect, useState } from 'react';


export function ClientChat() {

  let loopCount = 0;

  class Bubbles {
    typeM: string = "";
    mess: string | undefined = "";
  }

  const [inputVal, setInputVal] = useState<string>();

  const [Bubb, addBubb] = useState<any[]>([]);
  
  //Still need to add function for receiving new messages
  const sendMess = () => {

    let tempB: Bubbles = new Bubbles();
    tempB.typeM = "R";
    tempB.mess = inputVal;

    let newArr = [...Bubb, tempB]

    addBubb(newArr);

  }

  useEffect(() => {

    const botRef = document.getElementById("b1");

    loopCount = 0;

    if(Bubb.length == 0){

      let prevMess : any = [];

      //Get all of the previous messages that were send in this chat

      for(let i=0; i<3; i++){
        let tempB: Bubbles = new Bubbles();
        tempB.typeM = "R";
        tempB.mess = "This is a right bubble" + i;
        
        prevMess.push(tempB);
      }

      for(let i=0; i<3; i++){
        let tempB: Bubbles = new Bubbles();
        tempB.typeM = "L";
        tempB.mess = "This is a left bubble" + i;
        
        prevMess.push(tempB);
      }

      for(let i=0; i<1; i++){
        let tempB: Bubbles = new Bubbles();
        tempB.typeM = "R";
        tempB.mess = "This is a right bubble again" + i;
        
        prevMess.push(tempB);
      }
      
      addBubb(prevMess);

      setTimeout(() => { botRef?.scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'start' })}, 500)

    }
    else{

      botRef?.scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'start' })
      
    }

  })

  

  return (
    
    <div className={styles["bodyC"]}>
      <div className={styles["topbar"]}><div className={styles["ToFrom"]}>From: </div><div className={styles["senderName"]}>malana</div><div className={styles["ToFrom"]}>To: </div>
             <div className={styles["recieverName"]}> <select name="orgs" id="rgorgnm1" className={styles["sendOptions"]}>
                    <option value=" Name of Organization">Organization Name</option>
                    <option value="Other Organizations">Other Organizations</option>  
              </select>
              </div> 
        </div><br/>
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

      <input id="myText" type="text" name="fname" placeholder='Type a message..' onChange={(e) => {setInputVal(e.target.value)}}/> <button className={styles["sndBT"]} onClick={()=>{sendMess()}}type="button">Send</button> <br />

    </div>
  );
}

export default ClientChat;
