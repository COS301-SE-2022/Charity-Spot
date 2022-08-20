import { Resolver, Query, Args } from '@nestjs/graphql';
import { NotificationEntity } from '@charity-spot/api/notification/service/feature'
import { NotificationService } from '@charity-spot/api/notification/service/feature';

@Resolver()
export class NotificationResolver {
    constructor(private readonly NotificationService: NotificationService) {}

    @Query(() => NotificationEntity)
    async notifications(
        @Args("user_id") u_id: string,
        @Args("whois") id: "ASSIST" | "NEED"
    ) {
        return await this.NotificationService.getNotifications(u_id, id);
    }

    @Query(() => NotificationEntity)
    async receiver(
        @Args("receiver_id") r_id: string
    ) {
        return await this.NotificationService.getReceiver(r_id);
    }

}