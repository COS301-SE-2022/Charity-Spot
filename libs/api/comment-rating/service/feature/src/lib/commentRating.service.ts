import { Injectable } from '@nestjs/common';
import {CommentRatingEntity} from './commentRating.entity';
import {CommentRatingRepository} from '@charity-spot/api/comment-rating/repository/data-access';

@Injectable()
export class CommentRatingService {
    constructor(private CommentRatingRepository: CommentRatingRepository) {}

    

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
        let data = null;
        if((data = await this.CommentRatingRepository.AddRating(AssistID, NeedID, Comment, Rating)) != null) {
            returnable.AssistID = data.OrgID;
            returnable.Clients = [data.ClientID];
            returnable.Ratings = [data.Rating];
            returnable.Comments = [data.Comment];

            return returnable;
        }
        
        return null;
    }

}