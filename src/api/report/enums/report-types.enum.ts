import {registerEnumType} from '@nestjs/graphql';

export enum ReportTypes {
    Post = 'Post',
    Profile = 'Profile',
}

registerEnumType(ReportTypes, {name: 'ReportTypes'});