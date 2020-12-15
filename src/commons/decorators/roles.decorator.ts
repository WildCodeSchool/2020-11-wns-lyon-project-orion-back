import {SetMetadata} from '@nestjs/common';
import {UserRoles} from '@modules/user/enums/user-roles.enum';


export const Roles = (...roles: UserRoles[]) => SetMetadata('roles', roles);
