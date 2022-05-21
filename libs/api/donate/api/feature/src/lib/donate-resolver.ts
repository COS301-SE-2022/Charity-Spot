import { Resolver, Query, Args } from '@nestjs/graphql';
import { DonateEntity } from '@charity-spot/api/donate/service/feature';
import { DonateService } from '@charity-spot/api/donate/service/feature';

@Resolver()
export class DonateResolver {
    constructor(private readonly DonateService: DonateService) {}

    @Query(() => DonateEntity)
    testQ() : Promise<DonateEntity>{
        return this.DonateService.coolFunc();
    }
}