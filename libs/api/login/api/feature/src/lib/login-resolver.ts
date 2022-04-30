import { Resolver, Query } from '@nestjs/graphql';
import { LoginEntity } from '@charity-spot/api/login/service/feature';
import { LoginService } from '@charity-spot/api/login/service/feature';

@Resolver()
export class LoginResolver {
    constructor(private readonly LoginService: LoginService) {}

    @Query(() => [LoginEntity])
    InitStudent(): Promise<LoginEntity[]>{
        return this.LoginService.getName();
      }

}