import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class UpdateStarInput {
    @Field()
    readonly createdAt: Date;
}
