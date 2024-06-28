import { CommonType } from 'src/share/dto/common.type';
import { Field, ObjectType } from '@nestjs/graphql';

/**
 * student type
 */
@ObjectType()
export class StudentType extends CommonType {
  @Field({
    description: 'nickname',
    nullable: true,
  })
  name: string;

  @Field({
    description: 'tel',
    nullable: true,
  })
  tel: string;

  @Field({
    description: 'avatar',
    nullable: true,
  })
  avatar: string;

  @Field({
    description: 'account',
    nullable: true,
  })
  account: string;
}
