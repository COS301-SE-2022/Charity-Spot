import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

const markerPos1 = {
    lat: -26.2041,
    lng: 28.0473
}

async function APICall(){
  
    const query = `query{
      GetAllOrgs{
        ID
        Name
        Address
      }
    }`;
  
         let orgs = "";
    
         await fetch('http://localhost:3333/graphql', {
               method: 'POST',
               headers: {
                 'Content-Type': 'application/json',
                 'Accept': 'application/json',
               },
               body: JSON.stringify({
                 query
               })
            }).then(r => r.json()).then(data => 
                   orgs= data
              );
      
           let orgString = JSON.stringify(orgs);
           let orgFin = JSON.parse(orgString);
  
           return orgFin.data.GetAllOrgs;
  
  }

export function MapMarker(){

    const [MarkerO, addMarkerO] = useState<any[]>([]);
    const MarkerL : any[] = [];

    const updateMarkers = async () => {
        let newItemss = await APICall();

        console.log(newItemss);

        for(let i=0; i< newItemss.length; i++){
            console.log(newItemss[i]);
            MarkerL.push(newItemss[i]);
        }

        console.log(MarkerL);

        addMarkerO(MarkerL);

        console.log("testtt!");
        console.log(MarkerO);

    }

    useEffect(() => {
        updateMarkers();
       },[]);

    return (

        <div>

            {MarkerO.map(function(marker){
                return(

            <div>

                <Marker
                    icon= {"https://maps.google.com/mapfiles/kml/paddle/red-circle.png"}
                  
                    position={markerPos1}
                    title="This is the name of the organisation"
                />

            </div>

            )})}
            
        </div>
    )

}

export default MapMarker;