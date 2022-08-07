import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class NotificationEntity {

    @Field({ nullable: true})
    temp: string

}