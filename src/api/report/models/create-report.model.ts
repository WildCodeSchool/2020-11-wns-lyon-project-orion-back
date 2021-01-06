import {User} from '@api/user/user.entity';
import { ReportTypes } from '../enums/report-types.enum';

export class CreateReportModel {
    readonly type: ReportTypes;
    readonly referenceId: number;
    readonly emitter: User;
}
