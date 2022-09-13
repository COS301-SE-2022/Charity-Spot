import { Injectable } from '@nestjs/common';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';

@Injectable()
export class CommentRatingRepository {
  constructor(private prisma: PrismaService) {}

  //Adding a rating to an Assisting Party
  //Set Comment or Rating to null if they are not added
  async AddRating(AssistID, NeedID, Comment : string, Rating : number)
  {
    //check if a comment already exists

    let rCount = await this.prisma.rating.count(
      {
        where: {
          OrgID: AssistID,
          ClientID: NeedID
        }
      }
    );

    console.log(rCount);

    if(rCount > 0){

      await this.prisma.rating.delete(
        {
          where: {
            OrgID_ClientID:{
              OrgID: AssistID,
              ClientID: NeedID
            }
          },
        }
      ).then(async ()=>{

        const rating = await this.prisma.rating.create({
          data:
          {
            OrgID: AssistID,
            ClientID: NeedID,
            Rating: Rating,
            Comment: Comment
          }
        });
    
        return rating;


      });

    }
    else{

      const rating = await this.prisma.rating.create({
        data:
        {
          OrgID: AssistID,
          ClientID: NeedID,
          Rating: Rating,
          Comment: Comment
        }
      });

      return rating;
    }

  }

  //Retrieve all of the comments that were left for a user given their ID
  async getCommentsForAssist(AssistID: string) {
    const comments = await this.prisma.rating.findMany({
      where:
      {
        OrgID: AssistID
      },
      select:
      {
        ClientID: true,
        Comment: true
      }
    });

    return comments;
  }

  //Retrieve all of the ratings that were left for a user given their ID
  async getRatingsForAssist(AssistID: string) {
    const rating = await this.prisma.rating.findMany({
      where:
      {
        OrgID: AssistID
      },
      select:
      {
        ClientID: true,
        Rating: true
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
        Rating: true
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
        Rating: newRating
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

  async getName(ID : string){

    const name = await this.prisma.organisation.findFirst({
      select:
      {
        OrgName : true
      },
      where:
      {
        UserID : ID
      }
    })

    return name.OrgName;
        
  }

}