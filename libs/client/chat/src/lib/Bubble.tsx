import styles from './client-chat.module.css';
import { useEffect, useState } from 'react';

export function Bubble(props : any){

    const [tBubb, setBubbT] = useState<string>();

    useEffect(() => { 
        
        if(props.inState[1]=="R"){ 
            setBubbT(styles["speech-bubbleRight"]);
        }
        else{
            setBubbT(styles["speech-bubbleLeft"]);
        }
    
    });

    return (

        <div className={tBubb}> {props.inState[0]} </div>
)}

export default Bubble;