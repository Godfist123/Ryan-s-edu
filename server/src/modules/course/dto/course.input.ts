import { Field, InputType, PartialType } from '@nestjs/graphql';
import { AppointmentTime_Input } from './common.input';

@InputType()
export class CourseInput {
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

  @Field(() => [AppointmentTime_Input], {
    description: 'appointment time',
    nullable: true,
  })
  appointmentTime: AppointmentTime_Input[];
}

@InputType()
export class PartialCourseInput extends PartialType(CourseInput) {}
