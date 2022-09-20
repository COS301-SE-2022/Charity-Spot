import React, { useState, useEffect } from 'react';
import './profile.css';
import userprofile from '../../../shared/assets/userprofile.png';

import 'react-tabs/style/react-tabs.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUserAlt, FaEdit, FaPen, FaHistory, FaListAlt } from 'react-icons/fa';

import ListGroup from 'react-bootstrap/esm/ListGroup';

import { ModalMap } from './modal-map';

import { getCookie, setCookie, removeCookie } from 'typescript-cookie';
import { Link } from 'react-router-dom';

import ItemHistory from './item-history';

import CommentBlock from './commentBlock';


import { storage, randomStringGenerator } from 'libs/api/shared/services/prisma/src/lib/FirebaseRepository.repository';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'



const IdCookie = getCookie('ID');

async function APICall(usrID: string) {
  const query = `query {
    OrgProfile(userID:"${usrID}"){
      Email
      Name
      Date
      Location
      Picture
      Internal
      AvgRating
      Description
    }
  }`;

  let All_data = '';

  console.log(query);

  await fetch('http://localhost:3333/graphql', {
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

  console.log(All_data);

  return JSON.stringify(All_data);
}

//EDIT_PAGE
async function API_EDIT_Call(
  id: any,
  orgName: string,
  loc: string,
  picture: string,
  password: string,
  description: string,
  email: string
) {
  const query = `query{
    OrgEditProfile(
      id: "${id}",
      orgName: "${orgName}",
      loc: "${loc}",
      picture: "${picture}",
      password: "${password}",
      description: "${description}",
      email: "${email}"
    ) {
      Email
      Name
      Date
      Location
      Picture
    }
  }`;

  let act_data = undefined;

  console.log("testtt");

  await fetch('http://localhost:3333/graphql', {
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
    .then((data) => (act_data = data));
}

/*

query{
  getAllProfInfo(id :""){
    Clients
    ClientNames
    Ratings
    Comments
    Avg
  }
}

*/

async function commentRatingAPICall(comment: any, rating: any) {
  let ID = getCookie('ID');
  let foreignID = getCookie('foreignID');

  console.log(ID);
  console.log(foreignID);

  const query = `query{
    addCommentRating(
      assist_id: "${foreignID}",
      need_id: "${ID}",
      comment: "${comment}",
      rating: ${rating}
    ) {
      AssistID
    }
    }`;

  let act_data = undefined;

  await fetch('http://localhost:3333/graphql', {
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
    .then((data) => (act_data = data));

  console.log(act_data);
}

async function getType(usrID: string) {
  const query = `query {
    OrgProfile(userID:"${usrID}"){
      Internal
    }
  }`;

  let All_data = '';

  await fetch('http://localhost:3333/graphql', {
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

  let val = JSON.parse(JSON.stringify(All_data));

  return val.data.OrgProfile.Internal;
}

async function uploadProfilePicture(pp: File) {
  if(pp) {
    const reference = ref(storage, `profilePictures/${await randomStringGenerator() + '_pp_' + pp.name}`);
    await uploadBytes(reference, pp);
    const downloadLink = await getDownloadURL(reference);

    return downloadLink;
  }

  return null;
}

export function Profile() {
  const [show, setShow] = useState(false);

  //const [location, setLocation] = useState({ lat: -26.195246, lng: 28.034088 });

  const [OEmail, setOEmail] = useState('');
  const [OName, setOName] = useState('');
  const [ODate, setODate] = useState('');
  const [OLocation, setOLocation] = useState('');
  const [OPicture, setOPicture] = useState('');
  const [ODesc, setODesc] = useState('');

  const [imageUpload, setImageUpload] = useState<File>();
  const [imageURL, setImageURL] = useState('');


  
  const [NewOName, setNewOName] = useState('undefined');
  const [NewOLocation, setNewOLocation] = useState({
    lat: -26.195246,
    lng: 28.034088,
  });
  const [NewOPass, setNewOPass] = useState('undefined');
  const [NewOPassC, setNewOPassC] = useState('undefined');
  const [NewDesc, setNewDesc] = useState('undefined');
  //const [NewPicture,setNewOPicture] = useState('');

  const [editView, setEditView] = useState(false);
  const [delButton, setdelButton] = useState(false);
  const [chatButton, setchatButton] = useState(false);
  const [commentSect, setcommentSect] = useState(false);
  const [navBarView, setnavBarView] = useState(false);

  const [commentRate, setCommentRate] = useState(1);
  const [comment, setComment] = useState('');

  const [avgRating, setAvgRating] = useState(new Array(5).fill(false));
  const [avgRNum, setAvgRNum] = useState(0);

  const [commentState, setCommentState] = useState(0);

  const [invalidUpdate, setInvalidUpate] = useState('');

  const hanndlesubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    removeCookie('ID');
    window.location.href = '/login';
  };

  const handlesubmitComment = async (event: any) => {
    event.preventDefault();

    (document.getElementById('commentForm') as HTMLFormElement).reset();

    await commentRatingAPICall(comment, commentRate).then(() => {
      setCommentState(commentState + 1);
    });
  };

  const handlesumbitUpdate = async () => {
    setInvalidUpate("");

    (document.getElementById('editLeftDiv') as HTMLDivElement).style.display =
      'none';
    (document.getElementById('editRightDiv') as HTMLDivElement).style.display =
      'none';
    (document.getElementById('editLoad') as HTMLDivElement).style.display =
      'block';

    let Locationval = 'undefined';

    if (!(NewOLocation.lat == -26.195246 && NewOLocation.lng == 28.034088)) {
      Locationval = NewOLocation.lat + ',' + NewOLocation.lng;
    }

    if (NewOPass != NewOPassC) {
      setInvalidUpate("Passwords do not match");

      (document.getElementById('editLeftDiv') as HTMLDivElement).style.display =
      'block';
      (document.getElementById('editRightDiv') as HTMLDivElement).style.display =
      'block';
      (document.getElementById('editLoad') as HTMLDivElement).style.display =
      'none';
      return;
    }

    let profilePictureLink = 'undefined';

    if(imageUpload){
      profilePictureLink = `${await uploadProfilePicture(imageUpload)}`;
    }

    console.log(profilePictureLink);

    if (
      NewOName == 'undefined' &&
      Locationval == 'undefined' &&
      NewOPass == 'undefined' &&
      NewOPassC == 'undefined' &&
      NewDesc == 'undefined' &&
      profilePictureLink == 'undefined'
    ) {

      (document.getElementById('editLeftDiv') as HTMLDivElement).style.display =
        'block';
      (
        document.getElementById('editRightDiv') as HTMLDivElement
      ).style.display = 'block';
      (document.getElementById('editLoad') as HTMLDivElement).style.display =
        'none';

      return;
    }

    await API_EDIT_Call(
      IdCookie,
      NewOName,
      Locationval,
      profilePictureLink,
      NewOPass,
      NewDesc,
      OEmail
    ).then(() => {
      setCommentState(commentState + 1);

      setImageUpload(undefined);
      setImageURL('');

      (document.getElementById('editLeftDiv') as HTMLDivElement).style.display =
        'block';
      (
        document.getElementById('editRightDiv') as HTMLDivElement
      ).style.display = 'block';
      (document.getElementById('editLoad') as HTMLDivElement).style.display =
        'none';

      setNewOName('undefined');
      setNewOPass('undefined');
      setNewOPassC('undefined');
      setNewDesc('undefined');
      setNewOLocation({
        lat: -26.195246,
        lng: 28.034088 });

    });

    (document.getElementById('edit-Form') as HTMLFormElement).reset();
    (document.getElementById('nDesc') as HTMLInputElement).value = '';
  };

  const displayData = async () => {
    let foreignType = 'none';

    if (IdCookie != undefined) {
      const foreinCookie = getCookie('foreignID');
      let response = null;

      if (foreinCookie != undefined) {
        foreignType = await getType(foreinCookie);
      }

      if (foreinCookie != undefined) {
        if (foreinCookie != IdCookie) {
          setEditView(false);
        } else {
          setEditView(true);
        }
        response = JSON.parse(await APICall(foreinCookie));
      } else {
        setEditView(true);
        response = JSON.parse(await APICall(IdCookie));
      }

      const allData = response.data.OrgProfile;

      const { Email, Name, Date, Location, Picture, Internal, Description } =
        allData;

      setOName(Name);
      setOEmail(Email);
      setODate(Date);
      setOLocation(Location);
      setOPicture(Picture);
      setODesc(Description);

      let rating = new Array(5).fill(false);
      rating[allData.AvgRating - 1] = true;
      setAvgRating(rating);
      setAvgRNum(allData.AvgRating);

      let currType = getCookie('ID_EXT');

      if (foreignType == 'none') {
        setdelButton(false);
        setchatButton(false);
        setcommentSect(false);

        setnavBarView(true);
      } else {
        if (currType == 'ASSIST' && foreignType == 'NEED') {
          setdelButton(true);
          setchatButton(true);
          setcommentSect(true);

          setnavBarView(false);
        } else if (currType == 'ASSIST' && foreignType == 'ASSIST') {
          setdelButton(false);
          setchatButton(false);
          setcommentSect(false);

          setnavBarView(true);
        }
        if (currType == 'NEED' && foreignType == 'NEED') {
          setdelButton(false);
          setchatButton(false);
          setcommentSect(false);

          setnavBarView(false);
        }
        if (currType == 'NEED' && foreignType == 'ASSIST') {
          setdelButton(false);
          setchatButton(true);
          setcommentSect(true);

          setnavBarView(true);
        }
      }
    }
  };

  const handleEditProfilePicture = async (pic: File) => {
    setImageUpload(pic);

    const reference = ref(storage, `profilePictures/${await randomStringGenerator() + '_pp_' + pic.name}`);
    await uploadBytes(reference, pic);
    const downloadLink = await getDownloadURL(reference);

    console.log("eee");
    console.log(downloadLink);

    setOPicture(downloadLink);
  }

  useEffect(() => {
    setEditView(true);
    displayData();
  }, [commentState]);

  return (
    <div>
      <div className="wrapperProfile">
        <br />
        <br />
        <input
          type="radio"
          name="sliderProf"
          id="profTab"
          defaultChecked
        ></input>
        <input type="radio" name="sliderProf" id="blog"></input>
        <input type="radio" name="sliderProf" id="items"></input>
        {navBarView && (
          <nav>
            <label htmlFor="profTab" className="profTab">
              <FaUserAlt /> Profile{' '}
            </label>
            {editView && (
              <label htmlFor="blog" className="blog">
                {' '}
                <FaEdit /> Edit{' '}
              </label>
            )}
            {!editView && (
              <label htmlFor="blog" className="blog">
                {' '}
                <FaListAlt /> Items{' '}
              </label>
            )}
            <div className="sliderProf"></div>
          </nav>
        )}
        <section>
          <div className="content content-1">
            <div className="title">
              <h1>{OName}</h1>
            </div>

            <div className="profile-main">
              <div className="user-left">
                <div className="prof-pic">
                  <img
                    src={OPicture}
                    alt=""
                    id="profile-pic"
                  ></img>
                </div>
                <h3 className="headings">About Us</h3>
                <div className="cover3">
                  <p>{ODesc}</p>
                </div>
                <h3 className="headings">Reviews</h3>
                <div className="pcomments">
                  {commentSect && (
                    <div className="pcomment">
                      <b>
                        <p>Leave a review!</p>
                      </b>

                      <form id="commentForm" onSubmit={handlesubmitComment}>
                        <input
                          type="text"
                          placeholder="comment"
                          id ="commenter"
                          onChange={(e) => {
                            setComment(e.target.value);
                          }}
                        ></input>

                        <div className="rated">
                          <input
                            type="radio"
                            id="star55"
                            name="rate33"
                            value="5"
                            onClick={() => {
                              setCommentRate(5);
                            }}
                          />
                          <label htmlFor="star55" title="text"></label>
                          <input
                            type="radio"
                            id="star44"
                            name="rate33"
                            value="4"
                            onClick={() => {
                              setCommentRate(4);
                            }}
                          />
                          <label htmlFor="star44" title="text"></label>
                          <input
                            type="radio"
                            id="star33"
                            name="rate33"
                            value="3"
                            onClick={() => {
                              setCommentRate(3);
                            }}
                          />
                          <label htmlFor="star33" title="text"></label>
                          <input
                            type="radio"
                            id="star22"
                            name="rate33"
                            value="2"
                            onClick={() => {
                              setCommentRate(2);
                            }}
                          />
                          <label htmlFor="star22" title="text"></label>
                          <input
                            type="radio"
                            id="star11"
                            name="rate33"
                            value="1"
                            onClick={() => {
                              setCommentRate(1);
                            }}
                          />
                          <label htmlFor="star11" title="text"></label>
                        </div>

                        <button type="submit" id="upt_but">
                          Submit Review
                        </button>

                        <br />
                        <br />
                      </form>
                    </div>
                  )}
                </div>

                <CommentBlock state={commentState}></CommentBlock>
              </div>

              <div className="user-right">
                <br />
                <br />

                <div className="cover">Name: {OName}</div>
                <div className="cover">Email: {OEmail}</div>
                <div className="cover">Date Registered: {ODate}</div>
                <div className="cover">Location: {OLocation}</div>

                <div className="cover2">
                  <p>Average Rating {avgRNum}</p>
                  <div className="rate">
                    <input
                      type="radio"
                      id="star5"
                      name="rate1"
                      value="5"
                      disabled
                      checked={avgRating[4]}
                    />
                    <label htmlFor="star5" title="text"></label>
                    <input
                      type="radio"
                      id="star4"
                      name="rate1"
                      value="4"
                      disabled
                      checked={avgRating[3]}
                    />
                    <label htmlFor="star4" title="text"></label>
                    <input
                      type="radio"
                      id="star3"
                      name="rate1"
                      value="3"
                      disabled
                      checked={avgRating[2]}
                    />
                    <label htmlFor="star3" title="text"></label>
                    <input
                      type="radio"
                      id="star2"
                      name="rate1"
                      value="2"
                      disabled
                      checked={avgRating[1]}
                    />
                    <label htmlFor="star2" title="text"></label>
                    <input
                      type="radio"
                      id="star1"
                      name="rate1"
                      value="1"
                      disabled
                      checked={avgRating[0]}
                    />
                    <label htmlFor="star1" title="text"></label>
                  </div>
                </div>

                {chatButton && (
                  <Link to="/chat" className="rgLink">
                    <button type="submit" id="chatGo">
                      Chat
                    </button>
                  </Link>
                )}
                {delButton && (
                  <Link to="/scheduleDelivery" className="rgLink">
                    <button type="submit" id="delivGo">
                      Donate
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {editView && (
            <div className="content content-2">
              <p style={{ color: 'red' }}>{invalidUpdate}</p>
              <div className="editor-main">
                {/*<div className="editor-left" id="editLeftDiv">
                  <label className="rglabel">
                    Upload a new profile picture:
                  </label>
                  <br />
                  <br />
                  <br />
                  <div className="edit-pic">
                    <img src={userprofile} alt="" id="editor-pic" />
                  </div>
                  <label className="rglabel">Update your description:</label>
                  <textarea
                    id="nDesc"
                    onChange={(e) => {
                      setNewDesc(e.target.value);
                    }}
                  ></textarea>
                  <input
                    id="upt_but"
                    type="submit"
                    value="Update Profile"
                    onClick={(e) => {
                      e.preventDefault();
                      handlesumbitUpdate();
                    }}
                  />{' '}
                  <FaPen color="transparent" />
                  </div>*/}
                <div className="editor-right" id="editRightDiv">
                  <label className="rglabel">
                    {/* <b>Only Enter the fields you would like to update:</b> */}
                  </label>
                  <br />
                  <br />
                  <br />
                  <div className="updater">
                    <form id="edit-Form">
                      <div className="user-box1">
                        <label className="rglabel">Update Name</label>
                        <input
                          className="in1"
                          type="text"
                          placeholder=" Name"
                          defaultValue={OName}
                          onChange={(e) => {
                            setNewOName(e.target.value);
                          }}
                        ></input>
                        <FaPen color="#1458b3" />
                      </div>

                      <div className="user-box2">
                        <label className="rglabel">Update Location</label>
                        <button
                          type="button"
                          id="locButton"
                          className="custom-file-upload"
                          onClick={() => {
                            setTimeout(() => setShow(true), 100);
                          }}
                        >
                          Select your location
                        </button>
                      </div>

                      <div className="user-box3">
                        <label className="rglabel">Update Password</label>
                        <input
                          className="in4"
                          type="password"
                          placeholder=" Password"
                          defaultValue=""
                          onChange={(e) => {
                            setNewOPass(e.target.value);
                          }}
                        ></input>
                        <FaPen color="#1458b3" />
                      </div>

                      <div className="user-box4">
                        <label className="rglabel">Confirm Updated Password</label>
                        <input
                          className="in5"
                          type="password"
                          placeholder=" Confirm Password"
                          onChange={(e) => {
                            setNewOPassC(e.target.value);
                          }}
                        ></input>
                        <FaPen color="#1458b3" />
                      </div>
                    </form>
                  </div>
                </div>

                <div className="editor-left" id="editLeftDiv">
                  <div className="edit_Picture">
                    <label className="rglabel">
                      {/* Upload a new profile picture: */}
                    </label>

                    <img src={imageURL} alt="" id="editor-pic" />
                    
                    <label htmlFor="file-upload" className="custom-file-upload">
                      Select Image
                    </label>

                    <input type="file"
                      id="file-upload"
                      /*onChange={(e) => {
                        if(!e.target.files) return;
                        handleEditProfilePicture(e.target.files[0]);
                      }}
                      /*onChange={(e) => {
                        if(!e.target.files) return;
                        setImageUpload(e.target.files[0]);
                      }}*/

                      onChange={(e) => {

                        if(!e.target.files) return;
                        setImageUpload(e.target.files[0])
                        setImageURL(URL.createObjectURL(e.target.files[0]));

                      }}
                    /> 


                  </div>
                  <label className="rglabel">Update your description:</label>
                  <textarea
                    id="nDesc"
                    onChange={(e) => {
                      setNewDesc(e.target.value);
                    }}
                  ></textarea>
                  <input
                    id="upt_but"
                    type="submit"
                    value="Update Profile"
                    onClick={(e) => {
                      e.preventDefault();
                      handlesumbitUpdate();
                    }}
                  />{' '}
                  <FaPen color="transparent" />
                </div>

                <div id="editLoad" className="loader"></div>
              </div>

              <ModalMap
                inState={[show, setShow, setNewOLocation, NewOLocation]}
              ></ModalMap>
            </div>
          )}

          {!editView && (
            <div className="content content-2">
              <ItemHistory></ItemHistory>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Profile;
