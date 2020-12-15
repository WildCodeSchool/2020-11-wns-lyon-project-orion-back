import {registerEnumType} from '@nestjs/graphql';

export enum UserRoles {
    Admin = 'Admin',
    Teacher = 'Teacher',
    Student = 'Student',
}

registerEnumType(UserRoles, {name: 'UserRoles'});
