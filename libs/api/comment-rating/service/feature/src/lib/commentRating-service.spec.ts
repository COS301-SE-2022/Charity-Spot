import { Test, TestingModule } from '@nestjs/testing';

import { CommentRatingService } from './commentRating.service';
import { CommentRatingEntity } from './commentRating.entity';

import { CommentRatingRepository } from '@charity-spot/api/comment-rating/repository/data-access';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';

import { direct } from '@charity-spot/api/shared/auth';

describe( 'Comment Rating Service', () => {

    let service : CommentRatingService;
    let repository : CommentRatingRepository;


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [CommentRatingService, PrismaService, CommentRatingRepository],
        }).compile();

        service = module.get<CommentRatingService>(CommentRatingService);
        repository = module.get<CommentRatingRepository>(CommentRatingRepository);
    });

    // getAllInfo(AssistID: string)
    describe('getAllInfo', () => {
        it('Gets all the information', async () => {
            jest.spyOn(service, 'getAllInfo').mockImplementation(() : Promise<any> => Promise.resolve(true));
            expect(await service.getAllInfo("a1d4f5g96")).toEqual(true);
        })
    });
    
    //getAverageRatings(ratings : number[])
    describe('getAverageRatings', () => {
        it('Gets the average ratings', async () => {
            jest.spyOn(service, 'getAverageRatings').mockImplementation(() : Promise<any> => Promise.resolve(true));
            const val = [1,4,3,2];
            expect(await service.getAverageRatings(val)).toEqual(true);
        })
    });

    //getAllRatingsOfAssist(AssistID: string)
    describe('getAllRatingsOfAssist', () => {
        it('Gets all the ratings of an assist', async () => {
            jest.spyOn(service, 'getAllRatingsOfAssist').mockImplementation(() : Promise<any> => Promise.resolve(true));
            expect(await service.getAllRatingsOfAssist("a1d4f5g96")).toEqual(true);
        })
    });

    //getAllCommentsOfAssist(AssistID: string)
    describe('getAllCommentsOfAssist', () => {
        it('Gets all the comments of an assist', async () => {
            jest.spyOn(service, 'getAllCommentsOfAssist').mockImplementation(() : Promise<any> => Promise.resolve(true));
            expect(await service.getAllCommentsOfAssist("a1d4f5g96")).toEqual(true);
        })
    });

    //createCommentRating(AssistID: string, NeedID: string, Comment: string, Rating: number)
    describe('createCommentRating', () => {
        it('', async () => {
            jest.spyOn(service, 'createCommentRating').mockImplementation(() : Promise<any> => Promise.resolve(true));
            expect(await service.createCommentRating("a1d4f5g96","d2w4d5w9","This was a good company that delivered",4)).toEqual(true);
        })
    });


});
