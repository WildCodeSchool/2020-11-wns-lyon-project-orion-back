import {createParamDecorator, ExecutionContext} from '@nestjs/common';
import {GqlExecutionContext} from '@nestjs/graphql';

export const RemoteAddress = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) =>
        GqlExecutionContext.create(ctx).getContext().req.connection.remoteAddress,
);
