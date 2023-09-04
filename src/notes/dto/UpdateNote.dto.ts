import { PartialType } from "@nestjs/mapped-types";
import { NewNoteDto } from "./NewNote.dto";

export class UpdateNoteDto extends PartialType(NewNoteDto) {}
