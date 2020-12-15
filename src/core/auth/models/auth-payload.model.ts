import {UserRoles} from '@modules/user/enums/user-roles.enum';

export interface AuthPayloadModel {
    readonly id: number;
    readonly email: string;
    readonly roles: UserRoles[];
}
