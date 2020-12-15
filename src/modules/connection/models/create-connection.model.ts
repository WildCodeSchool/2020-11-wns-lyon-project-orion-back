import {User} from '../../user/user.entity';

export class CreateConnectionModel {
    readonly refreshToken: string;
    readonly remoteAddress?: string;
    readonly userAgent?: string;
    readonly user: User;
}
