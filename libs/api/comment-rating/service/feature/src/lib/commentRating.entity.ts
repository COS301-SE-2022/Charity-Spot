import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommentRatingEntity {
    @Field({ nullable: false })
    AssistID: string

    @Field(() => [String], {nullable: true})
    Clients: string[]

    @Field(() => [Number], {nullable: true})
    Ratings: number[]

    @Field(() => [String], {nullable: true})
    Comments: string[]

    @Field(() => String, {nullable: true})
    Name: string

    @Field(() => [String], {nullable: true})
    ClientNames: string[]

    @Field(() => Number, {nullable: true})
    Avg: Number
}