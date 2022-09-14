import ListGroup from 'react-bootstrap/esm/ListGroup';
import { FaHistory,FaDonate,FaPen,FaUserAlt,FaEdit,FaArrowDown,FaArrowUp } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import './donatee.css'
import { getCookie, setCookie } from 'typescript-cookie'

let IdCookie = getCookie('ID');

async function historyData() {
    var query = `query{
      donateHistory(id: "${IdCookie}"){
        Donations{
          ItemID
          Name
          Quantity
          Quality
          Category
          Picture
          Description
        }
      }
    }
    `;
  
    let act_data = "";
    
    /*await fetch('http://localhost:3333/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query
        })
        }).then(r => r.json())
          .then((data) => 
              act_data = data
          );*/
             
  
    var ItemString = JSON.stringify(act_data);
    var Items = JSON.parse(ItemString);

    const ItemArr = Items.data.donateHistory.Donations;

    console.log(ItemArr[0]);

    
    act_data = "";
    for(let i=0; i< ItemArr.length; i++){

        /*query = `query{
          getItemPicLink(itemID: "${ItemArr[i].ItemID}"){
            Name
          }
        }
        `;

        await fetch('http://localhost:3333/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query
        })
        }).then(r => r.json())
          .then((data) => 
              act_data = data
          );

          
          ItemString = JSON.stringify(act_data);
          Items = JSON.parse(ItemString);

          if(Items.data.getItemPicLink.Name == "undefined"){
            ItemArr[i].PicLink = "";
          }
          else{
            ItemArr[i].PicLink = Items.data.getItemPicLink.Name;
          }*/
          ItemArr[i].PicLink = "";
    }



    return ItemArr;
  }


export function ItemHistory(props : any){
        const [Items, addItems] = useState<any[]>([]);
        const ItemsL : any[] = [];

        const updateItems = async () => {
            let newItems = await historyData();

            for(let i=0; i< newItems.length; i++){
                ItemsL.push(newItems[i]);
            }

            addItems(ItemsL);

        }

        
        useEffect(() => {
            updateItems();
           },[]);



        return (
        
                <div>
                {Items.map(function(item){
                    return (
                            
            <div key={item.ItemID}>

            

            <div className='rapper'>

                <div className='collapsible'>

                    <input type ='checkbox' id = {item.ItemID}></input>

                    <label htmlFor={item.ItemID}>{item.Name} <FaArrowDown/></label>

                    <div className='collapsible-text'><br/>
                        <div className='collapseleft'>
                        <img src={item.PicLink} alt="" id="donation-pic2"/>
                        </div>

                        <div className='collapseright'>
      
                            <div className="cov">Name: {item.Name}</div>
                            <div className="cov">Quantity: {item.Quantity}</div> 
                            <div className="cov">Category: {item.Category}</div> 
                            <div className="cov">Condition: {item.Quality}</div> 
                            <div className="covDesc">Description: {item.Description}</div>
                        </div>
                        
                    </div>

                </div>

            </div>

            </div> )})}

          </div>
        );
    }

export default ItemHistory;