import styles from './client-home.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTrash,FaBlog,FaCode,FaSave,FaMapMarkerAlt,FaFilter } from 'react-icons/fa'
import './homee.css';
import { useEffect, useState } from 'react';

import {MapMarker} from './map-marker'

import {APIKEYS} from '../../../../../config';

import { GoogleMap, LoadScript } from '@react-google-maps/api';
import ListGroup from 'react-bootstrap/esm/ListGroup';
const containerStyle = {
  width: '100%',
  height: '100%',
  
};

const center = {
  lat: -26.2041,
  lng: 28.0473
};

export function Home() {

  let APIKey = APIKEYS.GoogleMapsAPIKey;

  const [checkedState, setCheckedState] = useState(
    new Array(4).fill(true)
  );
  
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
          
          <div className={styles['container']}>

            <LoadScript googleMapsApiKey = {APIKey}>
              <GoogleMap
                
                mapContainerStyle={containerStyle}
                center={center}
                zoom={5}
              >

                <MapMarker checkState={checkedState}></MapMarker>

              </GoogleMap>
            </LoadScript>

          </div>
    
        </div>
        <div className='content content-2'>

        <div className='title'><h1>Filter</h1></div>

          <div className ="filters-contain">
              <div className="left-filt">
                
                <h3 className='FiltLabels'>Location</h3>
                      <div id = "mapFilters"><br/><br/>
                          <div className='wrap1'>
                              <input
                                type="checkbox"
                                id = "0"
                                checked={checkedState[0]}
                                onChange={() => {let checked = [...checkedState]; checked[0] = !checked[0]; setCheckedState(checked);}}
                              />

                            <label htmlFor="0"> Pretoria</label>
                          </div>

                          <div className='wrap1'>
                            <input
                                type="checkbox"
                                id = "1"
                                checked={checkedState[1]}
                                onChange={() => {let checked = [...checkedState]; checked[1] = !checked[1]; setCheckedState(checked);}}
                              />

                            <label htmlFor="1"> Johannesburg</label>
                          </div>

                          <div className='wrap1'>
                            <input
                                type="checkbox"
                                id = "2"
                                checked={checkedState[2]}
                                onChange={() => {let checked = [...checkedState]; checked[2] = !checked[2]; setCheckedState(checked);}}
                              />

                            <label htmlFor="2"> Durban</label>
                          </div>

                          <div className='wrap1'>
                            <input
                                type="checkbox"
                                id = "3"
                                checked={checkedState[3]}
                                onChange={() => {let checked = [...checkedState]; checked[3] = !checked[3]; setCheckedState(checked);}}
                              />

                            <label htmlFor="3"> Cape Town</label>
                          </div>

                      </div>
              </div>
              <div className="middle-filt">
                
              <h3 className='FiltLabels'>Item Type</h3>
              </div>     
              <div className="right-filt">
              <h3 className='FiltLabels'>Organization</h3>
             </div>      
          </div>





        </div>
      </section>
    </div>   
    </div>
  );
}

export default Home;
