import './del-info.css';
import { getCookie, setCookie } from 'typescript-cookie';

import { useEffect, useState } from 'react';

import {Link} from 'react-router-dom'

import { host } from '../../../../../config'

import {
  FaHistory,
  FaDonate,
  FaPen,
  FaUserAlt,
  FaEdit,
  FaArrowDown,
  FaArrowUp,
} from 'react-icons/fa';

import { ModalMap } from './modal-map';

async function getDelScheduleApi(query: string) {
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

  await fetch(`http://${host.host}:3333/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query,
    }),
  })
    .then((r) => r.json())
    .then((data) => (result = data));

  return result;
}

class locCord {
  lat = -26.195246;
  lng = 28.034088;
}

export function ClientDeliveryScheduleInfo() {
  const [schedule, setSchedule] = useState<any[]>([]);
  const [uType, setuType] = useState<any>(false);

  const [show, setShow] = useState(false);

  const [empty, setEmpty] = useState(false);

  class scheduleItem {
    itemName: string = '';
    itemID: string = '';
    partyName: string = '';
    partyID: string = '';
    location: string = '';
    date: string = '';
    time: string = '';
    link: string = '';
    lat: number = -26.195246;
    lng: number = -26.195246;
  }

  const DelScheduleQuery = () => {
    return `query{
      getDelSchedule(UserID:"${getCookie('ID')}", type:"${getCookie(
      'ID_EXT'
    )}"){
        id_1
        itemID
        location
        date
        time
      }
    }`;
  };

  const NameQuery = (nameID: string) => {
    return `query{
        getChatName(userID:"${nameID}"){
              Message
        }
      }`;
  };

  const ItemQuery = (itemID: string) => {
    return `query{
      getItemName(ItemID:"${itemID}"){
        itemName
      }
    }`;
  };

  const itemPicQuery = (itemID: string) => {
    return `query{
      getItemPicLink(itemID:"${itemID}"){
        Name
      }
    }`;
  };

  const deleteDelQuery = (itemID: string) => {
    return `query{
              deleteDelivery(ItemID:"${itemID}")
            }`;
  };

  const completeDelQuery = (itemID: string) => {
    return `query{
              completeDelivery(ItemID:"${itemID}")
            }`;
  };

  async function getDelSchedule() {
    let active = await getDelScheduleApi(DelScheduleQuery());
    let resultString = JSON.stringify(active);
    let resultFin = JSON.parse(resultString);

    let finRes: any = [];

    let scheduleList: any = [];

    finRes = resultFin.data.getDelSchedule;

    if(finRes.length == 0){
      setEmpty(true);
    }

    for (let i = 0; i < finRes.length; i++) {
      let userID = finRes[i].id_1;

      let userName: any = await getDelScheduleApi(NameQuery(finRes[i].id_1));

      userName = userName.data.getChatName.Message;

      let itemID = finRes[i].itemID;

      let itemName: any = await getDelScheduleApi(ItemQuery(finRes[i].itemID));

      itemName = itemName.data.getItemName.itemName;

      let locationT = finRes[i].location.split(',');

      let location = locationT[0] + ' , ' + locationT[1];

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
      temp.lat = parseFloat(locationT[2]);
      temp.lng = parseFloat(locationT[3]);

      scheduleList.push(temp);
    }

    setSchedule(scheduleList);
  }

  async function getItemPic(itemID: string, listI: any) {
    let linkT: any = await getDelScheduleApi(itemPicQuery(itemID));
    let link = linkT.data.getItemPicLink.Name;
    (document.getElementById(itemID + 'pic') as HTMLImageElement).src = link;
  }

  async function deleteDelivery(itemID: string) {
    let linkT: any = await getDelScheduleApi(deleteDelQuery(itemID));
    getDelSchedule();
  }

  async function completeDelivery(itemID: string) {
    let linkT: any = await getDelScheduleApi(completeDelQuery(itemID));
    getDelSchedule();
  }

  useEffect(() => {
    if (getCookie('ID_EXT') == 'ASSIST') {
      setuType(true);
    }
    getDelSchedule();
  }, []);

  function setSelection(ID : any){
    setCookie("foreignID", ID);
  }

  return (
    <div>
      <br />
      <div className="title">
        <h2>Your current donation schedule:</h2>
        { empty &&<h1 style={{'color':'#6d6d6e'}}> <br/><br/><br/>You have no scheduled donations <FaDonate/></h1>}
      </div>

      {schedule.map(function (A) {
        return (
          <div>
            <br />

            <div className="rapper">
              <div className="collapsible">
                <input
                  type="checkbox"
                  id={A.itemID}
                  onClick={async () => {
                    await getItemPic(A.itemID, A);
                  }}
                ></input>

                <label htmlFor={A.itemID}>
                  Donation scheduled with {A.partyName} for <b>{A.date}</b>{' '}
                </label>

                <div className="collapsible-text">
                  <br />
                  <div className="collapseleftDel">
                    <img
                      id={A.itemID + 'pic'}
                      className="delSched"
                      src=""
                      alt=""
                    />
                  </div>

                  <div className="collapserightDel">
                    {/*<div className="cov">Item Name: {A.itemName}</div>*/}
                    <div className="cov">Item Name: {A.itemName}</div>
                    <div className="cov senderName" onClick={()=>{setSelection(A.partyID);}}><Link to ='/profile' className='rgLink'>Name of Participant: {A.partyName}</Link></div>
                    <div className="cov">Location: {A.location}</div>
                    <button
                      id="completeButton"
                      onClick={() => {
                        setTimeout(() => setShow(true), 100);
                      }}
                    >
                      View Location
                    </button>
                    <div className="cov">Date: {A.date}</div>
                    <div className="cov">Time: {A.time}</div>

                    {uType && (
                      <button
                        id="cancelButton"
                        onClick={() => {
                          deleteDelivery(A.itemID);
                        }}
                      >
                        Cancel Donation
                      </button>
                    )}

                    {uType && (
                      <button
                        id="completeButton"
                        onClick={() => {
                          completeDelivery(A.itemID);
                        }}
                      >
                        Complete Donation
                      </button>
                    )}
                    
                  </div>
                </div>
              </div>
            </div>

            <ModalMap inState={[show, setShow, A.lat, A.lng]}></ModalMap>
          </div>
        );
      })}
    </div>
  );
}

export default ClientDeliveryScheduleInfo;
