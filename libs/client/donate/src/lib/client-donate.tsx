import styles from './client-donate.module.css';
import './donatee.css'
import { FaHistory,FaDonate,FaPen } from 'react-icons/fa';

/* eslint-disable-next-line */
export interface ClientDonateProps {}
export function ClientDonate(props: ClientDonateProps) {

  const hanndlesubmit = (event: { preventDefault: () => void; }) =>{
    event.preventDefault();
}
return (
<div>
<div className="wrapper2">
<br/><br/>
  <input type ="radio" name="slider" id='donate1'  defaultChecked></input>
  <input type ="radio" name="slider" id='history1' ></input>
  {/* <input type ="radio" name="slider" id='code' ></input>
  <input type ="radio" name="slider" id='help' ></input> */}
  <nav>
    <label htmlFor= "donate1" className='donate1'><FaDonate/> Donate  </label>
    <label htmlFor= "history1" className='history1'> <FaHistory/> History </label>
    <div className='slider'></div>
  </nav>
  <section>
    <div className='content content-1'>
      <div className='title'><h1>Donate</h1></div>

                    <div className='donate-main'>

                      <div className='donate-left'>
                      <div className='item-pic'>
                        {/* <img src={userprofile} alt="" id="donation-pic"/> */}
                      </div>
                      </div>
                      <div className='donate-right'>
                        <br/><br/>
                        <div className='donater'>
                          <form onSubmit={hanndlesubmit}>
                            <div className='donate-box1'>
                              {/* <label htmlFor=''>OrgName</label><br/> */}
                              <input className="din1" type ="text" placeholder='Name' ></input>  
                               <FaPen color='#1458b3'/>
                            </div>
                            <div className='donate-box2'>
                              {/* <label htmlFor=''>Email</label> */}
                              <input className="din2" type ="number" min="1" placeholder='Quantity'></input> 
                              <FaPen color='#1458b3'/>
                            </div>  
                            
                            <div className='donate-box3'>
                              {/* <label htmlFor=''>Address</label> */}
                              <select name="orgs"   className='din3'>
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
                              {/* <label htmlFor=''>Org Password</label> */}
                              <select name="orgs"   className='din4'>
                                    <option value="New">New</option>
                                    <option value="Used">Used</option>  
                                </select>                                       
                             
                              <FaPen color='#1458b3'/>
                            </div>      
                            <div className='donate-box5'>
                              {/* <label htmlFor=''>confirm password</label> */}
                              <textarea className="din5" rows={1}  placeholder='Item(s) Description'></textarea> 
                              
                            </div> 
                            <input id='dnt_but'type="submit" value="Donate"/>   
                            <input id='clr_but'type="submit" value="Clear"/>                                                                                    
                          </form>
                        </div>  
                      </div>
                  </div>
                </div>


  
    <div className='content content-2'>
      <div className='title'><h1>Content 2</h1></div>
      <p> who was the company's public face. </p>
    </div>
  </section>
</div>   
 
</div>
  );
}

export default ClientDonate;
