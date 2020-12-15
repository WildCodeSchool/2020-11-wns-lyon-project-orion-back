import {Repository, DeepPartial} from 'typeorm';

export abstract class DatabaseModel<T> {

    protected constructor(protected repository: Repository<T>) {}

    async insert(data: T): Promise<T> {
        try {
            const inserted = await this.repository.save(data);
            return await this.repository.findOne(inserted['ID'])
        } catch (e) { throw new Error(e); }
    }

    async count(where?: DeepPartial<T>): Promise<number> {
        return await this.repository.count(where);
    }

    async updateOneById(id: string | number, data: DeepPartial<T>): Promise<T> {
        try {
            await this.repository.save({...data, id});
            return await this.repository.findOne(id);
        } catch (e) { throw new Error(e); }
    }

    async deleteOneById(id: string | number): Promise<boolean> {
        try { return !!await this.repository.delete(id); }
        catch (e) { throw new Error(e); }
    }

    async findOneById(id: string | number): Promise<T> {
        try { return await this.repository.findOne(id); }
        catch (e) { throw new Error(e); }
    }

    async findOne(where?: DeepPartial<T>): Promise<T> {
        try { return await this.repository.findOne(where); }
        catch (e) { throw new Error(e); }
    }

    async findAll(): Promise<T[]> {
        try { return await this.repository.find(); }
        catch (e) { throw new Error(e); }
    }

    async findMany(take: number, skip: number, where?: DeepPartial<T>): Promise<T[]> {
        try { return await this.repository.find({where, take, skip}); }
        catch (e) { throw new Error(e); }
    }

    clear(): boolean {
        try { return !!this.repository.clear(); }
        catch (e) { throw new Error(e); }
    }
}
