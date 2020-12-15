import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './user.entity';
import {Repository} from 'typeorm';
import {CreateUserModel} from './models/create-user.model';
import {UpdateUserModel} from './models/update-user.model';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        readonly repository: Repository<User>,
    ) {
    }

    async findOneById(id: number): Promise<User> {
        return await this.repository.findOne(id);
    }

    async findOneByPid(pid: string): Promise<User> {
        return await this.repository.findOne({pid});
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.repository.findOne({email});
    }

    async create(data: CreateUserModel): Promise<User> {
        return undefined;
    }

    async update(id: number, data: UpdateUserModel): Promise<User> {
        return undefined;
    }

    async delete(id: number): Promise<boolean> {
        return undefined;
    }
}
