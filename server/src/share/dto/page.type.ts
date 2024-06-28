import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class Page {
  @Field(() => Int)
  start?: number;
  @Field(() => Int)
  total?: number;
  @Field(() => Int)
  pageSize?: number;
}
