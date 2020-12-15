import {UserRoles} from '../enums/user-roles.enum';
import {UserGenders} from '../enums/user-genders.enum';

export interface UpdateUserModel {
    readonly email?: string;
    readonly birthDate?: Date;
    readonly lastName?: string;
    readonly firstName?: string;
    readonly roles?: UserRoles[];
    readonly gender?: UserGenders;
    readonly password?: string;
}
