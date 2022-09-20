import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Seallogin from '../../../shared/assets/Seallogin.png';
import CS from '../../../shared/assets/CS.png';
import Bgpic from '../../../shared/assets/Bgpic.png';
import './login.css';
import { getCookie } from 'typescript-cookie';

import { host } from '../../../../../config'

async function APICall(email: string, password: string) {
  const query =
    `query{
    login(email: "` +
    email +
    `", password: "` +
    password +
    `",){
      ID
      ID_EXT
    }
  }`;

  console.log(query);

  let initial_students = '';

  await fetch(`http://${host.host}:3333/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query,
    }),
  })
    .then((r) => r.json())
    .then((data) => (initial_students = data));

  console.log(initial_students);

  return JSON.stringify(initial_students);
}

export function ClientLogin() {
  const [emailval, setEmailval] = useState('');
  const [passval, setPassval] = useState('');
  const [invalidCredentials, setInvalidCredentials] = useState('');

  const hanndlesubmit = async (event: { preventDefault: () => void }) => {
    (document.getElementById('loginDivM') as HTMLDivElement).style.display =
      'none';
    (document.getElementById('loginLoad') as HTMLDivElement).style.display =
      'block';

    event.preventDefault();
    setInvalidCredentials('');
    const response = JSON.parse(await APICall(emailval, passval));

    if (response.data != null) {
      const ID = response.data.login.ID;
      const ID_EXT = response.data.login.ID_EXT;

      document.cookie = `ID=${ID}`;
      document.cookie = `ID_EXT=${ID_EXT}`;
      window.location.href = '/home';
      setInvalidCredentials('');
    } else {
      setInvalidCredentials('Invalid login, please try again');
      (document.getElementById('loginDivM') as HTMLDivElement).style.display =
        'block';
      (document.getElementById('loginLoad') as HTMLDivElement).style.display =
        'none';
    }
  };

  return (
    <div className="main-login" style={{ backgroundImage: `url(${Bgpic})` }}>
      <br />
      <h1>Charity-Spot</h1>
      <div className="login-contain">
        <div className="left-side">
          <div id="loginDivM">
            <div className="img-class">
              <img src={CS} alt="" id="logo-img-id" />
            </div>
            <form onSubmit={hanndlesubmit}>
              <p style={{ color: 'red' }}>{invalidCredentials}</p>
              <label htmlFor="emil1" className="lgLabel">
                Email
              </label>
              <input
                placeholder="Enter your email..."
                type="email"
                id="emil1"
                className="lgInput"
                value={emailval}
                onChange={(e) => {
                  setEmailval(e.target.value);
                }}
              />
              <label htmlFor="pwd1" className="lgLabel">
                Password
              </label>
              <input
                placeholder="Enter password..."
                type="password"
                id="pwd1"
                className="lgInput"
                value={passval}
                onChange={(e) => {
                  setPassval(e.target.value);
                }}
              />
              <br />
              <button type="submit" id="sub_butt">
                Log in
              </button>
            </form>
            <div className="foot">
              <p>
                Dont have an account yet?
                <Link to="/register" className="Link">
                  {' '}
                  click to Register
                </Link>
              </p>
            </div>
          </div>

          <div className="loader" id="loginLoad"></div>
        </div>

        

        <div className="right-side">
          <div className="welcomeNote">
            <h3 id="welid">Welcome</h3>
          </div>

          <img src={Seallogin} alt="" id="wel-img-id" />
        </div>
      </div>
    </div>
  );
}

export default ClientLogin;
