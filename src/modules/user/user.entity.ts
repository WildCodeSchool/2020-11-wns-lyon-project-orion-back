import {Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import {Connection} from '../connection/connection.entity';
import {UserGenders} from './enums/user-genders.enum';
import {Field, ObjectType} from '@nestjs/graphql';
import {UserRoles} from './enums/user-roles.enum';
import {nanoid} from 'nanoid';

@ObjectType()
@Entity({name: 'users'})
export class User {

    @Field()
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Field()
    @Column()
    readonly pid: string;

    @Field(() => [UserRoles])
    @Column('set', {enum: UserRoles})
    readonly roles: UserRoles[];

    @Field()
    @Column()
    readonly lastName: string;

    @Field()
    @Column()
    readonly firstName: string;

    @Field()
    @Column()
    readonly email: string;

    @Field({nullable: true})
    @Column({nullable: true})
    readonly password: string;

    @Field(() => UserGenders)
    @Column('enum', {enum: UserGenders})
    readonly gender: UserGenders;

    @Field()
    @Column()
    readonly birthDate: Date;

    @Field()
    @CreateDateColumn()
    readonly createdAt: Date;

    @Field()
    @UpdateDateColumn()
    readonly updatedAt: Date;

    /* ==================================================================
    RELATIONS
    ===================================================================== */

    @Field(() => [Connection])
    @ManyToOne(() => Connection, connection => connection.user)
    readonly connections: Promise<Connection[]>;

    constructor(item?: Partial<User>) {
        this.pid = nanoid(10);
        Object.assign(this, item);
    }

}
