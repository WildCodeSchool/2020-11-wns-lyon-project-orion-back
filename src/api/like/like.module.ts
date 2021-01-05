//import { LikeModule } from '@api/star/star.module';
import {forwardRef, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Like} from '@api/like/like.entity';
import {LikeResolver} from '@api/like/like.resolver';
import {LikeService} from '@api/like/like.service';
import {PostModule} from '@api/post/post.module';

@Module({
    imports: [TypeOrmModule.forFeature([Like]), forwardRef(() => PostModule)],
    providers: [LikeResolver, LikeService],
    exports: [LikeService],
})
export class LikeModule {}
