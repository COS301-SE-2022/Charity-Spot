import {useState} from 'react'

import Modal from 'react-bootstrap/Modal';

import {APIKEYS} from '../../../../../config';

import MapPicker from 'react-google-map-picker'

import { GoogleMap, Marker,useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '750px',
    
};

const center = {
    lat: -26.2041,
    lng: 28.0473
};

  

export function ModalMap(props : any){

    let APIKey = APIKEYS.GoogleMapsAPIKey;

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: APIKey
    })
   
    return(
        
            <div>

                <Modal show={props.inState[0]} onHide={() => {props.inState[1](false);}}> 

                    {isLoaded && 

                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={5}>

                        <Marker position = {{ lat: props.inState[2], lng: props.inState[3]}}/>

                    </GoogleMap>}

                </Modal>

            </div>
    
    )

}

export default ModalMap;