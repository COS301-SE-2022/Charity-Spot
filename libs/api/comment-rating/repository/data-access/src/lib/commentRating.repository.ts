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

    let rating = null;

    const rCount = await this.prisma.rate.count(
      {
        where: {
          AssistID:AssistID,
          UserID:NeedID
        }
      }
    );

    if(rCount > 0){
      rating = await this.prisma.rate.delete(
        {
          where: {
            UserID_AssistID:{
              AssistID:AssistID,
              UserID:NeedID
            }
            }
          }
      ).then(async ()=>{

        await this.prisma.rate.create({
          data:
          {
            AssistID: AssistID,
            UserID: NeedID,
            Rating: Rating
          }
        });
      });

    }
    else{

      rating = await this.prisma.rate.create({
        data:
        {
          AssistID: AssistID,
          UserID: NeedID,
          Rating: Rating
        }
      });

      return rating;
    }

    const cCount = await this.prisma.comment.count(
      {
        where: {
          AssistID:AssistID,
          UserID:NeedID
        }
      }
    );

    if(cCount > 0){
      rating = await this.prisma.comment.delete(
        {
          where: {
            UserID_AssistID:{
              AssistID:AssistID,
              UserID:NeedID
            }
            }
          }
      ).then(async ()=>{

        await this.prisma.comment.create({
          data:
          {
            AssistID: AssistID,
            UserID: NeedID,
            Comment: Comment
          }
        });
      });

    }
    else{

      await this.prisma.comment.create({
        data:
        {
          AssistID: AssistID,
          UserID: NeedID,
          Comment: Comment
        }
      });
    }

    return this.prisma.$queryRaw`SELECT * FROM Rating FULL JOIN Comment ON Rating.UserID_AssistID = Comment.UserID_AssistID WHERE AssistID = ${AssistID} AND UserID = ${NeedID};`;

  }

  //Retrieve all of the comments that were left for a user given their ID
  async getCommentsForAssist(AssistID: string) {
    const comments = await this.prisma.comment.findMany({
      where:
      {
        AssistID: AssistID
      },
      select:
      {
        UserID: true,
        Comment: true
      }
    });

    return comments;
  }

  //Retrieve all of the ratings that were left for a user given their ID
  async getRatingsForAssist(AssistID: string) {
    const rating = await this.prisma.rate.findMany({
      where:
      {
        AssistID: AssistID
      },
      select:
      {
        UserID: true,
        Rating: true
      }
    });

    return rating;
  }

  //Retrieve only the Rating given by a person in need to an Assisting Party
  async getRating(AssistID, NeedID : string)
  {
    const rating = await this.prisma.rate.findFirst({
      where:
      {
        AssistID: AssistID,
        UserID: NeedID
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
    const comment = await this.prisma.comment.findFirst({
      where:
      {
        AssistID: AssistID,
        UserID: NeedID
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
    const rating = await this.prisma.rate.update({
      where:
      {
        UserID_AssistID:
        {
          AssistID: AssistID,
          UserID: NeedID
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
    const comment = await this.prisma.comment.update({
      where:
      {
        UserID_AssistID:
        {
          AssistID: AssistID,
          UserID: NeedID
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
    const oldRating = await this.prisma.rate.delete({
      where:
      {
        UserID_AssistID:
        {
          AssistID: AssistID,
          UserID: NeedID
        }
      }
    });

    return oldRating;

  }

  async getName(ID : string){

    const name = await this.prisma.assist.findFirst({
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