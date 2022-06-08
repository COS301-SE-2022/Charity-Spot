import ListGroup from 'react-bootstrap/esm/ListGroup';
import { FaHistory,FaDonate,FaPen,FaUserAlt,FaEdit,FaArrowRight } from 'react-icons/fa';
import { useEffect, useState } from 'react';

import { getCookie, setCookie } from 'typescript-cookie'

let IdCookie = getCookie('ID');

async function historyData() {
    const query = `query{
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
              
  
    /**
     * EXPECT SOMETHING LIKE: 
     * {
          "data": {
            "donateHistory": {
              "Donations": [
                {
                  "Name": "donation",
                  "Quantity": 5,
                  "Quality": "NEW",
                  "Category": "FOOD",
                  "Picture": "picture.png_base64",
                  "Description": "Description here"
                },
                {
                  "Name": "donation2",
                  "Quantity": 3,
                  "Quality": "NEW",
                  "Category": "FOOD",
                  "Picture": "picture2.png_base64",
                  "Description": "Description here"
                },
                
                etc... for the ID you provided
              ]
            }
          }
        }
     *
        FROM THE API
  
        you can take over from here
          */      
  
    const ItemString = JSON.stringify(act_data);
    const Items = JSON.parse(ItemString);

    const ItemArr = Items.data.donateHistory.Donations;

    
    act_data = "";
    //for(let i=0; i< ItemArr.length; i++){

        const newQuery = (`query{
            getItemPicLink(itemID: "${ItemArr[0].ItemID}"){
                Name
            }
        }`);

        console.log(newQuery);
        //console.log(ItemArr[i].ItemID);

        await fetch('http://localhost:3333/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          newQuery
        })
        }).then(r => r.json())
          .then((data) => 
              act_data = data
          );

          console.log(act_data);
    //}



    return Items.data.donateHistory.Donations;
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
                    return (/*<h1 key={item.ItemID}>{item.Name}</h1>
                            
                })}*/ <div key={item.ItemID}>

            

            <div className='rapper'>

                <div className='collapsible'>

                    <input type ='checkbox' id = {item.ItemID}></input>

                    <label htmlFor={item.ItemID}>{item.Name}<FaArrowRight/></label>

                    <div className='collapsible-text'><br/>
                        <div className='collapseleft'>
                        <img src="" alt="" id="profile-pic"/>
                        </div>

                        <div className='collapseright'>
                            <ListGroup variant="flush" >
                            <ListGroup.Item style={{ backgroundColor: 'transparent', height: '70px' , color: '#104283'}}>Name: Levis Leather Jacket</ListGroup.Item>
                                <ListGroup.Item style={{ backgroundColor: 'transparent', height: '70px', color: '#104283' }}>Quantity: 5 </ListGroup.Item>
                                <ListGroup.Item style={{ backgroundColor: 'transparent', height: '70px' , color: '#104283'}}>Category: Clothing </ListGroup.Item>
                                <ListGroup.Item style={{ backgroundColor: 'transparent', height: '70px' , color: '#104283'}}>Condition: Old</ListGroup.Item>
                                <ListGroup.Item style={{ backgroundColor: 'transparent', height: '70px' , color: '#104283'}}>Description: Trucker Vintage jackets</ListGroup.Item>
                            </ListGroup>
                        </div>
                        
                    </div>

                </div>

            </div>

            {/*<button onClick={() => {addName((Name) => [...Name, "Test"]);}}>Test</button>*/}

            </div>
           
                )})}</div>
        );
    }

export default ItemHistory;