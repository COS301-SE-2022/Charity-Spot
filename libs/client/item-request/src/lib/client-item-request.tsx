import styles from './client-item-request.module.css';
import "./requestee.css";
import { FaHistory,FaDonate,FaPen,FaUserAlt,FaEdit,FaArrowRight,FaCloudDownloadAlt } from 'react-icons/fa';

/* eslint-disable-next-line */
export interface ClientItemRequestProps {}




export function ClientItemRequest(props: ClientItemRequestProps) {
  return (
    <div>
      <br/>
      <h1 className='reqHead'>Request for an item</h1>
      
        <div className='request-main'>
              <div className='request-left'>
              <br/><br/>                  
              </div>
              <div className='request-right'>
                <br/><br/>
                <div className='donater'>
                  <form id = "mainRequestForm" onSubmit={() => {}}>
                    <div className='request-box1'>
                    <label className='labelDel'>Item Name:</label><br/>
                      <input className="req1" type ="text" placeholder='Item Name' onChange ={()=>{}}></input>  
                        <FaPen color='#1458b3'/>
                    </div>
                    <div className='request-box2'>
                      
                      <input className="req2" type ="number" min="1" placeholder=' Item Quantity' onChange ={()=>{}}></input> 
                      <FaPen color='#1458b3'/>
                    </div>   

                    <div className='request-box2'>
                      
                      <input className="req2" type ="text" placeholder='Your Location' onChange ={()=>{}}></input> 
                      <FaPen color='#1458b3'/>
                    </div>   

                    <div className='donate-box3'>    
                      <select name="orgs" className='req3' onChange ={()=>{}}>
                            <option value="Food">Food Item</option>
                            <option value="Clothes">Clothing</option>  
                            <option value="Tech">Tech (phone,laptop,etc..)</option> 
                            <option value="Stationery">Stationery (books,pencils,etc..)</option> 
                            <option value="Hygiene">Hygiene (soap,pads,etc..)</option> 
                            <option value="Furniture">Furniture (Tv,desk,etc..)</option> 
                            <option value="Kitchen">Kitchen (kettle,toaster,etc..)</option> 
                        </select>                                     
                      <FaPen color='#1458b3'/>
                    </div>  

                    <div className='request-box2'>
                    <label className='labelDel'>Prefered Date of Delivery:</label><br/>
                      <input className="del1" type ="date" ></input>  
                      <FaPen color='#1458b3'/>
                    </div>   
                    
                                 

                    <br></br>

                    <input id='req_but'type="submit" value="Request"/>   
                    <input id='reqclr_but'type="button" onClick={()=>{}} 
                      value="Clear"/>                                                                                    
                  </form>

                </div>  
              </div>
          </div>
    </div>
  );
}

export default ClientItemRequest;
