import {Module} from '@nestjs/common';
import {ProfileModule} from '@api/profile/profile.module';
import {UserModule} from '@api/user/user.module';
import {PostModule} from '@api/post/post.module';
import {StarModule} from '@api/star/star.module';

@Module({
    imports: [UserModule, ProfileModule, PostModule, StarModule],
})
export class ApiModule {}
