import { Injectable } from '@nestjs/common';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';

@Injectable()
export class ScheduleDeliveryRepository {
  constructor(private prisma: PrismaService) {}

}
