import { Test, TestingModule } from '@nestjs/testing';

import { HomeService } from './home.service';
import { HomeEntity } from './home.entity';

import { HomeRepository } from '@charity-spot/api/home/repository/data-access';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';



const homeEntity = new HomeEntity();

describe ( 'Home Service', () => {
    let service: HomeService;
    let repository: HomeRepository;
    let prisma: PrismaService;
    let entity: HomeEntity;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [HomeService, HomeRepository, PrismaService, HomeEntity],
        }).compile();

        service = module.get<HomeService>(HomeService);

  });
  it('Home service should be defined', () => {
    expect(service).toBeDefined();
  });
                   
describe('getAllOrg()', () => {
    it('Succesffuly retrieved all organisations', async () => {
        expect(await service.getAllOrg()).toMatchObject(Array);
    });
})

});
