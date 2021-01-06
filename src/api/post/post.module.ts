import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Post} from '@api/post/post.entity';
import {PostResolver} from '@api/post/post.resolver';
import {PostService} from '@api/post/post.service';

@Module({
    imports: [TypeOrmModule.forFeature([Post])],
    providers: [PostResolver, PostService],
    exports: [PostService],
})
export class PostModule {}
