import {Module} from '@nestjs/common';
import {ProfileModule} from '@api/profile/profile.module';
import {UserModule} from '@api/user/user.module';

@Module({
    imports: [UserModule, ProfileModule],
})
export class ApiModule {}
