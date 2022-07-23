import styles from './client-item-request-results.module.css';
import "./resultss.css";
export interface ClientItemRequestResultsProps {}

export function ClientItemRequestResults(props: ClientItemRequestResultsProps) {
  return (
    <div className='motherHolder'>
      <br/>
      <h2>Suggested Organizations</h2>
      <div className='HoldAll'>
        <div className='leftHolda'>
        <img src="https://firebasestorage.googleapis.com/v0/b/cos301-storage-test.appspot.com/o/logo.png?alt=media&token=658a4502-2b08-47bf-8cb2-fe7eacbf8c3e" alt="" id="profile-pic"></img>
          <h4>Seal Organization</h4>
          <h6>Food and Toiletry</h6>
          
        </div>
        <div className='middleHolda'>
          <h3>Company2</h3>
        </div>
        <div className='righttHolda'>
          <h3>Company3</h3>
        </div>
        <div className='leftHolda'>
          <h3>Company3</h3>
        </div>
        
        
        
      </div> 
    </div>
  );
}

export default ClientItemRequestResults;
