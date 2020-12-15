import {Field, Int, ObjectType} from '@nestjs/graphql';

type ClassType<T> = new() => T;

export function PaginatedOutput<T>(Item: ClassType<T>): any {

    @ObjectType({isAbstract: true})
    abstract class PaginatedOutputClass {

        @Field(_type => [Item])
        readonly items: T[];

        @Field(_type => Int)
        readonly total: number;

        @Field()
        readonly hasMore: boolean;
    }

    return PaginatedOutputClass;
}