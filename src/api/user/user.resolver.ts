import {CurrentUser} from '@core/decorators/current-user.decorator';
import {GqlAuthGuard} from '@core/guards/gql-auth.guard';
import {Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {UserService} from './user.service';
import {UseGuards} from '@nestjs/common';
import {User} from './user.entity';
import {Block} from '../block/block.entity';
import {Profile} from '@api/profile/profile.entity';
import {Report} from '@api/report/report.entity';

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
    async blocksEmitted(@Parent() parent: User): Promise<Block[]> {
        return await parent.blocksEmitted;
    }

    @ResolveField()
    async blocksReceived(@Parent() parent: User): Promise<Block[]> {
        return await parent.blocksReceived;
    }
      
    @ResolveField()
    async reports(@Parent() parent: User): Promise<Report> {
        return await parent.report[];
    }
}
