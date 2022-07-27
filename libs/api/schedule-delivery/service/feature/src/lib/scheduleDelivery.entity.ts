import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ScheduleDeliveryEntity {
    @Field({ nullable: true })
    id_1: string

    @Field({nullable: true})
    id_2: string

    @Field({nullable: true})
    id_item: string


    //history
    @Field(() => [ScheduleDeliveryEntity], {nullable: true})
    History_: ScheduleDeliveryEntity[]

    @Field({nullable: true})
    itemID: string

    @Field({nullable: true})
    itemName: string
}