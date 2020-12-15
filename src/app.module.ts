import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {CoreModule} from '@core/core.module';
import {ModulesModule} from '@modules/modules.module';

@Module({
    imports: [
        CoreModule,
        ModulesModule,
        ConfigModule.forRoot({isGlobal: true}),
    ],
})
export class AppModule {
}
