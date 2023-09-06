import {
  Controller,
  Res,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpStatus,
  InternalServerErrorException,
} from "@nestjs/common";
import { Response } from "express";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

import { NotesService } from "./notes.service";
import { NewNoteDto } from "./dto/NewNote.dto";
import { UpdateNoteDto } from "./dto/UpdateNote.dto";

import { User } from "src/commons/decorators/users.decorator";
import { AuthGuard } from "src/commons/guards/auth.guard";

@ApiTags("Notes controller")
@Controller("notes")
@UseGuards(AuthGuard)
export class NotesController {
  constructor(private readonly service: NotesService) {}

  @ApiOperation({ summary: "Find all notes" })
  @ApiResponse({
    status: 200,
    description: "Return a array of notes, or an empty array",
  })
  @ApiBearerAuth()
  @Get()
  findAllNotes(@User() userId: number) {
    return this.service.findAllNotes(userId);
  }

  @ApiOperation({ summary: "Find and return a note" })
  @ApiResponse({ status: 200, description: "Note found" })
  @ApiResponse({ status: 403, description: "Unauthorized" })
  @ApiResponse({ status: 404, description: "Wrong Note ID" })
  @ApiParam({ name: "id", type: "number" })
  @ApiBearerAuth()
  @Get(":id")
  async findOneNote(@Param("id") id: string, @User() userId: number, @Res() res: Response) {
    try {
      const note = await this.service.findOneNote(+id, userId);
      return res.status(HttpStatus.OK).json(note);
    } catch (err) {
      if (err.status === 403) {
        return res.status(HttpStatus.FORBIDDEN).json(err.message);
      }
      if (err.status === 404) {
        return res.status(HttpStatus.NOT_FOUND).json(err.message);
      }
    }
  }

  @ApiOperation({ summary: "Create note" })
  @ApiResponse({ status: 201, description: "Created and empty array" })
  @ApiResponse({ status: 409, description: "Title cannot be repeated" })
  @ApiBody({ type: NewNoteDto })
  @ApiBearerAuth()
  @Post()
  async registerNote(@Body() body: NewNoteDto, @User() userId: number, @Res() res: Response) {
    try {
      await this.service.registerNote(body, userId);
      return res.status(HttpStatus.CREATED).json({});
    } catch (err) {
      if (err.code === "P2002") {
        return res.status(HttpStatus.CONFLICT).json({ message: "Title already exists" });
      }
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: "Update note" })
  @ApiParam({ name: "id", type: "number" })
  @ApiBody({ type: UpdateNoteDto })
  @ApiResponse({ status: 200, description: "Note updated" })
  @ApiResponse({ status: 403, description: "Unauthorized" })
  @ApiResponse({ status: 404, description: "Wrong Note ID" })
  @ApiResponse({ status: 409, description: "Title already exists" })
  @ApiBearerAuth()
  @Patch(":id")
  async nodeUpdate(
    @Param("id") id: string,
    @Body() body: UpdateNoteDto,
    @User() userId: number,
    @Res() res: Response
  ) {
    try {
      await this.service.nodeUpdate(+id, body, userId);
    } catch (err) {
      if (err.status === 403) {
        return res.status(HttpStatus.FORBIDDEN).json(err.message);
      }
      if (err.status === 404) {
        return res.status(HttpStatus.NOT_FOUND).json(err.message);
      }
      if (err.code === "P2002") {
        return res.status(HttpStatus.CONFLICT).json({ message: "Title already exists" });
      }
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: "Remove note" })
  @ApiParam({ name: "id", type: "number" })
  @ApiResponse({ status: 200, description: "Return 'OK' anda a empty array" })
  @ApiBearerAuth()
  @Delete(":id")
  async removeNote(@Param("id") id: string, @User() userId: number, @Res() res: Response) {
    try {
      await this.service.removeNote(+id, userId);
      return res.status(HttpStatus.OK).json({});
    } catch (err) {
      if (err.status === 403) {
        return res.status(HttpStatus.FORBIDDEN).json(err.message);
      }
      if (err.status === 404) {
        return res.status(HttpStatus.NOT_FOUND).json(err.message);
      }
    }
  }
}
