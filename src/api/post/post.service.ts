import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Post} from '@api/post/post.entity';
import {User} from '@api/user/user.entity';
import {Repository} from 'typeorm';
import {CreatePostModel} from '@api/post/models/create-post.model';
import {UpdatePostModel} from '@api/post/models/update-post.model';

@Injectable()
export class PostService {
    constructor(@InjectRepository(Post) readonly repository: Repository<Post>) {
        //super(repository, { useSoftDelete: true });
    }

    async create(data: CreatePostModel): Promise<Post> {
        const model = new Post({
            ...data,
            author: Promise.resolve(data.author),
            parent: Promise.resolve(data.parent),
        });
        const saved = await this.repository.save(model);
        return await this.repository.findOne(saved.id);
    }

    async update(id: number, data: UpdatePostModel): Promise<Post> {
        const updated = await this.repository.save({...data, id});
        return await this.repository.findOne(updated.id);
    }

    async delete(id: number): Promise<boolean> {
        return !!(await this.repository.softDelete(id));
    }
}
