import { Test, TestingModule } from '@nestjs/testing';

import { OrganisationService } from './organisation.service';
import { OrganisationEntity } from './organisation.entity';

import { OrganisationRepository } from '@charity-spot/api/organisation-profile/repository/data-access';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';



const organisationEntity = new OrganisationEntity();

describe ( 'Organisation Service', () => {
    let service: OrganisationService;
    let repository: OrganisationRepository;
    let prisma: PrismaService;
    let entity: OrganisationEntity;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [OrganisationService, OrganisationRepository, PrismaService, OrganisationEntity],
        }).compile();

        service = module.get<OrganisationService>(OrganisationService);

  });
  it('Organisation service should be defined', () => {
    expect(service).toBeDefined();
  });


  //getOrgProfile(userID: string)
    describe('Get Organisation Profile', () => {
        it('Should return Organisation Profile', async () => {
          expect(await service.getOrgProfile("1")).toMatchObject(entity);
        });        
    })
