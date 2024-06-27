import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field({ nullable: true })
  name?: string;
  @Field({ nullable: true })
  desc?: string;
  @Field({ nullable: true })
  avatarUrl?: string;
}
