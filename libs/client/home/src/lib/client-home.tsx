// import styles from './cli';
import 'react-tabs/style/react-tabs.css';
import {Tabs,Tab} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { FaMapMarkerAlt,FaFilter } from 'react-icons/fa'


export function Home() {
  return (
    <div>
<br/>

 <Tabs variant="pills" defaultActiveKey="profile" id="tabss" className="elon" style={{color:"grey"}}>
  <Tab  eventKey="home" title={
   <span>
     <FaMapMarkerAlt />
     {" Map "}
   </span>
  }>
     <h1>First Tab</h1>
     {/* <img className={styles['container']} src="https://firebasestorage.googleapis.com/v0/b/charityspotdemo1.appspot.com/o/g1.png?alt=media&token=888e1913-ec8e-4508-b70a-69b590a27587"></img> */}
  </Tab>
  <Tab  eventKey="filter" title={
   <span>
     {/* <FaFilter />{" Filter "} */}
   </span> <h1></h1>
  }>
  </Tab>
  <Tab eventKey="contact" title="Contact" >
      <h1>Third Tab</h1>
  </Tab>
</Tabs>   
    </div>
  );
}

export default Home;
