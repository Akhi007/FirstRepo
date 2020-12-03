import { InputType, Field, ObjectType } from "type-graphql";


@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  age?: number;

  @Field({ nullable: true })
  location?: string;
}