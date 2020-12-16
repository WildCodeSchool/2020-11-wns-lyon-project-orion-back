import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import {UserRoles} from '../../api/user/enums/user-roles.enum';
import {GqlExecutionContext} from '@nestjs/graphql';
import {Reflector} from '@nestjs/core';

@Injectable()
export class GqlRolesGuard implements CanActivate {

    constructor(private readonly reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean {

        const roles = this.reflector.get<UserRoles[]>('roles', context.getHandler());
        if (!roles) return true;

        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().req;
        const user = req.user;

        const hasRole = () =>
            user.roles.some(role => roles.includes(role));

        return user && user.roles && hasRole();
    }
}
