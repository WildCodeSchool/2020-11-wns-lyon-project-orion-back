import {TypeOrmModule} from '@nestjs/typeorm';
import {UserResolver} from './user.resolver';
import {UserService} from './user.service';
import {Module} from '@nestjs/common';
import {User} from './user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
    ],
    providers: [
        UserService,
        UserResolver
    ],
    exports: [
        UserService,
    ],
})
export class UserModule {}
