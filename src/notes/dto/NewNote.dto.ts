import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class NewNoteDto {
  @ApiProperty({ description: "Title" })
  @IsString()
  title: string;

  @ApiProperty({ description: "Text" })
  @IsString()
  text: string;
}
