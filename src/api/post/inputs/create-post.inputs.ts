import {Field, InputType, Int} from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
    @Field()
    readonly content: string;
    @Field(() => Int, {nullable: true})
    readonly parentId?: number;
}
