import { Injectable } from '@nestjs/common';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';

@Injectable()
export class CommentRatingRepository {
  constructor(private prisma: PrismaService) {}

  async AddRatingNoComment(AssistID, NeedID : string, Rating : number)
  {
    const rating = await this.prisma.rating.create({
      data:
      {
        OrgID: AssistID,
        ClientID: NeedID,
        rating: Rating
      }
    });

    return rating;

  }

  async AddRatingAndComment(AssistID, NeedID, Comment : string, Rating : number)
  {
    const rating = await this.prisma.rating.create({
      data:
      {
        OrgID: AssistID,
        ClientID: NeedID,
        rating: Rating,
        Comment: Comment
      }
    });

    return rating;

  }

  async getRating(AssistID, NeedID : string)
  {
    const rating = await this.prisma.rating.findFirst({
      where:
      {
        OrgID: AssistID,
        ClientID: NeedID
      },
      select:
      {
        rating: true
      }
    });

    return rating;

  }

  async getComment(AssistID, NeedID : string)
  {
    const comment = await this.prisma.rating.findFirst({
      where:
      {
        OrgID: AssistID,
        ClientID: NeedID
      },
      select:
      {
        Comment: true
      }
    });

    return comment;

  }
}