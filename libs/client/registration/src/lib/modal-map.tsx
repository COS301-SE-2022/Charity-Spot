import {useState} from 'react'

import Modal from 'react-bootstrap/Modal';

import {APIKEYS} from '../../../../../config';

import MapPicker from 'react-google-map-picker'

/*const container = {
    width: '100%',
    height: '500px'
};

const containerStyle = {
    width: '100%',
    height: '100%',
    
  };
  
  const center = {
    lat: -26.2041,
    lng: 28.0473
  };*/

  const DefaultLocation = { lat: 10, lng: 10};
  const DefaultZoom = 10

export function ModalMap(props : any){

    let APIKey = APIKEYS.GoogleMapsAPIKey;

    const handleClose = () => {props.inState[1](false)}

    const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);

    const [location, setLocation] = useState(defaultLocation);
    const [zoom, setZoom] = useState(DefaultZoom);

    function handleChangeLocation (lat : any, lng : any){
        setLocation({lat:lat, lng:lng});
    }
  
    function handleChangeZoom (newZoom : any){
        setZoom(newZoom);
    }

    function handleResetLocation(){
        setDefaultLocation({ ... DefaultLocation});
        setZoom(DefaultZoom);
    }
   
    return(
        
            <div>
                <button onClick={handleResetLocation}>Reset Location</button>
                <label>Latitute:</label><input type='text' value={location.lat} disabled/>
                <label>Longitute:</label><input type='text' value={location.lng} disabled/>
                <label>Zoom:</label><input type='text' value={zoom} disabled/>
        
                <MapPicker defaultLocation={defaultLocation}
                    zoom={zoom}
                    style={{height:'700px'}}
                    onChangeLocation={handleChangeLocation} 
                    onChangeZoom={handleChangeZoom}
                    apiKey={APIKey}/>

            </div>
    
    )

}

export default ModalMap;