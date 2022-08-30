import { Injectable } from '@nestjs/common';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';

@Injectable()
export class CommentRatingRepository {
  constructor(private prisma: PrismaService) {}

  //Adding a rating to an Assisting Party WITHOUT a comment
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

  //Adding a rating to an Assisting Party WITH a comment
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

  //Retrieve only the Rating given by a person in need to an Assisting Party
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

  //Retrieve only the Commnet given by a person in need to an Assisting Party
  //Return empty string if none is given
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

  //Change value of rating given
  async editRating(AssistID, NeedID : string, newRating: number)
  {
    const rating = await this.prisma.rating.update({
      where:
      {
        OrgID_ClientID:
        {
          OrgID: AssistID,
          ClientID: NeedID
        }
      },
      data:
      {
        rating: newRating
      }
    });

    return rating;

  }

  //Edit comment given
  async editComment(AssistID, NeedID, newComment : string)
  {
    const comment = await this.prisma.rating.update({
      where:
      {
        OrgID_ClientID:
        {
          OrgID: AssistID,
          ClientID: NeedID
        }
      },
      data:
      {
        Comment: newComment
      }
    });

    return comment;

  }

  //Remove rating and comment from database
  async removeRating(AssistID, NeedID : string)
  {
    const oldRating = await this.prisma.rating.delete({
      where:
      {
        OrgID_ClientID:
        {
          OrgID: AssistID,
          ClientID: NeedID
        }
      }
    });

    return oldRating;

  }
}