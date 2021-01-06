import {Field, InputType} from '@nestjs/graphql';
import { ReportStatus } from '../enums/report-status.enum';

@InputType()
export class UpdateReportInput {

    @Field(() => ReportStatus)
    readonly status: ReportStatus;

}