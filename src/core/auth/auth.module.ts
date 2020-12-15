import {Module, forwardRef} from '@nestjs/common';
import {JwtStrategy} from './strategies/jwt.strategy';
import {UserModule} from '@core/user/user.module';
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
    providers: [JwtStrategy, AuthService],
    exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
