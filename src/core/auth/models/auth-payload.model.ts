import {UserRoles} from '../../../api/user/enums/user-roles.enum';

export class AuthPayloadModel {
    readonly id: number;
    readonly email: string;
    readonly roles: UserRoles[];
}
