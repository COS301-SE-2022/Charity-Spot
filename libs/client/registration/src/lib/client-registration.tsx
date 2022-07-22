import React,{useState} from 'react'
import {Link} from 'react-router-dom'

import Sealregister from '../../../shared/assets/Sealregister.png'
import CS from '../../../shared/assets/CS.png'
import Bgpic from '../../../shared/assets/Bgpic.png'

import './register.css';

let state = 0;

async function APICall(orgName:string, email: string,location:string, password: string, whois: string){
  let query = null;

  switch(whois) {
    case "CLIENT":
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
    case "ORG":
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
  
  console.log(All_data);
  state = 0;
  return JSON.stringify(All_data);
}

/************************************************** */

function ClientForm () {
  const [nameval,setNameval] = useState('');
  const [emailval,setEmailval] = useState('');
  const [Locationval,setLocationval] = useState('');
  const [passval,setPassval] = useState('');
  const [confpassval,setConfPassval] = useState('');
  const [invalidCredentials, setInvalidCredentials] = useState('');

  const handlesubmit =  async(event: { preventDefault: () => void; }) =>{
    event.preventDefault();
    setInvalidCredentials('');

    if((nameval === '') || (emailval === '') || (Locationval === '') || (passval === '')){
      setInvalidCredentials("Fields must not be empty");
      return;
    }

    if((passval !== confpassval)) {
      setInvalidCredentials("Passwords do not match");
      return;
    }

    const response = JSON.parse(await APICall(nameval, emailval, Locationval, passval, "CLIENT"));
    
    let ID = null;
    if(response.data != null && (ID = response.data.clientRegist.ID_internal) != null) {
      document.cookie = "ID="+ID;
      window.location.href = '/login';
      setInvalidCredentials('');
    } else {
      setInvalidCredentials(`${emailval} already exists`);
      return;
    }
  }

  return(
    <div className = "main-register" style ={{backgroundImage:`url(${Bgpic})`}}>
    <br/>
    <h1>Registration for Parties in need</h1>
    <div className ="register-contain">
      <div className="rgleft-side">
        <div className='rgimg-class'>
          <img src={CS} alt='' id='rglogo-img-id'/>
        </div>
        <form onSubmit={handlesubmit}>   

        <label htmlFor ='rgorgnm2' className='rglabel'>Name</label>
            <input placeholder='Please enter your name' type ='text' id="rgorgnm2" className='rgInput'
             value={nameval}
             onChange ={(e)=>{setNameval(e.target.value)}}/>

          <label htmlFor ='emil1' className='rglabel'>Email</label>
            <input placeholder='Please enter your email' type ='email' id="emil1"  className='rgInput'
             value={emailval}
             onChange ={(e)=>{setEmailval(e.target.value)}}/>

          <label htmlFor ='lct11' className='rglabel'>Location</label>
            <input placeholder='Your nearest town, i.e. Pretoria, Johannesburg, Cape Town, etc' type ='text' id="lct1"  className='rgInput'
             value={Locationval}
             onChange ={(e)=>{setLocationval(e.target.value)}}/>              

          <label htmlFor ='rgpwd1' className='rglabel'>Password</label>              
            <input placeholder='Remember this one :)' type ='password' id="rgpwd1" className='rgInput'
            value={passval}
            onChange ={(e)=>{setPassval(e.target.value)}}/>

          <label htmlFor ='rgpwd2' className='rglabel'>Confirm Password</label>              
            <input placeholder='TIP: just copy|paste the one above :: xD' type ='password' id="rgpwd2" className='rgInput'
            value={confpassval}
            onChange ={(e)=>{setConfPassval(e.target.value)}}/>              
            
            <br/>
            <button type='submit' id='rgsub_butt'>Register</button>
        </form>
        <div className='rgfoot'>
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
  </div>
  )
}

function OrgForm() {
  const [nameval,setNameval] = useState('');
  const [emailval,setEmailval] = useState('');
  const [Locationval,setLocationval] = useState('');
  const [passval,setPassval] = useState('');
  const [confpassval,setConfPassval] = useState('');
  const [invalidCredentials, setInvalidCredentials] = useState('');

  const handlesubmit =  async(event: { preventDefault: () => void; }) =>{
    event.preventDefault();
    setInvalidCredentials('');

    if((nameval === '') || (emailval === '') || (Locationval === '') || (passval === '')){
      setInvalidCredentials("Fields must not be empty");
      return;
    }

    if((passval !== confpassval)) {
      setInvalidCredentials("Passwords do not match");
      return;
    }

    const response = JSON.parse(await APICall(nameval, emailval, Locationval, passval, "ORG"));

    let ID = null;
    if(response.data != null && (ID = response.data.orgRegist.ID_internal) != null) {
      document.cookie = "ID="+ID;
      setInvalidCredentials('');
      window.location.href = '/login';
    } else {
      setInvalidCredentials(`${emailval} already exists`);
      return;
    }
  }

  return(
<div className = "main-register" style ={{backgroundImage:`url(${Bgpic})`}}>
      <br/>
      <h1>Assisting Party Registration</h1>
      <div className ="register-contain">
        <div className="rgleft-side">
          <div className='rgimg-class'>
            <img src={CS} alt='' id='rglogo-img-id'/>
          </div>
          <form onSubmit={handlesubmit}>  

          <label htmlFor ='rgorgnm2' className='rglabel'>Organisation Name</label>
              <input placeholder='Enter organisation name' type ='text' id="rgorgnm2" className='rgInput'
               value={nameval}
               onChange ={(e)=>{setNameval(e.target.value)}}/>

            <label htmlFor ='emil1' className='rglabel'>Organisation Email</label>
              <input placeholder='Enter email here' type ='email' id="emil1"  className='rgInput'
               value={emailval}
               onChange ={(e)=>{setEmailval(e.target.value)}}/>

            <label htmlFor ='lct11' className='rglabel'>Location</label>
              <input placeholder='Nearest town, i.e. Cape Town, Pretoria, etc' type ='text' id="lct1"  className='rgInput'
               value={Locationval}
               onChange ={(e)=>{setLocationval(e.target.value)}}/>              

            <label htmlFor ='rgpwd1' className='rglabel'>Password</label>              
              <input placeholder='Preferred password' type ='password' id="rgpwd1" className='rgInput'
              value={passval}
              onChange ={(e)=>{setPassval(e.target.value)}}/>

            <label htmlFor ='rgpwd2' className='rglabel'>Confirm Password</label>              
              <input placeholder='Retype the password above' type ='password' id="rgpwd2" className='rgInput'
              value={confpassval}
              onChange ={(e)=>{setConfPassval(e.target.value)}}/>              
              
              <br/>
              <button type='submit' id='rgsub_butt'>Register</button>
          </form>
          <div className='rgfoot'>
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
    </div>
    
  )
}

/************************************************** */

export function Register() {
  const [typeval,setTypeval] = useState('');

  const whois = async(event: {preventDefault: () => void; }) => {
    event.preventDefault();

    switch(typeval) {
      case "Organization":
        state = 2;
        break;
      case "Client":
        state = 1;
        break;
      default:
        state = 0;
    }
    setTypeval('');
  }

  switch(state) {
    case 0: 
      return (

        <div className = "main-register" style ={{backgroundImage:`url(${Bgpic})`}}>
          <br/>
          <h1>Charity-Spot</h1>
          <div className ="register-contain">
            <div className="rgleft-side">
              <div className='rgimg-class'>
                <img src={CS} alt='' id='rglogo-img-id'/>
              </div>
              <form onSubmit={whois}>

              <label htmlFor ='rgorgnm1' className='rglabel'>Are you In-need or Willing to help?</label>
                  <select name="orgs" id="rgorgnm1" value={typeval} onChange ={(e)=>{setTypeval(e.target.value);}} className='rgSelect'>
                        <option value = ""></option>
                        <option value="Organization">Assisting Organisation</option>
                        <option value="Client">Party in need</option>  
                  </select>
                  <br/>
                  <button type='submit' id='rgsub_butt'>Proceed</button>
              </form>
              <div className='rgfoot'>
                <p>Already have an account?<Link to ='/login' className='rgLink' onClick={() => {state = 0}}> click to Login</Link></p>
              </div>
            </div>

            <div className="rgright-side">
              <div className='welcomeNote'>
                <h3 id='welid'>New here? welcome.</h3>
              </div>

                <img src={Sealregister} alt='' id='rgwel-img-id'/>

            </div>        

          </div>
        </div>
    
      )

    case 1:
      return (<ClientForm />)
    
    case 2:
      return (<OrgForm />)

    default:
      return null;
    }
}

export default Register