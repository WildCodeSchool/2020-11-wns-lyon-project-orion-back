import {CurrentUser} from '@core/decorators/current-user.decorator';
import {AllowedRoles} from '@core/decorators/allowed-roles.decorator';
import {Resolver} from '@nestjs/graphql';
import {Args, Mutation, Parent, ResolveField} from '@nestjs/graphql';
import {LikeService} from '@api/like/like.service';
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
import {Like} from './like.entity';
import {Post} from '@api/post/post.entity';

@Resolver(() => Like)
@UseGuards(GqlRolesGuard)
@UseGuards(GqlAuthGuard)
export class LikeResolver {
    constructor(
        readonly likeService: LikeService,
        readonly postService: PostService /* , readonly userService: UserService */,
    ) {}

    @Mutation(() => Like)
    async CreateLike(
        @Args('postId') postId: number,
        @CurrentUser() currentUser: User,
    ): Promise<Like> {
        if (!postId) throw new BadRequestException('PostId is required');

        const post = await this.postService.repository.findOne(postId);
        if (!post) throw new NotFoundException('Post not found');

        return await this.likeService.create({post, user: currentUser});
    }

    //async deleteBlock

    //resolve Field pour chaque relation  (2)

    @ResolveField()
    async user(@Parent() parent: Like): Promise<User> {
        return await parent.user;
    }

    @ResolveField()
    async post(@Parent() parent: Like): Promise<Post> {
        return await parent.post;
    }
}
