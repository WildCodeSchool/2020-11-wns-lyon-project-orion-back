import {
    Column,
    CreateDateColumn,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    ManyToOne,
} from 'typeorm';
import {Field, Int, ObjectType} from '@nestjs/graphql';
import {User} from '@api/user/user.entity';
import {Post} from '@api/post/post.entity';

@ObjectType()
@Entity({name: 'likes'})
export class Like {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Field()
    @CreateDateColumn()
    readonly createdAt: Date;

    /* ===========================================================
    RELATIONS
    ============================================================== */

    @Field(() => User)
    @ManyToOne(
        () => User,
        user => user.likes,
    )
    readonly user: Promise<User>;

    @Field(() => Post)
    @ManyToOne(
        () => Post,
        post => post.likes,
    )
    readonly post: Promise<Post>;

    constructor(item?: Partial<Like>) {
        Object.assign(this, item);
    }
}
