import {createParamDecorator, ExecutionContext} from '@nestjs/common';
import {GqlExecutionContext} from '@nestjs/graphql';

export const UserAgent = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) =>
        GqlExecutionContext.create(ctx)
            .getContext()
            .req.header('user-agent'),
);
