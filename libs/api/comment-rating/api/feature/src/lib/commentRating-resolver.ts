import { Resolver, Query, Args } from '@nestjs/graphql';
import {CommentRatingEntity} from '@charity-spot/api/comment-rating/service/feature';
import {CommentRatingService} from '@charity-spot/api/comment-rating/service/feature';

@Resolver()
export class CommentRatingResolver {
    constructor(private readonly CommentRatingService: CommentRatingService) {}

    @Query(() => CommentRatingEntity)
    async getAllComments(
        @Args("id") assistID: string 
    ) {
        return await this.CommentRatingService.getAllCommentsOfAssist(assistID);
    }

    @Query(() => CommentRatingEntity)
    async getAllRatings(
        @Args("id") assistID: string 
    ) {
        return await this.CommentRatingService.getAllRatingsOfAssist(assistID);
    }

    @Query(() => CommentRatingEntity)
    async addCommentRating(
        @Args("assist_id") assistID: string,
        @Args("need_id") needid: string,
        @Args("comment") comment: string,
        @Args("rating") rating: 1 | 2 | 3 | 4 | 5 
    ) {
        return await this.CommentRatingService.createCommentRating(assistID, needid, comment, rating);
    }

    @Query(() => CommentRatingEntity)
    async getAllProfInfo(
        @Args("id") id: string
    ){
        return await this.CommentRatingService.getAllInfo(id);
    }
}
