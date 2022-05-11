import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginEntity {
    @Field({ nullable: true })
    Name: string;

    @Field({ nullable: true })
    UserID: string;
}