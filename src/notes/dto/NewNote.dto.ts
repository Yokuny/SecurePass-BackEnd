import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class NewNoteDto {
  @ApiProperty({ description: "Title" })
  @ApiProperty({ example: "My note" })
  @IsString()
  title: string;

  @ApiProperty({ description: "Text" })
  @ApiProperty({ example: "This is my note" })
  @IsString()
  text: string;
}
