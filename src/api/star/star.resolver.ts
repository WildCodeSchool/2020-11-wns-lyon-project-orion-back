import {CurrentUser} from '@core/decorators/current-user.decorator';
import {AllowedRoles} from '@core/decorators/allowed-roles.decorator';
import {Resolver} from '@nestjs/graphql';
import {Args, Mutation, Parent, ResolveField} from '@nestjs/graphql';
import {StarService} from '@api/star/star.service';
import {PostService} from '@api/post/post.service';
import {
    BadRequestException,
    UseGuards,
    NotFoundException,
    ForbiddenException,
} from '@nestjs/common';
import {GqlAuthGuard} from '@core/guards/gql-auth.guard';
import {GqlRolesGuard} from '@core/guards/gql-roles.guard';
import {User} from '@api/user/user.entity';
import {Star} from './star.entity';
import {Post} from '@api/post/post.entity';
import {UserRoles} from '@api/user/enums/user-roles.enum';

@Resolver(() => Star)
@AllowedRoles(UserRoles.Teacher, UserRoles.Admin)
@UseGuards(GqlRolesGuard)
@UseGuards(GqlAuthGuard)
export class StarResolver {
    constructor(
        readonly starService: StarService,
        readonly postService: PostService /* , readonly userService: UserService */,
    ) {}

    @Mutation(() => Star)
    async CreateStar(
        @Args('postId') postId: number,
        @CurrentUser() currentUser: User,
    ): Promise<Star> {
        if (!postId) throw new BadRequestException('PostId is required');

        const post = await this.postService.repository.findOne(postId);
        if (!post) throw new NotFoundException('Post not found');

        return await this.starService.create({post, user: currentUser});
    }

    //async deleteBlock

    //resolve Field pour chaque relation  (2)

    @ResolveField()
    async user(@Parent() parent: Star): Promise<User> {
        return await parent.user;
    }

    @ResolveField()
    async post(@Parent() parent: Star): Promise<Post> {
        return await parent.post;
    }
}
