import {InjectRepository} from '@nestjs/typeorm';
import {CreateUserModel} from './models/create-user.model';
import {UpdateUserModel} from './models/update-user.model';
import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {User} from './user.entity';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) readonly repository: Repository<User>) {
    }

    async create(data: CreateUserModel): Promise<User> {
        const model = new User(data);
        const saved = await this.repository.save(model);
        return await this.repository.findOne(saved.id);
    }

    async update(id: number, data: UpdateUserModel): Promise<User> {
        const updated = await this.repository.save({...data, id});
        return await this.repository.findOne(updated.id);
    }

    async delete(id: number): Promise<boolean> {
        return undefined;
    }
}
