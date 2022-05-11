import { Injectable } from '@nestjs/common';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';

@Injectable()
export class RegistrationRepository {
  constructor(private prisma: PrismaService) {}

  async addUser(email : string,password: string, PasswordSalt:string)
  {
    const u = await this.prisma.user.create({
      data:
      {
        email: email,
        password:password,
        passwordSalt:PasswordSalt
      }
    })

    return u;
  }

  //Only OrgName and userID are compulsory. others may be empty string. null will be insert then
  async addOrg(userID : string,OrgName: string)
  {
    const o = await this.prisma.organisation.create({
      data:
      {
        UserID: userID,
        OrgName:OrgName
      }
    })
  }
}