import React,{useState} from 'react';
import {Link} from 'react-router-dom';

//import Seallogin from '../assets/Seallogin.png';
//import CS from '../assets/CS.png';
//import Bgpic from '../assets/Bgpic.png'

import Seallogin from '../../../shared/assets/Seallogin.png'
import CS from '../../../shared/assets/CS.png'
import Bgpic from '../../../shared/assets/Bgpic.png'
import './login.css'

import { useNavigate } from "react-router-dom";


async function APICall(email: string, password: string){

  const query = `query{
    LoginUser(email: "`+email+`", password: "`+password+`",){
      Name,
      UserID
    }
  }`;

  //console.log(query);
    
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

  const hanndlesubmit = async(event: { preventDefault: () => void; }) =>{
      event.preventDefault();
      
      const response = JSON.parse(await APICall(emailval, passval));

      if(response.data.LoginUser.length == 0){
        alert("Invalid credentials");
      }
      else{
        let userID = response.data.LoginUser[0].UserID;
        document.cookie = "username="+userID;
        window.location.href = '/'
        console.log(response.data.LoginUser);
      }

      
  }

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
            <label htmlFor ='emil1' className='lgLabel'>Email</label>
              <input placeholder='Enter your email...' type ='email' id="emil1"  className='lgInput'
               value={emailval}
               onChange ={(e)=>{setEmailval(e.target.value)}}/>
            <label htmlFor ='pwd1'className='lgLabel'>Password</label>              
              <input placeholder='Enter password...' type ='password' id="pwd1"  className='lgInput'
              value={passval}
              onChange ={(e)=>{setPassval(e.target.value)}}
              /><br/>
              <button type='submit' id='sub_butt'>Log in</button>
          </form>
          <div className='foot'>
            <p>Dont have an account yet?<Link to ='/register' className='Link'> click to Register</Link></p>
          </div>
        </div>

        <div className="right-side">
          <div className='welcomeNote'>
            <h3 id='welid'>Welcome back,</h3>
          </div>

            <img src={Seallogin} alt='' id='wel-img-id'/>

        </div>        

      </div>
    </div>
  )
}

export default ClientLogin;