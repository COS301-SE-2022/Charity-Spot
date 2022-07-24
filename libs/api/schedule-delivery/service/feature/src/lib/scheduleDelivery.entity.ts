import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ScheduleDeliveryEntity {
    @Field({ nullable: false })
    id_1: string

    @Field({nullable: false})
    id_2: string

    @Field({nullable: false})
    id_item: string


    //history
    @Field(() => [ScheduleDeliveryEntity], {nullable: true})
    History_: ScheduleDeliveryEntity[]
}