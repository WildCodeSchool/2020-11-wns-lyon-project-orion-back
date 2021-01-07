import { ProfileModule } from '@api/profile/profile.module';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from '@api/report/report.entity';
import { ReportResolver } from '@api/report/report.resolver';
import { ReportService } from '@api/report/report.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Report]),
        forwardRef(() => ProfileModule)
    ],
    providers: [
        ReportResolver,
        ReportService,
    ],
    exports: [
        ReportService,
    ]
})
export class ReportModule { }
