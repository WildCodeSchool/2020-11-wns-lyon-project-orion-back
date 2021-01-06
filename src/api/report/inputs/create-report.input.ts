import {Field, InputType, Int} from '@nestjs/graphql';
import {ReportTypes} from '../enums/report-types.enum';

@InputType()
export class CreateReportInput {

    @Field(() => ReportTypes)
    readonly type: ReportTypes;

    @Field(() => Int)
    readonly referenceId: number;
}