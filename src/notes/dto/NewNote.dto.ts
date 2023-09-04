import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class NewNoteDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  text: string;
}
