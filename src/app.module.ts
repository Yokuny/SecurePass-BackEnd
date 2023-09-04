import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardsModule } from './cards/cards.module';
import { CredentialsModule } from './credentials/credentials.module';
import { NotesModule } from './notes/notes.module';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { EraseModule } from './erase/erase.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CardsModule, CredentialsModule, NotesModule, EraseModule, UsersModule],
  controllers: [AppController, NotesController],
  providers: [AppService, NotesService],
})
export class AppModule {}
