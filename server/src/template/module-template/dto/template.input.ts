import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TemplateInput {
  @Field({
    description: 'nickname',
  })
  name: string;

  @Field({
    description: 'tel',
  })
  tel: string;

  @Field({
    description: 'avatar',
  })
  avatar: string;
}
