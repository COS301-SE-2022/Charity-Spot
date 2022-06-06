import styles from './client-home.module.css';
import {Tabs,Tab} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTrash,FaBlog,FaCode,FaSave,FaMapMarkerAlt,FaFilter } from 'react-icons/fa'
import './homee.css';

import {APIKEYS} from '../../../../../config';

import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
  
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const markerPos1 = {
  lat: -3.745,
  lng: -38.523
}

const markerPos2 = {
  lat: -3.745,
  lng: -39.523
}

function markerClick(input: String){
  console.log(input)
}

export function Home() {

  let APIKey = APIKEYS.GoogleMapsAPIKey;
  
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
          {/*<img className={styles['container']} src="https://firebasestorage.googleapis.com/v0/b/charityspotdemo1.appspot.com/o/g1.png?alt=media&token=888e1913-ec8e-4508-b70a-69b590a27587"></img>*/}

          {/*Google API Stuff */}
          <div className={styles['container']}>

            <LoadScript googleMapsApiKey = {APIKey}>
              <GoogleMap
                
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
              >
                <Marker
                  onClick={() => {markerClick("Hello World!!")}}
                  position={markerPos1}
                />
                <Marker
                  position={markerPos2}
                />

              </GoogleMap>
            </LoadScript>

          </div>

          
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
