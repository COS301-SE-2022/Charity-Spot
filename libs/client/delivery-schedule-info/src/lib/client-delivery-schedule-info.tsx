import styles from './client-delivery-schedule-info.module.css';
import { getCookie } from 'typescript-cookie';

import { useEffect, useState } from 'react';

async function getDelScheduleApi(query : string){

  let result = null;

  /*const query =
      `query{
        getDelSchedule(UserID:"${getCookie("ID")}"){
          id_1
          itemID
          location
          date
          time
        }
      }`;*/

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

       //console.log(result);

      return result

}



export function ClientDeliveryScheduleInfo() {

  const [schedule, setSchedule] = useState<any[]>([]);
  

  class scheduleItem {
    itemName : string = "";
    itemID : string = "";
    partyName : string = "";
    partyID : string = "";
    location : string = "";
    date : string = "";
    time : string = "";
  }

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

  const NameQuery = (nameID : string) => {
    return `query{
        getChatName(userID:"${nameID}"){
              Message
        }
      }`
  };

  const ItemQuery = (itemID : string) => {
    return `query{
      getItemName(ItemID:"${itemID}"){
        itemName
      }
    }`
  };

  

  async function getDelSchedule(){

    let active = await getDelScheduleApi(DelScheduleQuery());
    let resultString = JSON.stringify(active);
    let resultFin = JSON.parse(resultString);

    let finRes : any = []

    let scheduleList : any = [];

    finRes = resultFin.data.getDelSchedule;

      for(let i=0; i<finRes.length;i++){

        let userID = finRes[i].id_1;

        let userName : any= await getDelScheduleApi(NameQuery(finRes[i].id_1));

        userName = userName.data.getChatName.Message;

        let itemID = finRes[i].itemID;

        let itemName : any= await getDelScheduleApi(ItemQuery(finRes[i].itemID));

        itemName = itemName.data.getItemName.itemName;

        let location = finRes[i].location;

        let date = finRes[i].date;

        let time = finRes[i].time;

        let temp = new scheduleItem();

        temp.partyID = userID;
        temp.partyName = userName;
        temp.itemID = itemID;
        temp.itemName = itemName;
        temp.location = location;
        temp.date = date;
        temp.time = time;

        scheduleList.push(temp);

        //console.log(await getDelScheduleApi(NameQuery(active[i].id_1)));

        /*let temp = new activeChatC();
        temp.orgID = active[i].Reciever;
        temp.orgName = active[i].Message;

        activeList.push(temp);*/

      }

      console.log(scheduleList)

    }

    //addactiveChat(activeList);*/
    
  

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
