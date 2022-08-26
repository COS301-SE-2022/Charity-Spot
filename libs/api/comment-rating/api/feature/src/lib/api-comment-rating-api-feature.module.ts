import { Module } from '@nestjs/common';
import { ApiCommentRatingServiceFeatureModule } from '@charity-spot/api/comment-rating/service/feature'
import { CommentRatingService } from '@charity-spot/api/comment-rating/service/feature';
import { CommentRatingResolver } from './commentRating-resolver';
import { CommentRatingRepository } from '@charity-spot/api/comment-rating/repository/data-access';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';

@Module({
  controllers: [],
  imports: [ApiCommentRatingServiceFeatureModule],
  providers: [CommentRatingResolver, CommentRatingService, CommentRatingRepository, PrismaService]
})
export class ApiCommentRatingApiFeatureModule {}
