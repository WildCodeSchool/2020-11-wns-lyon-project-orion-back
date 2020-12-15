import {Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {Connection} from './connection.entity';
import {User} from '../user/user.entity';

@Resolver(() => Connection)
export class ConnectionResolver {

    @ResolveField()
    async user(@Parent() parent: Connection): Promise<User> {
        return await parent.user;
    }
}
