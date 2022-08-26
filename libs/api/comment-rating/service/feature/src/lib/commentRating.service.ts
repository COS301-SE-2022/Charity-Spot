import { Injectable } from '@nestjs/common';
import {CommentRatingEntity} from './commentRating.entity';
import {CommentRatingRepository} from '@charity-spot/api/comment-rating/repository/data-access';

@Injectable()
export class CommentRatingService {
    constructor(private CommentRatingRepository: CommentRatingRepository) {}

    async Test(){

        let temp = new CommentRatingEntity();

        temp.ID = "Comment/Rating working!";

        return temp;

    }

}