import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { User } from '../user/models/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { JWT_KEY } from 'src/share/constants/Jwt_key';
import { JwtStrategy } from './jwt.strategy';
import { GqlAuthGuard } from './auth.guard';
import { StudentService } from '../student/student.service';
import { Student } from '../student/models/student.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Student]),
    JwtModule.register({
      secret: JWT_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    UserService,
    JwtStrategy,
    GqlAuthGuard,
    StudentService,
  ],
})
export class AuthModule {}
