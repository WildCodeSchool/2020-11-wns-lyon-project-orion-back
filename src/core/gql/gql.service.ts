import {Injectable} from '@nestjs/common';
import {GqlModuleOptions, GqlOptionsFactory} from '@nestjs/graphql';

@Injectable()
export class GqlService implements GqlOptionsFactory {

    createGqlOptions(): Promise<GqlModuleOptions> | GqlModuleOptions {
        return {
            autoSchemaFile: 'schema.gql',
            installSubscriptionHandlers: true,
            context: ([req, connection]) => connection
                ? {req: connection.context}
                : {req},
        }
    }
}
