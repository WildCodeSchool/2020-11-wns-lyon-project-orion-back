import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Connection} from './connection.entity';
import {ConnectionService} from '@modules/connection/connection.service';
import {ConnectionResolver} from '@modules/connection/connection.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([Connection])],
    providers: [ConnectionService, ConnectionResolver],
    exports: [ConnectionService],
})
export class ConnectionModule {}
