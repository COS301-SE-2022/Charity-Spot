import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class RegistEntity {
	@Field({nullable: true})
	ID_external: string

	@Field({nullable: true})
	ID_internal: string
}