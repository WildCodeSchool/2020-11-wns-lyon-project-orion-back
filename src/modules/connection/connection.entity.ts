import {Field, ObjectType} from '@nestjs/graphql';
import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {User} from '../user/user.entity';

@ObjectType()
@Entity({name: 'connections'})
export class Connection {

    @Field()
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Field({nullable: true})
    @Column({nullable: true})
    readonly userAgent: string;

    @Field({nullable: true})
    @Column({nullable: true})
    readonly remoteAddress: string;

    @Field()
    @Column()
    readonly refreshToken: string;

    @Field()
    @CreateDateColumn()
    readonly createdAt: Date;

    @Field()
    @UpdateDateColumn()
    readonly updatedAt: Date;

    /* ==================================================================
    RELATIONS
    ===================================================================== */

    @Field(() => User)
    @ManyToOne(() => User, user => user.connections)
    readonly user: Promise<User>;

    constructor(item?: Partial<Connection>) {
        Object.assign(this, item);
    }
}
