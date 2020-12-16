import {User} from '@api/user/user.entity';

export class CreateProfileModel {
    readonly username: string;
    readonly birthDate: Date;
    readonly user: User;
}
