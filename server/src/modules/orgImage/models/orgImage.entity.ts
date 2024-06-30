import { Organization } from 'src/modules/organization/models/organization.entity';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('org_image')
export class OrgImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    comment: '地址',
  })
  @IsNotEmpty()
  url: string;

  @Column({
    comment: 'remark',
    nullable: true,
  })
  remark: string;

  @ManyToOne(() => Organization, (org) => org.orgFrontImg)
  orgIdForFront: Organization;

  @ManyToOne(() => Organization, (org) => org.orgRoomImg)
  orgIdForRoom: Organization;

  @ManyToOne(() => Organization, (org) => org.orgOtherImg)
  orgIdForOther: Organization;
}
