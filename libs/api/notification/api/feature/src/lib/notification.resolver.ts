import { Resolver, Query, Args } from '@nestjs/graphql';
import { NotificationEntity } from '@charity-spot/api/notification/service/feature'
import { NotificationService } from '@charity-spot/api/notification/service/feature';

@Resolver()
export class NotificationResolver {
    constructor(private readonly NotificationService: NotificationService) {}

    @Query(() => NotificationEntity)
    async TestNotification(){
        return await this.NotificationService.Test();
    }

}