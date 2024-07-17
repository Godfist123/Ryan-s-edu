import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurOrgId = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const orgid = ctx.getContext().req.headers.orgid;
    return orgid;
  },
);
