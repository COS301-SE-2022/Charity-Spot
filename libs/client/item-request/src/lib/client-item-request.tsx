import styles from './client-item-request.module.css';
import "./requestee.css";
import { FaHistory,FaDonate,FaPen,FaUserAlt,FaEdit,FaArrowRight,FaCloudDownloadAlt } from 'react-icons/fa';
import {Link} from 'react-router-dom'

import { useEffect, useState } from 'react';

import { getCookie, setCookie, removeCookie } from 'typescript-cookie'



export function ClientItemRequest() {

  const [location, setLocation] = useState<any>();
  const [type, setType] = useState<any>("Food Item");
  const [date, setDate] = useState<any>();

  function setCookies(){
    setCookie("location",location);
    setCookie("type",type);
    setCookie("date",date);
  }


  return (
    <div>
      <br/>
      <h2 className='reqHead'>Request for an item</h2>
      
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
                    {/*<div className='request-box2'>
                      
                      <input className="req2" type ="number" min="1" placeholder=' Item(s) Quantity' onChange ={()=>{}}></input> 
                      <FaPen color='#1458b3'/>
                    </div>*/}   

                    <div className='request-box2'>
                      
                      <input className="req2" type ="text" placeholder='Your Location' onChange ={(e)=>{setLocation(e.target.value)}}></input> 
                      <FaPen color='#1458b3'/>
                    </div>   

                    <div className='donate-box3'>    
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

                     <input className="req2" type ="text" placeholder='Date that you require the item:' onChange ={(e)=>{setDate(e.target.value)}}></input> 
                      <FaPen color='#1458b3'/>
                    </div>  
                    
                                 
                  
                    <br></br>

                    <Link to ='/itemRequestResults' className='rgLink'><input id='req_but'type="button" value="Request" onClick={()=>{setCookies()}}/></Link>   
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
