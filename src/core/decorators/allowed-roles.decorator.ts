import {SetMetadata} from '@nestjs/common';
import {UserRoles} from '../user/enums/user-roles.enum';

export const AllowedRoles = (...roles: UserRoles[]) => SetMetadata('roles', roles);
