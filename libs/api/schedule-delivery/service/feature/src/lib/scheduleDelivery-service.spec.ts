import { Test, TestingModule } from '@nestjs/testing';
import { jest } from '@jest/globals'

import { ScheduleDeliveryService } from './scheduleDelivery.service';
import { ScheduleDeliveryEntity } from './scheduleDelivery.entity';

import { ScheduleDeliveryRepository } from '@charity-spot/api/schedule-delivery/repository/feature';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';

const scheduleDeliveryEntity = new ScheduleDeliveryEntity();

describe('item Request Service', () => {

    let service: ScheduleDeliveryService;
    let repository: ScheduleDeliveryRepository;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [ScheduleDeliveryService, ScheduleDeliveryRepository, ScheduleDeliveryEntity, PrismaService],
        }).compile();

        service = module.get<ScheduleDeliveryService>(ScheduleDeliveryService);

  });
  it('item Request service should be defined', () => {
    expect(service).toBeDefined();
  });
});


let resolver: ScheduleDeliveryService;

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: 
    [ScheduleDeliveryService, 
      ScheduleDeliveryRepository,
      ScheduleDeliveryEntity, 
      PrismaService, 
    ],
  }).compile();
  resolver = module.get<ScheduleDeliveryService>(ScheduleDeliveryService);

});

/*          PART 1 - START             */



//Sched(assis_id: string,needing_id: string,ite_id: string,location: string,date: string)
// -> ScheduleDeliveryEntity
