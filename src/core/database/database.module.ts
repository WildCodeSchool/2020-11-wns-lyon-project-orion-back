import {Module} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';

const DEFAULT_DATABASE = 'orion';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({

                type: 'mysql',

                host: config.get<string>('DB_HOST', 'localhost'),
                port: config.get<number>('DB_PORT', 3306),

                database: config.get<string>('DB_DATABASE', DEFAULT_DATABASE),
                username: config.get<string>('DB_USERNAME', 'root'),
                password: config.get<string>('DB_PASSWORD', ''),

                synchronize: true,
                entities: ['dist/**/*.entity{.ts,.js}'],

                ssl: config.get<string>('NODE_ENV') === 'production',
                extra: config.get<string>('NODE_ENV') === 'production'
                    ? {ssl: {rejectUnauthorized: false}}
                    : null,
            })
        })
    ]
})
export class DatabaseModule {}
