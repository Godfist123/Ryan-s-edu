import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ClassType } from 'type-graphql';
import Page from './page.type';

interface Result<T> {
  code: number;
  message: string;
  data?: T;
}

interface ResultList<T> {
  code: number;
  message: string;
  data?: T[];
  page?: Page;
}

export function createResult<T extends object>(
  ItemType: ClassType<T>,
): ClassType<Result<T>> {
  @ObjectType()
  class factoryResult {
    @Field(() => Int)
    code: number;
    @Field(() => String)
    message: string;
    @Field(() => ItemType, { nullable: true })
    data?: T;
  }
  return factoryResult;
}

export function createResults<T extends object>(
  ItemType: ClassType<T>,
): ClassType<ResultList<T>> {
  @ObjectType()
  class factoryResultList {
    @Field(() => Int)
    code: number;
    @Field(() => String)
    message: string;
    @Field(() => [ItemType], { nullable: true })
    data?: T[];
    @Field(() => Page, { nullable: true })
    page?: Page;
  }
  return factoryResultList;
}
@ObjectType()
export class plainResult {
  @Field(() => Int)
  code: number;
  @Field(() => String)
  message: string;
  @Field(() => String, { nullable: true })
  token?: string;
}
