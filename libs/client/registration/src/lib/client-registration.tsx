import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Countdown from "react-countdown";

import Sealregister from '../../../shared/assets/Sealregister.png';
import CS from '../../../shared/assets/CS.png';
import Bgpic from '../../../shared/assets/Bgpic.png';


import { host } from '../../../../../config'

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  storage,
  randomStringGenerator,
} from 'libs/api/shared/services/prisma/src/lib/FirebaseRepository.repository';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import './register.css';

import { ModalMap } from './modal-map';

import {
	MDBCard,
	MDBCardHeader,
	MDBCardBody,
	MDBCardTitle,
	MDBCardText,
	MDBCardFooter,
	MDBBtn,
  MDBInput
  } from 'mdb-react-ui-kit';

async function APICall(
  orgName: string,
  email: string,
  location: string,
  password: string,
  whois: string,
  profilePicture: string
) {
  let query = null;

  switch (whois) {
    case 'NEED':
      query = `query {
        clientRegist(
          Name:"${orgName}",
          Email: "${email}",
          Location: "${location}",
          Password: "${password}",
          picture: "${profilePicture}"
        ){
          ID_internal
          ID_external
        }
      }`;
      break;
    case 'ASSIST':
      query = `query {
        orgRegist(
          OrgName:"${orgName}",
          OrgEmail: "${email}",
          OrgLocation: "${location}",
          OrgPassword: "${password}",
          OrgPicture: "${profilePicture}"
        ){
          ID_internal
          ID_external
        }
      }`;
      break;

    default:
      query = '';
  }

  let All_data = '';

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
    .then((data) => (All_data = data));

  return JSON.stringify(All_data);
}

async function validate(_incoming: string, what: string) {
  let query = '';

  switch(what) {
    case 'email':
      query = `
        query {
          validateEmail(email: "${_incoming}")
        }
      `;
      break;
    case 'code':
      query = `
        query {
          checkCode(code: "${_incoming}")
        }
      `;
      break;
  }

  let result = '';

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
    .then((data) => (result = data));

  return JSON.stringify(result);
}

