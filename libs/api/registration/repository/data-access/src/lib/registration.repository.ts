import { Injectable } from '@nestjs/common';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';

@Injectable()
export class RegistrationRepository {
  constructor(private prisma: PrismaService) {}

  async addUser(email : string,password: string, PasswordSalt:string)
  {
    const u = this.prisma.user.create({
      data:
      {
        email: email,
        password:password,
        passwordSalt:PasswordSalt
      }
    })
  }
}