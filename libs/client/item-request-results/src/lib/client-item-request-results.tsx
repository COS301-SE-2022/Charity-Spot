import styles from './client-item-request-results.module.css';
import "./resultss.css";
import {ResultBlock} from './resultBlock'
import {FaPowerOff } from 'react-icons/fa';
import { useEffect, useState } from 'react';

import { getCookie, setCookie, removeCookie } from 'typescript-cookie'

function getLocation(location : any){
      //let //locations = ["Pretoria", "Johannesburg", "Cape Town", "Bloemfontein", "Polokwane", "Durban"]
      let locations = ["Gauteng","Kwazulu-Natal","Limpopo","Western Cape","Northern Cape","North West","Eastern Cape","Free State","Mpumalanga"]

      for(let i=0; i<location.length; i++){
            if(locations[i] == location){
                  return i+1;
            }
      }

      return 0;

}

function getItem(item : any){
      let items = ["CLOTHING", "FOOD", "STATIONARY", "HYGIENE", "KITCHEN", "FURNITURE"]

      for(let i=0; i<items.length; i++){
            if(items[i] == item){
                  return i+1;
            }
      }

      return 0;
}

async function APICall(){

      /*const query = `query{ 
            getAIPredic(Date:"01-03", itemType:"1", location:"1"){
                  ID,
                  Probability
            }
      }`;*/

      //let date = getCookie("date");
      //month - day
      let date = "01-03";
      let itemType = getItem(getCookie("type"));
      let location = getLocation(getCookie("location"));

      const query = `query{ 
            getAIPredic(Date:"${date}", itemType:"${itemType}", location:"${location}"){
                  ID,
                  Probability
            }
      }`;

      console.log(query);


      let result = "";

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
                   result = data
              );
      
           let resultString = JSON.stringify(result);
           let resultFin = JSON.parse(resultString);

           console.log(resultFin);

           return resultFin;

}

