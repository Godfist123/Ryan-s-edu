import { OrgImage } from 'src/modules/orgImage/models/orgImage.entity';
import { IsNotEmpty } from 'class-validator';
import { CommonEntity } from 'src/share/entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Course } from 'src/modules/course/models/course.entity';

@Entity('organization')
export class Organization extends CommonEntity {
  @Column({
    comment: 'businessLicense',
  })
  @IsNotEmpty()
  businessLicense: string;

  @Column({
    comment: 'identityCardFrontImg',
  })
  @IsNotEmpty()
  identityCardFrontImg: string;

  @Column({
    comment: 'identityCardBackImg',
  })
  @IsNotEmpty()
  identityCardBackImg: string;

  @Column({
    type: 'text',
    comment: 'tags',
    nullable: true,
  })
  tags: string;

  @Column({
    type: 'text',
    comment: 'description',
    nullable: true,
  })
  description: string;

  @Column({
    comment: 'name',
    nullable: true,
    default: '',
  })
  name: string;

  @Column({
    comment: 'logo',
    nullable: true,
  })
  logo: string;

  @Column({
    comment: 'address',
    nullable: true,
  })
  address: string;

  @Column({
    comment: 'longitude',
    nullable: true,
  })
  longitude: string;

  @Column({
    comment: 'latitude',
    nullable: true,
  })
  latitude: string;

  @Column({
    comment: 'tel',
    nullable: true,
  })
  tel: string;

  @OneToMany(() => OrgImage, (orgImage) => orgImage.orgIdForFront, {
    cascade: true,
  })
  orgFrontImg?: OrgImage[];

  @OneToMany(() => OrgImage, (orgImage) => orgImage.orgIdForRoom, {
    cascade: true,
  })
  orgRoomImg?: OrgImage[];

  @OneToMany(() => OrgImage, (orgImage) => orgImage.orgIdForOther, {
    cascade: true,
  })
  orgOtherImg?: OrgImage[];

  @OneToMany(() => Course, (course) => course.org)
  courses?: Course[];
}
