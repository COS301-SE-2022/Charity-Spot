import styles from './client-item-request-results.module.css';
import "./resultss.css";
export interface ClientItemRequestResultsProps {}

export function ClientItemRequestResults(props: ClientItemRequestResultsProps) {
  return (
    <div className='motherHolder'>
      <br/>
      <h2 className='rqq'>Suggested Organizations</h2>
      <div className='HoldAll'>
        <div className='leftHolda'>

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

        </div>
        
        
        
      </div> 
    </div>
  );
}

export default ClientItemRequestResults;
