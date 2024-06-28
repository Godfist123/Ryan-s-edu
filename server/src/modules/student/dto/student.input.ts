import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class StudentInput {
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
