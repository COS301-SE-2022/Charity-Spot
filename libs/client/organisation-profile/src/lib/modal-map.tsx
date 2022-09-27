import {useState} from 'react'

import Modal from 'react-bootstrap/Modal';

import {APIKEYS} from '../../../../../config';

import MapPicker from 'react-google-map-picker'
  

export function ModalMap(props : any){

    let APIKey = APIKEYS.GoogleMapsAPIKey;

    const [zoom, setZoom] = useState(5);

    function handleChangeLocation (lat : any, lng : any){
        
        props.inState[2]({lat:lat, lng:lng});
    }
  
    function handleChangeZoom (newZoom : any){
        setZoom(newZoom);
    }
   
    return(
        
            <div>

                <Modal show={props.inState[0]} onHide={() => {props.inState[1](false);}}> 
                    
                    <Modal.Header closeButton>
                        <label className='rglabel'>Please place the marker at your location:</label>
                    </Modal.Header>
                    {/*<label className='rglabel'>Lat: {Number((props.inState[3].lat).toFixed(3))} , Lng: {Number((props.inState[3].lng).toFixed(3))}</label>*/}
            
                    <MapPicker defaultLocation={props.inState[3]}
                        zoom={zoom}
                        style={{height:'700px'}}
                        onChangeLocation={handleChangeLocation} 
                        onChangeZoom={handleChangeZoom}
                        apiKey={APIKey}/>

                </Modal>

            </div>
    
    )

}

export default ModalMap;