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


it('Org does not exist',async () => {
  jest
    .spyOn(resolver,'doesNotExist')
    .mockImplementation( (): Promise<boolean> => Promise.resolve(true));
    expect(resolver.doesNotExist).not.toHaveBeenCalled();
    expect(await resolver.doesNotExist("lk@gmail.com", "acdvdf")).toEqual(true);
    expect(resolver.doesNotExist).toHaveBeenCalled();

});

it('Adds user',async () => {
  jest
    .spyOn(resolver,'addUser')
    .mockImplementation( (): Promise<string|null> => Promise.resolve("lk@gmail.com"));
    expect(resolver.addUser).not.toHaveBeenCalled();
    expect(await resolver.addUser("lk@gmail.com", "acdvdf")).toEqual("lk@gmail.com");
    expect(resolver.addUser).toHaveBeenCalled();

});


/* */
/*
it('Alter NGO Num',async () => {
  jest
    .spyOn(resolver,'alterNGONum')
    //.mockImplementation( () => true);
    //.mockImplementation( (): Promise<boolean> => boolean);
    //.mockImplementation( (): Promise<string|null> => Promise.resolve("lk@gmail.com"));
    .mockImplementation( (): Promise<string> => Promise.resolve("lk@gmail.com"));
    expect(resolver.addUser).not.toHaveBeenCalled();
    //expect(await resolver.addUser("lk@gmail.com", "acdvdf")).toEqual(true);
    expect(await resolver.addUser("lk@gmail.com", "acdvdf")).toEqual("lk@gmail.com");
    expect(resolver.addUser).toHaveBeenCalled();

});*/

it('Adds an org',async () => {
  jest
    .spyOn(resolver,'addOrg')
    //.mockImplementation( () => true);
    //.mockImplementation( (): Promise<boolean> => boolean);
    //.mockImplementation( (): Promise<string|null> => Promise.resolve("lk@gmail.com"));
    .mockImplementation( (): Promise<string|null> => Promise.resolve("SUCCESS"));
    expect(resolver.addOrg).not.toHaveBeenCalled();
    //expect(await resolver.addUser("lk@gmail.com", "acdvdf")).toEqual(true);
    expect(await resolver.addOrg("cl62huz0m0002f6ynu0z40get", "org 1")).toEqual("SUCCESS");
    //expect(await resolver.addOrg("cl62huz0m0002f6ynu0z40get", "org 1")).toEqual("lk@gmail.com");
    expect(resolver.addOrg).toHaveBeenCalled();

});

it('Adds a picture',async () => {
  jest
    .spyOn(resolver,'addPicture')
    //.mockImplementation( () => true);
    //.mockImplementation( (): Promise<boolean> => boolean);
    //.mockImplementation( (): Promise<string|null> => Promise.resolve("lk@gmail.com"));
    .mockImplementation( () => null);
    expect(resolver.addPicture).not.toHaveBeenCalled();
    //expect(await resolver.addUser("lk@gmail.com", "acdvdf")).toEqual(true);
    expect(await resolver.addPicture("cl62huz0m0002f6ynu0z40get","org 1","sadwdad")).toBeNull();
    //expect(await resolver.addOrg("cl62huz0m0002f6ynu0z40get", "org 1")).toEqual("lk@gmail.com");
    expect(resolver.addPicture).toHaveBeenCalled();

});


const record = {testName:"org 1",testEmail:"lk@gmail.com",testPass: "acdvdf",testid: "cl62huz0m0002f6ynu0z40get",testOrgNum:"1",testDesc:" this is a test description for org 1",testAdress:"123 test Address 1"};
const recordUpdate = {testName:"org 2",testEmail:"lk@gmail.com",testPass: "acdvdf",testid: "cl62huz0m0002f6ynu0z40get",testOrgNum:"1",testDesc:" this is a test description for org 2",testAdress:"456 test Address 2"};

export class RegistrationServiceMock
  {
    doesNotExist(email : string, password : string)
      {
        if(email.match(record.testEmail) && (password.match(record.testPass)))
          {
            return false;
          }
        else
          {
            return true;
          }
      }
