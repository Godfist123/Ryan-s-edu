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
import {
  CREATE_ORG_FAILED,
  NOT_EXIST,
  ORG_DEL_FAIL,
  ORG_NOT_EXIST,
  PRE_DELETE_FAILED,
  SUCCESS,
} from 'src/share/constants/status_code';
import { OrgImageService } from '../orgImage/orgImage.service';
import { FindOptionsWhere, Like } from 'typeorm';
import { Organization } from './models/organization.entity';

@Resolver(() => OrganizationType)
@UseGuards(GqlAuthGuard)
export class OrganizationResolver {
  constructor(
    private readonly organizationService: OrganizationService,
    private readonly orgImageService: OrgImageService,
  ) {}

  @Query(() => OrganizationResult)
  async getOrganizationInfo(
    @Args('id') id: string,
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
  async commitOrganization(
    @Args('params') params: OrganizationInput,
    @CurUserId() userId: string,
    @Args('id', { nullable: true }) id?: string,
  ): Promise<Result> {
    if (id) {
      const Organization = await this.organizationService.findById(id);
      if (Organization) {
        const delRes = await this.orgImageService.deleteByOrg(id);
        if (!delRes) {
          return {
            code: PRE_DELETE_FAILED,
            message: 'Predelete failed',
          };
        }
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
    const CreateOrg = await this.organizationService.create({
      ...params,
      createdBy: userId,
    });
    if (CreateOrg) {
      return {
        code: SUCCESS,
        message: 'Create success',
      };
    }
    return {
      code: CREATE_ORG_FAILED,
      message: 'Create failed',
    };
  }

  @Query(() => OrganizationResults)
  async getOrganizations(
    @Args('page') page: PageInput,
    @CurUserId() userId: string,
    @Args('name', { nullable: true }) name: string,
  ): Promise<OrganizationResults> {
    const { pageNum, pageSize } = page;
    const where: FindOptionsWhere<Organization> = { createdBy: userId };
    console.log('name', name);
    if (name) {
      where.name = Like(`%${name}%`);
    }
    const [results, total] = await this.organizationService.findOrganizations({
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
  async deleteOrganization(
    @Args('id') id: string,
    @CurUserId() userId: string,
  ): Promise<Result> {
    const result = await this.organizationService.findById(id);
    if (result) {
      const delRes = await this.organizationService.deleteById(id, userId);
      if (delRes) {
        return {
          code: SUCCESS,
          message: ' delete success',
        };
      }
      return {
        code: ORG_DEL_FAIL,
        message: ' delete failed',
      };
    }
    return {
      code: ORG_NOT_EXIST,
      message: 'Org does not exist',
    };
  }
}
