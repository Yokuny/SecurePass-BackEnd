import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { NotesRepositories } from "./notes.repositories";
import { NewNoteDto } from "./dto/NewNote.dto";
import { UpdateNoteDto } from "./dto/UpdateNote.dto";

@Injectable()
export class NotesService {
  constructor(private readonly notesRepositories: NotesRepositories) {}

  async registerNote(data: NewNoteDto, userId: number) {
    return await this.notesRepositories.registerNote(data, userId);
  }

  async findAllNotes(id: number) {
    return await this.notesRepositories.findAllNotes(id);
  }

  private async checkNote(id: number, userId: number) {
    const note = await this.notesRepositories.findOneNote(id);
    if (!note) throw new NotFoundException("note not found");
    if (note.userId !== userId) throw new ForbiddenException();
    return note;
  }

  async findOneNote(id: number, userId: number) {
    return await this.checkNote(id, userId);
  }

  async nodeUpdate(id: number, updateNoteDto: UpdateNoteDto, userId: number) {
    await this.checkNote(id, userId);
    return await this.notesRepositories.nodeUpdate(id, updateNoteDto);
  }

  async removeNote(id: number, userId: number) {
    await this.checkNote(id, userId);
    return await this.notesRepositories.removeNote(id);
  }
}
