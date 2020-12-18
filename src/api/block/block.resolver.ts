import {UserRoles} from '@api/user/enums/user-roles.enum';
import {User} from '@api/user/user.entity';
import {UserService} from '@api/user/user.service';
import {CurrentUser} from '@core/decorators/current-user.decorator';
import {GqlAuthGuard} from '@core/guards/gql-auth.guard';
import {
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    UseGuards,
} from '@nestjs/common';
import {Parent, Mutation, ResolveField, Resolver, Args} from '@nestjs/graphql';
import {Block} from './block.entity';
import {BlockService} from './block.service';

@Resolver(() => Block)
@UseGuards(GqlAuthGuard)
export class BlockResolver {
    constructor(
        readonly blockService: BlockService,
        readonly userService: UserService,
    ) {}

    @Mutation(() => Block)
    async createBlock(
        @Args('receiverId') receiverId: number,
        @CurrentUser() currentUser: User,
    ): Promise<Block> {
        if (!receiverId)
            throw new BadRequestException('receiverId is required');

        const receiver = await this.userService.repository.findOne(receiverId);
        if (!receiver) throw new NotFoundException('Receiver not found');
        if (
            receiver.roles.includes(UserRoles.Admin) ||
            receiver.roles.includes(UserRoles.Teacher)
        )
            throw new ForbiddenException(
                `${UserRoles.Admin} and ${UserRoles.Teacher} cannot be blocked`,
            );

        const blockedUsers = await currentUser.blocksEmitted;
        const blockedUser = blockedUsers.find(user => user.id === receiverId);
        if (blockedUser) throw new ConflictException('user already blocked');

        return await this.blockService.create({receiver, emitter: currentUser});
    }

    @Mutation(() => Boolean)
    async deleteBlock(
        @Args('id') id: number,
        @CurrentUser() currentUser: User,
    ): Promise<boolean> {
        if (!id) throw new BadRequestException('id is required');

        const block = await this.blockService.repository.findOne(id);
        if (!block) throw new NotFoundException('block not found');

        const emitter = await block.emitter;
        if (emitter.id !== currentUser.id)
            throw new ForbiddenException('Only emitter can unblock');

        return await this.blockService.delete(id);
    }

    @ResolveField()
    async receiver(@Parent() parent: Block): Promise<User> {
        return await parent.receiver;
    }

    @ResolveField()
    async emitter(@Parent() parent: Block): Promise<User> {
        return await parent.emitter;
    }
}
