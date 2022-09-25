import { Test, TestingModule } from '@nestjs/testing';
import { jest } from '@jest/globals'

import { RegistrationService } from './regist.service';
import { RegistEntity } from './regist-entity';

import { LoginService } from '@charity-spot/api/login/service/feature';
import { LoginRepository } from '@charity-spot/api/login/repository/data-access';

import { RegistrationRepository } from '@charity-spot/api/registration/repository/data-access';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';
import { Console } from 'console';

describe( 'Registration Service', () => {

  let service : RegistrationService;
  let repository : RegistrationRepository;


  beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [RegistrationService, PrismaService, RegistrationRepository],
      }).compile();

      service = module.get<RegistrationService>(RegistrationService);
      repository = module.get<RegistrationRepository>(RegistrationRepository);
  });

	//regClient(id: string, flier: string, pin: string, hack: string)
	describe('regClient', () => {
    it('Registers a client', async () => {
        jest.spyOn(service, 'regClient').mockImplementation(() : Promise<any> => Promise.resolve(true));
        expect(await service.regClient("asdw525wd","12456322","542412","awjkdajk45")).toEqual(true);
    })
});

  //regOrg(badge: string, relay: string, rendezvous: string, riddle: string)
  describe('regOrg', () => {
    it('Registers an Organisation', async () => {
        jest.spyOn(service, 'regOrg').mockImplementation(() : Promise<any> => Promise.resolve(true));
        expect(await service.regOrg("awdadawda4a4","1254","5454544s","wda455wd45w")).toEqual(true);
    })
});
