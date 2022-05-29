import { Resolver, Query, Args } from '@nestjs/graphql';
import { LoginEntity } from '@charity-spot/api/login/service/feature';
import { LoginService } from '@charity-spot/api/login/service/feature';

@Resolver()
export class LoginResolver {
    constructor(private readonly LoginService: LoginService) {}

    @Query(() => LoginEntity)
    login(@Args('email') email: string, @Args('password') password: string) : Promise<LoginEntity>{
        
        return this.LoginService.getEntity_login(email, password);
    }
}