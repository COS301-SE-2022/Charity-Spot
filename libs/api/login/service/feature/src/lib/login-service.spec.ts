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

  describe('sum()', () => {
        it('Should add two numbers together', async () => {
            expect(await service.sum(1,2)).toEqual(
                3
            )
        });
    })

    describe('getName()', () => {
        it('Should return a login entity', async () => {
            expect(await service.getName()).toMatchObject(loginEntity);
        });
    })

})
