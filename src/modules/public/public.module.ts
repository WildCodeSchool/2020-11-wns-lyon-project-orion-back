import {Module} from '@nestjs/common';
import {UserModule} from '../user/user.module';
import {AuthModule} from '@core/auth/auth.module';
import {ConnectionModule} from '../connection/connection.module';

@Module({
    imports: [
        AuthModule,
        UserModule,
        ConnectionModule,
    ]
})
export class PublicModule {}
