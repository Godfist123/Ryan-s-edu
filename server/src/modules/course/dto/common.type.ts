import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class AvailableTime {
  @Field({
    description: 'Available time start',
  })
  startTime: string;
  @Field({
    description: 'Available time end',
  })
  endTime: string;
  @Field({
    description: 'Available time key',
  })
  key: number;
}

@ObjectType()
export class AppointmentTime {
  @Field({
    description: 'Week day',
  })
  week: string;
  @Field(() => [AvailableTime], {
    description: 'Available time',
  })
  availableTime: AvailableTime[];
}
