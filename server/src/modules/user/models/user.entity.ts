import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ comment: 'nickname', default: '' })
  @IsNotEmpty({ message: 'nickname cant be empty' })
  name: string;

  @Column({ comment: 'phone number', nullable: true })
  tel: string;

  @Column({ comment: 'password', default: '' })
  password: string;

  @Column({ comment: 'account', default: '' })
  account: string;

  @Column({ comment: 'desc', default: '' })
  desc: string;

  @Column({ comment: 'otp', nullable: true })
  otp: string;

  @Column({ comment: 'otpCreateAt', nullable: true })
  otpCreateAt: Date;

  @Column({ comment: 'token', nullable: true })
  token: string;

  @Column({ comment: 'token', nullable: true })
  avatarUrl: string;
}
