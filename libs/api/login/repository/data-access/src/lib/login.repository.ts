import { Injectable } from '@nestjs/common';
import { PrismaService } from '@charity-spot/libs/api/shared/services/prisma';

@Injectable()
export class LoginRepository {
  constructor(private prisma: PrismaService) {}

  async emailExists(email : string)
  {
    const list = await this.prisma.user.findMany({
        select:
        {
            email: true
        }
    });
    list.forEach(i => {
        if (i.email==email)
        {
            return true;
        }
    });
    return false;
  }

  async validateLogin(email : string,password: string)
  {
    const u = await this.prisma.user.findMany({
        select:
        {
          UserID: true,
        },
        where:
        {
          email: email,
          password: password
        }
    });
    if(u == null)
    {
      return null;
    }
    return u[0].UserID;
  }

  async getSalt(email:string){
    const salt = await this.prisma.user.findFirst({
      select:
      {
        passwordSalt : true
      },
      where:
      {
        email: email
      }
    });

    return salt;
  }

}