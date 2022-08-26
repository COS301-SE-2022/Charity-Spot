import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommentRatingEntity {
    @Field({ nullable: true })
    ID: string
}