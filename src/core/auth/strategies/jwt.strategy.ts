import {AuthPayloadModel} from '../models/auth-payload.model';
import {Injectable, NotFoundException} from '@nestjs/common';
import {Strategy, ExtractJwt} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {ConfigService} from '@nestjs/config';
import {AuthService} from '../auth.service';
import {User} from '../../../api/user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private config: ConfigService,
        private authService: AuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get<string>('JWT_KEY'),
            ignoreExpiration: false,
        });
    }

    async validate(payload: AuthPayloadModel): Promise<User> {
        const user = await this.authService.getUser(payload);
        if (!user) throw new NotFoundException('User not found');
        return user;
    }
}
