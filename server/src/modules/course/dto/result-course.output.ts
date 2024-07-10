import { ObjectType } from '@nestjs/graphql';

import { createResult, createResults } from 'src/share/dto/result.type';
import { CourseType } from './course.type';

@ObjectType()
export class CourseResult extends createResult(CourseType) {}

@ObjectType()
export class CourseResults extends createResults(CourseType) {}
