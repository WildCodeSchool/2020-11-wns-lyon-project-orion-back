import {Field, Int, ObjectType} from '@nestjs/graphql';

@ObjectType()
export class RefreshOutput {
    @Field()
    readonly accessToken: string;

    @Field()
    readonly refreshToken: string;

    @Field(() => Int)
    readonly expiresIn: number;
}
