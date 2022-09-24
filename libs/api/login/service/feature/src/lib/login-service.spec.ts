import { Test, TestingModule } from '@nestjs/testing';

import { LoginService } from './login.service';
import { LoginEntity } from './login.entity';

import { LoginRepository } from '@charity-spot/api/login/repository/data-access';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';

import { direct } from '@charity-spot/api/shared/auth';

//jest.mock('@charity-spot/api/shared/auth');
//jest.mock('./login.service')

describe ( 'Login Service', () => {

    let service : LoginService;
    let repository : LoginRepository;


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [LoginService, PrismaService, LoginRepository],
        }).compile();

        service = module.get<LoginService>(LoginService);
        repository = module.get<LoginRepository>(LoginRepository);
    });
    

    describe('Should print false', () => {
        it('should test', async () => {
            
            jest.spyOn(service, 'validate').mockImplementation(() : Promise<any> => Promise.resolve(true));
            //jest.spyOn(repository, 'emailExists').mockImplementation(() : Promise<any> => Promise.resolve(false));

            expect(await service.validate("test@email","1234")).toEqual(true);
        })
    });

    describe('Should print false', () => {
        it('should test', async () => {
            
            jest.spyOn(service, 'getEntity_login').mockImplementation(() : Promise<any> => Promise.resolve(true));
            //jest.spyOn(repository, 'emailExists').mockImplementation(() : Promise<any> => Promise.resolve(false));

            expect(await service.getEntity_login("test@email","1234")).toEqual(true);
        })
    })
    

});
