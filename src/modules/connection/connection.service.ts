import {InjectRepository} from '@nestjs/typeorm';
import {UpdateConnectionModel} from './models/update-connection.model';
import {CreateConnectionModel} from './models/create-connection.model';
import {DatabaseModel} from '@commons/models/database.model';
import {Connection} from './connection.entity';
import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';

@Injectable()
export class ConnectionService extends DatabaseModel<Connection> {

    constructor(
        @InjectRepository(Connection)
        readonly repository: Repository<Connection>,
    ) {
        super(repository);
    }

    async create(data: CreateConnectionModel): Promise<Connection> {
        const model = new Connection({...data, user: Promise.resolve(data.user)});
        return await this.insert(model);
    }

    async update(id: number, data: UpdateConnectionModel): Promise<Connection> {
        return await this.updateOneById(id, data);
    }
}
