import { Injectable } from '@nestjs/common';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';

@Injectable()
export class CommentRatingRepository {
  constructor(private prisma: PrismaService) {}

  async AddRatingNoCommnet(AssistID, NeedID : string, Rating : number)
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
}