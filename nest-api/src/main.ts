import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  await app.listen(env.PORT, env.BASE_URL);

  console.log(`Nest API running on http://${env.BASE_URL}:${env.PORT}/api`);
}
bootstrap();
