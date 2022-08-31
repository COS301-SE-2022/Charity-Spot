import React,{useState} from 'react'
import {Link} from 'react-router-dom'

import Sealregister from '../../../shared/assets/Sealregister.png'
import CS from '../../../shared/assets/CS.png'
import Bgpic from '../../../shared/assets/Bgpic.png'

import './register.css';

import {ModalMap} from './modal-map';


async function APICall(orgName:string, email: string,location:string, password: string, whois: string){
  let query = null;

  switch(whois) {
    case "NEED":
      query = (`query {
        clientRegist(
          Name:"${orgName}",
          Email: "${email}",
          Location: "${location}",
          Password: "${password}"
        ){
          ID_internal
          ID_external
        }
      }`);
      break;
    case "ASSIST":
      query = (`query {
        orgRegist(
          OrgName:"${orgName}",
          OrgEmail: "${email}",
          OrgLocation: "${location}",
          OrgPassword: "${password}"
        ){
          ID_internal
          ID_external
        }
      }`)
      break;

      default:
          query = '';
  }

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
    }).then(r => r.json()).then(data => 
      All_data = data
    );
  
  return JSON.stringify(All_data);
}


export function Register() {
  const [show, setShow] = useState(false);

  const [location, setLocation] = useState({ lat: -26.2041, lng: 28.0473});

  const [typeval,setTypeval] = useState('ASSIST');
  const [nameval,setNameval] = useState('');
  const [emailval,setEmailval] = useState('');
  const [Locationval,setLocationval] = useState('');
  const [passval,setPassval] = useState('');
  const [confpassval,setConfPassval] = useState('');
  const [invalidCredentials, setInvalidCredentials] = useState('');

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

  const hanndlesubmit =  async(event: { preventDefault: () => void; }) =>{
      event.preventDefault();
      setInvalidCredentials('');

      let imgBase64 = undefined;

      if(imageUpload){
        imgBase64 = await getBase64(imageUpload);
      }

      if((nameval === '') || (emailval === '') || (Locationval === '') || (passval === '') || (confpassval === '')){
        setInvalidCredentials("Fields must not be empty");
        return;
      }
      
      const response = JSON.parse(await APICall(nameval, emailval, Locationval, passval, typeval));
      
      window.location.href = '/login';
    
      setInvalidCredentials('');
           
  }

  

  return (
    <div className = "main-register" style ={{backgroundImage:`url(${Bgpic})`}}>
      <br/>
      <h1>Charity-Spot</h1>
      <div className ="register-contain">
        <div className="rgleft-side">
          <div className='rgimg-class'>
            <img src={CS} alt='' id='rglogo-img-id'/>
          </div>
          <form onSubmit={hanndlesubmit}>

          <label htmlFor ='rgorgnm1' className='rglabel'>How would you like to use Charity Spot?</label>
              <select name="orgs" id="rgorgnm1" value={typeval} onChange ={(e)=>{setTypeval(e.target.value)}} className='rgSelect'>
                    <option value="ASSIST">Willing to assist</option>
                    <option value="NEED">In Need</option>
              </select>     

          <label htmlFor ='rgorgnm2' className='rglabel'>Profile Name</label>
              <input placeholder='Profile Name' type ='text' id="rgorgnm2" className='rgInput'
               value={nameval}
               onChange ={(e)=>{setNameval(e.target.value)}}/>

            <label htmlFor ='emil1' className='rglabel'>Email</label>
              <input placeholder='Enter your email...' type ='email' id="emil1"  className='rgInput'
               value={emailval}
               onChange ={(e)=>{setEmailval(e.target.value)}}/>

            <label htmlFor ='lct11' className='rglabel'>Location</label>
              <input placeholder='Enter your location...' type ='text' id="lct1"  className='rgInput'
               value={Locationval}
               onChange ={(e)=>{setLocationval(e.target.value)}}/>
              <button type="button" className="custom-file-upload" onClick={() => {setTimeout(() => setShow(true), 100);}}>
                Select your location
              </button>

              <label htmlFor ='pimg1' className='rglabel'>Profile Picture</label><br/>
                          <label htmlFor="file-upload" className="custom-file-upload">
                              Select Image
                          </label>
                          
                            <input type="file"
                              id="file-upload"
                              onChange={(e) => {

                                console.log("test");
                                
                                if(!e.target.files) return;
                                setImageUpload(e.target.files[0])
                                setImageURL(URL.createObjectURL(e.target.files[0]));

                                console.log(imageURL);

                             }}/>           

            <label htmlFor ='rgpwd1' className='rglabel'>Password</label>              
              <input placeholder='Enter password...' type ='password' id="rgpwd1" className='rgInput'
              value={passval}
              onChange ={(e)=>{setPassval(e.target.value)}}/>

            <label htmlFor ='rgpwd2' className='rglabel'>Confirm Password</label>              
              <input placeholder='Confirm password...' type ='password' id="rgpwd2" className='rgInput'
              value={confpassval}
              onChange ={(e)=>{setConfPassval(e.target.value); console.log("pass test")}}/>
              
              <br/>
              
              <button type='submit' id='rgsub_butt'>Register</button>
          </form>

          <div className='rgfoot'>
            <p>Already have an account?<Link to ='/login' className='rgLink'> click to Login</Link></p>
            <p style={{color:"red"}}>{invalidCredentials}</p>
          </div>
        </div>

        <div className="rgright-side">
          <div className='welcomeNote'>
            <h3 id='welid'>New here? welcome.</h3>
          </div>

            <img src={Sealregister} alt='' id='rgwel-img-id'/>

        </div>        

      </div>
                   
      <ModalMap inState={[show, setShow, setLocation, location]}></ModalMap>                    

    </div>
    
  )
}

export default Register