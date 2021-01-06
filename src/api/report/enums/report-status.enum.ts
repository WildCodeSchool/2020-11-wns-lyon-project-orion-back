import {registerEnumType} from '@nestjs/graphql';

export enum ReportStatus {
    Pending = 'Pending',
    Checked = 'Checked',
}

registerEnumType(ReportStatus, {name: 'ReportStatus'});