import React,{useState} from 'react';
import {Link} from 'react-router-dom';

import Seallogin from '../../../shared/assets/Seallogin.png'
import CS from '../../../shared/assets/CS.png'
import Bgpic from '../../../shared/assets/Bgpic.png'
import './login.css'
import { getCookie } from 'typescript-cookie';

async function APICall(email: string, password: string){

  const query = `query{
    login(email: "`+email+`", password: "`+password+`",){
      ID
      ID_EXT
    }
  }`;

       let initial_students = "";
  
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
                 initial_students = data
            );

           
    
         return JSON.stringify(initial_students);

}

export function ClientLogin() {

  const [emailval,setEmailval] = useState('');
  const [passval,setPassval] = useState('');
  const [invalidCredentials, setInvalidCredentials] = useState('');

  const hanndlesubmit = async(event: { preventDefault: () => void; }) =>{
      event.preventDefault();
      setInvalidCredentials('');
      const response = JSON.parse(await APICall(emailval, passval));

      if(response.data.login.length == 0){
        setInvalidCredentials('Invalid credentials, please try again');
      }
      else{
        const ID = response.data.login.ID,
              ID_EXT = response.data.login.ID_EXT;

        
        if(ID == null){
          setInvalidCredentials('Invalid credentials, please try again');
          return;
        }

        document.cookie = `ID=${ID}`;
        document.cookie = `ID_EXT=${ID_EXT}`;
        window.location.href = '/home';
        setInvalidCredentials('');
      }
  }

  /*if(getCookie('ID') !== undefined)
    window.location.href = '/login';*/

  return ( 

    <div className = "main-login" style ={{backgroundImage:`url(${Bgpic})`}}>
      <br/>
      <h1>Charity-Spot</h1>
      <div className ="login-contain">
        <div className="left-side">
          <div className='img-class'>
            <img src={CS} alt='' id='logo-img-id'/>
          </div>
          <form onSubmit={hanndlesubmit}>
          <p style={{color:"red"}}>{invalidCredentials}</p>
            <label htmlFor ='emil1' className='lgLabel'>Email</label>
              <input placeholder='Enter your email...' type ='email' id="emil1"  className='lgInput'
               value={emailval}
               onChange ={(e)=>{setEmailval(e.target.value)}}/>
            <label htmlFor ='pwd1'className='lgLabel'>Password</label>              
              <input placeholder='Enter password...' type ='password' id="pwd1"  className='lgInput'
              value={passval}
              onChange ={(e)=>{setPassval(e.target.value)}}
              /><br/>
            <button type='submit' id='sub_butt' >Log in</button>
          </form>
          <div className='foot'>
            <p>Dont have an account yet?<Link to ='/register' className='Link'> click to Register</Link></p>
          </div>
        </div>

        <div className="right-side">
          <div className='welcomeNote'>
            <h3 id='welid'>Welcome</h3>
          </div>

            <img src={Seallogin} alt='' id='wel-img-id'/>

        </div>        

      </div>
    </div>
  )
}

export default ClientLogin;