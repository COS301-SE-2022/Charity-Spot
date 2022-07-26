import styles from './client-chat.module.css';
import { useEffect, useState } from 'react';

export function ResultBlock(props : any){

    let classN = "leftHolda"

    useEffect(() => { 
        
        //console.log(props.inState[1]);
        console.log(props.inState[1]%3);

        if(props.inState[1]%3==0){
            classN = "leftHolda"
        }
        else if(props.inState[1]%3==1){
            classN = "middleHolda"
        }
        else if(props.inState[1]%3==2){
            classN = "righttHolda"
        }
    
    }, []);

    return (
        <div className={classN}>
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
    
)}

export default ResultBlock;

