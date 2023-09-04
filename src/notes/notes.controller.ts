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
  UseGuards,
} from "@nestjs/common";
import { NotesService } from "./notes.service";
import { NewNoteDto } from "./dto/NewNote.dto";
import { UpdateNoteDto } from "./dto/UpdateNote.dto";
import { User } from "src/commons/decorators/users.decorator";
import { AuthGuard } from "src/commons/guards/auth.guard";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Notes controller")
@Controller("notes")
@UseGuards(AuthGuard)
export class NotesController {
  constructor(private readonly service: NotesService) {}

  @ApiOperation({ summary: "Create note" })
  @ApiResponse({ status: 201, description: "Note created" })
  @ApiBody({ type: NewNoteDto })
  @Post()
  async registerNote(@Body() body: NewNoteDto, @User() userId: number) {
    try {
      await this.service.registerNote(body, userId);
    } catch (err) {
      if (err.code === "P2002") throw new ConflictException("Wrong title!");
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: "Find all notes" })
  @ApiResponse({ status: 200, description: "Notes found" })
  @Get()
  findAllNotes(@User() userId: number) {
    return this.service.findAllNotes(userId);
  }

  @ApiOperation({ summary: "Find one note" })
  @ApiResponse({ status: 200, description: "Note found" })
  @ApiParam({ name: "id", type: "number" })
  @Get(":id")
  findOneNote(@Param("id") id: string, @User() userId: number) {
    return this.service.findOneNote(+id, userId);
  }

  @ApiOperation({ summary: "Update note" })
  @ApiParam({ name: "id", type: "number" })
  @ApiBody({ type: UpdateNoteDto })
  @ApiResponse({ status: 200, description: "Note updated" })
  @Patch(":id")
  async nodeUpdate(@Param("id") id: string, @Body() updateNoteDto: UpdateNoteDto, @User() userId: number) {
    try {
      await this.service.nodeUpdate(+id, updateNoteDto, userId);
    } catch (err) {
      if (err.code === "P2002") throw new ConflictException("Wrong title");
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: "Remove note" })
  @ApiParam({ name: "id", type: "number" })
  @ApiResponse({ status: 200, description: "Note removed" })
  @Delete(":id")
  removeNote(@Param("id") id: string, @User() userId: number) {
    this.service.removeNote(+id, userId);
  }
}
