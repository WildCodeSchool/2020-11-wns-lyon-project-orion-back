import {forwardRef, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Star} from '@api/star/star.entity';
import {StarResolver} from '@api/star/star.resolver';
import {StarService} from '@api/star/star.service';
import {PostModule} from '@api/post/post.module';

@Module({
    imports: [TypeOrmModule.forFeature([Star]), forwardRef(() => PostModule)],
    providers: [StarResolver, StarService],
    exports: [StarService],
})
export class StarModule {}
