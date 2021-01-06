import {
    Column,
    CreateDateColumn,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import {Field, Int, ObjectType} from '@nestjs/graphql';
import {User} from '@api/user/user.entity';

@ObjectType()
@Entity({name: 'profiles'})
export class Profile {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Field()
    @Column()
    readonly username: string;

    @Field()
    @Column()
    readonly birthDate: Date;

    @Field()
    @CreateDateColumn()
    readonly createdAt: Date;

    @Field()
    @UpdateDateColumn()
    readonly updatedAt: Date;

    /* ===========================================================
    RELATIONS
    ============================================================== */

    @Field(() => User)
    @OneToOne(
        () => User,
        user => user.profile,
    )
    readonly user: Promise<User>;

    constructor(item?: Partial<Profile>) {
        Object.assign(this, item);
    }
}
