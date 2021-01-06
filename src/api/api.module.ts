import {Module} from '@nestjs/common';
import {ProfileModule} from '@api/profile/profile.module';
import {UserModule} from '@api/user/user.module';
import {BlockModule} from '@api/block/block.module';

@Module({
    imports: [UserModule, ProfileModule, BlockModule],
})
export class ApiModule {}
