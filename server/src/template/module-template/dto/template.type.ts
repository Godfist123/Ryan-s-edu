import { CommonType } from 'src/share/dto/common.type';
import { Field, ObjectType } from '@nestjs/graphql';

/**
 * Template type
 */
@ObjectType()
export class TemplateType extends CommonType {
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