export function ClientItemRequestResults() {

      let loopCount = -1;

      const [result, addResult] = useState<any[]>([]);

      const [AIoffLine, setAIoffLine] = useState('');

      class ResultV {
            ResultID : string = "";
            ResultProb: string = "";
      }

      const updateResult = async () => {

            setAIoffLine('');

            let resultTemp = await APICall();

            if(resultTemp.data == null){
                  setAIoffLine('AI currently offline!');
                  return;
            }

            let resultArr = resultTemp.data.getAIPredic;

            console.log(resultArr);

            let results : any = [];

            for(let i=0; i<resultArr.length; i++){
                  let temp = new ResultV();

                  temp.ResultID = resultArr[i].ID;
                  temp.ResultProb = resultArr[i].Probability;

                  results.push(temp);

            }

            addResult(results);
      }

      useEffect(() => {
            loopCount = -1;
            updateResult();
      }, []);


  return (
    <div className='motherHolder'>
      <br/>
      <h2 className='rqq'>Suggested Organizations</h2>

      <h1 style={{'color':'#6d6d6e'}}><br/> <br/><br/>{AIoffLine} <FaPowerOff/></h1>

      <div className='HoldAll'>



            {result.map(function(R){

                  loopCount++;

                  return(
                        <ResultBlock inState={[R, loopCount]}/>
                  )

            })}


        {/*<div className='leftHolda'>
            <img src="https://firebasestorage.googleapis.com/v0/b/cos301-storage-test.appspot.com/o/logo.png?alt=media&token=658a4502-2b08-47bf-8cb2-fe7eacbf8c3e" alt="" className="orgreqpic"></img>
              <div className='Lead'><h4>Seal Organization</h4></div>
              <div className='within'>
                <p>We offer high quality food, and we are the best in the business</p>
              </div>

                    <div className="ratedsmalla"> 
                          <input type="radio" id="starreq1" checked = {true} name="req0" value="5" disabled />
                          <label htmlFor="starreq1" title="text"></label>
                          <input type="radio" id="starreq2"   name="req0" value="4"  disabled/>
                          <label htmlFor="starreq2"title="text"></label>
                          <input type="radio" id="starreq3" name="req0" value="3"  disabled />
                          <label  htmlFor="starreq3" title="text"></label>
                          <input type="radio" id="starreq4" name="req0" value="2"  disabled/>
                          <label  htmlFor="starreq4" title="text"></label>
                          <input type="radio" id="starreq5" name="req0" value="1"  disabled/>
                          <label  htmlFor="starreq6" title="text"></label>
                    </div> 
                    <br></br>   
              <button type='submit' id='butChoose'>Choose</button> 

        </div>

        <div className='middleHolda'>

        <img src="https://firebasestorage.googleapis.com/v0/b/cos301-storage-test.appspot.com/o/logo.png?alt=media&token=658a4502-2b08-47bf-8cb2-fe7eacbf8c3e" alt="" className="orgreqpic"></img>
              <div className='Lead'><h4>Whole Foods</h4></div>
              <div className='within'>
                <p>Organic and Highquality food, been in busniess since 1987</p>
              </div>

                    <div className="ratedsmalla"> 
                          <input type="radio" id="starreq1"  name="req1" value="5" disabled />
                          <label htmlFor="starreq1" title="text"></label>
                          <input type="radio" id="starreq2" checked = {true}   name="req01" value="4"  disabled/>
                          <label htmlFor="starreq2"title="text"></label>
                          <input type="radio" id="starreq3" name="req1" value="3"  disabled />
                          <label  htmlFor="starreq3" title="text"></label>
                          <input type="radio" id="starreq4" name="req1" value="2"  disabled/>
                          <label  htmlFor="starreq4" title="text"></label>
                          <input type="radio" id="starreq5" name="req1" value="1"  disabled/>
                          <label  htmlFor="starreq6" title="text"></label>
                    </div> 
                    <br></br>   
              <button type='submit' id='butChoose'>Choose</button> 

        </div>
        <div className='righttHolda'>

        <img src="https://firebasestorage.googleapis.com/v0/b/cos301-storage-test.appspot.com/o/logo.png?alt=media&token=658a4502-2b08-47bf-8cb2-fe7eacbf8c3e" alt="" className="orgreqpic"></img>
              <div className='Lead'><h4>Joes Meat and Pap</h4></div>
              <div className='within'>
                <p>Lekker Braai specials for the whole family to enjoy</p>
              </div>

                    <div className="ratedsmalla"> 
                          <input type="radio" id="starreq1"  name="req2" value="5" disabled />
                          <label htmlFor="starreq1" title="text"></label>
                          <input type="radio" id="starreq2"  name="req2" value="4"  disabled/>
                          <label htmlFor="starreq2"title="text"></label>
                          <input type="radio" id="starreq3" name="req2"  checked = {true} value="3"  disabled />
                          <label  htmlFor="starreq3" title="text"></label>
                          <input type="radio" id="starreq4" name="req2" value="2"  disabled/>
                          <label  htmlFor="starreq4" title="text"></label>
                          <input type="radio" id="starreq5" name="req2" value="1"  disabled/>
                          <label  htmlFor="starreq6" title="text"></label>
                    </div> 
                    <br></br>   
              <button type='submit' id='butChoose'>Choose</button> 

        </div>
        <div className='leftHolda'>

        <img src="https://firebasestorage.googleapis.com/v0/b/cos301-storage-test.appspot.com/o/logo.png?alt=media&token=658a4502-2b08-47bf-8cb2-fe7eacbf8c3e" alt="" className="orgreqpic"></img>
              <div className='Lead'><h4>Farmed Greens</h4></div>
              <div className='within'>
                <p>We primarily focus on Green Veggies.</p>
              </div>

                    <div className="ratedsmalla"> 
                          <input type="radio" id="starreq1"  name="req3" value="5" disabled />
                          <label htmlFor="starreq1" title="text"></label>
                          <input type="radio" id="starreq2"  name="req3" value="4"  disabled/>
                          <label htmlFor="starreq2"title="text"></label>
                          <input type="radio" id="starreq3" name="req3"   value="3"  disabled />
                          <label  htmlFor="starreq3" title="text"></label>
                          <input type="radio" id="starreq4" name="req3" value="2"  disabled/>
                          <label  htmlFor="starreq4" title="text"></label>
                          <input type="radio" id="starreq5" name="req3" checked = {true} value="1"  disabled/>
                          <label  htmlFor="starreq6" title="text"></label>
                    </div> 
                    <br></br>   
              <button type='submit' id='butChoose'>Choose</button> 

      </div>*/}
        
        
        
      </div> 
    </div>
  );
}

export default ClientItemRequestResults;
