import { Test, TestingModule } from '@nestjs/testing';

import { OrganisationService } from './organisation.service';
import { OrganisationEntity } from './organisation.entity';

import { OrganisationRepository } from '@charity-spot/api/organisation-profile/repository/data-access';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';



const orgEntity = new OrganisationEntity();

describe ( 'OrganisationService', () => {
    let service: OrganisationService;
    let repository: OrganisationRepository;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [OrganisationService, OrganisationRepository, PrismaService],
        }).compile();

        service = module.get<OrganisationService>(OrganisationService);

  });
  it('Organisation service should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Get Organisation Profile', () => {
    it('Should return Organisation Profile', async () => {
      expect(await service.getOrgProfile("cl33fox950013e0ch8f7aeurw")).toMatchObject(orgEntity);
    });        
})

})