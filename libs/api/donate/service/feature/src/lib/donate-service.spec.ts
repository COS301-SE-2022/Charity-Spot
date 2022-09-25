import { Test, TestingModule } from '@nestjs/testing';

import { DonateService } from './donate.service';
import { DonateEntity } from './donate.entity';

import { DonateRepository } from '@charity-spot/api/donate/repository/data-access'
import { PrismaService } from '@charity-spot/api/shared/services/prisma';
import { catagory, quality } from '@prisma/client';

import { direct } from '@charity-spot/api/shared/auth';

describe( 'Comment Rating Service', () => {

    let service : DonateService;
    let repository : DonateRepository;


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [DonateService, PrismaService, DonateRepository],
        }).compile();

        service = module.get<DonateService>(DonateService);
        repository = module.get<DonateRepository>(DonateRepository);
    });


    //donate(id: string, name: string, quantity: number, category: catagory, condition: quality, descr: string)
    describe('donate', () => {
      it('Donates an item', async () => {
          jest.spyOn(service, 'donate').mockImplementation(() : Promise<any> => Promise.resolve(true));
          expect(await service.donate("wad5wa1","Jeans",5,catagory.CLOTHING,quality.USED,"These are five(5) Jeans")).toEqual(true);
      })
  });

    //setItemPicName(id, name, pic)
    describe('setItemPicName', () => {
      it('Sets the name of the items picture', async () => {
          jest.spyOn(service, 'setItemPicName').mockImplementation(() : Promise<any> => Promise.resolve(true));
          expect(await service.setItemPicName("sad1w4d5","awdwd.jpg","asdawdnadwad5d1ad5wad45")).toEqual(true);
      })
  });

    //getItemPicDirec(itemID : string)
    describe('getItemPicDirec', () => {
      it('Gets the item pictures directory', async () => {
          jest.spyOn(service, 'getItemPicDirec').mockImplementation(() : Promise<any> => Promise.resolve(true));
          expect(await service.getItemPicDirec("sdaw54a5")).toEqual(true);
      })
  });

    //history(id: string)
    describe('history', () => {
      it('Gets the history', async () => {
          jest.spyOn(service, 'history').mockImplementation(() : Promise<any> => Promise.resolve(true));
          expect(await service.history("awda4d4a5")).toEqual(true);
      })
  });


  });
