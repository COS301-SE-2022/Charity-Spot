import { Injectable } from '@nestjs/common';
import {CommentRatingEntity} from './commentRating.entity';
import {CommentRatingRepository} from '@charity-spot/api/comment-rating/repository/data-access';
import { getNamedType } from 'graphql';

@Injectable()
export class CommentRatingService {
    constructor(private CommentRatingRepository: CommentRatingRepository) {}

    async getAllInfo(AssistID: string) {

        let temp = new CommentRatingEntity();

        await this.getAllRatingsOfAssist(AssistID).then(async (val1)=>{

            temp.AssistID = AssistID;

            await this.CommentRatingRepository.getName(AssistID).then((name) =>{
                temp.Name = name;
            });

            let clientNames = [];

            for(let i=0; i<val1.Clients.length; i++){

                clientNames.push(
                    await this.CommentRatingRepository.getName(val1.Clients[i]).then((name) =>{
                        return name;
                    })
                );
            }

            temp.ClientNames = clientNames;

            temp.Clients = val1.Clients;
            temp.Ratings = val1.Ratings;

            await this.getAverageRatings(val1.Ratings).then((avg) => {
                temp.Avg = avg;
            });

            await this.getAllCommentsOfAssist(AssistID).then(async (val2)=>{
                temp.Comments = val2.Comments;
            });

        });
        
        return temp;
    }

    async getAverageRatings(ratings : number[]){
        let total = 0;
        let count =0;

        for(let i=0; i < ratings.length; i++){
            total = total + ratings[i];
            count++;
        }

        let avg = Number((total/count).toFixed(0));

        return avg;
    }

    async getAllRatingsOfAssist(AssistID: string) {
        let dataset = null;
        const returnable = new CommentRatingEntity();
        if((dataset = await this.CommentRatingRepository.getRatingsForAssist(AssistID)) != null) {
            returnable.AssistID = AssistID;
            returnable.Clients = [];
            returnable.Ratings = [];
            for(const k of dataset) {
                returnable.Clients.push(k.ClientID);
                returnable.Ratings.push(k.Rating);
            }
            return returnable;
        }

        //no data from database
        return null;
    }

    async getAllCommentsOfAssist(AssistID: string) {
        let dataset = null;
        const returnable = new CommentRatingEntity();
        if((dataset = await this.CommentRatingRepository.getCommentsForAssist(AssistID)) != null) {
            returnable.AssistID = AssistID;
            returnable.Clients = [];
            returnable.Comments = [];
            for(const k of dataset) {
                returnable.Clients.push(k.ClientID);
                returnable.Comments.push(k.Comment);
            }
            return returnable;
        }

        //no data from database
        return null;
    }

    async createCommentRating(AssistID: string, NeedID: string, Comment: string, Rating: number) {
        const returnable = new CommentRatingEntity();
        //let data = await this.CommentRatingRepository.AddRating(AssistID, NeedID, Comment, Rating);

        return await this.CommentRatingRepository.AddRating(AssistID, NeedID, Comment, Rating).then((data)=>{

            returnable.AssistID = data.OrgID;
            returnable.Clients = [data.ClientID];
            returnable.Ratings = [data.Rating];
            returnable.Comments = [data.Comment];

            return returnable;

        })


        /*if((data = await this.CommentRatingRepository.AddRating(AssistID, NeedID, Comment, Rating)) != null) {
            returnable.AssistID = data.OrgID;
            returnable.Clients = [data.ClientID];
            returnable.Ratings = [data.Rating];
            returnable.Comments = [data.Comment];

            return returnable;
        }
        
        return null;*/
    }

}