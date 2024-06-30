import { ObjectType } from '@nestjs/graphql';

import { createResult, createResults } from 'src/share/dto/result.type';
import { TemplateType } from './template.type';

@ObjectType()
export class TemplateResult extends createResult(TemplateType) {}

@ObjectType()
export class TemplateResults extends createResults(TemplateType) {}
