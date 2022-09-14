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
  
  const testRecordOrg = {testId:"1234",testName:"Org1",testAddress:"271 Francis Street"};
const testRecordItems = {testId:"1234",testName:"Jeans",testType:"Clothing",testLocation:"Pretoria",testProvince:"Gauteng",testCity:"Hatfield"};

  export class HomeServiceMock
{

getAllOrg()
{
  	let returnOrg = [];
	let returnEnt = new HomeEntity();
            returnEnt.ID = "1234";
            returnEnt.Name = "Org1";
            returnEnt.Address = "271 Francis Street";
            returnOrg.push(returnEnt);
return returnOrg;
}
  
  getAllItems()
{
  let temp = new HomeEntity();
 let retItem : any = []
temp.OrgID = items[i].ID;
            temp.Name = "Jeans";
            temp.Type = "Clothing";
            temp.Location = "Pretoria";
            temp.Province = "Gauteng";
            temp.City = "Hatfield";
           
            retItem.push(temp);
return retItem;
  
}
  
}
  
  const servicemock = new HomeServiceMock();

describe('Home Service Mock', () => 
  {
    describe('Gets All Organisations', () => {
      it('Should get all organisations', async () => {
        const expectedVal : any = [];
        const val = servicemock.getAllOrg();
        expect(expectedVal).toBe(val);
      }); 
    });
});
