import {UserModule} from '@api/user/user.module';
import {forwardRef, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Block} from './block.entity';
import {BlockResolver} from './block.resolver';
import {BlockService} from './block.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Block]), 
        forwardRef(() => UserModule)
    ],

    providers: [BlockResolver, BlockService],
    exports: [BlockService],
})
export class BlockModule {}
