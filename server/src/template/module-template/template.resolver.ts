import { Result } from 'src/share/dto/result.type';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/modules/auth/auth.guard';
import { TemplateResult, TemplateResults } from './dto/result-template.output';
import { TemplateInput } from './dto/template.input';
import { TemplateType } from './dto/template.type';
import { TemplateService } from './template.service';
import { CurUserId } from 'src/share/decorators/current-user.decorator';
import { PageInput } from 'src/share/dto/pageInput';
import { NOT_EXIST, SUCCESS } from 'src/share/constants/status_code';

@Resolver(() => TemplateType)
@UseGuards(GqlAuthGuard)
export class TemplateResolver {
  constructor(private readonly templateService: TemplateService) {}

  @Query(() => TemplateResult)
  async getTemplateInfo(@CurUserId() id: string): Promise<TemplateResult> {
    const result = await this.templateService.findById(id);
    if (result) {
      return {
        code: SUCCESS,
        data: result,
        message: 'Get success',
      };
    }
    return {
      code: NOT_EXIST,
      message: 'User does not exist',
    };
  }

  @Mutation(() => TemplateResult)
  async commitTemplateInfo(
    @Args('params') params: TemplateInput,
    @CurUserId() userId: string,
  ): Promise<Result> {
    const Template = await this.templateService.findById(userId);
    if (Template) {
      const res = await this.templateService.updateById(Template.id, params);
      if (res) {
        return {
          code: SUCCESS,
          message: 'Update success',
        };
      }
    }
    return {
      code: NOT_EXIST,
      message: 'User does not exist',
    };
  }

  @Query(() => TemplateResults)
  async getTemplates(@Args('page') page: PageInput): Promise<TemplateResults> {
    const { pageNum, pageSize } = page;
    const [results, total] = await this.templateService.findTemplates({
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
