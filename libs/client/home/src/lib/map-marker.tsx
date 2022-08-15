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

const bloemfontein = {
    lat: -29.0852,
    lng: 26.1596
}

const polokwane = {
    lat: -23.8962,
    lng: 29.4486
}

const capetown = {
    lat: -33.9249,
    lng: 18.4241
}

const markerColoursS = ["https://maps.google.com/mapfiles/kml/paddle/red-circle.png", "https://maps.google.com/mapfiles/kml/paddle/blu-circle.png", "https://maps.google.com/mapfiles/kml/paddle/grn-circle.png", "https://maps.google.com/mapfiles/kml/paddle/ylw-circle.png", "https://maps.google.com/mapfiles/kml/paddle/purple-circle.png","https://maps.google.com/mapfiles/kml/paddle/wht-circle.png"];

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

    const [markC, setMarkC] = useState("");

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
            else if(newItemss[i].Location == "Cape Town"){
                newItemss[i].Coord = capetown;
            }
            else if(newItemss[i].Location == "Bloemfontein"){
                newItemss[i].Coord = bloemfontein;
            }
            else if(newItemss[i].Location == "Polokwane"){
                newItemss[i].Coord = polokwane;
            }
            else if(newItemss[i].Location == "Durban"){
                newItemss[i].Coord = durban;
            }
            else{
                newItemss[i].Coord = pretoria;
            }

            console.log(props.state)

            //Location filter

            if(props.state[0][0] == false && newItemss[i].Location == "Pretoria"){
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

            if(props.state[0][4] == false && newItemss[i].Location == "Polokwane"){
                continue;
            }

            if(props.state[0][5] == false && newItemss[i].Location == "Bloemfontein"){
                continue;
            }

            //Type Filter

            if(props.state[1][0] == false && newItemss[i].Type == "CLOTHING"){
                continue;
            }
            if(newItemss[i].Type == "CLOTHING"){
                newItemss[i].colour = markerColoursS[0];

            }

            if(props.state[1][1] == false && newItemss[i].Type == "FOOD"){
                continue;
            }
            if(newItemss[i].Type == "FOOD"){
                newItemss[i].colour = markerColoursS[1];
            }

            if(props.state[1][2] == false && newItemss[i].Type == "STATIONARY"){
                continue;
            }
            if(newItemss[i].Type == "STATIONARY"){
                newItemss[i].colour = markerColoursS[2];
            }

            if(props.state[1][3] == false && newItemss[i].Type == "HYGIENE"){
                continue;
            }
            if(newItemss[i].Type == "HYGIENE"){
                newItemss[i].colour = markerColoursS[3];
            }

            if(props.state[1][4] == false && newItemss[i].Type == "KITCHEN"){
                continue;
            }
            if(newItemss[i].Type == "KITCHEN"){
                newItemss[i].colour = markerColoursS[4];
            }

            if(props.state[1][5] == false && newItemss[i].Type == "FURNITURE"){
                continue;
            }
            if(newItemss[i].Type == "FURNITURE"){
                newItemss[i].colour = markerColoursS[5];
            }

            //Prediction Filter

            if(props.state[2][0] == false ){//&& newItemss[i].Type == "CLOTHING"){
                let currentString = newItemss[i].colour;
                let newString = currentString.substring(0,currentString.length - 10) + "blank.png";
                newItemss[i].colour = newString;
                //continue;
            }

            if(props.state[2][1] == false ){//&& newItemss[i].Type == "FOOD"){
                //continue;
                let currentString = newItemss[i].colour;
                let newString = currentString.substring(0,currentString.length - 10) + "circle.png";
                newItemss[i].colour = newString;
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
                        icon= {marker.colour}

                        onClick = {() => { handleClick(marker.OrgID); }}
                        position= {{ lat:marker.Coord.lat+getRandomArbitrary(-0.1,0.1), lng:marker.Coord.lng+loopCount}}
                        title={marker.ItemName}
                    />

            )})}

        </div>
    )

}

export default MapMarker;