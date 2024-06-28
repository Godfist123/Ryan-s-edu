import { CommonEntity } from 'src/share/entity';
import { Column, Entity } from 'typeorm';

@Entity('student')
export class Student extends CommonEntity {
  @Column({
    comment: 'nickname',
    default: '',
  })
  name: string;

  @Column({
    comment: 'tel',
    nullable: true,
  })
  tel: string;

  @Column({
    comment: 'avatar',
    nullable: true,
  })
  avatar: string;

  @Column({
    comment: 'password',
  })
  password: string;

  @Column({
    comment: 'account',
  })
  account: string;
}
