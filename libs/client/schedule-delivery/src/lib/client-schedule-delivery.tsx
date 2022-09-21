import './deliveryy.css';
import {
  FaHistory,
  FaDonate,
  FaPen,
  FaUserAlt,
  FaEdit,
  FaArrowRight,
  FaCloudDownloadAlt,
  FaClock,
} from 'react-icons/fa';

import { useEffect, useState } from 'react';

import { getCookie, setCookie, removeCookie } from 'typescript-cookie';

import { ModalMap } from './modal-map';

async function getItemsApi() {
  let ID = getCookie('ID');

  const query = `query{
    GetAvailItems(UserID:"${ID}"){
      itemID
      itemName
    }
  }`;

  let result = '';

  await fetch('http://localhost:3333/graphql', {
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

  let resultString = JSON.stringify(result);
  let resultFin = JSON.parse(resultString);

  return resultFin.data.GetAvailItems;
}

async function setDeliveryApi(
  location: string,
  itemID: string,
  date: string,
  time: string
) {
  let donatedBy = getCookie('ID');
  let donateFor = getCookie('foreignID');

  const query = `query{
    Schedule(donated_by:"${donatedBy}",donated_for:"${donateFor}",location:"${location}",dd_mm_yyyy:"${date}",itemID:"${itemID}",time:"${time}"){
      id_1
    }
  }`;

  let result = '';

  await fetch('http://localhost:3333/graphql', {
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

  let resultString = JSON.stringify(result);
  let resultFin = JSON.parse(resultString);

  console.log(resultFin);
}

export function ClientScheduleDelivery() {
  const [show, setShow] = useState(false);
  const [location, setLocation] = useState({ lat: -26.195246, lng: 28.034088 });

  const [availItems, addItem] = useState<any[]>([]);

  const [delTime, setDelTime] = useState<any>();
  const [delDate, setDelDate] = useState<any>();

  const [delItem, setDelItem] = useState<any>();

  const [invalidDel, setinvalidDel] = useState('');
  const [validDel, setvalidDel] = useState('');

  class itemInfo {
    itemID: string = '';
    itemName: string = '';
  }

  async function getAvailItems() {
    let items = await getItemsApi();

    let itemArr: any = [];

    for (let i = 0; i < items.length; i++) {
      let temp = new itemInfo();
      temp.itemID = items[i].itemID;
      temp.itemName = items[i].itemName;

      itemArr.push(temp);

      setDelItem(itemArr[0].itemID);
    }

    addItem(itemArr);
  }

  async function setDelivery() {
    //if(delLocation == undefined || delDate == undefined || delItem == undefined || delTime == undefined){
    //alert("Please supply a value for each of the fields");
    //return;
    //}

    setinvalidDel('');

    let Locationval = location.lat + ',' + location.lng;

    console.log(delTime);
    console.log(delDate);
    console.log(Locationval);
    console.log(delItem);
    //console.log(location);

    if(delTime == undefined || delDate == undefined || delItem == undefined || Locationval == '-26.195246,28.034088'){

      setinvalidDel('You must input a value for each of the fields');
      return;

    }

    await setDeliveryApi(Locationval, delItem, delDate, delTime).then(() => {
      getAvailItems();
    });

    (document.getElementById('mainDeliverForm') as HTMLFormElement)!.reset();

    setvalidDel("Donation Scheduled Successfully!")
  }

  useEffect(() => {
    getAvailItems();
  }, []);

  return (
    <div>
      <div className="wrapper2">
        <br />
        <br />

        <div className="content content-1">
          <div className="title">
            <h1>Schedule a Delivery or Collection</h1>
          </div>
          <p style={{ color: 'red' }}>{invalidDel}</p>
          <p style={{ color: 'green' }}>{validDel}</p>
          <div className="deliver-main">
            <div className="deliver-cent">
              <br />
              <br />
              <div className="delvrr">
                <form id="mainDeliverForm">
                  <div className="deliver-box">
                    <label className="labelDel">Location:</label>
                    <br />
                    <button
                      type="button"
                      id="locButtonD"
                      className="custom-file-upload"
                      onClick={() => {
                        setTimeout(() => setShow(true), 100);
                      }}
                    >
                      Select a location
                    </button>

                    <FaPen color="#1458b3" />
                  </div>

                  <div className="deliver-box">
                    <label className="labelDel">
                      Item you would like to donate:
                    </label>
                    <br />

                    <select
                      name="itemType"
                      className="req3"
                      onChange={(e) => {
                        setDelItem(e.target.value);
                      }}
                    >
                      {availItems.map(function (A) {
                        return <option value={A.itemID}>{A.itemName}</option>;
                      })}
                    </select>
                    <FaPen color="#1458b3" />
                  </div>

                  <div className="deliver-box">
                    <label className="labelDel">
                      Date of Collection or Delivery:
                    </label>
                    <br />
                    <input
                      className="del1"
                      type="date"
                      onChange={(e) => {
                        setDelDate(e.target.value);
                      }}
                    ></input>
                    <FaPen color="#1458b3" />
                  </div>

                  <div className="deliver-box">
                    <label className="labelDel">
                      Time of Collection or Delivery:
                    </label>
                    <br />
                    <input
                      className="del1"
                      type="time"
                      onChange={(e) => {
                        setDelTime(e.target.value);
                      }}
                    ></input>
                    <FaPen color="#1458b3" />
                  </div>
                </form>

                <ModalMap
                  inState={[show, setShow, setLocation, location]}
                ></ModalMap>
              </div>
            </div>
            <input
              id="deliv_but"
              type="button"
              onClick={() => {
                setDelivery();
              }}
              value="Confirm Details"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientScheduleDelivery;
