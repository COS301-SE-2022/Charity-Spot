import { Test, TestingModule } from '@nestjs/testing';
import { jest } from '@jest/globals'

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
          providers: [DonateService, DonateRepository, DonateEntity, PrismaService],
        }).compile();

        service = module.get<DonateService>(DonateService);

  });
  it('Donate service should be defined', () => {
    expect(service).toBeDefined();
  });
});

let resolver: DonateService;

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: 
    [DonateService, 
      DonateRepository,
      DonateEntity, 
      PrismaService, 
    ],
  }).compile();
  resolver = module.get<DonateService>(DonateService);
});

// PART 1 - START

//getItemPicDirec(itemID : string)
it('Should retireve organisation picture',async () => {
  jest
    .spyOn(resolver,'getItemPicDirec')
    .mockImplementation( (): Promise<DonateEntity> => Promise.resolve(donateEntity));
    expect(resolver.getItemPicDirec).not.toHaveBeenCalled();
    expect(await resolver.getItemPicDirec("asdd13dw5a")).toMatchObject(donateEntity);
    expect(resolver.getItemPicDirec).toHaveBeenCalled();

});
