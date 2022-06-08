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

    let loopCount = -0.1;

    const updateMarkers = async () => {
        let newItemss = await APICall();

        for(let i=0; i< newItemss.length; i++){
            MarkerL.push(newItemss[i]);
        }

        addMarkerO(MarkerL);

    }

    useEffect(() => {
        updateMarkers();
       },[]);


    function getRandomArbitrary(min : number, max : number) {
        return Math.random() * (max - min) + min;
    }

    

    return (

        <div>

            {MarkerO.map(function(marker){
                loopCount = loopCount + getRandomArbitrary(-0.1, 0.3);
                console.log(loopCount);
                
                return(

            //<div key={marker.ID}>

                <Marker key={marker.ID}
                    icon= {"https://maps.google.com/mapfiles/kml/paddle/red-circle.png"}
                  
                    position= {{ lat:markerPos1.lat+getRandomArbitrary(-0.1,0.1), lng:markerPos1.lng+loopCount}}
                    title={marker.Name}
                />

            //</div>

            )})}

        </div>
    )

}

export default MapMarker;