import styles from './client-item-request.module.css';
import "./requestee.css";
import { FaHistory,FaDonate,FaPen,FaUserAlt,FaEdit,FaArrowRight,FaCloudDownloadAlt } from 'react-icons/fa';

/* eslint-disable-next-line */
export interface ClientItemRequestProps {}




export function ClientItemRequest(props: ClientItemRequestProps) {
  return (
    <div>
        <div className='request-main'>
              <div className='request-left'>
              <br/><br/>                  
              </div>
              <div className='request-right'>
                <br/><br/>
                <div className='donater'>
                  <form id = "mainRequestForm" onSubmit={() => {}}>
                    <div className='request-box1'>
                      
                      <input className="req1" type ="text" placeholder=' Name' onChange ={()=>{}}></input>  
                        <FaPen color='#1458b3'/>
                    </div>
                    <div className='request-box2'>
                      
                      <input className="req2" type ="number" min="1" placeholder=' Quantity' onChange ={()=>{}}></input> 
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
                    <div className='donate-box4'>
                      
                      <select name="orgs"   className='req4' onChange ={()=>{}}>
                            <option value=" New">New</option>
                            <option value=" Used">Used</option>  
                        </select>                                       
                      
                      <FaPen color='#1458b3'/>
                    </div>      
                    <div className='donate-box5'>
            
                      <textarea className="req5" rows={1}  placeholder=' Item(s) Description' onChange ={()=>{}}></textarea> 
                      <FaPen color='#1458b3'/>
                    </div>

                    {/* <div>

                      <input type="file"
                        onChange={(e) => {

                          if(!e.target.files) return;
                          setImageUpload(e.target.files[0])
                          setImageURL(URL.createObjectURL(e.target.files[0]));

                        }}/>

                    </div> */}

                    <br></br>

                    <input id='dnt_but'type="submit" value="Donate"/>   
                    <input id='clr_but'type="button" onClick={()=>{}} 
                      value="Clear"/>                                                                                    
                  </form>

                </div>  
              </div>
          </div>
    </div>
  );
}

export default ClientItemRequest;
