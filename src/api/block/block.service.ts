import {InjectRepository} from '@nestjs/typeorm';
import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {Block} from './block.entity';
import {createBlockModel} from './models/create-block.model';
import { findBlockModel } from './models/find-block.model';

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

    async count(options?: findBlockModel): Promise<number>{
        const {where, relations} = this.queryfy(options);
        return this.repository.count({where, relations});
    }

    async getMany(take: number, skip: number, options?: findBlockModel): Promise<Block[]> {
        const {where, relations} = this.queryfy(options);
        return this.repository.find({take, skip, where, relations});
    }

    async delete(id: number): Promise<boolean> {
        return !!(await this.repository.delete(id));
    }

    private queryfy (options?: findBlockModel): any{
        let where = {};
        let relations = [];
        if(options?.emitterId) {
            where = {...where, emitter:{id: options.emitterId}};
            relations = [...relations, 'emitter'];
        }
        if(options?.receiverId){
            where = {...where, receiver:{id: options.receiverId}};
            relations = [...relations, 'receiver'];
        }
        return {where, relations};
    }
}

// const foo = "castor";
// console.log(foo); // castor
// console.log(!foo); // false
// console.log(!!foo); // true
