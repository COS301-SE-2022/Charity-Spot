import styles from './client-notification.module.css';
import {Link} from 'react-router-dom'
import "./notifiii.css";
/* eslint-disable-next-line */
export interface ClientNotificationProps {}

export function ClientNotification(props: ClientNotificationProps) {
  return (
    <div>
            <br/>
              <div className='notiMain'>
                <div className='notiLeft'>
                  <br/><br/>
                <img src="https://firebasestorage.googleapis.com/v0/b/cos301-storage-test.appspot.com/o/logo.png?alt=media&token=658a4502-2b08-47bf-8cb2-fe7eacbf8c3e" alt="" id="notiprofile-pic"></img>
                
                </div>
                <div className='notiRight'>
                  <br></br>
                  <div className='noticov'><h2>Nandos</h2></div>
                  <div > <div className='noticov2'><h4>Location of Client: Pretoria</h4></div></div>
                  <div><h4></h4></div>
                <Link to ='/chat' className='rgLink'><button id='notiMark'>Mark Read</button></Link>
                <Link to ='/profile' className='rgLink'><button id='chatHistGo'>Detailed View</button></Link>
                </div>
                
              </div>
            <br/>
    </div>
  );
}

export default ClientNotification;
