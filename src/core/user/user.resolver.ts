import {CurrentUser} from '../decorators/current-user.decorator';
import {GqlAuthGuard} from '../guards/gql-auth.guard';
import {Query, Resolver} from '@nestjs/graphql';
import {UseGuards} from '@nestjs/common';
import {User} from './user.entity';

@Resolver(() => User)
@UseGuards(GqlAuthGuard)
export class UserResolver {

    @Query(() => User)
    currentUser(@CurrentUser() currentUser: User): User {
        return currentUser;
    }
}
