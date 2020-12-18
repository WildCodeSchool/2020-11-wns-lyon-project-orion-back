import {Module} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {DatabaseService} from '@core/database/database.service';

@Module({
    imports: [TypeOrmModule.forRootAsync({useClass: DatabaseService})],
})
export class DatabaseModule {}
