import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { NotesModule } from './notes/notes.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [InMemoryDBModule.forRoot(), NotesModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
