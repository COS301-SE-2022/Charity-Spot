import styles from './client-delivery-schedule-info.module.css';
import { getCookie } from 'typescript-cookie';

import { useEffect, useState } from 'react';

async function getDelScheduleApi(){

  let result = null;

  const query =
      `query{
        getDelSchedule(UserID:"${getCookie("ID")}"){
          id_1
          itemID
          location
          date
          time
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

      return resultFin.data.getDelSchedule

}



export function ClientDeliveryScheduleInfo() {

  const DelScheduleQuery = () => {
    return `query{
      getDelSchedule(UserID:"${getCookie("ID")}"){
        id_1
        itemID
        location
        date
        time
      }
    }`;
  }

  const NameQuery = () => {
    return `query{
        getChatName(userID:"cl63y9az900021zchny75w64j"){
              Message
        }
      }`
  };

  const NameQuery = () => {
    return `query{
        getChatName(userID:"cl63y9az900021zchny75w64j"){
              Message
        }
      }`
  };

  

  async function getDelSchedule(){

    let active = await getDelScheduleApi();

    console.log(active);

    /*let activeList : any = [];

    for(let i=0; i<active.length;i++){

      let temp = new activeChatC();
      temp.orgID = active[i].Reciever;
      temp.orgName = active[i].Message;

      activeList.push(temp);

    }

    addactiveChat(activeList);*/
    
  }

  useEffect(() => {
    getDelSchedule();
  }, [])

  return (
    <div className={styles['container']}>
      <h1>Welcome to ClientDeliveryScheduleInfo!</h1>
    </div>
  );
}

export default ClientDeliveryScheduleInfo;
