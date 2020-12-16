import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class UpdateProfileInput {

    @Field()
    readonly username: string;

    @Field()
    readonly birthDate: Date;
}
