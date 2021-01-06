import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    OneToMany,
} from 'typeorm';
import {Field, Int, ObjectType} from '@nestjs/graphql';
import {UserGenders} from './enums/user-genders.enum';
import {Profile} from '@api/profile/profile.entity';
import {UserRoles} from './enums/user-roles.enum';
import {Report} from '@api/report/report.entity';
import {nanoid} from 'nanoid';
import {fieldToFieldConfig} from 'graphql-tools';
import {Block} from '@api/block/block.entity';

@ObjectType()
@Entity({name: 'users'})
export class User {
    @Field(() => Int)
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
    @Column({unique: true})
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

    @Field(() => Profile)
    @OneToOne(
        () => Profile,
        profile => profile.user,
    )
    readonly profile: Promise<Profile>;

    @Field(() => [Report])
    @OneToMany(() => Report, report => report.emitter)
    readonly reports: Promise<Report[]>;

    constructor(item?: Partial<User>) {
        this.pid = nanoid(10);
        Object.assign(this, item);
    }

    @Field(() => [Block])
    @OneToMany(
        () => Block,
        blockEmitted => blockEmitted.emitter,
    )
    readonly blocksEmitted: Promise<Block[]>;

    @Field(() => [Block])
    @OneToMany(
        () => Block,
        blockReceived => blockReceived.receiver,
    )
    readonly blocksReceived: Promise<Block[]>;
}
