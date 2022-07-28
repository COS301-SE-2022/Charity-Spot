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
