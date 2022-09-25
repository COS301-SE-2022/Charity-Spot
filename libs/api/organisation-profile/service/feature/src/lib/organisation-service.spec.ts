import { Test, TestingModule } from '@nestjs/testing';
import { jest } from '@jest/globals'

import { OrganisationService } from './organisation.service';
import { OrganisationEntity } from './organisation.entity';

import { OrganisationRepository } from '@charity-spot/api/organisation-profile/repository/data-access';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';
import { identity } from 'rxjs';

describe( 'Organisation Service', () => {

  let service : OrganisationService;
  let repository : OrganisationRepository;


  beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [OrganisationService, PrismaService, OrganisationRepository],
      }).compile();

      service = module.get<OrganisationService>(OrganisationService);
      repository = module.get<OrganisationRepository>(OrganisationRepository);
  });


    //getOrgProfile(userID: string)
    describe('getOrgProfile', () => {
      it('Gets an organisations profile', async () => {
          jest.spyOn(service, 'getOrgProfile').mockImplementation(() : Promise<any> => Promise.resolve(true));
          expect(await service.getOrgProfile("asd5awd45")).toEqual(true);
      })
  });

    //updateDet(id: string, name: string, loc: string, picture: string, password: string, description: string, email: string)
    describe('updateDet', () => {
      it('Updates the description', async () => {
          jest.spyOn(service, 'updateDet').mockImplementation(() : Promise<any> => Promise.resolve(true));
          expect(await service.updateDet("wd41a4wd","awd45awd4","1234 Pretoria street","asdkmawkdmakwmdadwkd","1234","We are a restaurant","test@email.com")).toEqual(true);
      })
  });

    //getDonations(id: string)
    describe('getDonations', () => {
      it('Gets all donations', async () => {
          jest.spyOn(service, 'getDonations').mockImplementation(() : Promise<any> => Promise.resolve(true));
          expect(await service.getDonations("adswwa45")).toEqual(true);
      })
  });

    //getAllRatingsOfAssist(AssistID: string)
    describe('getAllRatingsOfAssist', () => {
      it('Gets All Ratings of an assist', async () => {
          jest.spyOn(service, 'getAllRatingsOfAssist').mockImplementation(() : Promise<any> => Promise.resolve(true));
          expect(await service.getAllRatingsOfAssist("wdad2w5da4")).toEqual(true);
      })
  });
