import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {Star} from '@api/star/star.entity';
import {CreateStarModel} from '@api/star/models/create-star.model';

@Injectable()
export class StarService {
    constructor(
        @InjectRepository(Star) readonly repository: Repository<Star>,
    ) {}

    async create(data: CreateStarModel): Promise<Star> {
        const model = new Star({
            ...data,
            user: Promise.resolve(data.user),
            post: Promise.resolve(data.post),
        });
        const saved = await this.repository.save(model);
        return await this.repository.findOne(saved.id);
    }

    async delete(id: number): Promise<boolean> {
        return !!(await this.repository.delete(id));
    }
}
