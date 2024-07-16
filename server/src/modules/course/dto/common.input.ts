import { Field, InputType } from '@nestjs/graphql';

@InputType()
class AvailableTime_Input {
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

@InputType()
export class AppointmentTime_Input {
  @Field({
    description: 'Week day',
  })
  week: string;
  @Field(() => [AvailableTime_Input], {
    description: 'Available time',
  })
  availableTime: AvailableTime_Input[];
}
