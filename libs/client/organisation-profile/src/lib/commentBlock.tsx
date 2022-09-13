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
  
    return Comments.data.getAllProfInfo;
    
}

class commentB {
    id : string = ""
    name : string = ""
    rating : number = 0
    comment : string = ""
}

export function CommentBlock(props : any){

    const [Comments, addComments] = useState<any[]>([]);
    const commentS : any[] = [];

    async function getComments(){
        let commentR = await getCommentsAPI();

        for(let i=0; i<commentR.ClientNames.length; i++){

            let temp = new commentB();

            temp.id = commentR.Clients[i];
            temp.name = commentR.ClientNames[i];
            temp.rating = commentR.Ratings[i];
            temp.comment = commentR.Comments[i];

            commentS.push(temp);

        }

        addComments(commentS);

    }

    useEffect(() => {
        getComments();
    }, []);

    return(
        <div>

            {Comments.map(function(comment){
                return(

                    <div key={comment.id} className='pcomment'><b><p>{comment.name}</p></b><br></br>
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

                )
            })}

            

        </div>
    );
}

export default CommentBlock;