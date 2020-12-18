import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Profile} from '@api/profile/profile.entity';
import {ProfileResolver} from '@api/profile/profile.resolver';
import {ProfileService} from '@api/profile/profile.service';

@Module({
    imports: [TypeOrmModule.forFeature([Profile])],
    providers: [ProfileResolver, ProfileService],
    exports: [ProfileService],
})
export class ProfileModule {}
