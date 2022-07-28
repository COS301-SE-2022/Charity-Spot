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
});


    let resolver: LoginService;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [

            ],
        }).compile();
        resolver = module.get<LoginService>(LoginService);
    });

    it('Should be truthy', async () => {
        jest
            .spyOn(resolver, 'validate')
            .mockImplementation();
            expect(resolver.validate).not.toHaveBeenCalled();
            expect(await resolver.validate("test@email.com","123")).toBeFalsy();
            expect(resolver.validate).toHaveBeenCalled();
    });

const record = {testEmail:"test@email.com",testPass:"123",testId:"cl62huz0m0002f6ynu0z40get"}

class LoginService_input_Mock {
    email: string;
    pass: string;
    id: string;
};

const LoginService_DTO = {
    email:"test@email.com",
    pass:"123",
    id:"cl62huz0m0002f6ynu0z40get",
};

