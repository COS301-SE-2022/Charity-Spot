import { Marker } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

import { getCookie, setCookie, removeCookie } from 'typescript-cookie'

const joburg = {
    lat: -26.2041,
    lng: 28.0473
}

const pretoria = {
    lat: -25.7479,
    lng: 28.2293
}

const durban = {
    lat: -29.8587,
    lng: 31.0218
}

const capetown = {
    lat: -33.9249,
    lng: 18.4241
}

async function APICall(){
  
    const query = `query{
        GetAllItems{
          ItemName
          OrgID
          Location
          Type
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

           console.log(orgFin.data.GetAllItems);
  
           return orgFin.data.GetAllItems;
  
  }

export function MapMarker(props : any){

    const [MarkerO, addMarkerO] = useState<any[]>([]);
    const MarkerL : any[] = [];

    let loopCount = -0.1;

    const updateMarkers = async (props : any) => {

        let newItemss = await APICall();

        for(let i=0; i< newItemss.length; i++){

            if(newItemss[i].Location == "Pretoria"){
                newItemss[i].Coord = pretoria;
            }
            else if(newItemss[i].Location == "Johannesburg"){
                newItemss[i].Coord = joburg;
            }
            else if(newItemss[i].Location == "Durban"){
                newItemss[i].Coord = durban;
            }
            else if(newItemss[i].Location == "Cape Town"){
                newItemss[i].Coord = capetown;
            }
            else{
                newItemss[i].Coord = pretoria;
            }

            console.log(props.state)

            //Location filter

            if(props.state[0][0] == false && newItemss[i].Location == "tempLoc"){
                continue;
            }

            if(props.state[0][1] == false && newItemss[i].Location == "Johannesburg"){
                continue;
            }

            if(props.state[0][2] == false && newItemss[i].Location == "Durban"){
                continue;
            }

            if(props.state[0][3] == false && newItemss[i].Location == "Cape Town"){
                continue;
            }

            //Type Filter

            if(props.state[1][0] == false && newItemss[i].Location == "tempLoc"){
                continue;
            }

            if(props.state[1][1] == false && newItemss[i].Location == "Johannesburg"){
                continue;
            }

            if(props.state[1][2] == false && newItemss[i].Location == "Durban"){
                continue;
            }

            if(props.state[1][3] == false && newItemss[i].Location == "Cape Town"){
                continue;
            }

            
            MarkerL.push(newItemss[i]);
        }

        console.log(newItemss);

        addMarkerO(MarkerL);

    }

    useEffect(() => {
        updateMarkers(props);
       },[props]);


    function getRandomArbitrary(min : number, max : number) {
        return Math.random() * (max - min) + min;
    }

    function handleClick(ID : any){
        setCookie("foreignID", ID);
        window.location.href = '/profile'; 
    }

    

    return (

        <div>

            {MarkerO.map(function(marker){
                loopCount = loopCount + getRandomArbitrary(-0.1, 0.1);
                
                return(

                    <Marker key={marker.ID}
                        icon= {"https://maps.google.com/mapfiles/kml/paddle/red-circle.png"}

                        onClick = {() => { handleClick(marker.OrgID); }}
                        position= {{ lat:marker.Coord.lat+getRandomArbitrary(-0.1,0.1), lng:marker.Coord.lng+loopCount}}
                        title={marker.ItemName}
                    />

            )})}

        </div>
    )

}

export default MapMarker;