export function Register() {
  const [show, setShow] = useState(false);

  //email modal
  const [successEmail, setSuccessEmail] = useState(false);
  const [problem, setProblem] = useState('');
  const [wrongCode, setWrongCode] = useState(false);
  const [emailValidation, setEmailvalidation] = useState(false);
  const [userCode, setUserCode] = useState(''); 
  //end of email modal

  const [location, setLocation] = useState({ lat: -26.195246, lng: 28.034088 });

  const [typeval, setTypeval] = useState('ASSIST');
  const [nameval, setNameval] = useState('');
  const [emailval, setEmailval] = useState('');
  //const [Locationval,setLocationval] = useState('');
  const [passval, setPassval] = useState('');
  const [confpassval, setConfPassval] = useState('');
  const [invalidCredentials, setInvalidCredentials] = useState('');

  const [imageUpload, setImageUpload] = useState<File>();
  const [imageURL, setImageURL] = useState('');

  async function uploadProfilePicture(pp: File) {
    if (pp) {
      const reference = ref(
        storage,
        `profilePictures/${(await randomStringGenerator()) + '_pp_' + pp.name}`
      );
      await uploadBytes(reference, pp);
      const downloadLink = await getDownloadURL(reference);

      return downloadLink;
    }

    return null;
  }

  const renderer = ({ minutes, seconds, completed }: {minutes: number, seconds: number, completed: boolean}) => {
    if (completed) {
        const blur = document.getElementById('main');
        if(blur != null) {
        blur.classList.toggle('active');
        }
        setEmailvalidation(false);
        setInvalidCredentials("Either we could not reach your email address or You could not enter the code in time. Please reload the page");

        return;
    } else {
      return (
        <span>
          {minutes<10?`0`+minutes:minutes} : {seconds<10?`0`+seconds:seconds}
        </span>
      );
    }
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setInvalidCredentials('');

    let profilePictureLink = '';

    if (imageUpload) {
      profilePictureLink = `${await uploadProfilePicture(imageUpload)}`;
      setImageURL(profilePictureLink);
    }

    if (
      nameval === '' ||
      emailval === '' ||
      passval === '' ||
      confpassval === ''
    ) {
      setInvalidCredentials('Fields may not be empty');

      (
        document.getElementById('registerDivM') as HTMLDivElement
      ).style.display = 'block';
      (
        document.getElementById('registerLoad') as HTMLDivElement
      ).style.display = 'none';
      return;
    }

    if (passval !== confpassval) {
      setInvalidCredentials('Passwords do not match');

      (
        document.getElementById('registerDivM') as HTMLDivElement
      ).style.display = 'block';
      (
        document.getElementById('registerLoad') as HTMLDivElement
      ).style.display = 'none';

      return;
    }

    if (location.lat === -26.195246 && location.lng === 28.034088) {
      setInvalidCredentials('Location not selected');

      (
        document.getElementById('registerDivM') as HTMLDivElement
      ).style.display = 'block';
      (
        document.getElementById('registerLoad') as HTMLDivElement
      ).style.display = 'none';

      return;
    }

    //send email to user
    const response = JSON.parse(
      await validate(emailval, 'email')
    );

    if(response.data.validateEmail) {
      console.log("Verification Code Is Sent");
    } else {
      console.log("Email Verification Failed");
      setInvalidCredentials("Email provided could not be reached");
      return;
    }

    const blur = document.getElementById('main');
    if(blur != null) {
      blur.classList.toggle('active');
    }
    setEmailvalidation(true);
    return;
  }

  const checkCode = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    //check the code
    let response = JSON.parse(
      await validate(userCode, 'code')
    );

    if(response.data.checkCode) {
      setSuccessEmail(true);
      await new Promise(resolve => setTimeout(resolve, 5000));

      const blur = document.getElementById('main');
      if(blur != null) {
        blur.classList.toggle('active');
      }
      setEmailvalidation(false);

      (document.getElementById('registerDivM') as HTMLDivElement).style.display =
        'none';
      (document.getElementById('registerLoad') as HTMLDivElement).style.display =
        'block';

      response = JSON.parse(
        await APICall(
          nameval,
          emailval,
          `${location.lat},${location.lng}`,
          passval,
          typeval,
          imageURL
        )
      );

      if (response.data == null) { 
        //remove the loading
        setInvalidCredentials('Email provided already exists');

        (
          document.getElementById('registerDivM') as HTMLDivElement
        ).style.display = 'block';
        (
          document.getElementById('registerLoad') as HTMLDivElement
        ).style.display = 'none';

        return;
      } else {
        window.location.href = '/login';
      }
  
      setInvalidCredentials('');


    } else {
      setWrongCode(true);
      setProblem("Code provide is incorrect - Please check the code again");
      return;
    }

  }

  const pushtoapi = async () => {
    //
  };

  return (
    <>
      <div id="main" className="main-register" style={{ backgroundImage: `url(${Bgpic})` }}>
        <br />
        <h1>Charity-Spot</h1>
        <div className="register-contain">
          <div className="rgleft-side">
            <div id="registerDivM">
              <div className="rgimg-class">
                <img src={CS} alt="" id="rglogo-img-id" />
              </div>
              <form onSubmit={handleSubmit}>
                <p style={{ color: 'red' }}>{invalidCredentials}</p>

                <label htmlFor="rgorgnm1" className="rglabel">
                  How would you like to use Charity Spot?
                </label>
                <select
                  name="orgs"
                  id="rgorgnm1"
                  value={typeval}
                  onChange={(e) => {
                    setTypeval(e.target.value);
                  }}
                  className="rgSelect"
                >
                  <option value="ASSIST">Willing to assist</option>
                  <option value="NEED">In Need</option>
                </select>

                <label htmlFor="rgorgnm2" className="rglabel">
                  Profile Name
                </label>
                <input
                  placeholder="Profile Name"
                  type="text"
                  id="rgorgnm2"
                  className="rgInput"
                  value={nameval}
                  onChange={(e) => {
                    setNameval(e.target.value);
                  }}
                />

                <label htmlFor="emil1" className="rglabel">
                  Email
                </label>
                <input
                  placeholder="Enter your email..."
                  type="email"
                  id="emil1"
                  className="rgInput"
                  value={emailval}
                  onChange={(e) => {
                    setEmailval(e.target.value);
                  }}
                />

                <label htmlFor="lct11" className="rglabel">
                  Location
                </label>
                {/*<input placeholder='Enter your location...' type ='text' id="lct1"  className='rgInput'
                value={Locationval}
                  onChange ={(e)=>{setLocationval(e.target.value)}}/>*/}
                <button
                  type="button"
                  className="custom-file-upload"
                  onClick={() => {
                    setTimeout(() => setShow(true), 100);
                  }}
                >
                  Select your location
                </button>

                <label htmlFor="pimg1" className="rglabel">
                  Profile Picture
                </label>
                <br />
                <label htmlFor="file-upload" className="custom-file-upload">
                  Select Image
                </label>

                <input
                  type="file"
                  id="file-upload"
                  onChange={(e) => {
                    if (!e.target.files) return;
                    setImageUpload(e.target.files[0]);
                  }}
                />

                <label htmlFor="rgpwd1" className="rglabel">
                  Password
                </label>
                <input
                  placeholder="Enter password..."
                  type="password"
                  id="rgpwd1"
                  className="rgInput"
                  value={passval}
                  onChange={(e) => {
                    setPassval(e.target.value);
                  }}
                />

                <label htmlFor="rgpwd2" className="rglabel">
                  Confirm Password
                </label>
                <input
                  placeholder="Confirm password..."
                  type="password"
                  id="rgpwd2"
                  className="rgInput"
                  value={confpassval}
                  onChange={(e) => {
                    setConfPassval(e.target.value);
                  }}
                />

                <br />

                <button type="submit" id="rgsub_butt">
                  Register
                </button>
              </form>

              <div className="rgfoot">
                <p>
                  Already have an account?
                  <Link to="/login" className="rgLink">
                    {' '}
                    click to Login
                  </Link>
                </p>
                {/*<p style={{color:"red"}}>{invalidCredentials}</p>*/}
              </div>
            </div>
            <div className="loader" id="registerLoad"></div>
          </div>

          

          <div className="rgright-side">
            <div className="welcomeNote">
              <h3 id="welid">New here? welcome.</h3>
            </div>

            <img src={Sealregister} alt="" id="rgwel-img-id" />
          </div>
        </div>

        <ModalMap inState={[show, setShow, setLocation, location]}></ModalMap>
      </div>

      {
        emailValidation && 
        <div className="email-modal">
          <div className="email-modal-content">
            <MDBCard alignment='center'>
            <MDBCardHeader>Email Verification</MDBCardHeader>
            {!successEmail && <MDBCardBody>
              {!wrongCode && <MDBCardTitle>Please enter the requested code</MDBCardTitle>}
              {wrongCode && <MDBCardTitle>{problem}</MDBCardTitle>}
              <MDBCardText>
                 <MDBInput label='' id='emailcodeinput' type='text' style={{width: "50%", margin: "auto", textAlign: "center"}}
                  onChange={(e)=>{
                    setUserCode(e.target.value);
                  }}
                />
              </MDBCardText>
              <MDBBtn onClick={checkCode}>Check Code</MDBBtn>
            </MDBCardBody>}
            <MDBCardFooter>
              {!successEmail && <Countdown date={Date.now() + 60000 * 5} renderer={renderer} />}
              {successEmail && <MDBCardText>SUCCESSFUL</MDBCardText>}
            </MDBCardFooter>
            </MDBCard>			
          </div>
        </div>
      }
    </>
  );
}

export default Register;
