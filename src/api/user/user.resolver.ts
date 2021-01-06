import { CurrentUser } from '@core/decorators/current-user.decorator';
import { GqlAuthGuard } from '@core/guards/gql-auth.guard';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { User } from './user.entity';
import { Profile } from '@api/profile/profile.entity';
import { Post } from '@api/post/post.entity';
import { Star } from '@api/star/star.entity';
import { Like } from '@api/like/like.entity';
import { Report } from '@api/report/report.entity';
import { Block } from '../block/block.entity';

@Resolver(() => User)
export class UserResolver {
    constructor(readonly userService: UserService) { }

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
    @ResolveField()
    async likes(@Parent() parent: User): Promise<Like[]> {
        return await parent.likes;
    }


    @ResolveField()
    async blocksEmitted(@Parent() parent: User): Promise<Block[]> {
        return await parent.blocksEmitted;
    }

    @ResolveField()
    async blocksReceived(@Parent() parent: User): Promise<Block[]> {
        return await parent.blocksReceived;
    }

    @ResolveField()
    async reports(@Parent() parent: User): Promise<Report[]> {
        return await parent.reports;
    }
}
