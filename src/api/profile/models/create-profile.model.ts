import {User} from '@core/user/user.entity';

export class CreateProfileModel {
    readonly username: string;
    readonly birthDate: Date;
    readonly user: User;
}
