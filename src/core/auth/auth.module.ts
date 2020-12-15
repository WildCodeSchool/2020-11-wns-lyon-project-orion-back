import {forwardRef, Module} from '@nestjs/common';
import {UserModule} from '@modules/user/user.module';
import {JwtModule} from '@nestjs/jwt';
import {ConfigService} from '@nestjs/config';
import {AuthService} from '@core/auth/auth.service';
import {JwtStrategy} from '@core/auth/strategies/jwt.strategy';

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
        AuthService,
        JwtStrategy,
    ],
    exports: [
        AuthService,
        JwtStrategy,
    ],
})
export class AuthModule {
}
