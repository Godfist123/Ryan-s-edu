import { CommonType } from 'src/share/dto/common.type';
import { OrgImageType } from 'src/modules/orgImage/dto/orgImage.output';
import { Field, ObjectType } from '@nestjs/graphql';

/**
 * 学员
 */
@ObjectType()
export class OrganizationType extends CommonType {
  @Field({
    description: 'businessLicense',
  })
  businessLicense: string;

  @Field({
    description: 'identityCardFrontImg',
  })
  identityCardFrontImg: string;

  @Field({
    description: 'identityCardBackImg',
  })
  identityCardBackImg: string;

  @Field({
    description: 'tags',
    nullable: true,
  })
  tags: string;

  @Field({
    description: 'description',
    nullable: true,
  })
  description: string;

  @Field({
    description: 'name',
    nullable: true,
  })
  name: string;

  @Field({
    description: 'logo',
    nullable: true,
  })
  logo: string;

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
    description: 'address',
    nullable: true,
  })
  address?: string;

  @Field({
    description: 'tel',
    nullable: true,
  })
  tel: string;

  @Field(() => [OrgImageType], { nullable: true, description: 'orgFrontImg' })
  orgFrontImg?: OrgImageType[];

  @Field(() => [OrgImageType], { nullable: true, description: 'orgRoomImg' })
  orgRoomImg?: OrgImageType[];

  @Field(() => [OrgImageType], { nullable: true, description: 'orgOtherImg' })
  orgOtherImg?: OrgImageType[];
}
