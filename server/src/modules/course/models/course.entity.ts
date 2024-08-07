import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { CommonEntity } from 'src/share/entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { AppointmentTime } from '../dto/common.type';
import { Organization } from 'src/modules/organization/models/organization.entity';

@Entity('Course')
export class Course extends CommonEntity {
  @Column({
    comment: 'course name',
  })
  @IsNotEmpty()
  name: string;

  @Column({
    comment: 'course description',
    nullable: true,
    type: 'text',
  })
  desc: string;

  @Column({
    comment: 'age group',
    nullable: true,
  })
  @IsNotEmpty()
  group: string;

  @Column({
    comment: 'prerequisites',
  })
  @IsNotEmpty()
  prerequisites: string;

  @Column({
    comment: 'maximum number of students',
  })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  maximum: number;

  @Column({
    comment: 'course duration',
  })
  @IsNotEmpty()
  duration: number;

  @Column({
    comment: 'appointment',
    nullable: true,
  })
  appointment: string;

  @Column({
    comment: 'refund',
    nullable: true,
  })
  refund: string;

  @Column({
    comment: 'other',
    nullable: true,
  })
  other: string;

  @Column('simple-json', {
    comment: 'AppointmentTime',
    nullable: true,
  })
  appointmentTime: AppointmentTime[];

  @ManyToOne(() => Organization, (organization) => organization.courses, {
    cascade: true,
  })
  org: Organization;
}
