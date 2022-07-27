import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class RegistEntity {
	@Field({nullable: true})
	ID: string
}