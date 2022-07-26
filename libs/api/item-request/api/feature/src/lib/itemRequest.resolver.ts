import { Resolver, Query, Args } from '@nestjs/graphql';
import { itemRequestEntity } from '@charity-spot/api/item-request/service/feature';
import { itemRequestService } from '@charity-spot/api/item-request/service/feature';

@Resolver()
export class ItemRequestResolver {
    constructor(private readonly itemRequestService: itemRequestService) {}

    @Query(() => itemRequestEntity)
    getOrgInfo(@Args('OrgID') OrgID: string){
        return this.itemRequestService.FindOrgInfo();
    }

    @Query(() => [itemRequestEntity])
    getAIPredic(@Args('Date') Date: string, @Args('itemType') itemType: string, @Args('location') location: string){
        return this.itemRequestService.getAIPredic(Date, itemType, location);
    }
}