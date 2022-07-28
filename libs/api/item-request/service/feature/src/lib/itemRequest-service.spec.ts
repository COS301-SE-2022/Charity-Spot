import { Test, TestingModule } from '@nestjs/testing';
import { jest } from '@jest/globals'

import { itemRequestService } from './itemRequest.service';
import { itemRequestEntity } from './itemRequest.entity';

import { itemRequestRepository } from '@charity-spot/api/item-request/repository/feature';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';

const ItemRequestEntity = new itemRequestEntity();


describe('item Request Service', () => {

    let service: itemRequestService;
    let repository: itemRequestRepository;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [itemRequestService, itemRequestRepository, itemRequestEntity, PrismaService],
        }).compile();

        service = module.get<itemRequestService>(itemRequestService);

  });
  it('item Request service should be defined', () => {
    expect(service).toBeDefined();
  });
});


let resolver: itemRequestService;

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: 
    [itemRequestService, 
      itemRequestRepository,
      itemRequestEntity, 
      PrismaService, 
    ],
  }).compile();
  resolver = module.get<itemRequestService>(itemRequestService);
});

// PART 1 - START

//Test()
it('Tests', async () => {
    jest
        .spyOn(resolver,'Test')
        .mockImplementation((): Promise<itemRequestEntity> => Promise.resolve(ItemRequestEntity));
        expect(resolver.Test).not.toHaveBeenCalled();
        expect(await resolver.Test()).toMatchObject(ItemRequestEntity);
        expect(resolver.Test).toHaveBeenCalled();
});


//getAIPredic(Date : string, itemType : string, location : string)
it('Predicts the AI', async () => {
    jest
        .spyOn(resolver,'getAIPredic')
        .mockImplementation((): Promise<itemRequestEntity> => Promise.resolve(ItemRequestEntity));
        expect(resolver.getAIPredic).not.toHaveBeenCalled();
        expect(await resolver.getAIPredic("28-07-2022 08:57","Clothing","Pretoria")).toMatchObject(ItemRequestEntity);
        expect(resolver.getAIPredic).toHaveBeenCalled();

});

// PART 1 - END


// PART 2 - START


const record = {testDate:"28-07-2022 08:57", testitemType:"Clothing",testLocation:"Pretoria",testId:"item Request Working!"};

export class itemRequestServiceMock
    {
        Test()
            {
                const ret = new itemRequestEntity();
                ret.ID = "item Request Working!";

                return ret;
            }

        getAIPredic(Date : string, itemType : string, location : string)
            {
                const ret = new itemRequestEntity();
                ret.ID = "item Request Working!";

                return ret;
            }
    }

// PART 2 - END


// PART 3 - START

const servicemock = new itemRequestServiceMock();

describe('item Request Service Mock', () => {
    //Test()
    describe('Test()', () => {
        it('Should successfully test service', async () => {
            const expectedVal = new itemRequestEntity();
            expectedVal.ID = record.testId;
            const val = servicemock.Test();
            expect(expectedVal).toMatchObject(val);
        }); 
    });
   
    //getAIPredic(Date : string, itemType : string, location : string)
    describe('getAIPredic', () => {
        it('Should successfully predict using the AI', async () => {
            const expectedVal = new itemRequestEntity();
            expectedVal.ID = record.testId;
            const val = servicemock.getAIPredic(record.testDate,record.testitemType,record.testLocation);
            expect(expectedVal).toMatchObject(val);
        }); 
    });

 
    
});

// PART 3 - END
