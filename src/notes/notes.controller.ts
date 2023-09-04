import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ConflictException,
  InternalServerErrorException,
} from "@nestjs/common";
import { NotesService } from "./notes.service";
import { NewNoteDto } from "./dto/NewNote.dto";
import { UpdateNoteDto } from "./dto/UpdateNote.dto";

@Controller("notes")
export class NotesController {
  constructor(private readonly service: NotesService) {}

  @Post()
  async registerNote(@Body() body: NewNoteDto, @Param() userId: number) {
    try {
      await this.service.registerNote(body, userId);
    } catch (err) {
      if (err.code === "P2002") throw new ConflictException("title already in use");
      throw new InternalServerErrorException();
    }
  }

  @Get()
  findAllNotes(@Param() userId: number) {
    return this.service.findAllNotes(userId);
  }

  @Get(":id")
  findOneNote(@Param("id") id: string, @Param() userId: number) {
    return this.service.findOneNote(+id, userId);
  }

  @Patch(":id")
  async nodeUpdate(@Param("id") id: string, @Body() updateNoteDto: UpdateNoteDto, @Param() userId: number) {
    try {
      await this.service.nodeUpdate(+id, updateNoteDto, userId);
    } catch (err) {
      if (err.code === "P2002") throw new ConflictException("title already in use");
      throw new InternalServerErrorException();
    }
  }

  @Delete(":id")
  removeNote(@Param("id") id: string, @Param() userId: number) {
    this.service.removeNote(+id, userId);
  }
}
