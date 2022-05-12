import { Test, TestingModule } from '@nestjs/testing';

import { RegistrationService } from './regist.service';
import { RegistEntity } from './regist-entity';

import { LoginService } from '@charity-spot/api/login/service/feature';
import { LoginRepository } from '@charity-spot/api/login/repository/data-access';

import { RegistrationRepository } from '@charity-spot/api/registration/repository/data-access';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';



const RegistrationEntity = new RegistEntity();

describe ( 'Registration Service', () => {
    let service: RegistrationService;
    let repository: RegistrationRepository;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [RegistrationService, RegistrationRepository, PrismaService, LoginService, LoginRepository],
        }).compile();

        service = module.get<RegistrationService>(RegistrationService);

  });
  it('Registration service should be defined', () => {
    expect(service).toBeDefined();
  });

    ///////////////

/*
describe('', () => {
  it('', async () => {

  }); 
})
*/


//doesNotExist("lk@gmail.com", "acdvdf")
describe('Org does not exist', () => {
  it('The Organisation should not already exist', async () => {
      expect(await service.doesNotExist("lk@gmail.com", "acdvdf")).toEqual(true);
  }); 
})

  //addUser("lk@gmail.com", "acdvdf")
describe('Adding User', () => {
  it('A new User should be added', async () => {
    expect(await service.addUser("lk@gmail.com", "acdvdf")).not.toBeNull;
  }); 
})

  
  //alterNGONum("1","125dawdf")
describe('Altering the NGO number', () => {
  it('Successfully altered the NGO number', async () => {
    expect(await service.alterNGONum("1","125dawdf"))
  }); 
})   

//alterDescr("1","This is an NGO that supplies food and clothes")
describe('Altering the description', () => {
  it('Successfully altered the description', async () => {
      expect(await service.alterDescr("1","This is an NGO that supplies food and clothes")).toEqual(expect.any(String));
  }); 
})
