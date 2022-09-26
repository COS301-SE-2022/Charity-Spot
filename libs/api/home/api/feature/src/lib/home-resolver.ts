import { Resolver, Query, Args } from '@nestjs/graphql';
import { HomeEntity } from '@charity-spot/api/home/service/feature';
import { HomeService } from '@charity-spot/api/home/service/feature';

@Resolver()
export class HomeResolver {
    constructor(private readonly HomeService: HomeService) {}

    @Query(() => [HomeEntity])
    GetAllOrgs() : Promise<HomeEntity[]>{
        
        return this.HomeService.getAllOrg();
    }

    @Query(() => [HomeEntity])
    GetAllItems(){

        return this.HomeService.getAllItems();
    }

    /*@Query(() => [String])
    GetApiKey() {
        return this.HomeService.getKey();
    }*/
}