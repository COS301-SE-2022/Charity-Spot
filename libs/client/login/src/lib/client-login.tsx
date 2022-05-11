// import styles from './client-login.module.css';

// import React, {useState } from "react";

// export interface ClientLoginProps {}

// async function exampleAPICall(){

//   const query = `query{
//     InitStudent{
//       Name
//     }
//   }`;

//   let initial_students = "";

//   await fetch('http://localhost:3333/graphql', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//         },
//         body: JSON.stringify({
//           query
//         })
//       }).then(r => r.json()).then(data => 
//             initial_students = data
//         );

//     return JSON.stringify(initial_students);
// }

// export function ClientLogin(props: ClientLoginProps) {

//   const [name, setName] = useState("");
//   const [sname, setSName] = useState("");

//   const setText = (input: string) => {
//     setName(input);
//   }

//   const handleSubmit = async() => {

//     setSName("Welcome " + name + "!");

//   }

//   const handleSubmitDB = async() => {
//     const response = JSON.parse(await exampleAPICall());

//     let temp = "";

//     for(let i=0; i<response.data.InitStudent.length; i++){
//       temp = temp+ " " + response.data.InitStudent[i].Name;
//     }

//     setSName("The users in the database are: " + temp );
//   }

//   return (
//     <div>
//       <div>
//         <h1>This is the Client Login Page</h1>

//         <h3>Enter your username</h3>
//         <input type="text" onChange={ (i) => setText(i.target.value)}></input>

//       </div><br></br>

//       <div>
//         <button onClick={handleSubmit}>Login</button>
//       </div><br></br>

//       <div>
//         <button onClick={handleSubmitDB}>Show users in the database</button>
//       </div>

//       <h1>{sname}</h1>
//     </div>
//   );
// }

// export default ClientLogin;


import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import Seallogin from '../assets/Seallogin.png';
import CS from '../assets/CS.png';
import Bgpic from '../assets/Bgpic.png'
import '../styles/login.css';

function ClientLogin() {
  
  const [emailval,setEmailval] = useState('');
  const [passval,setPassval] = useState('');
  const hanndlesubmit = (event: { preventDefault: () => void; }) =>{
      event.preventDefault();
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

export default ClientLogin