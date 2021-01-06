import {Module} from '@nestjs/common';
import {ProfileModule} from '@api/profile/profile.module';
import {UserModule} from '@api/user/user.module';
import {BlockModule} from '@api/block/block.module';
import {ReportModule} from '@api/report/report.module';

@Module({
    imports: [
        UserModule,
        ProfileModule,
        ReportModule,
        BlockModule
    ]
})
export class ApiModule {}
