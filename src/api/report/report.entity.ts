import {Field, ObjectType, Int} from '@nestjs/graphql';
import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {ReportTypes} from './enums/report-types.enum';
import {User} from '@api/user/user.entity';
import { ReportStatus } from './enums/report-status.enum';

@ObjectType()
@Entity({name: 'reports'})
export class Report {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Field(() => ReportTypes)
    @Column('enum', {enum: ReportTypes})
    readonly type: ReportTypes;

    @Field(() => Int)
    @Column()
    readonly referenceId: number;

    @Field()
    @CreateDateColumn()
    readonly createdAt: Date;

    @Field(() => ReportStatus)
    @Column('enum', {enum: ReportStatus, default: ReportStatus.Pending})
    readonly status: ReportStatus;


    /* ===========================================================
    RELATIONS
    ============================================================== */
    
    @Field(() => User)
    @ManyToOne(() => User, user => user.reports)
    readonly emitter: Promise<User>;

    constructor(item?: Partial<Report>) {
        Object.assign(this, item);
    }
}
