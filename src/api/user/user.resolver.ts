import {CurrentUser} from '@core/decorators/current-user.decorator';
import {GqlAuthGuard} from '@core/guards/gql-auth.guard';
import {Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {UserService} from './user.service';
import {UseGuards} from '@nestjs/common';
import {User} from './user.entity';
import {Profile} from '@api/profile/profile.entity';
import {Post} from '@api/post/post.entity';
import {Star} from '@api/star/star.entity';

@Resolver(() => User)
export class UserResolver {
    constructor(readonly userService: UserService) {}

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

    @ResolveField()
    async posts(@Parent() parent: User): Promise<Post[]> {
        return await parent.posts;
    }

    @ResolveField()
    async stars(@Parent() parent: User): Promise<Star[]> {
        return await parent.stars;
    }
    //need likes
}
