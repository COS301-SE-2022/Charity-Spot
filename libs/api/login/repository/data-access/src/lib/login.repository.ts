import { Injectable } from '@nestjs/common';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';

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
          userID: true,
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
    return u.userID;
  }

  async getSalt(email:string){
    const salt = await this.prisma.user.fidnFirst({
      select:
      {
        email:email
      },
      where:
      {
        email: email
      }
    });

    return salt;
  }

}