import { Test, TestingModule } from '@nestjs/testing';

import { DonateService } from './donate.service';
import { DonateEntity } from './donate.entity';

import { DonateRepository } from '@charity-spot/api/donate/repository/data-access';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';
import { catagory, quality } from '@prisma/client';


const donateEntity = new DonateEntity();

describe ( 'DonateService', () => {

    let service: DonateService;
    let repository: DonateRepository;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [DonateService, DonateRepository, PrismaService],
        }).compile();

        service = module.get<DonateService>(DonateService);

  });
  it('Donate service should be defined', () => {
    expect(service).toBeDefined();
  });

//getItemPicDirec(itemID : string){
describe ('getItemPictureDirec()', () => {
    it('Successfully retrieved organisation picture ', async () => {
      expect(await service.getItemPicDirec("1")).toMatchObject(donateEntity);
    });
  })

  //history(id: string)
  describe ('history()', () => {
    it('Should be able to get donation history', async () => {
      expect(await service.history("1")).toMatchObject(donateEntity);
    });
  })

});
