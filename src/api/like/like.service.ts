import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {Like} from '@api/like/like.entity';
import {CreateLikeModel} from '@api/like/models/create-like.model';

@Injectable()
export class LikeService {
    constructor(
        @InjectRepository(Like) readonly repository: Repository<Like>,
    ) {}

    async create(data: CreateLikeModel): Promise<Like> {
        const model = new Like({
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
