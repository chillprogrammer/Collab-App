import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from './env';
import { AppGateway } from './app.gateway';

@Module({
  imports: [
    MongooseModule.forRoot(env.MONGO_URL, {
      useNewUrlParser: true,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
