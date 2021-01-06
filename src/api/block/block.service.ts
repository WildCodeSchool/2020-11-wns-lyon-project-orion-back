import {InjectRepository} from '@nestjs/typeorm';
import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {Block} from './block.entity';
import {createBlockModel} from './models/create-block.model';

@Injectable()
export class BlockService {
    constructor(
        @InjectRepository(Block) readonly repository: Repository<Block>,
    ) {}

    async create(data: createBlockModel): Promise<Block> {
        const model = new Block({
            emitter: Promise.resolve(data.emitter),
            receiver: Promise.resolve(data.receiver),
        });
        const saved = await this.repository.save(model);
        return this.repository.findOne(saved.id);
    }

    async delete(id: number): Promise<boolean> {
        return !!(await this.repository.delete(id));
    }
}

// const foo = "castor";
// console.log(foo); // castor
// console.log(!foo); // false
// console.log(!!foo); // true
