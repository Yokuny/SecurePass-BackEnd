import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { NewNoteDto } from "./dto/NewNote.dto";
import { UpdateNoteDto } from "./dto/UpdateNote.dto";

@Injectable()
export class NotesRepositories {
  constructor(private readonly prisma: PrismaService) {}

  registerNote(data: NewNoteDto, id: number) {
    return this.prisma.note.create({
      data: { ...data, userId: id },
    });
  }

  findAllNotes(id: number) {
    return this.prisma.note.findMany({ where: { userId: id } });
  }

  findOneNote(id: number) {
    return this.prisma.note.findUnique({ where: { id } });
  }

  nodeUpdate(id: number, data: UpdateNoteDto) {
    return this.prisma.note.update({
      where: { id },
      data: data,
    });
  }

  removeNote(id: number) {
    return this.prisma.note.delete({ where: { id } });
  }
}
