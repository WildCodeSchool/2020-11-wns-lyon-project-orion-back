import {CurrentUser} from '@commons/decorators/current-user.decorator';
import {GqlAuthGuard} from '@commons/guards/gql-auth.guard';
import {Query, Resolver} from '@nestjs/graphql';
import {UserService} from './user.service';
import {UseGuards} from '@nestjs/common';
import {User} from './user.entity';

@Resolver(() => User)
@UseGuards(GqlAuthGuard)
export class UserResolver {

    constructor(readonly userService: UserService) {
    }

    @Query(() => User)
    currentUser(@CurrentUser() currentUser: User): User {
        return currentUser;
    }
}
