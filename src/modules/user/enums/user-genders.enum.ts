import {registerEnumType} from '@nestjs/graphql';

export enum UserGenders {
    Male = 'Male',
    Female = 'Female',
}

registerEnumType(UserGenders, {name: 'UserGenders'});
