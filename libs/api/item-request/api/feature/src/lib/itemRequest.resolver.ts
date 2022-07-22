import { Resolver, Query, Args } from '@nestjs/graphql';
import { itemRequestEntity } from '@charity-spot/api/item-request/service/feature';
import { itemRequestService } from '@charity-spot/api/item-request/service/feature';

@Resolver()
export class ItemRequestResolver {
    constructor(private readonly itemRequestService: itemRequestService) {}

    @Query(() => itemRequestEntity)
    test(){
        return this.itemRequestService.Test();
    }

    @Query(() => itemRequestEntity)
    getAIInfo(){
        return this.itemRequestService.getAIInfo();
    }
}