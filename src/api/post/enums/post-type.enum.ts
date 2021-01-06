import {registerEnumType} from '@nestjs/graphql';

export enum PostTypes {
    default = 'Default',
    other = 'Other',
}

registerEnumType(PostTypes, {name: 'PostTypes'});
