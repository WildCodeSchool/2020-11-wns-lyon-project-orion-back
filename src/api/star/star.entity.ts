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
@Entity({name: 'stars'})
export class Star {
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
        user => user.stars,
    )
    readonly user: Promise<User>;

    @Field(() => Post)
    @ManyToOne(
        () => Post,
        post => post.star,
    )
    readonly post: Promise<Post>;

    constructor(item?: Partial<Star>) {
        Object.assign(this, item);
    }
}
