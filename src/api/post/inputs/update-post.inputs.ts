import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class UpdatePostInput {
    @Field()
    readonly content: string;
}
