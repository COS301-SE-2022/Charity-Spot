import { Resolver, Query, Args } from '@nestjs/graphql';
import { HomeEntity } from '@charity-spot/api/home/service/feature';
import { HomeService } from '@charity-spot/api/home/service/feature';

@Resolver()
export class HomeResolver {
    constructor(private readonly HomeService: HomeService) {}

    @Query(() => HomeEntity)
    Test(@Args('email') email: string) : Promise<HomeEntity>{
        
        return this.HomeService.testHome();
    }
}