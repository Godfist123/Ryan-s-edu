import { Result } from 'src/share/dto/result.type';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/auth.guard';
import { StudentResult, StudentResults } from './dto/result-student.output';
import { StudentInput } from './dto/student.input';
import { StudentType } from './dto/student.type';
import { StudentService } from './student.service';
import { CurUserId } from 'src/share/decorators/current-user.decorator';
import { PageInput } from 'src/share/dto/pageInput';
import { STUDENT_NOT_EXIST, SUCCESS } from 'src/share/constants/status_code';

@Resolver(() => StudentType)
@UseGuards(GqlAuthGuard)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Query(() => StudentResult)
  async getStudentInfo(@CurUserId() id: string): Promise<StudentResult> {
    const result = await this.studentService.findById(id);
    if (result) {
      return {
        code: SUCCESS,
        data: result,
        message: 'Get success',
      };
    }
    return {
      code: STUDENT_NOT_EXIST,
      message: 'User does not exist',
    };
  }

  @Mutation(() => StudentResult)
  async commitStudentInfo(
    @Args('params') params: StudentInput,
    @CurUserId() userId: string,
  ): Promise<Result> {
    const student = await this.studentService.findById(userId);
    if (student) {
      const res = await this.studentService.updateById(student.id, params);
      if (res) {
        return {
          code: SUCCESS,
          message: 'Update success',
        };
      }
    }
    return {
      code: STUDENT_NOT_EXIST,
      message: 'User does not exist',
    };
  }

  @Query(() => StudentResults)
  async getStudents(@Args('page') page: PageInput): Promise<StudentResults> {
    const { pageNum, pageSize } = page;
    const [results, total] = await this.studentService.findStudents({
      start: pageNum === 1 ? 0 : (pageNum - 1) * pageSize + 1,
      length: pageSize,
    });
    return {
      code: SUCCESS,
      data: results,
      page: {
        start: pageNum,
        pageSize,
        total,
      },
      message: 'Get success',
    };
  }
}
