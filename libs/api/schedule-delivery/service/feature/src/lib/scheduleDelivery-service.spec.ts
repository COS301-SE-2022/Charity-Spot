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

//const record = {testid:"dawdaddawd",testAssis:"fjkznfdsf",testNeeding:"esffrcv2d",
//testIte:"wdcxdfvrsa",testLocation:"Pretoria",testDate:"28-07-2022 0953"};
it('', async () => {
    jest
        .spyOn(resolver,'Sched')
        .mockImplementation( (): Promise<ScheduleDeliveryEntity> => Promise.resolve(scheduleDeliveryEntity));
        expect(resolver.Sched).not.toHaveBeenCalled();
        expect(await resolver.Sched("fjkznfdsf","esffrcv2d","wdcxdfvrsa","Pretoria","28-07-2022 0953")).toMatchObject(scheduleDeliveryEntity);
        expect(resolver.Sched).toHaveBeenCalled();
});

//History( userid: string)
// -> ScheduleDeliveryEntity
it('', async () => {
    jest
        .spyOn(resolver,'History')
        .mockImplementation( (): Promise<ScheduleDeliveryEntity> => Promise.resolve(scheduleDeliveryEntity));
        expect(resolver.History).not.toHaveBeenCalled();
        expect(await resolver.History("dawdaddawd")).toMatchObject(scheduleDeliveryEntity);
        expect(resolver.History).toHaveBeenCalled();
});


/*          PART 1 - END             */



/*          PART 2 - START             */
const record = {testid:"dawdaddawd",testAssis:"fjkznfdsf",testNeeding:"esffrcv2d",testIte:"wdcxdfvrsa",testLocation:"Pretoria",testDate:"28-07-2022 0953"};

export class ScheduleDeliveryServiceMock
    {
        Sched(assis_id: string,needing_id: string,ite_id: string,location: string,date: string)
            {
                const ret = new ScheduleDeliveryEntity();
                ret.id_1 = assis_id;
                ret.id_2 = needing_id;
                ret.id_item = ite_id;

                return ret;
            }
            
            
        History( userid: string)
            {
                const ret = new ScheduleDeliveryEntity();
                ret.id_1 = userid;
                ret.id_2 = "";
                ret.id_item = "";
                ret.History_ = [];

                return ret;
            }
    }


/*          PART 2 - END             */



/*          PART 3 - START             */
