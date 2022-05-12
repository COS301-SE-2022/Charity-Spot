import { Test, TestingModule } from '@nestjs/testing';

import { OrganisationService } from './organisation.service';
import { OrganisationEntity } from './organisation.entity';

import { OrganisationRepository } from '@charity-spot/api/organisation-profile/repository/data-access';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';



const loginEntity = new OrganisationEntity();

describe ( 'LoginService', () => {
    let service: OrganisationService;
    let repository: OrganisationRepository;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [OrganisationService, OrganisationRepository, PrismaService],
        }).compile();

        service = module.get<OrganisationService>(OrganisationService);

  });
  it('Login service should be defined', () => {
    expect(service).toBeDefined();
  });

    describe('validate()', () => {
        console.log("hello world2");
    })

})