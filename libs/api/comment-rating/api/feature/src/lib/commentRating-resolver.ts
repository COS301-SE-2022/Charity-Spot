import { Resolver, Query, Args } from '@nestjs/graphql';
import {CommentRatingEntity} from '@charity-spot/api/comment-rating/service/feature';
import {CommentRatingService} from '@charity-spot/api/comment-rating/service/feature';

@Resolver()
export class CommentRatingResolver {
    constructor(private readonly CommentRatingService: CommentRatingService) {}

    
}