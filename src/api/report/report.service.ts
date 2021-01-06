import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Report} from '@api/report/report.entity';
import {Repository} from 'typeorm';
import {CreateReportModel} from '@api/report/models/create-report.model';
import {UpdateReportModel} from '@api/report/models/update-report.model';

@Injectable()
export class ReportService {

    constructor(@InjectRepository(Report) readonly repository: Repository<Report>) {
    }

    async create(data: CreateReportModel): Promise<Report> {
        const model = new Report({...data, emitter: Promise.resolve(data.emitter)});
        const saved = await this.repository.save(model);
        return await this.repository.findOne(saved.id);
    }

    async update(id: number, data: UpdateReportModel): Promise<Report> {
        const updated = await this.repository.save({...data, id});
        return await this.repository.findOne(updated.id);
    }

    async delete(id: number): Promise<boolean> {
        return !!(await this.repository.delete(id));
    }
}
