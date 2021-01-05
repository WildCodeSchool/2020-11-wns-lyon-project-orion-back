import {
    Column,
    CreateDateColumn,
    OneToOne,
    Entity,
    OneToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '@api/user/user.entity';
import { Star } from '@api/star/star.entity';
import { Like } from '@api/like/like.entity';
import { PostTypes } from './enums/post-type.enum';

@ObjectType()
@Entity({ name: 'posts' })
export class Post {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Field()
    @Column()
    readonly content: string;

    @Field(() => PostTypes)
    @Column('enum', { enum: PostTypes, default: PostTypes.default })
    readonly type: PostTypes;

    @Field()
    @CreateDateColumn()
    readonly createdAt: Date;

    @Field()
    @UpdateDateColumn()
    readonly updatedAt: Date;

    @Field()
    @DeleteDateColumn()
    readonly deletedAt?: Date;

    /* ===========================================================
RELATIONS
============================================================== */

    @Field(() => User)
    @ManyToOne(
        () => User,
        user => user.posts,
    )
    readonly author: Promise<User>;

    @Field(() => Post, { nullable: true })
    @ManyToOne(
        () => Post,
        post => post.parent,
        { nullable: true },
    ) //softDelete
    readonly parent?: Promise<Post>;

    @Field(() => [Post], { nullable: true })
    @OneToMany(
        () => Post,
        post => post.children,
        { nullable: true },
    )
    readonly children?: Promise<Post[]>;

    @Field(() => Star, { nullable: true })
    @OneToMany(
        () => Star,
        star => star.post,
        { nullable: true, onDelete: 'CASCADE' },
    )
    readonly star: Promise<Star>;

    @Field(() => [Like], { nullable: true })
    @OneToMany(
        () => Like,
        like => like.post,
        { nullable: true, onDelete: 'CASCADE' },
    )
    readonly likes: Promise<Like[]>;

    constructor(item?: Partial<Post>) {
        Object.assign(this, item);
    }
}
