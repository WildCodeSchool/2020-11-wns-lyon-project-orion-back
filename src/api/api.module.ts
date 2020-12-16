import {Module} from '@nestjs/common';
import {ProfileModule} from '@api/profile/profile.module';

@Module({
    imports: [
        ProfileModule,
    ]
})
export class ApiModule {}
