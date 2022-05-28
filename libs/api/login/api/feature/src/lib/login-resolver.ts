import { Resolver, Query, Args } from '@nestjs/graphql';
import { LoginEntity } from '@charity-spot/api/login/service/feature';
import { LoginService } from '@charity-spot/api/login/service/feature';

import { FirebaseService } from '@charity-spot/api/shared/services/prisma';

@Resolver()
export class LoginResolver {
    constructor(private readonly LoginService: LoginService, private readonly FirebaseService: FirebaseService) {}

    @Query(() => LoginEntity)
    login(@Args('email') email: string, @Args('password') password: string) : Promise<LoginEntity>{

        this.FirebaseService.uploadFile();
        
        return this.LoginService.getEntity_login(email, password);
    }
}