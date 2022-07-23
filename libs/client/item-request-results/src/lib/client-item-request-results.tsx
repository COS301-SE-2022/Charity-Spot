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
          <h3>Company1</h3>
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
