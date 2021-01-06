import { Module } from '@nestjs/common';
import { ProfileModule } from '@api/profile/profile.module';
import { UserModule } from '@api/user/user.module';
import { BlockModule } from '@api/block/block.module';
import { ReportModule } from '@api/report/report.module';
import { PostModule } from '@api/post/post.module';
import { StarModule } from '@api/star/star.module';
import { LikeModule } from '@api/like/like.module';

@Module({
    imports: [
        UserModule,
        ProfileModule,
        ReportModule,
        BlockModule,
        PostModule,
        StarModule,
        LikeModule
    ]
})
export class ApiModule { }
