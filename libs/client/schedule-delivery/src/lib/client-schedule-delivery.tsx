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
    <label htmlFor= "deliver1" className='deliver1'><FaClock/> Delivery </label>
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
                      <label className='labelDel'>From:</label><br/>
                      <input className="del1" type ="text" placeholder='Your Name'></input>  
                        <FaPen color='#1458b3'/><br/>
                    </div>
                    
                    <div className='deliver-box'>
                      
                        <label className='labelDel'>To:</label><br/>
                        <input className="del1" type ="text" placeholder='Recipient Name'></input>  
                        <FaPen color='#1458b3'/>
                    </div>  
                    <div className='deliver-box'>
                      
                      <label className='labelDel'>Your Location:</label><br/>
                      <input className="del1" type ="text" placeholder=' e.g Pretoria, Hatfield'></input>  
                      <FaPen color='#1458b3'/>
                  </div>  
                  <div className='deliver-box'>
                      
                      <label className='labelDel'>Delivery Location:</label><br/>
                      <input className="del1" type ="text" placeholder=' Limpopo, Polokwane'></input>  
                      <FaPen color='#1458b3'/>
                  </div>  
                  <div className='deliver-box'>
                      
                      <label className='labelDel'>Date of Transportation:</label><br/>
                      <input className="del1" type ="date" ></input>  
                      <FaPen color='#1458b3'/>
                  </div>  
                  <div className='deliver-box'>
                      
                      <label className='labelDel'>Estimated Date of Arrival:</label><br/>
                      <input className="del1" type ="date" ></input>  
                      <FaPen color='#1458b3'/>
                  </div>  
                    
                    <br></br><br></br>
                  <div className='deliver-box'>
                  <input id='deliv_but'type="submit" value="Confirm Delivery"/>   
                    {/* <input id='clr_but'type="button" value="Clear"/>   */}
                  </div>
    
                  </form>

                </div>  
              </div>
          </div>
        </div>

    <div className='content content-2'>
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
  </section>
</div> 
    </div>
  );
}

export default ClientScheduleDelivery;
