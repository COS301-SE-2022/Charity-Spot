import { Test, TestingModule } from '@nestjs/testing';
import { jest } from '@jest/globals'

import { RegistrationService } from './regist.service';
import { RegistEntity } from './regist-entity';

import { LoginService } from '@charity-spot/api/login/service/feature';
import { LoginRepository } from '@charity-spot/api/login/repository/data-access';

import { RegistrationRepository } from '@charity-spot/api/registration/repository/data-access';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';
import { Console } from 'console';



const RegistrationEntity = new RegistEntity();

describe ( 'Registration Service', () => {
    let service: RegistrationService;
    let repository: RegistrationRepository;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [RegistrationService, RegistrationRepository,RegistEntity, PrismaService, LoginService, LoginRepository],
        }).compile();

        service = module.get<RegistrationService>(RegistrationService);

  });
  it('Registration service should be defined', () => {
    expect(service).toBeDefined();
  });
});

  let resolver: RegistrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: 
      [RegistrationService, 
        RegistrationRepository,
        RegistEntity, 
        PrismaService, 
        LoginService, 
        LoginRepository
      ],
    }).compile();
    resolver = module.get<RegistrationService>(RegistrationService);
  });

/*
it('',async () => {
  jest
    .spyOn(resolver,'')
    .mockImplementation( () => );
    expect(resolver.).not.toHaveBeenCalled();

    expect(resolver.).toHaveBeenCalled();

});
*/
