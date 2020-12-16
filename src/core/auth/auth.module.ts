import {Module, forwardRef} from '@nestjs/common';
import {JwtStrategy} from './strategies/jwt.strategy';
import {AuthResolver} from '@core/auth/auth.resolver';
import {UserModule} from '@api/user/user.module';
import {ConfigService} from '@nestjs/config';
import {AuthService} from './auth.service';
import {JwtModule} from '@nestjs/jwt';


@Module({
    imports: [
        forwardRef(() => UserModule),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => ({
                secret: config.get<string>('JWT_KEY'),
            }),
        }),
    ],
    providers: [
        JwtStrategy,
        AuthService,
        AuthResolver
    ],
    exports: [
        AuthService,
        JwtStrategy,
    ],
})
export class AuthModule {}
