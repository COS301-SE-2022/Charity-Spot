
import { Test, TestingModule } from '@nestjs/testing';
import { jest } from '@jest/globals'

import { itemRequestService } from './itemRequest.service';
import { itemRequestEntity } from './itemRequest.entity';

import { itemRequestRepository } from '@charity-spot/api/item-request/repository/feature';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';
import { direct } from '@charity-spot/api/shared/auth';
describe( 'Comment Rating Service', () => {

    let service : itemRequestService;
    let repository : itemRequestRepository;


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [itemRequestService, PrismaService, itemRequestRepository],
        }).compile();

        service = module.get<itemRequestService>(itemRequestService);
        repository = module.get<itemRequestRepository>(itemRequestRepository);
    });

  
   //FindOrgInfo(OrgID)
   describe('FindOrgInfo', () => {
    it('Finds an organisations information', async () => {
        jest.spyOn(service, 'FindOrgInfo').mockImplementation(() : Promise<any> => Promise.resolve(true));
        expect(await service.FindOrgInfo("sda1w44")).toEqual(true);
    })
});

   //getAIPredic(Date : string, itemType : string, location : string)
   describe('getAIPredic', () => {
    it('Gets the AIs predictions', async () => {
        jest.spyOn(service, 'getAIPredic').mockImplementation(() : Promise<any> => Promise.resolve(true));
        expect(await service.getAIPredic("01-03-2022","Jeans","1234 Pretoria Street")).toEqual(true);
    })
});
