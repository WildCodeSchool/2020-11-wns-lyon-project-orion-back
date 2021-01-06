import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
} from 'typeorm';
import {Field, Int, ObjectType} from '@nestjs/graphql';
import {User} from '@api/user/user.entity';

@ObjectType()
@Entity({name: 'blocks'})
export class Block {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Field()
    @CreateDateColumn()
    readonly createdAt: Date;

    /* ==================================================================
    RELATIONS
    ===================================================================== */

    @Field(() => User)
    @ManyToOne(
        () => User,
        user => user.blocksEmitted,
    )
    readonly emitter: Promise<User>;

    @Field(() => User)
    @ManyToOne(
        () => User,
        user => user.blocksReceived,
    )
    readonly receiver: Promise<User>;

    constructor(item?: Partial<Block>) {
        Object.assign(this, item);
    }
}
