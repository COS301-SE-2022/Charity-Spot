import { Injectable } from '@nestjs/common';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';

@Injectable()
export class OrganisationRepository {
  constructor(private prisma: PrismaService) {}

  async getUser(uID : string)
  {
    return await this.prisma.user.findFirst({
      where:
      {
        UserID: uID,
      },
      select:
      {
        email: true,
        identity: true
      }
    })
  }

  async getOrg(userID : string)
  {
    return await this.prisma.organisation.findFirst({
      where:
      {
        UserID:userID
      },
      select:
      {
        OrgName:true,
        NGONum:true,
        Description:true,
        AddressID:true
      }
    })
  }

  async editOrgName(userID : string, name : string)
  {
    return await this.prisma.organisation.update({
      where:
      {
        UserID:userID
      },
      data:
      {
        OrgName:name
      }
    })
  }

  async getAdress(userID : string)
  {
    const u = await this.prisma.organisation.findFirst({
      where:
      {
        UserID:userID
      },
      select:
      {
        AddressID:true
      }
    });

    return await this.prisma.address.findFirst({
      where:
      {
        AddressID:u.AddressID
      },
      select:
      {
        Address:true,
        Address2:true,
        City:true,
        Province:true
      }
    })
  }

  async editAddress(userID : string, address : string, address2 : string, city : string, prov : string)
  {
    const u = await this.prisma.organisation.findFirst({
      where:
      {
        UserID:userID
      },
      select:
      {
        AddressID:true
      }
    });

    return await this.prisma.address.update({
      where:
      {
        AddressID:u.AddressID
      },
      data:
      {
        Address:address,
        Address2:address2,
        City:city,
        Province:prov
      }
    })
  }

  async getRating(OrgID : string)
  {
    return await this.prisma.rating.findMany({
      where:
      {
        OrgID:OrgID
      },
      select:
      {
        ClientID:true,
        Rating:true,
        Comment:true
      }
    })
  }

  async getProfilePicture(userID : string)
  {
    return await this.prisma.organisation.findFirst({
      where:
      {
        UserID:userID
      },
      select:
      {
        profilePicture:true
      }
    })
  }

  async editProfilePicture(userID : string, pfp : string)
  {
    return await this.prisma.organisation.update({
      where:
      {
        UserID:userID
      },
      data:
      {
        profilePicture:pfp
      }
    })
  }

  async getDateCreated(userID : string)
  {
    return await this.prisma.organisation.findFirst({
      where:
      {
        UserID:userID
      },
      select:
      {
        dateCreated:true
      }
    })
  }

  async editPassword(userID : string, password : string)
  {
    return await this.prisma.user.update({
      where:
      {
        UserID:userID
      },
      data:
      {
        password:password
      }
    })
  }
  
}