import styles from './client-item-request.module.css';
import "./requestee.css";
import { FaHistory,FaDonate,FaPen,FaUserAlt,FaEdit,FaArrowRight,FaCloudDownloadAlt } from 'react-icons/fa';
import {Link} from 'react-router-dom'

import { useEffect, useState } from 'react';

import { getCookie, setCookie, removeCookie } from 'typescript-cookie'

import { useNavigate } from "react-router-dom";



export function ClientItemRequest() {

  const [location, setLocation] = useState<any>("Gauteng");
  const [type, setType] = useState<any>("FOOD");
  const [date, setDate] = useState<any>();

  const [invalidDate, setinvalidDate] = useState('');

  let navigate = useNavigate();

  function setCookies(){

    setinvalidDate("");

    if(date == undefined){
      setinvalidDate("No date selected");
      return;
    }

    navigate("/itemRequestResults");
    
    setCookie("location",location);
    setCookie("type",type);
    setCookie("date",date);
  }


  return (
    <div>
      <h2 className='reqHead'>Use our AI system to find an item!</h2>
      <p style={{ color: 'red' }}>{invalidDate}</p>
      
        <div className='request-main'>
              <div className='request-left'>
              <br/><br/>                  
              </div>
              <div className='request-right'>
                <br/><br/>
                <div className='donater'>
                  <form id = "mainRequestForm" onSubmit={() => {}}>
                    {/*<div className='request-box1'>
                    <label className='labelDel'>Item Details:</label><br/>
                      <input className="req1" type ="text" placeholder='Item Name' onChange ={()=>{}}></input>  
                        <FaPen color='#1458b3'/>
                    </div>
                    <div className='request-box2'>
                      
                      <input className="req2" type ="number" min="1" placeholder=' Item(s) Quantity' onChange ={()=>{}}></input> 
                      <FaPen color='#1458b3'/>
                    </div>*/}   

                    <div className='request-box2'>
                       <label className='labelDel'>Location:</label><br/>
                      {/*<input className="req2" type ="text" placeholder='Your Location' onChange ={(e)=>{setLocation(e.target.value)}}></input>*/}
                      <select name="orgs" className='req2' onChange ={(e)=>{setLocation(e.target.value)}}>
                            <option value="Gauteng">Gauteng</option>
                            <option value="KwaZulu-Natal">KwaZulu-Natal</option>  
                            <option value="Limpopo">Limpopo</option> 
                            <option value="Western Cape">Western Cape</option> 
                            <option value="Northern Cape">Northern Cape</option> 
                            <option value="North West">North West</option>
                            <option value="Eastern Cape">Eastern Cape</option>
                            <option value="Free State">Free State</option>
                            <option value="Mpumalanga">Mpumalanga</option>
                        </select>  
                      <FaPen color='#1458b3'/>
                    </div>   

                    <div className='donate-box3'>    
                    <label className='labelDel'>Item Category:</label><br/>
                      <select name="orgs" className='req3' onChange ={(e)=>{setType(e.target.value)}}>
                            <option value="FOOD">Food Item</option>
                            <option value="CLOTHING">Clothing</option>  
                            <option value="STATIONARY">Stationery</option> 
                            <option value="HYGIENE">Hygiene</option> 
                            <option value="FURNITURE">Furniture</option> 
                            <option value="KITCHEN">Kitchen</option>
                        </select>                                     
                      <FaPen color='#1458b3'/>
                    </div>  

                    {/*<div className='request-box2'>
                    <label className='labelDel'>Prefered Date of Delivery:</label><br/>
                      <input className="del1" type ="date" ></input>  
                      <FaPen color='#1458b3'/>
                  </div>*/}

                    <div>
                    <label className='labelDel'>Date that the item is required:</label><br/>
                     <input className="req2" type ="date" placeholder='Date that you require the item:' onChange ={(e)=>{setDate(e.target.value)}}></input> 
                      <FaPen color='#1458b3'/>
                    </div>  
                    
                                 
                  
                    <br></br>

                    {/*<Link to ='/itemRequestResults' className='rgLink'><input id='req_but'type="button" value="Find" onClick={()=>{setCookies()}}/></Link>*/}
                    <input id='req_but'type="button" value="Find" onClick={()=>{setCookies()}}/>  
                    <input id='reqclr_but'type="button"
                      value="Clear"/>                                                                                    
                  </form>

                </div>  
              </div>
          </div>
    </div>
  );
}

export default ClientItemRequest;
