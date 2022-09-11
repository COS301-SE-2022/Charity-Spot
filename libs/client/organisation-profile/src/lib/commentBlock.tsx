import { useEffect, useState } from 'react';
import { getCookie } from 'typescript-cookie';

async function getCommentsAPI(){

    let IDCookie = getCookie('foreignID');

    if(IDCookie == undefined){
        IDCookie = getCookie('ID');
    }

    var query = `query{
        getAllProfInfo(id :"${IDCookie}"){
          Clients
          ClientNames
          Ratings
          Comments
          Avg
        }
      }`;

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

    var CommentsString = JSON.stringify(act_data);
    var Comments = JSON.parse(CommentsString)
  
    console.log(Comments.data.getAllProfInfo);

    
}

export function CommentBlock(props : any){

    const [Comments, addComments] = useState<any[]>([]);
    const commentS : any[] = [];

    async function getComments(){
        await getCommentsAPI();
    }

    useEffect(() => {
        getComments();
    }, []);

    return(
        <div>

            <div className='pcomment'><div className='commentPic'><h4>HF</h4></div><b><p>Helping Foundation</p></b><br></br>
                  <div className="ratedsmall"> 
                        <input type="radio" id="star55" name="rate3" value="5" disabled />
                        <label htmlFor="star55" title="text"></label>
                        <input type="radio" id="star44" name="rate3" value="4"  disabled/>
                        <label htmlFor="star44"title="text"></label>
                        <input type="radio" id="star33" checked = {true} name="rate3" value="3"  disabled />
                        <label  htmlFor="star33" title="text"></label>
                        <input type="radio" id="star22" name="rate3" value="2"  disabled/>
                        <label  htmlFor="star22" title="text"></label>
                        <input type="radio" id="star11" name="rate3" value="1"  disabled/>
                        <label  htmlFor="star11" title="text"></label>
                      </div> 
                      <br></br>
                      <p>This organization is fast and reliable, The delievered the frozen chicken in time</p> 
                  </div> 

        </div>
    );
}

export default CommentBlock;