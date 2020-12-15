import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {CoreModule} from '@core/core.module';
import {ApiModule} from '@api/api.module';

@Module({
    imports: [
        ApiModule,
        CoreModule,
        ConfigModule.forRoot({isGlobal: true}),
    ],
})
export class AppModule {
}
