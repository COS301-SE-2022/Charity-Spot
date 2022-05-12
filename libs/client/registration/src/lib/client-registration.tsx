import React,{useState} from 'react'
import {Link} from 'react-router-dom'

import Sealregister from '../../../shared/assets/Sealregister.png'
import CS from '../../../shared/assets/CS.png'
import Bgpic from '../../../shared/assets/Bgpic.png'

import './register.css';

async function APICall(orgName:string, email: string,location:string, password: string){

  const query = (`query {
    registerORG(
      org_Name:"${orgName}",
      email: "${email}",
      location: "${location}",
      password: "${password}"
    ){
      ID
    }
  }`);

  //console.log(query);
    
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
  const [typeval,setTypeval] = useState('');
  const [nameval,setNameval] = useState('');
  const [emailval,setEmailval] = useState('');
  const [Locationval,setLocationval] = useState('');
  const [passval,setPassval] = useState('');
  const [confpassval,setConfPassval] = useState('');
  const [invalidCredentials, setInvalidCredentials] = useState('');

  const hanndlesubmit =  async(event: { preventDefault: () => void; }) =>{
      event.preventDefault();
      setInvalidCredentials('');
      const response = JSON.parse(await APICall(emailval, passval, Locationval, passval));
      console.log(response);

      if((nameval === '') || (emailval === '') || (Locationval === '') || (passval === '') || (confpassval === '')){
        setInvalidCredentials('Fields must not be empty');
      }
      if(setPassval !== setConfPassval){

         setInvalidCredentials('The passwords must match');
       }
       if(emailval === response.data.registerORG.email){

        setInvalidCredentials('The email already exists');
      }
      else{
        let ID = response.data.registerORG.ID;
        // if(ID == null){
        //  // alert("error");
        //   setInvalidCredentials('Invalid credentials');
        //   return;
        // }
        document.cookie = "ID="+ID;
        window.location.href = '/profile';
        console.log(response.data.registerORG);
        setInvalidCredentials('');
      }

           
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

          <label htmlFor ='rgorgnm1' className='rglabel'>Type</label>
              <select name="orgs" id="rgorgnm1" value={typeval} onChange ={(e)=>{setTypeval(e.target.value)}} className='rgSelect'>
                    <option value="Organization">Organization</option>
                    <option value="Client">Client</option>  
              </select>     

          <label htmlFor ='rgorgnm2' className='rglabel'>Organization Name</label>
              <input placeholder='Enter Organization Name' type ='text' id="rgorgnm2" className='rgInput'
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

            <label htmlFor ='rgpwd1' className='rglabel'>Password</label>              
              <input placeholder='Enter password...' type ='password' id="rgpwd1" className='rgInput'
              value={passval}
              onChange ={(e)=>{setPassval(e.target.value)}}/>

            <label htmlFor ='rgpwd2' className='rglabel'>Confirm Password</label>              
              <input placeholder='Confirm password...' type ='password' id="rgpwd2" className='rgInput'
              value={confpassval}
              onChange ={(e)=>{setConfPassval(e.target.value)}}/>              
              
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
    </div>
    
  )
}

export default Register