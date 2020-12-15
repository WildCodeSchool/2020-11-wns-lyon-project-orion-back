import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './user.entity';
import {Repository} from 'typeorm';
import {CreateUserModel} from './models/create-user.model';
import {UpdateUserModel} from './models/update-user.model';
import {DatabaseModel} from '@commons/models/database.model';

@Injectable()
export class UserService extends DatabaseModel<User> {

    constructor(
        @InjectRepository(User)
        readonly repository: Repository<User>,
    ) {
        super(repository);
    }

    async create(data: CreateUserModel): Promise<User> {
        const model = new User(data);
        return await this.insert(model);
    }

    async update(id: number, data: UpdateUserModel): Promise<User> {
        return await this.updateOneById(id, data);
    }

    async delete(id: number): Promise<boolean> {
        return undefined;
    }
}
