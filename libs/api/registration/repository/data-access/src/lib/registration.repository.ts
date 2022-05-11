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

  async AlterNGONum(UserID : string,NGONum: string)
  {
    const u = await this.prisma.organisation.update({
      where:
      {
        UserID:UserID
      },
      data:
      {
        NGONum:NGONum
      }
    })

    return u;
  }

  async AlterDescription(UserID : string,Description: string)
  {
    const u = await this.prisma.organisation.update({
      where:
      {
        UserID:UserID
      },
      data:
      {
        Description:Description
      }
    })

    return u;
  }

  async AlterAdress(UserID : string,address:string,address2:string,city:string,prov:string,)
  {
    let a = await this.prisma.Address.findFirst({
      where:
      {
        Address:address,
        Address2:address2,
        City:city,
        Province:prov
      },
      select:
      {
        AddressID:true
      }
    });
    if(a.AddressID==null)
    {
      a = await this.prisma.Address.create({
        data:
        {
          Address:address,
          Address2:address2,
          City:city,
          Province:prov
        }
      });
    }
    const u = await this.prisma.organisation.update({
      where:
      {
        UserID:UserID
      },
      data:
      {
        AddressID:a.AddressID
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