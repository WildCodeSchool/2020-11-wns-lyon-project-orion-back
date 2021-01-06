import {CurrentUser} from '@core/decorators/current-user.decorator';
import {Args, Int, Mutation, Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {UpdateReportInput} from '@api/report/inputs/update-report.input';
import {BadRequestException, ConflictException, NotFoundException, UseGuards} from '@nestjs/common';
import {ReportService} from '@api/report/report.service';
import {GqlAuthGuard} from '@core/guards/gql-auth.guard';
import { GqlRolesGuard } from '@core/guards/gql-roles.guard';
import {User} from '@api/user/user.entity';
import {Report} from './report.entity';
import { CreateReportInput } from './inputs/create-report.input';
import { ReportTypes } from './enums/report-types.enum';
import { ProfileService } from '@api/profile/profile.service';
import { AllowedRoles } from '@core/decorators/allowed-roles.decorator';
import { UserRoles } from '@api/user/enums/user-roles.enum';

@Resolver(() => Report)
@UseGuards(GqlAuthGuard)
export class ReportResolver {

    constructor(
        readonly reportService: ReportService,
        readonly profileService: ProfileService
    ) {
    }

    @Mutation(() => Report)
    async createReport(
        @CurrentUser() currentUser: User,
        @Args('input') input: CreateReportInput,
    ): Promise<Report> {

        if (!input.type) throw new BadRequestException('Type is required');
        if (!input.referenceId) throw new BadRequestException('Reference Id is required');

        const reports = await currentUser.reports;
        const report = reports.find(item => item.referenceId === input.referenceId);
        if (report) throw new ConflictException('Report already exist');

        switch (input.type) {
            case ReportTypes.Post: break;
            case ReportTypes.Profile: {
                const profile = await this.profileService.repository.findOne(input.referenceId);
                if (!profile) throw new NotFoundException('Profile not found');
                break;
            }
        }

        return await this.reportService.create({...input, emitter: currentUser});
    }

    @AllowedRoles(UserRoles.Admin)
    @UseGuards(GqlRolesGuard)
    @Mutation(() => Report)
    async updateReport(
        @Args({name: 'id', type: () => Int}) id: number,
        @Args('input') input: UpdateReportInput,
    ): Promise<Report> {
        if (!input.status)
        throw new BadRequestException('Content is required');

        const report = await this.reportService.repository.findOne(id);
        if (!report) throw new NotFoundException('Report not found');

        return await this.reportService.update(report.id, input);
    }

    @AllowedRoles(UserRoles.Admin)
    @UseGuards(GqlRolesGuard)
    @Mutation(() => Boolean)
    async deleteReport(
        @Args({name: 'id', type: () => Int}) id: number,
    ): Promise<boolean> {
        if (!id) throw new BadRequestException('Id is required');

        const report = await this.reportService.repository.findOne(id);
        if (!report) throw new NotFoundException('Report not found');

        return await this.reportService.delete(id);
    }

    @ResolveField()
    async emitter(@Parent() parent: Report): Promise<User> {
        return await parent.emitter;
    }
}
