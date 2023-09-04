import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { NotesRepositories } from "./notes.repositories";

@Module({
  controllers: [NotesController],
  providers: [NotesService, NotesRepositories],
})
export class NotesModule {}
