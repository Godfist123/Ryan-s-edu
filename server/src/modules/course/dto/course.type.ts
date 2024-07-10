import { CommonType } from 'src/share/dto/common.type';
import { Field, ObjectType } from '@nestjs/graphql';

/**
 * Course type
 */
@ObjectType()
export class CourseType extends CommonType {
  @Field({
    description: 'course name',
  })
  name: string;

  @Field({
    description: 'course description',
    nullable: true,
  })
  desc: string;

  @Field({
    description: 'age group',
    nullable: true,
  })
  group: string;

  @Field({
    description: 'prerequisites',
  })
  prerequisites: string;

  @Field({
    description: 'maximum number of students',
  })
  maximum: number;

  @Field({
    description: 'course duration',
  })
  duration: number;

  @Field({
    description: 'appointment',
    nullable: true,
  })
  appointment: string;

  @Field({
    description: 'refund',
    nullable: true,
  })
  refund: string;

  @Field({
    description: 'other',
    nullable: true,
  })
  other: string;
}
