import { Test, TestingModule } from '@nestjs/testing';
import { jest } from '@jest/globals'

import { OrganisationService } from './organisation.service';
import { OrganisationEntity } from './organisation.entity';

import { OrganisationRepository } from '@charity-spot/api/organisation-profile/repository/data-access';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';
import { identity } from 'rxjs';



const organisationEntity = new OrganisationEntity();

describe ( 'Organisation Service', () => {
    let service: OrganisationService;
    let repository: OrganisationRepository;
    let prisma: PrismaService;
    let entity: OrganisationEntity;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [OrganisationService, OrganisationRepository, OrganisationEntity, PrismaService],
        }).compile();

        service = module.get<OrganisationService>(OrganisationService);

  });
  it('Organisation service should be defined', () => {
    expect(service).toBeDefined();
  });
});


  let resolver: OrganisationService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganisationService,
        OrganisationService,
        OrganisationService,
        OrganisationEntity,
        OrganisationRepository,
        PrismaService,
      ],
    }).compile();
    resolver = module.get<OrganisationService>(OrganisationService);
  });

  //getOrgProfile(userID: string)
/*it('Should Match an Organisation Profile', async () => { 
  jest
    .spyOn(resolver,'getOrgProfile')
    //.mockImplementation(() => Promise<OrganisationEntity>);
    .mockImplementation((userID: string) => OrganisationEntity{
    
    });
    expect(resolver.getOrgProfile).not.toHaveBeenCalled();
    expect(await resolver.getOrgProfile("cl62huz0m0002f6ynu0z40get")).toMatchObject(organisationEntity)
    expect(resolver.getOrgProfile).toHaveBeenCalled();
});*/

//updateDet(id: string, name: string, loc: string, picture: string, password: string)
/*it('Should Match an Organisation Entity', async () => {
jest
  .spyOn(resolver,'updateDet')
  .mockImplementation();
  expect(resolver.updateDet).not.toHaveBeenCalled();
  expect(await service.updateDet("cl62huz0m0002f6ynu0z40get","test","Pretoria","asdadwdadddd","123")).toMatchObject(organisationEntity);
  expect(resolver.updateDet).toHaveBeenCalled();
});*/


//getDonations(id: string)
it('Should be Null', async () => {
  jest
    .spyOn(resolver,'getDonations')
    .mockImplementation(() => null);
    expect(resolver.getDonations).not.toHaveBeenCalled();
    expect(await resolver.getDonations("cl62huz0m0002f6ynu0z40get")).toBeNull();
    expect(resolver.getDonations).toHaveBeenCalled();
});


const record = {testId: "cl62huz0m0002f6ynu0z40get", testName:"test", testLocation:"Pretoria", testPicture:"asdadwdadddd", testPass:"123",testEmail:"test@email.com"};
const recordUpdate = {testId: "cl62huz0m0002f6ynu0z40get", testName:"test 2", testLocation:"Pretoria", testPicture:"asdadwdadddd", testPass:"123",testEmail:"test@email.com"};

class OrganisationService_input_Mock {
  id: string;
  name: string;
  location: string;
  Picture: string;
  pass: string;
};

const OrganisationService_DTO = {
  id: "cl62huz0m0002f6ynu0z40get",
  name:"test",
  location:"Pretoria",
  Picture:"asdadwdadddd",
  pass:"123",
};

export class OrganisationServiceMock 
  {
    getOrgProfile(userID: string) 
      {
        const orgProfile = new OrganisationEntity();
        const orgName = "test";
        const orgEmail = "test@email.com";
        const orgLocation = "Pretoria";

        orgProfile.Email = orgEmail;
        orgProfile.Name = orgName;
        orgProfile.Location =  orgLocation;

        if(userID.match(record.testId))
          {
            return orgProfile;
          }
        else
          {
            return null;
          }
      }


    updateDet(id: string, name: string, loc: string, picture: string, password: string)
      {
        if(id != null)
          {
            recordUpdate.testId = id;
          }

        if(name != null)
          {
            recordUpdate.testName = name;
          }

        if(loc != null)
          {
            recordUpdate.testLocation = loc;
          }

        if(picture != null)
          {
            recordUpdate.testPicture = picture;
          }

        if(password != null)
          {
            recordUpdate.testPass = password;
          }

          const orgProfileUpdate = new OrganisationEntity();

        /* */

        const orgName = recordUpdate.testName;

        const orgEmail = recordUpdate.testEmail;
        const orgLocation = recordUpdate.testLocation;


        orgProfileUpdate.Email = orgEmail;
        orgProfileUpdate.Name = orgName;

        orgProfileUpdate.Location =  orgLocation;
        return orgProfileUpdate;

      }
      
      
    getDonations(id: string)
      {
        return null;
      }
  }
  
  
  const servicemock = new OrganisationServiceMock();

describe(' Organisation Service Mock', () => 
  {
    describe('getOrgProfile()', () => 
      {
        it('Should return Organisation Profile', async () => 
          {
            const someEntity = servicemock.getOrgProfile(record.testId);
            console.log(someEntity);
            const expectedEntity = new  OrganisationEntity();
            expect(someEntity).toMatchObject(expectedEntity);
          });
      });

    describe('updateDet', () => 
      {
        it('Should update the description', async () => 
          {
            const someEntity = servicemock.updateDet("1","test org","Johannesburg","asdadwdagbd","12345");
            console.log(someEntity);
            const expectedEntity = new  OrganisationEntity();
            expect(someEntity).toMatchObject(expectedEntity);
          });
      });


    describe('Get Donations', () => 
      {
        it('Should return null', async () => 
          {
            const val = servicemock.getDonations(record.testId);
            const expectedValue = null;
            expect(val).toBe(expectedValue);
          });
      });
  });
