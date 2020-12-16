import {Module} from '@nestjs/common';
import {GqlService} from './gql.service';
import {GraphQLModule} from '@nestjs/graphql';

@Module({
    imports: [
        GraphQLModule.forRootAsync({useClass: GqlService})
    ],
})
export class GqlModule {}
