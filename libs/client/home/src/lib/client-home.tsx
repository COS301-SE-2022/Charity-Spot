import styles from './client-home.module.css';
import {Tabs,Tab} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTrash,FaBlog,FaCode,FaSave,FaMapMarkerAlt,FaFilter } from 'react-icons/fa'
import './homee.css';

import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

export function Home() {
  return (
    <div>

     <div className="wrapperHome">
    <br/><br/>
      <input type ="radio" name="sliderHome" id='home' defaultChecked ></input>
      <input type ="radio" name="sliderHome" id='filter' ></input>
      <nav>
        <label htmlFor= "home" className='home'><FaMapMarkerAlt/> Map  </label>
        <label htmlFor= "filter" className='filter'> <FaFilter/> Filter </label>
        <div className='sliderHome'></div>
      </nav>
      <section>
        <div className='content content-1'>
          <div className='title'><h1>Map</h1></div>
          <img className={styles['container']} src="https://firebasestorage.googleapis.com/v0/b/charityspotdemo1.appspot.com/o/g1.png?alt=media&token=888e1913-ec8e-4508-b70a-69b590a27587"></img>

          {/*Google API Stuff */}

          <LoadScript googleMapsApiKey="AIzaSyCiXvhZdz4T1TStQ-_3vRXUXMl0Hepe6gM">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
            >
            </GoogleMap>
          </LoadScript>

          <h1>Hello</h1>
        </div>
        <div className='content content-2'>
          <div className='title'><h1>Filter</h1></div>
          <p> Filter Map here :) </p>
        </div>
      </section>
    </div>   
    </div>
  );
}

export default Home;
