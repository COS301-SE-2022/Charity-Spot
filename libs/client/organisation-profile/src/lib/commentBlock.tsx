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
    rating : any = []
    comment : string = ""
}

export function CommentBlock(props : any){

    const [Comments, addComments] = useState<any[]>([]);
    const commentS : any[] = [];

    async function getComments(){
        let commentR = await getCommentsAPI();

        //console.log(commentR);

        let ratingArr = new Array(5).fill(false);

        for(let i=0; i<commentR.ClientNames.length; i++){

            let temp = new commentB();

            temp.id = commentR.Clients[i];
            temp.name = commentR.ClientNames[i];
            ratingArr[commentR.Ratings[i]-1] = true;
            temp.rating = ratingArr;
            temp.comment = commentR.Comments[i];

            //console.log(ratingArr);

            commentS.push(temp);

            ratingArr = new Array(5).fill(false);

        }

        addComments(commentS);

    }

    useEffect(() => {

        console.log(props);
        getComments();
        //props.state = false;
    }, [props.state]);

    return(
        <div>

            {Comments.map(function(comment){
                return(

                    <div key={comment.id} className='pcomment'><b><p>{comment.name}</p></b><br></br>
                        <div className="ratedsmall"> 
                            <input type="radio" id="star55" name={comment.id + " 5"} value="5" checked = {comment.rating[4]} disabled />
                            <label htmlFor="star55" title="text"></label>
                            <input type="radio" id="star44" name={comment.id + " 4"} value="4"  checked = {comment.rating[3]} disabled/>
                            <label htmlFor="star44"title="text"></label>
                            <input type="radio" id="star33" name={comment.id + " 3"} value="3"  checked = {comment.rating[2]} disabled />
                            <label  htmlFor="star33" title="text"></label>
                            <input type="radio" id="star22" name={comment.id + " 2"} value="2"  checked = {comment.rating[1]} disabled/>
                            <label  htmlFor="star22" title="text"></label>
                            <input type="radio" id="star11" name={comment.id + " 1"} value="1"  checked = {comment.rating[0]} disabled/>
                            <label  htmlFor="star11" title="text"></label>
                      </div> 
                      <br></br>
                      <p>{comment.comment}</p> 
                  </div> 

                )
            })}

            

        </div>
    );
}

export default CommentBlock;