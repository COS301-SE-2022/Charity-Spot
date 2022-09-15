import   './deliveryy.css';
import { FaHistory,FaDonate,FaPen,FaUserAlt,FaEdit,FaArrowRight,FaCloudDownloadAlt,FaClock } from 'react-icons/fa';

import { useEffect, useState } from 'react';

import { getCookie, setCookie, removeCookie } from 'typescript-cookie'

import {ModalMap} from './modal-map';

async function getItemsApi(){

  let ID = getCookie("ID");

  const query = `query{
    GetAvailItems(UserID:"${ID}"){
      itemID
      itemName
    }
  }`;

  let result = "";

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

  return resultFin.data.GetAvailItems;

}

async function setDeliveryApi(location : string, itemID : string, date : string, time : string){

  let donatedBy = getCookie("ID");
  let donateFor = getCookie("foreignID");

  const query = `query{
    Schedule(donated_by:"${donatedBy}",donated_for:"${donateFor}",location:"${location}",dd_mm_yyyy:"${date}",itemID:"${itemID}",time:"${time}"){
      id_1
    }
  }`;

  let result = "";

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

  console.log(resultFin);

}


export function ClientScheduleDelivery() {

  const [show, setShow] = useState(false);
  const [location, setLocation] = useState({ lat: -26.195246, lng: 28.034088});

  const [availItems, addItem] = useState<any[]>([]);

  const [delTime, setDelTime] = useState<any>();
  const [delDate, setDelDate] = useState<any>();
  //const [delLocation, setDelLocation] = useState<any>();
  const [delItem, setDelItem] = useState<any>();

  class itemInfo{
      itemID: string = "";
      itemName: string = "";
  }

  async function getAvailItems(){
    let items = await getItemsApi();

    let itemArr : any = []

    for(let i=0; i<items.length; i++){

      let temp = new itemInfo();
      temp.itemID = items[i].itemID;
      temp.itemName = items[i].itemName;

      itemArr.push(temp);

      setDelItem(itemArr[0].itemID);

    }

    addItem(itemArr);
  }

  async function setDelivery(){

    //if(delLocation == undefined || delDate == undefined || delItem == undefined || delTime == undefined){
      //alert("Please supply a value for each of the fields");
      //return;
    //}

    let Locationval = location.lat + "," + location.lng;

    console.log(delTime);
    console.log(delDate);
    console.log(Locationval);
    console.log(delItem);
    //console.log(location);

    await setDeliveryApi(Locationval, delItem, delDate, delTime).then(() => {getAvailItems();});

  }


  useEffect(() => {
    getAvailItems();
  }, [])

  return (
    <div>
<div className="wrapper2">
<br/><br/>
  {/*<input type ="radio" name="slider" id='deliver1'  defaultChecked></input>
  <input type ="radio" name="slider" id='history1' ></input>
  
  <nav>
    <label htmlFor= "deliver1" className='deliver1'><FaClock/> Delivery </label>
    <label htmlFor= "history1" className='history1'> <FaHistory/> History </label>
    <div className='slider'></div>
  </nav>
  <section>*/}
    <div className='content content-1'>


      <div className='title'><h1>Delievery Schedule</h1></div>
            <div className='deliver-main'>
              <div className='deliver-cent'>
                <br/><br/>
                <div className='delvrr'>
                  <form id = "mainDeliverForm" onSubmit={(e)=>{e.preventDefault(); setDelivery()}}>

                    {/*<div className='deliver-box'>
                      <label className='labelDel'>From:</label><br/>
                      <input className="del1" type ="text" placeholder='Your Name'></input>  
                        <FaPen color='#1458b3'/><br/>
                    </div>*/}
                    
                    {/*<div className='deliver-box'>
                      
                        <label className='labelDel'>To:</label><br/>
                        <input className="del1" type ="text" placeholder='Recipient Name'></input>  
                        <FaPen color='#1458b3'/>
                  </div>*/}

                    <div className='deliver-box'>
                      
                      {/*<label className='labelDel'>Location of the delivery:</label><br/>
                      <input className="del1" type ="text" placeholder=' e.g Pretoria, Hatfield' onChange ={(e)=>{setDelLocation(e.target.value);}}></input>*/}
                                  <label className='labelDel'>Location of the delivery:</label><br/>
                                  <button type="button" id="locButtonD" className="custom-file-upload" onClick={() => {setTimeout(() => setShow(true), 100);}}>
                                    Select your location
                                  </button>
                                
                      <FaPen color='#1458b3'/>
                  </div>

                  {/*<div className='deliver-box'>
                      
                      <label className='labelDel'>Delivery Location:</label><br/>
                      <input className="del1" type ="text" placeholder=' Limpopo, Polokwane'></input>  
                      <FaPen color='#1458b3'/>
                  </div>*/}

                  {/*<div className='deliver-box'>
                      
                      <label className='labelDel'>Date of Transportation:</label><br/>
                      <input className="del1" type ="date" ></input>  
                      <FaPen color='#1458b3'/>
                  </div>*/}

                  {/*<div className='deliver-box'>
                      
                      <label className='labelDel'>Estimated Date of Arrival:</label><br/>
                      <input className="del1" type ="date" ></input>  
                      <FaPen color='#1458b3'/>
                  </div>*/}

                  <div className='deliver-box'>

                        <label className='labelDel'>Item you would like to donate:</label><br/>

                        <select name="itemType" className='req3' onChange ={(e)=>{setDelItem(e.target.value)}}>

                            {availItems.map(function(A){
                                return(
                                <option value={A.itemID}>{A.itemName}</option>
                                )
                            })}
                            
                        </select>
                        <FaPen color='#1458b3'/>  
                  </div>

                  <div className='deliver-box'>

                      <label className='labelDel'>Date of item collection or delivery:</label><br/>
                      <input className="del1" type ="date" onChange ={(e)=>{setDelDate(e.target.value)}}></input>  
                      <FaPen color='#1458b3'/>

                  </div>

                  <div className='deliver-box'>

                      <label className='labelDel'>Time of item collection or delivery:</label><br/>
                      <input className="del1" type ="time" onChange ={(e)=>{setDelTime(e.target.value)}}></input>
                      <FaPen color='#1458b3'/>

                  </div>   
                    
                    <br></br><br></br>
                  <div className='deliver-box'>
                  <input id='deliv_but' type="submit" value="Confirm Delivery"/>   
                    {/* <input id='clr_but'type="button" value="Clear"/>   */}
                  </div>
    
                  </form>

                  <ModalMap inState={[show, setShow, setLocation, location]}></ModalMap>
                </div>  
              </div>
          </div>
        </div>

    {/*<div className='content content-2'>
           <div className='title'><h1>History</h1></div>

              <div className='rapper'>

                <div className='collapsible'>

                    <input type ='checkbox' id = "deee1"></input>

                    <label htmlFor="deee1">Jacket </label>

                    <div className='collapsible-textDel'><br/>
                        <div className='collapseleftDel'>
                        <img src="" alt="" id="donation-pic2"/>
                        </div>

                        <div className='collapserightDel'>
      
                            <div className="cov">Item Name: Jacket </div>
                            <div className="cov">Name of Charity: Capricorn Highschool </div>
                            <div className="cov">From: Pretoria Hatfield</div> 
                            <div className="cov">To: Limpopo Polokwane </div> 
                            <div className="cov">Date Delivered: 17/07/2022 </div> 
                            <div className="covDesc">Description: </div>
                        </div>
                        
                    </div>

                </div>

                          </div>     
                
  </div> 
  </section>*/}
</div> 
    </div>
  );
}

export default ClientScheduleDelivery;
