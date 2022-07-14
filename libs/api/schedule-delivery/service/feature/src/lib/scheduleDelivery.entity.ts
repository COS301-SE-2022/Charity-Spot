import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ScheduleDeliveryEntity {
    @Field({ nullable: true })
    ID: string
}