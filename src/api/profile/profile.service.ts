import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Profile} from '@api/profile/profile.entity';
import {Repository} from 'typeorm';
import {CreateProfileModel} from '@api/profile/models/create-profile.model';
import {UpdateProfileModel} from '@api/profile/models/update-profile.model';

@Injectable()
export class ProfileService {

    constructor(@InjectRepository(Profile) readonly repository: Repository<Profile>) {
    }

    async create(data: CreateProfileModel): Promise<Profile> {
        const model = new Profile({...data, user: Promise.resolve(data.user)});
        const saved = await this.repository.save(model);
        return await this.repository.findOne(saved.id);
    }

    async update(id: number, data: UpdateProfileModel): Promise<Profile> {
        const updated = await this.repository.save({...data, id});
        return await this.repository.findOne(updated.id);
    }
}
