import './donatee.css'
import { FaHistory,FaDonate,FaPen,FaUserAlt,FaEdit,FaArrowRight,FaCloudDownloadAlt } from 'react-icons/fa';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { getCookie, setCookie } from 'typescript-cookie'

import ItemHistory from './item-history'

let IdCookie = getCookie('ID');


async function uploadItemAPICall(Name : string, Quantity : string, Category : string, Condition : string, Description : string, Base64Img : any){
  
  if(Base64Img == undefined){
    Base64Img = "undefined";
  }

  const query = `
  query{
    donate(
      userID: "${IdCookie}", 
      name: "${Name}", 
      quantity: ${Quantity}, 
      category: "${Category}", 
      condition: "${Condition}", 
      descr: "${Description}", 
      picture: "${Base64Img}", 
      pic_format: "jpg"){
      Name
    }
  }
  `;

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

    
}

async function historyData() {
  const query = `
    donateHistory(id: "${IdCookie}"){
      Donations{
        Name
        Quantity
        Quality
        Category
        Picture
        Description
      }
    }
  `;

  let act_data = "";
  
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
            act_data = data
        );
             

  console.log(JSON.stringify(act_data));
}


export function ClientDonate() {

  const [IName, setIName] = useState('');
  const [IQuan,setIQuan] = useState('');
  const [ICat, setICat] = useState('Food');
  const [ICond,setICond] = useState('New');
  const [IDesc, setIDesc] = useState('');
  

  const [imageUpload, setImageUpload] = useState<File>();
  const [imageURL, setImageURL] = useState('');

  async function getBase64(file : File){

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

  }


  const hanndlesubmit = async () =>{

    let imgBase64 = undefined;

    if(imageUpload){
      imgBase64 = await getBase64(imageUpload);
    }

    await uploadItemAPICall(IName, IQuan, ICat, ICond, IDesc, imgBase64);

    (document.getElementById("mainDonateForm") as HTMLFormElement)!.reset();
    setImageURL("");

  }

return (

<div>
<div className="wrapper2">
<br/><br/>
  <input type ="radio" name="slider" id='donate1'  defaultChecked></input>
  <input type ="radio" name="slider" id='history1' ></input>
  
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
              <br/><br/>                  
                  <div className="imgWrap" >
                    <div className='item-pic'>
                 
                      <img src={imageURL} alt="Your uploaded picture will show here" id="donation-pic"/>
                    </div>
                  
                          <div>
                          <label htmlFor="file-upload" className="custom-file-upload">
                              Browse Image
                          </label>
                          
                            <input type="file"
                            id="file-upload"
                              onChange={(e) => {
                                
                                if(!e.target.files) return;
                                setImageUpload(e.target.files[0])
                                setImageURL(URL.createObjectURL(e.target.files[0]));

                             }}/>

                           </div>

                     </div>

              </div>
              <div className='donate-right'>
                <br/><br/>
                <div className='donater'>
                  <form id = "mainDonateForm" onSubmit={(e) => { e.preventDefault(); hanndlesubmit();}}>
                    <div className='donate-box1'>
                      
                      <input className="din1" type ="text" placeholder='Name' onChange ={(e)=>{setIName(e.target.value)}}></input>  
                        <FaPen color='#1458b3'/>
                    </div>
                    <div className='donate-box2'>
                      
                      <input className="din2" type ="number" min="1" placeholder='Quantity' onChange ={(e)=>{setIQuan(e.target.value)}}></input> 
                      <FaPen color='#1458b3'/>
                    </div>  
                    
                    <div className='donate-box3'>
                      
                      <select name="orgs" className='din3' onChange ={(e)=>{setICat(e.target.value)}}>
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
                      
                      <select name="orgs"   className='din4' onChange ={(e)=>{setICond(e.target.value)}}>
                            <option value="New">New</option>
                            <option value="Used">Used</option>  
                        </select>                                       
                      
                      <FaPen color='#1458b3'/>
                    </div>      
                    <div className='donate-box5'>
            
                      <textarea className="din5" rows={1}  placeholder='Item(s) Description' onChange ={(e)=>{setIDesc(e.target.value)}}></textarea> 
                      
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
                    <input id='clr_but'type="button" onClick={(e) => { 
                      e.preventDefault(); 
                      (document.getElementById("mainDonateForm") as HTMLFormElement)!.reset();
                      setImageURL("");}} 
                      value="Clear"/>                                                                                    
                  </form>

                </div>  
              </div>
          </div>
        </div>

    <div className='content content-2'>
           <div className='title'><h1>History</h1></div>
           <ItemHistory key={imageURL}></ItemHistory>
             
                
  </div>
  </section>
</div>   
 
</div>
  );
}

export default ClientDonate;
