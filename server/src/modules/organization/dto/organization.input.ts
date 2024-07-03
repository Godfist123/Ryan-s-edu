import { OrgImageInput } from './../../orgImage/dto/orgImage.input';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class OrganizationInput {
  @Field({
    description: 'name',
  })
  name: string;

  @Field({
    description: 'logo',
  })
  logo: string;

  @Field({
    description: 'tel',
    nullable: true,
  })
  tel: string;

  @Field({
    description: 'tags',
    nullable: true,
  })
  tags: string;

  @Field({
    description: 'longitude',
    nullable: true,
  })
  longitude: string;

  @Field({
    description: 'latitude',
    nullable: true,
  })
  latitude: string;

  @Field({
    description: 'latitude',
    nullable: true,
  })
  address: string;

  @Field({
    description: 'businessLicense',
  })
  businessLicense: string;

  @Field({
    description: 'description',
  })
  description: string;

  @Field({
    description: 'identityCardFrontImg',
  })
  identityCardFrontImg: string;

  @Field({
    description: 'identityCardBackImg',
  })
  identityCardBackImg: string;

  @Field(() => [OrgImageInput], {
    nullable: true,
    description: 'orgFrontImg',
  })
  orgFrontImg?: OrgImageInput[];

  @Field(() => [OrgImageInput], {
    nullable: true,
    description: 'orgRoomImg',
  })
  orgRoomImg?: OrgImageInput[];

  @Field(() => [OrgImageInput], {
    nullable: true,
    description: 'orgOtherImg',
  })
  orgOtherImg?: OrgImageInput[];
}
