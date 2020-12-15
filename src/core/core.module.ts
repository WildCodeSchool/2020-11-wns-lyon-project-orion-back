import {Module} from '@nestjs/common';
import {GqlModule} from './gql/gql.module';
import {PubsubModule} from './pubsub/pubsub.module';
import {DatabaseModule} from './database/database.module';
import {ExceptionsModule} from './exceptions/exceptions.module';

@Module({
    imports: [
        GqlModule,
        PubsubModule,
        DatabaseModule,
        ExceptionsModule,
    ],
})
export class CoreModule {}
