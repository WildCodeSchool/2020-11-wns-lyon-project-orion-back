import {NestExpressApplication} from '@nestjs/platform-express';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {join} from 'path';

async function bootstrap() {
    const app = await NestFactory.create(AppModule) as NestExpressApplication;

    app.enableCors();
    app.useStaticAssets(join(__dirname, '../public'));

    await app.listen(3000);
}

bootstrap();
