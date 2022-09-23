import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Navigation from './Navigation';
import {useEffect} from 'react'

import {ClientLogin} from '@charity-spot/client/login';
import {Register} from '@charity-spot/client/registration';
import {Profile} from '@charity-spot/client/organisation-profile';
import {Home} from '@charity-spot/client/home';
import {ClientDonate} from '@charity-spot/client/donate';
import {ClientChat} from '@charity-spot/client/chat';
import {ClientScheduleDelivery} from '@charity-spot/client/schedule-delivery'
import {ClientItemRequest} from '@charity-spot/client/item-request'
import {ClientItemRequestResults} from '@charity-spot/client/item-request-results'
import {ClientChatHistory} from '@charity-spot/client/chat-history'
import {ClientDeliveryScheduleInfo} from '@charity-spot/client/delivery-schedule-info'
import {ClientNotification} from '@charity-spot/client/notification'

import { Navigate } from 'react-router-dom';

import { getCookie } from 'typescript-cookie'

function App() {

  function checkIfUserLogIn(){

    const ID = getCookie('ID');

    if(ID == undefined){
      return false;
    }

    return true;
  }

  
  return (
    <div className="App">
      {/*<LoadScript googleMapsApiKey = {APIKEYS.GoogleMapsAPIKey}>*/}
      <Router>
      <Navigation/>
        <Routes>
          <Route path ="/" element = {<ClientLogin/>} />
          <Route path = "/login" element = {<ClientLogin/>}/>
          <Route path = "/register" element ={<Register/>}/>
          <Route path = "/profile" element ={checkIfUserLogIn() ?<Profile/> : <Navigate replace to={'/login'}/>}/>
          <Route path = "/home" element ={checkIfUserLogIn() ?<Home/> : <Navigate replace to={'/login'}/>}/>
          <Route path = "/donate" element = {checkIfUserLogIn() ?<ClientDonate/> : <Navigate replace to={'/login'}/>}/>
          <Route path = "/chat" element = {checkIfUserLogIn() ?<ClientChat/> : <Navigate replace to={'/login'}/>}/>
          <Route path = "/scheduleDelivery" element = {checkIfUserLogIn() ?<ClientScheduleDelivery/> : <Navigate replace to={'/login'}/>}/>
          <Route path = "/itemRequest" element = {checkIfUserLogIn() ?<ClientItemRequest/> : <Navigate replace to={'/login'}/>}/>
          <Route path = "/itemRequestResults" element = {checkIfUserLogIn() ?<ClientItemRequestResults/> : <Navigate replace to={'/login'}/>}/>
          <Route path = "/chatSessions" element = {checkIfUserLogIn() ?<ClientChatHistory/> : <Navigate replace to={'/login'}/>}/>
          <Route path = "/donationSchedule" element = {checkIfUserLogIn() ?<ClientDeliveryScheduleInfo/> : <Navigate replace to={'/login'}/>}/>
          <Route path = "/notifications" element = {checkIfUserLogIn() ?<ClientNotification/> : <Navigate replace to={'/login'}/>}/>
        </Routes>
      </Router>
      {/*</LoadScript>*/}
    </div>
  );
}

export default App;
