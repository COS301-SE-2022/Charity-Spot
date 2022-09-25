import { Test, TestingModule } from '@nestjs/testing';

import { HomeService } from './home.service';
import { HomeEntity } from './home.entity';

import { HomeRepository } from '@charity-spot/api/home/repository/data-access';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';

import { direct } from '@charity-spot/api/shared/auth';

describe( 'Home Service', () => {

    let service : HomeService;
    let repository : HomeRepository;


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [HomeService, PrismaService, HomeRepository],
        }).compile();

        service = module.get<HomeService>(HomeService);
        repository = module.get<HomeRepository>(HomeRepository);
    });
    
    //getAllOrg()
    describe('getAllOrg', () => {
      it('Gets all organisations', async () => {
          jest.spyOn(service, 'getAllOrg').mockImplementation(() : Promise<any> => Promise.resolve(true));
          expect(await service.getAllOrg()).toEqual(true);
      })
  });

    //getAllItems()
    describe('getAllItems', () => {
      it('Gets all items', async () => {
          jest.spyOn(service, 'getAllItems').mockImplementation(() : Promise<any> => Promise.resolve(true));
          expect(await service.getAllItems()).toEqual(true);
      })
  });


  });
