import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Report} from '@api/report/report.entity';
import {ReportResolver} from '@api/report/report.resolver';
import {ReportService} from '@api/report/report.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Report])
    ],
    providers: [
        ReportResolver,
        ReportService,
    ],
    exports: [
        ReportService,
    ]
})
export class ReportModule {}
