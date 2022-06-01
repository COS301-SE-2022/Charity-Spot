import styles from './client-donate.module.css';
import './donatee.css'
import { FaHistory,FaDonate,FaPen,FaUserAlt,FaEdit,FaArrowRight } from 'react-icons/fa';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import  userprofile from '../../../shared/assets/userprofile.png'

const fullCookie = document.cookie.split("="); 
const IdCookie = fullCookie[1];
console.log(IdCookie);
async function uploadImageAPICall(ImageBase64 : any){
    
  const query = (`query {
    uploadImage(base64: "${ImageBase64}"){
      ID
    }
  }`);

  let All_data = "";
  
  await fetch('http://localhost:3333/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query
      })
      }).then(r => r.json())
        .then((data) => 
            All_data = data
        );
            
  console.log(JSON.stringify(All_data));

}

/* eslint-disable-next-line */
//export interface ClientDonateProps {}
//export function ClientDonate(props: ClientDonateProps) {
export function ClientDonate() {

  const [imageUpload, setImageUpload] = useState<File>();

  const uploadImage = () => {

    alert("Image uploaded to Firebase!");

    if(imageUpload){
      getBase64(imageUpload).then((data) => { uploadImageAPICall(data); });
    }


  };

  function getBase64(file : File){

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

  }


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

                          {/*Test code for file upload please feel free to remove*/}

                            <div>
                              <br></br>

                              <input type="file"
                              onChange={(e) => {

                                if(!e.target.files) return;
                                setImageUpload(e.target.files[0])

                              }}/>

                              <button onClick={uploadImage}>Upload Image</button>

                            </div>

                          {/*End of test code for file upload*/}

                        </div>  
                      </div>
                  </div>
                </div>


  
    <div className='content content-2'>
           <div className='title'><h1>History</h1></div>
           <div className='rapper'>
                  <div className='collapsible'>
                    <input type ='checkbox' id = 'collapsible-head'></input>
                    <label htmlFor='collapsible-head'>Levis Leather Jacket <FaArrowRight/></label>
  
                    <div className='collapsible-text'><br/>
                    <div className='collapseleft'>
                     <img src={userprofile} alt="" id="profile-pic"/>
                    </div>
                    <div className='collapseright'>
                      <ListGroup variant="flush" >
                        <ListGroup.Item style={{ backgroundColor: 'transparent', height: '70px' , color: '#104283'}}>Name: Levis Leather Jacket</ListGroup.Item>
                          <ListGroup.Item style={{ backgroundColor: 'transparent', height: '70px', color: '#104283' }}>Quantity: 5 </ListGroup.Item>
                          <ListGroup.Item style={{ backgroundColor: 'transparent', height: '70px' , color: '#104283'}}>Category: Clothing </ListGroup.Item>
                          <ListGroup.Item style={{ backgroundColor: 'transparent', height: '70px' , color: '#104283'}}>Condition: Old</ListGroup.Item>
                          <ListGroup.Item style={{ backgroundColor: 'transparent', height: '70px' , color: '#104283'}}>Description: Trucker Vintage jackets</ListGroup.Item>
                      </ListGroup>
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

export default ClientDonate;
