import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { NotesRepositories } from "./notes.repositories";
import { NewNoteDto } from "./dto/NewNote.dto";
import { UpdateNoteDto } from "./dto/UpdateNote.dto";

@Injectable()
export class NotesService {
  constructor(private readonly repository: NotesRepositories) {}

  async findAllNotes(userId: number) {
    return await this.repository.findAllNotes(userId);
  }

  private async checkNote(id: number, userId: number) {
    const note = await this.repository.findOneNote(id);

    if (!note) throw new NotFoundException("Wrong Note ID");
    if (note.userId !== userId) throw new ForbiddenException("Unauthorized");

    return note;
  }

  async registerNote(data: NewNoteDto, userId: number) {
    return await this.repository.registerNote(data, userId);
  }

  async findOneNote(id: number, userId: number) {
    return await this.checkNote(id, userId);
  }

  async nodeUpdate(id: number, data: UpdateNoteDto, userId: number) {
    await this.checkNote(id, userId);
    return await this.repository.nodeUpdate(id, data);
  }

  async removeNote(id: number, userId: number) {
    await this.checkNote(id, userId);
    return await this.repository.removeNote(id);
  }
}
