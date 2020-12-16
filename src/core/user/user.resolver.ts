import {CurrentUser} from '../decorators/current-user.decorator';
import {GqlAuthGuard} from '../guards/gql-auth.guard';
import {Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {UserService} from './user.service';
import {UseGuards} from '@nestjs/common';
import {User} from './user.entity';
import {Profile} from '@api/profile/profile.entity';

@Resolver(() => User)
export class UserResolver {

    constructor(readonly userService: UserService) {
    }

    @Query(() => User)
    @UseGuards(GqlAuthGuard)
    currentUser(@CurrentUser() currentUser: User): User {
        return currentUser;
    }

    @Query(() => [User])
    async users(): Promise<User[]> {
        return await this.userService.repository.find();
    }

    @ResolveField()
    async profile(@Parent() parent: User): Promise<Profile> {
        return await parent.profile;
    }
}
