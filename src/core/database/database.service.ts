import {TypeOrmModuleOptions, TypeOrmOptionsFactory} from '@nestjs/typeorm';
import {ConfigService} from '@nestjs/config';
import {Injectable} from '@nestjs/common';

const DEFAULT_DATABASE = 'orion';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {

    constructor(readonly config: ConfigService) {
    }

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',

            host: this.config.get<string>('DB_HOST', 'localhost'),
            port: this.config.get<number>('DB_PORT', 3306),

            database: this.config.get<string>('DB_DATABASE', DEFAULT_DATABASE),
            username: this.config.get<string>('DB_USERNAME', 'root'),
            password: this.config.get<string>('DB_PASSWORD', ''),

            synchronize: true,
            entities: ['dist/**/*.entity{.ts,.js}'],

            ssl: this.config.get<string>('NODE_ENV') === 'production',
            extra: this.config.get<string>('NODE_ENV') === 'production'
                ? {ssl: {rejectUnauthorized: false}}
                : null,
        };
    }
}
