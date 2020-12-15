import {Field, InputType, Int} from '@nestjs/graphql';

@InputType()
export abstract class PaginatedInput {

    @Field(_type => Int, {defaultValue: 0})
    readonly take: number;

    @Field(_type => Int, {defaultValue: 0})
    readonly skip: number;
}