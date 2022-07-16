import   './deliveryy.css';
import { FaHistory,FaDonate,FaPen,FaUserAlt,FaEdit,FaArrowRight,FaCloudDownloadAlt,FaClock } from 'react-icons/fa';
/* eslint-disable-next-line */
export interface ClientScheduleDeliveryProps {}

export function ClientScheduleDelivery(props: ClientScheduleDeliveryProps) {
  return (
    <div>
<div className="wrapper2">
<br/><br/>
  <input type ="radio" name="slider" id='deliver1'  defaultChecked></input>
  <input type ="radio" name="slider" id='history1' ></input>
  
  <nav>
    <label htmlFor= "deliver1" className='deliver1'><FaClock/> Delievery </label>
    <label htmlFor= "history1" className='history1'> <FaHistory/> History </label>
    <div className='slider'></div>
  </nav>
  <section>
    <div className='content content-1'>
      <div className='title'><h1>Delievery Schedule</h1></div>
            <div className='deliver-main'>
              <div className='deliver-cent'>
                <br/><br/>
                <div className='delvrr'>
                  <form id = "mainDeliverForm">
                    <div className='deliver-box'>
                      <label>From:</label><br/>
                      <input className="del1" type ="text" placeholder=''></input>  
                        <FaPen color='#1458b3'/><br/>
                    </div>
                    
                    <div className='deliver-box'>
                      
                        <label>To:</label><br/>
                        <input className="del1" type ="text" placeholder=' Name'></input>  
                        <FaPen color='#1458b3'/>
                    </div>  
                    <div className='deliver-box'>
                      
                      <label>Your Location:</label><br/>
                      <input className="del1" type ="text" placeholder=' Name'></input>  
                      <FaPen color='#1458b3'/>
                  </div>  
                  <div className='deliver-box'>
                      
                      <label>Delivery Location:</label><br/>
                      <input className="del1" type ="text" placeholder=' Name'></input>  
                      <FaPen color='#1458b3'/>
                  </div>  
                  <div className='deliver-box'>
                      
                      <label>Date of Transportation:</label><br/>
                      <input className="del1" type ="date" placeholder=' Name'></input>  
                      <FaPen color='#1458b3'/>
                  </div>  
                  <div className='deliver-box'>
                      
                      <label>Estimated Date of Arrival:</label><br/>
                      <input className="del1" type ="date" placeholder=' Name'></input>  
                      <FaPen color='#1458b3'/>
                  </div>  
                    
                    <br></br>
{/* 
                    <input id='dnt_but'type="submit" value="Donate"/>   
                    <input id='clr_but'type="button" value="Clear"/>                                                                                     */}
                  </form>

                </div>  
              </div>
          </div>
        </div>

    <div className='content content-2'>
           <div className='title'><h1>History</h1></div>

             
                
  </div>
  </section>
</div> 
    </div>
  );
}

export default ClientScheduleDelivery;
