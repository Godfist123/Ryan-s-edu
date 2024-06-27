import { Field, ObjectType } from '@nestjs/graphql';
import { createResult } from 'src/dto/result.type';

@ObjectType()
class User {
  @Field()
  tel: string;

  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  account: string;

  @Field()
  desc: string;

  @Field({ nullable: true })
  avatarUrl: string;
}
@ObjectType()
export class getUserByToken extends createResult(User) {}
