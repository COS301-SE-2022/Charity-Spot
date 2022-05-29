import styles from './client-home.module.css';
import {Tabs,Tab} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTrash,FaBlog,FaCode,FaSave,FaMapMarkerAlt,FaFilter } from 'react-icons/fa'
import './homee.css';

export function Home() {
  return (
    <div>

      {/* <Tabs>
            <TabList>
              <Tab>Map</Tab>
              <Tab>Filters</Tab>
            </TabList>

            <TabPanel>
              <img className={styles['container']} src="https://firebasestorage.googleapis.com/v0/b/charityspotdemo1.appspot.com/o/g1.png?alt=media&token=888e1913-ec8e-4508-b70a-69b590a27587"></img>
            </TabPanel>
            <TabPanel>
              <h2>Select Filters</h2>
            </TabPanel>
      
    
      

      </Tabs> */}
     <div className="wrapper">
    <br/><br/>
      <input type ="radio" name="slider" id='home' defaultChecked ></input>
      <input type ="radio" name="slider" id='blog' ></input>
      {/* <input type ="radio" name="slider" id='code' ></input>
      <input type ="radio" name="slider" id='help' ></input> */}
      <nav>
        <label htmlFor= "home" className='home'><FaMapMarkerAlt/> Map  </label>
        <label htmlFor= "blog" className='blog'> <FaFilter/> Filter </label>
        <div className='slider'></div>
      </nav>
      <section>
        <div className='content content-1'>
          <div className='title'><h1>Content 1</h1></div>
          <img className={styles['container']} src="https://firebasestorage.googleapis.com/v0/b/charityspotdemo1.appspot.com/o/g1.png?alt=media&token=888e1913-ec8e-4508-b70a-69b590a27587"></img>
        </div>
        <div className='content content-2'>
          <div className='title'><h1>Content 2</h1></div>
          <p> who was the company's public face. </p>
        </div>
      </section>
    </div>   
    </div>
  );
}

export default Home;
