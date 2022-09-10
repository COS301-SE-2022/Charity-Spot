import styles from './client-home.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTrash,FaBlog,FaCode,FaSave,FaMapMarkerAlt,FaFilter } from 'react-icons/fa'
import './homee.css';
import { useEffect, useState } from 'react';

import {MapMarker} from './map-marker'

import {APIKEYS} from '../../../../../config';

import { GoogleMap, LoadScript } from '@react-google-maps/api';
import ListGroup from 'react-bootstrap/esm/ListGroup';

import {removeCookie } from 'typescript-cookie'

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

  const [checkedLocation, setCheckedLocation] = useState(
    new Array(9).fill(true)
  );

  const [checkedType, setCheckedType] = useState(
    new Array(6).fill(true)
  );

  const [checkedAI, setCheckedAI] = useState(
    new Array(2).fill(true)
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

                <MapMarker state={[checkedLocation, checkedType, checkedAI]}></MapMarker>

              </GoogleMap>
            </LoadScript>

          </div>
    
        </div>
        <div className='content content-2'>

        <div className='title'><h1>Filter</h1></div>

          <div className ="filters-contain">
              <div className="left-filt">
                
                <h3 className='FiltLabels'>Location</h3>
                      <div id = "mapFilters">
                          <div className='wrap1'>
                              <input
                                type="checkbox"
                                id = "l0"
                                checked={checkedLocation[0]}
                                onChange={() => {let checked = [...checkedLocation]; checked[0] = !checked[0]; setCheckedLocation(checked);}}
                              />

                            <label htmlFor="l0"> Gauteng</label>
                          </div>

                          <div className='wrap1'>
                            <input
                                type="checkbox"
                                id = "l1"
                                checked={checkedLocation[1]}
                                onChange={() => {let checked = [...checkedLocation]; checked[1] = !checked[1]; setCheckedLocation(checked);}}
                              />

                            <label htmlFor="l1"> KwaZulu-Natal</label>
                          </div>

                          <div className='wrap1'>
                            <input
                                type="checkbox"
                                id = "l2"
                                checked={checkedLocation[2]}
                                onChange={() => {let checked = [...checkedLocation]; checked[2] = !checked[2]; setCheckedLocation(checked);}}
                              />

                            <label htmlFor="l2"> Limpopo</label>
                          </div>

                          <div className='wrap1'>
                            <input
                                type="checkbox"
                                id = "l3"
                                checked={checkedLocation[3]}
                                onChange={() => {let checked = [...checkedLocation]; checked[3] = !checked[3]; setCheckedLocation(checked);}}
                              />

                            <label htmlFor="l3"> Western Cape</label>
                          </div>

                          <div className='wrap1'>
                            <input
                                type="checkbox"
                                id = "l4"
                                checked={checkedLocation[4]}
                                onChange={() => {let checked = [...checkedLocation]; checked[4] = !checked[4]; setCheckedLocation(checked);}}
                              />

                            <label htmlFor="l4"> Northern Cape</label>
                          </div>

                          <div className='wrap1'>
                            <input
                                type="checkbox"
                                id = "l5"
                                checked={checkedLocation[5]}
                                onChange={() => {let checked = [...checkedLocation]; checked[5] = !checked[5]; setCheckedLocation(checked);}}
                              />

                            <label htmlFor="l5"> North West</label>
                          </div>

                          <div className='wrap1'>
                            <input
                                type="checkbox"
                                id = "l6"
                                checked={checkedLocation[6]}
                                onChange={() => {let checked = [...checkedLocation]; checked[6] = !checked[6]; setCheckedLocation(checked);}}
                              />

                            <label htmlFor="l6"> Eastern Cape</label>
                          </div>

                          <div className='wrap1'>
                            <input
                                type="checkbox"
                                id = "l7"
                                checked={checkedLocation[7]}
                                onChange={() => {let checked = [...checkedLocation]; checked[7] = !checked[7]; setCheckedLocation(checked);}}
                              />

                            <label htmlFor="l7"> Free State</label>
                          </div>

                          <div className='wrap1'>
                            <input
                                type="checkbox"
                                id = "l8"
                                checked={checkedLocation[8]}
                                onChange={() => {let checked = [...checkedLocation]; checked[8] = !checked[8]; setCheckedLocation(checked);}}
                              />

                            <label htmlFor="l8"> Mpumalanga</label>
                          </div>

                      </div>
              </div>
              <div className="middle-filt">
                <h3 className='FiltLabels'>Item Type</h3>

                    <div id = "typeFilters">

                          <div className='wrap1'>
                              <input
                                type="checkbox"
                                id = "i0"
                                checked={checkedType[0]}
                                onChange={() => {let checked = [...checkedType]; checked[0] = !checked[0]; setCheckedType(checked);}}
                              />
                            <label htmlFor="i0">Clothing</label>
                          </div>

                          <div className='wrap1'>
                              <input
                                type="checkbox"
                                id = "i1"
                                checked={checkedType[1]}
                                onChange={() => {let checked = [...checkedType]; checked[1] = !checked[1]; setCheckedType(checked);}}
                              />
                            <label htmlFor="i1">Food</label>
                          </div>

                          <div className='wrap1'>
                              <input
                                type="checkbox"
                                id = "i2"
                                checked={checkedType[2]}
                                onChange={() => {let checked = [...checkedType]; checked[2] = !checked[2]; setCheckedType(checked);}}
                              />
                            <label htmlFor="i2">Stationary</label>
                          </div>

                          <div className='wrap1'>
                              <input
                                type="checkbox"
                                id = "i3"
                                checked={checkedType[3]}
                                onChange={() => {let checked = [...checkedType]; checked[3] = !checked[3]; setCheckedType(checked);}}
                              />
                            <label htmlFor="i3">Hygiene</label>
                          </div>

                          <div className='wrap1'>
                              <input
                                type="checkbox"
                                id = "i4"
                                checked={checkedType[4]}
                                onChange={() => {let checked = [...checkedType]; checked[4] = !checked[4]; setCheckedType(checked);}}
                              />
                            <label htmlFor="i4">Kitchen</label>
                          </div>

                          <div className='wrap1'>
                              <input
                                type="checkbox"
                                id = "i5"
                                checked={checkedType[5]}
                                onChange={() => {let checked = [...checkedType]; checked[5] = !checked[5]; setCheckedType(checked);}}
                              />
                            <label htmlFor="i5">Furniture</label>
                          </div>

                    </div>

              </div>

              <div className="right-filt">
                <h3 className='FiltLabels'>Prediction Type</h3><br/><br/><br/>

                <div id = "typeFilters">

                          <div className='wrap1'>
                              <input
                                type="checkbox"
                                id = "A0"
                                checked={checkedAI[0]}
                                onChange={() => {let checked = [...checkedAI]; checked[0] = !checked[0]; setCheckedAI(checked);}}
                              />
                            <label htmlFor="A0">Available Items</label>

                          </div>

                          <div className='wrap1'>
                              <input
                                type="checkbox"
                                id = "A1"
                                checked={checkedAI[1]}
                                onChange={() => {let checked = [...checkedAI]; checked[1] = !checked[1]; setCheckedAI(checked);}}
                              />
                            <label htmlFor="A1">Predictions for Available Items</label>

                          </div>

                </div>
             </div>     
              
          </div>





        </div>
      </section>
    </div>   
    </div>
  );
}

export default Home;
