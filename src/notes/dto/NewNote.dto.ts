import { IsString } from "class-validator";

export class NewNoteDto {
  @IsString()
  title: string;

  @IsString()
  text: string;
}
