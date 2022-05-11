import styles from './client-login.module.css';

import React, {useState } from "react";

export interface ClientLoginProps {}

async function exampleAPICall(){

  const query = `query{
    InitStudent{
      Name
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

export function ClientLogin(props: ClientLoginProps) {

  const [name, setName] = useState("");
  const [sname, setSName] = useState("");

  const setText = (input: string) => {
    setName(input);
  }

  const handleSubmit = async() => {

    setSName("Welcome " + name + "!");

  }

  const handleSubmitDB = async() => {
    const response = JSON.parse(await exampleAPICall());

    let temp = "";

    for(let i=0; i<response.data.InitStudent.length; i++){
      temp = temp+ " " + response.data.InitStudent[i].Name;
    }

    setSName("The users in the database are: " + temp );
  }

  return (
    <div>
      <div>
        <h1>This is the Client Login Page</h1>

        <h3>Enter your username</h3>
        <input type="text" name="username" onChange={ (i) => setText(i.target.value)}></input><br></br>

        <input type="text" name="testname" onChange={ (i) => setText(i.target.value)}></input>

      </div><br></br>

      <div>
        <button onClick={handleSubmit}>Login</button>
      </div><br></br>

      <div>
        <button onClick={handleSubmitDB}>Show users in the database</button>
      </div>

      <h1>{sname}</h1>
    </div>
  );
}

export default ClientLogin;
