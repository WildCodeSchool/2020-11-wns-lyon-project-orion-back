import {Module} from '@nestjs/common';
import {GqlModule} from './gql/gql.module';
import {AuthModule} from './auth/auth.module';
import {PubsubModule} from './pubsub/pubsub.module';
import {DatabaseModule} from './database/database.module';
import {ExceptionsModule} from './exceptions/exceptions.module';

@Module({
    imports: [
        GqlModule,
        AuthModule,
        PubsubModule,
        DatabaseModule,
        ExceptionsModule,
    ],
})
export class CoreModule {}
