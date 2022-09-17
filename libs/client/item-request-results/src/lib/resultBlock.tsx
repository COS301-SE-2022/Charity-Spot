import styles from './client-chat.module.css';
import { useEffect, useState } from 'react';

import {setCookie} from 'typescript-cookie';

async function APICall(ID : any){

    const query = `query{ 
        getOrgInfo(OrgID:"${ID}"){
            OrgName,
            ProfilePic,
            Rating,
            Description
          }
    }`;

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

         return resultFin.data.getOrgInfo;

}

export function ResultBlock(props : any){

    const [className, setClassName] = useState<any>();

    const [OrgID, setOrgID] = useState<any>();
    const [OrgName, setOrgName] = useState<any>();
    const [OrgProb, setOrgProb] = useState<any>();
    const [OrgPic, setOrgPic] = useState<any>();
    const [OrgDesc, setOrgDesc] = useState<any>();
    //const [OrgRating, setOrgRating] = useState<any>();

    const [avgRating, setAvgRating] = useState(new Array(5).fill(false));

    const [probStyle, setProbStyle] = useState<any>("probR");

    const getResultInfo = async () => {
        let OrgInfo = await APICall(props.inState[0].ResultID)

        setOrgID(props.inState[0].ResultID);
        setOrgName(OrgInfo.OrgName);
        setOrgPic(OrgInfo.ProfilePic);
        setOrgDesc(OrgInfo.Description);

        //setOrgRating(OrgInfo.Rating);

        let rating = new Array(5).fill(false);
        rating[OrgInfo.Rating - 1] = true;
        setAvgRating(rating);

        let prob = "Moderate Chance";
        if(props.inState[0].ResultProb > 0.9){
          prob =  "High Chance"
          setProbStyle("probG");
        }
        console.log(prob);
        setOrgProb(prob);
    }

    useEffect(() => {
        
        getResultInfo();

        //console.log(props.inState[0].ResultID);

        if(props.inState[1]%3 == 0){
            setClassName("leftHolda");
        }
        else if(props.inState[1]%3==1){
            setClassName("middleHolda");
        }
        else if(props.inState[1]%3==2){
            setClassName("righttHolda");
        }
    
    }, []);

    function handleClick(ID : any){
      setCookie("foreignID", ID);
      window.location.href = '/profile'; 
  }

    return (
        <div className={className}>
        <img src={OrgPic} alt="" className="orgreqpic"></img>
          <div className='Lead'><h4>{OrgName}</h4></div>
          <div className='within'>
            <p>{OrgDesc}</p>
          </div>

                <div className="ratedsmall"> 
                      <input type="radio" id="starreq1" checked={avgRating[4]} name={OrgID + "5"} value="5" disabled />
                      <label htmlFor="starreq1" title="text"></label>
                      <input type="radio" id="starreq2" checked={avgRating[3]} name={OrgID + "4"} value="4"  disabled/>
                      <label htmlFor="starreq2"title="text"></label>
                      <input type="radio" id="starreq3" checked={avgRating[2]} name={OrgID + "3"} value="3"  disabled />
                      <label  htmlFor="starreq3" title="text"></label>
                      <input type="radio" id="starreq4" checked={avgRating[1]} name={OrgID + "2"} value="2"  disabled/>
                      <label  htmlFor="starreq4" title="text"></label>
                      <input type="radio" id="starreq5" checked={avgRating[0]} name={OrgID + "1"} value="1"  disabled/>
                      <label  htmlFor="starreq6" title="text"></label>
                </div> 

          <div><h4 className={probStyle}>{OrgProb}</h4></div>
                <br></br>   
          <button type='submit' id='butChoose'onClick={()=>{handleClick(OrgID);}}>View Profile</button> 

    </div>
    
)}

export default ResultBlock;

