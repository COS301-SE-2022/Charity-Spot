import { Test, TestingModule } from '@nestjs/testing';

import { LoginService } from './login.service';
import { LoginEntity } from './login.entity';

import { LoginRepository } from '@charity-spot/api/login/repository/data-access';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';



const loginEntity = new LoginEntity();

describe ( 'LoginService', () => {
    let service: LoginService;
    let repository: LoginRepository;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [LoginService, LoginRepository, PrismaService],
        }).compile();

        service = module.get<LoginService>(LoginService);

  });
  it('Login service should be defined', () => {
    expect(service).toBeDefined();
  });

    describe('getEntity_login()', () => {
        it('Should return a login entity', async () => {
            expect(await service.getEntity_login("seal@email", "123")).toMatchObject(loginEntity);
        });
    })

    describe('validate()', () => {
      it('Should return true', async () => {
          expect(await service.validate("seal@email", "123")).not.toEqual(false);
      });
  })

})