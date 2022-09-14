import { Test, TestingModule } from '@nestjs/testing';

import { HomeService } from './home.service';
import { HomeEntity } from './home.entity';

import { HomeRepository } from '@charity-spot/api/home/repository/data-access';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';



const homeEntity = new HomeEntity();
let te : HomeEntity [] = [new HomeEntity];

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
         let resolver: HomeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: 
      [HomeService, 
        HomeRepository,
        HomeEntity, 
        PrismaService, 
        LoginService, 
        LoginRepository
      ],
    }).compile();
    resolver = module.get<HomeService>(HomeService);
  });            

  //getAllOrg()     
it('Gets All organisations',async () => {
  jest
    .spyOn(resolver,'getAllOrg')
    .mockImplementation( (): Promise<boolean> => Promise.resolve(true));
    expect(resolver.getAllOrg).not.toHaveBeenCalled();
    expect(await resolver.getAllOrg()).toBe(Any);
    expect(resolver.getAllOrg).toHaveBeenCalled();

});

  
  //getAllItems()
it('Gets all items',async () => {
  jest
    .spyOn(resolver,'getAllItems')
    .mockImplementation( (): Promise<boolean> => Promise.resolve(true));
    expect(resolver.getAllItems).not.toHaveBeenCalled();
    expect(await resolver.getAllItems()).toBe(Any);
    expect(resolver.getAllItems).toHaveBeenCalled();

});
});
