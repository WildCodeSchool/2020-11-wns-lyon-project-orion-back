import {AuthPayloadModel} from '@core/auth/models/auth-payload.model';
import {Injectable, NotFoundException} from '@nestjs/common';
import {AuthService} from '@core/auth/auth.service';
import {Strategy, ExtractJwt} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {User} from '@modules/user/user.entity';
import {ConfigService} from '@nestjs/config';

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
