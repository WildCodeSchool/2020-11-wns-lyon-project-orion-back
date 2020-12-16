import {Field, Int, ObjectType} from '@nestjs/graphql';
import {User} from '../../../api/user/user.entity';

@ObjectType()
export class LoginOutput {

    @Field()
    readonly accessToken: string;

    @Field()
    readonly refreshToken: string;

    @Field(() => Int)
    readonly expiresIn: number;

    @Field(() => User)
    readonly user: User;
}
