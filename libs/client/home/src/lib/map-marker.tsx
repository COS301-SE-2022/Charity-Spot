import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const markerPos1 = {
    lat: -26.2041,
    lng: 28.0473
}

export function MapMarker(){

    return (

        <Marker
                  icon= {"https://maps.google.com/mapfiles/kml/paddle/red-circle.png"}
                  
                  position={markerPos1}
                  title="This is the name of the organisation"
                />
    )

}

export default MapMarker;