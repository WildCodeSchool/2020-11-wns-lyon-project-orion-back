import {CurrentUser} from '@core/decorators/current-user.decorator';
import {Args, Mutation, Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {UpdateProfileInput} from '@api/profile/inputs/update-profile.input';
import {BadRequestException, UseGuards} from '@nestjs/common';
import {ProfileService} from '@api/profile/profile.service';
import {GqlAuthGuard} from '@core/guards/gql-auth.guard';
import {User} from '@core/user/user.entity';
import {Profile} from './profile.entity';

@Resolver(() => Profile)
@UseGuards(GqlAuthGuard)
export class ProfileResolver {

    constructor(readonly profileService: ProfileService) {
    }

    @Mutation(() => Profile)
    async updateProfile(
        @Args('input') input: UpdateProfileInput,
        @CurrentUser() user: User): Promise<Profile> {
        if (!input.username) throw new BadRequestException('Username is required');
        if (!input.birthDate) throw new BadRequestException('Birth date is required');

        const profile = await user.profile;

        return profile
            ? await this.profileService.update(profile.id, input)
            : await this.profileService.create({...input, user});
    }

    @ResolveField()
    async user(@Parent() parent: Profile): Promise<User> {
        return await parent.user;
    }
}
