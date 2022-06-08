import ListGroup from 'react-bootstrap/esm/ListGroup';
import { FaHistory,FaDonate,FaPen,FaUserAlt,FaEdit,FaArrowRight } from 'react-icons/fa';
import { useEffect, useState } from 'react';

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
             
  
    var ItemString = JSON.stringify(act_data);
    var Items = JSON.parse(ItemString);

    const ItemArr = Items.data.donateHistory.Donations;

    console.log(ItemArr[0]);

    
    act_data = "";
    for(let i=0; i< ItemArr.length; i++){

        query = `query{
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
          }
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

                    <label htmlFor={item.ItemID}>{item.Name}<FaArrowRight/></label>

                    <div className='collapsible-text'><br/>
                        <div className='collapseleft'>
                        <img src={item.PicLink} alt="" id="profile-pic"/>
                        </div>

                        <div className='collapseright'>
                            <ListGroup variant="flush" >
                            <ListGroup.Item style={{ backgroundColor: 'transparent', height: '70px' , color: '#104283'}}>Name: {item.Name}</ListGroup.Item>
                                <ListGroup.Item style={{ backgroundColor: 'transparent', height: '70px', color: '#104283' }}>Quantity: {item.Quantity} </ListGroup.Item>
                                <ListGroup.Item style={{ backgroundColor: 'transparent', height: '70px' , color: '#104283'}}>Category: {item.Category} </ListGroup.Item>
                                <ListGroup.Item style={{ backgroundColor: 'transparent', height: '70px' , color: '#104283'}}>Condition: {item.Quality}</ListGroup.Item>
                                <ListGroup.Item style={{ backgroundColor: 'transparent', height: '70px' , color: '#104283'}}>Description: {item.Description}</ListGroup.Item>
                            </ListGroup>
                        </div>
                        
                    </div>

                </div>

            </div>

            </div> )})}

          </div>
        );
    }

export default ItemHistory;