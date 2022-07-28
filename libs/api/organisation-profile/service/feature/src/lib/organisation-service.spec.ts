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
