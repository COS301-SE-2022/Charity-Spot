import styles from './client-delivery-schedule-info.module.css';
import { getCookie } from 'typescript-cookie';

import { useEffect, useState } from 'react';

import { FaHistory,FaDonate,FaPen,FaUserAlt,FaEdit,FaArrowDown,FaArrowUp } from 'react-icons/fa';

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

       console.log(result);

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

      }

      setSchedule(scheduleList);

    }
  

  useEffect(() => {
    getDelSchedule();
  }, [])

  return (
    <div className={styles['container']}>
      <br/><br/>
      <div className='title'><h2>Your current delivery schedule:</h2></div>

      {schedule.map(function(A){

        return(
          <div>
            <br/>

              <div className='rapper'>

                <div className='collapsible'>

                    <input type ='checkbox' id = {A.itemID}></input>

                    <label htmlFor={A.itemID}>{A.itemName}:  {A.partyName} on {A.date} </label>

                    <div className='collapsible-text'><br/>
                        <div className='collapseleft'>
                        <img src="" alt="" id="donation-pic2"/>
                        </div>

                        <div className='collapserightDel'>
      
                            <div className="cov">Item Name: {A.itemName}</div>
                            <div className="cov">Organisation Name: {A.partyName}</div>
                            <div className="cov">Location: {A.location}</div>
                            <div className="cov">Date: {A.date}</div>
                            <div className="cov">Time: {A.time}</div>
                            
                        </div>
                        
                    </div>

                </div>

            </div>

            
          </div>
        )

      })}

    </div>
  );
}

export default ClientDeliveryScheduleInfo;
