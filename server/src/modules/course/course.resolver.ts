import { Result } from 'src/share/dto/result.type';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/modules/auth/auth.guard';
import { CourseResult, CourseResults } from './dto/result-course.output';
import { PartialCourseInput } from './dto/course.input';
import { CourseType } from './dto/course.type';
import { CourseService } from './course.service';
import { CurUserId } from 'src/share/decorators/current-user.decorator';
import { PageInput } from 'src/share/dto/pageInput';
import {
  COURSE_CREATE_FAIL,
  COURSE_DEL_FAIL,
  COURSE_NOT_EXIST,
  COURSE_UPDATE_FAIL,
  SUCCESS,
} from 'src/share/constants/status_code';
import { Course } from './models/course.entity';
import { FindOptionsWhere, Like } from 'typeorm';

@Resolver(() => CourseType)
@UseGuards(GqlAuthGuard)
export class CourseResolver {
  constructor(private readonly courseService: CourseService) {}

  @Query(() => CourseResult)
  async getCourseInfo(@Args('id') id: string): Promise<CourseResult> {
    const result = await this.courseService.findById(id);
    if (result) {
      return {
        code: SUCCESS,
        data: result,
        message: 'Get success',
      };
    }
    return {
      code: COURSE_NOT_EXIST,
      message: 'Course does not exist',
    };
  }

  @Mutation(() => CourseResult)
  async commitCourseInfo(
    @Args('params') params: PartialCourseInput,
    @CurUserId() userId: string,
    @Args('id', { nullable: true }) id: string,
  ): Promise<Result> {
    if (!id) {
      const res = await this.courseService.create({
        ...params,
        createdBy: userId,
      });
      if (res) {
        return {
          code: SUCCESS,
          message: 'create success',
        };
      }
      return {
        code: COURSE_CREATE_FAIL,
        message: 'create failed',
      };
    }
    const course = await this.courseService.findById(id);
    if (course) {
      const res = await this.courseService.updateById(course.id, {
        ...params,
        updatedBy: userId,
      });
      if (res) {
        return {
          code: SUCCESS,
          message: 'update success',
        };
      }
      return {
        code: COURSE_UPDATE_FAIL,
        message: 'update failed',
      };
    }
    return {
      code: COURSE_NOT_EXIST,
      message: 'Course does not exist',
    };
  }

  @Query(() => CourseResults)
  async getCourses(
    @Args('page') page: PageInput,
    @CurUserId() userId: string,
    @Args('name', { nullable: true }) name: string,
  ): Promise<CourseResults> {
    const { pageNum, pageSize } = page;
    const where: FindOptionsWhere<Course> = { createdBy: userId };
    if (name) {
      where.name = Like(`%${name}%`);
    }
    const [results, total] = await this.courseService.findCourses({
      start: pageNum === 1 ? 0 : (pageNum - 1) * pageSize + 1,
      length: pageSize,
      where,
    });
    return {
      code: SUCCESS,
      data: results,
      page: {
        pageNum,
        pageSize,
        total,
      },
      message: 'Get success',
    };
  }

  @Mutation(() => Result)
  async deleteCourse(
    @Args('id') id: string,
    @CurUserId() userId: string,
  ): Promise<Result> {
    const result = await this.courseService.findById(id);
    if (result) {
      const delRes = await this.courseService.deleteById(id, userId);
      if (delRes) {
        return {
          code: SUCCESS,
          message: ' delete success',
        };
      }
      return {
        code: COURSE_DEL_FAIL,
        message: ' delete failed',
      };
    }
    return {
      code: COURSE_NOT_EXIST,
      message: 'Org does not exist',
    };
  }
}
