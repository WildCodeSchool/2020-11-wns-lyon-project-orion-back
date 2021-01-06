import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class UpdateLikeInput {
    @Field()
    readonly createdAt: Date;
}
