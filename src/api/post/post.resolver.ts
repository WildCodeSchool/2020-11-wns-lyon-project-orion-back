import { CurrentUser } from '@core/decorators/current-user.decorator';
import {
    Args,
    Mutation,
    Query,
    Parent,
    ResolveField,
    Resolver,
    Int,
} from '@nestjs/graphql';
import { UpdatePostInput } from '@api/post/inputs/update-post.inputs';
import { CreatePostInput } from '@api/post/inputs/create-post.inputs';
import {
    BadRequestException,
    UseGuards,
    NotFoundException,
    ForbiddenException,
} from '@nestjs/common';
import { PostService } from '@api/post/post.service';
import { GqlAuthGuard } from '@core/guards/gql-auth.guard';
import { User } from '@api/user/user.entity';
import { Star } from '@api/star/star.entity';
import { Post } from './post.entity';

@Resolver(() => Post)
@UseGuards(GqlAuthGuard)
export class PostResolver {
    constructor(readonly postService: PostService) { }
    @Query(() => [Post])
    async getAllPosts() {
        return await this.postService.getAll()
    }
    @Mutation(() => Post)
    async createPost(
        @Args('input') input: CreatePostInput,
        @CurrentUser() author: User,
    ): Promise<Post> {
        console.log('input', input);
        if (!input.content)
            throw new BadRequestException('Content is required');

        return await this.postService.create({
            ...input,
            content: input.content,
            author,
        });
    }


    @Mutation(() => Post)
    async updatePost(
        @Args({ name: 'id', type: () => Int }) id: number,
        @Args('input') input: UpdatePostInput,
        @CurrentUser() currentUser: User,
    ): Promise<Post> {
        if (!input.content)
            throw new BadRequestException('Content is required');

        const post = await this.postService.repository.findOne(id);
        if (!post) throw new NotFoundException('Post not found');

        const author = await post.author;
        if (author.id !== currentUser.id)
            throw new ForbiddenException('Only author can update post');
        return await this.postService.update(post.id, input);
    }

    @Mutation(() => Boolean)
    async deletePost(
        @Args({ name: 'id', type: () => Int }) id: number,
        @CurrentUser() currentUser: User,
    ): Promise<boolean> {
        if (!id) throw new BadRequestException('id is required');
        const post = await this.postService.repository.findOne(id);
        if (!post) throw new NotFoundException('Post not found');

        const author = await post.author;
        if (author.id !== currentUser.id)
            throw new ForbiddenException('Only author can delete post');

        return await this.postService.delete(id);
    }

    @ResolveField() //user
    async author(@Parent() parent: Post): Promise<User> {
        return await parent.author;
    }

    @ResolveField() //star
    async star(@Parent() parent: Post): Promise<Star> {
        return await parent.star;
    }
    @ResolveField() //parent
    async parent(@Parent() parent: Post): Promise<Post> {
        return await parent.parent;
    }

    @ResolveField() //children
    async children(@Parent() parent: Post): Promise<Post[]> {
        return await parent.children;
    }
}
