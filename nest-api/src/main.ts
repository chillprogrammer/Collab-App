import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { env } from './env';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'static'));
  app.enableCors();
  await app.listen(env.PORT, env.BASE_URL);

  console.log(`Nest API running on http://${env.BASE_URL}:${env.PORT}`);
}
bootstrap();
