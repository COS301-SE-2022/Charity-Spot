import { Injectable } from '@nestjs/common';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';

@Injectable()
export class DonateRepository {
  constructor(private prisma: PrismaService) {}

}