import {Query, Resolver} from '@nestjs/graphql';
import {User} from '@modules/user/user.entity';
import {UserService} from '@modules/user/user.service';
import {CurrentUser} from '@commons/decorators/current-user.decorator';
import {UseGuards} from '@nestjs/common';
import {GqlAuthGuard} from '@commons/guards/gql-auth.guard';

@Resolver(_of => User)
@UseGuards(GqlAuthGuard)
export class UserResolver {

    constructor(readonly userService: UserService) {
    }

    @Query(_returns => User)
    currentUser(@CurrentUser() currentUser: User): User {
        return currentUser;
    }
}
