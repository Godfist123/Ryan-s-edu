import { Result } from 'src/share/dto/result.type';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/modules/auth/auth.guard';
import {
  OrganizationResult,
  OrganizationResults,
} from './dto/result-organization.output';
import { OrganizationInput } from './dto/organization.input';
import { OrganizationType } from './dto/organization.type';
import { OrganizationService } from './organization.service';
import { CurUserId } from 'src/share/decorators/current-user.decorator';
import { PageInput } from 'src/share/dto/pageInput';
import { NOT_EXIST, SUCCESS } from 'src/share/constants/status_code';

@Resolver(() => OrganizationType)
@UseGuards(GqlAuthGuard)
export class OrganizationResolver {
  constructor(private readonly organizationService: OrganizationService) {}

  @Query(() => OrganizationResult)
  async getOrganizationInfo(
    @CurUserId() id: string,
  ): Promise<OrganizationResult> {
    const result = await this.organizationService.findById(id);
    if (result) {
      return {
        code: SUCCESS,
        data: result,
        message: 'Get success',
      };
    }
    return {
      code: NOT_EXIST,
      message: 'Org does not exist',
    };
  }

  @Mutation(() => OrganizationResult)
  async commitOrganizationInfo(
    @Args('params') params: OrganizationInput,
    @CurUserId() userId: string,
    @Args('id', { nullable: true }) id?: string,
  ): Promise<Result> {
    if (id) {
      const Organization = await this.organizationService.findById(id);
      if (Organization) {
        const res = await this.organizationService.updateById(id, {
          ...params,
          updatedBy: userId,
        });
        if (res) {
          return {
            code: SUCCESS,
            message: 'Update success',
          };
        }
        return {
          code: NOT_EXIST,
          message: 'Update failed',
        };
      }
    }
    return {
      code: NOT_EXIST,
      message: 'Org does not exist',
    };
  }

  @Query(() => OrganizationResults)
  async getOrganizations(
    @Args('page') page: PageInput,
  ): Promise<OrganizationResults> {
    const { pageNum, pageSize } = page;
    const [results, total] = await this.organizationService.findOrganizations({
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
