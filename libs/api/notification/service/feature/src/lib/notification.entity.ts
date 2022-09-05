import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ChatEntity } from '@charity-spot/api/chat/service/feature';
import { ScheduleDeliveryEntity} from '@charity-spot/api/schedule-delivery/service/feature'

@ObjectType()
export class NotificationEntity {

    @Field({nullable: true})
    ID: string

    @Field({nullable: true})
    Name: string

    @Field({nullable: true})
    ProfilePicture: string

    @Field(() => [ChatEntity], {nullable: true})
    Threads: ChatEntity[]

    @Field(() => [ScheduleDeliveryEntity],{nullable: true})
    Delivery: ScheduleDeliveryEntity[]

}