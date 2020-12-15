import {Module} from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';

@Module({
    imports: [
        GraphQLModule.forRootAsync({
            useFactory: async () => ({
                autoSchemaFile: 'schema.gql',
                installSubscriptionHandlers: true,
                context: ([req, connection]) => connection
                    ? {req: connection.context}
                    : {req},
            })
        })
    ],
})
export class GqlModule {}
