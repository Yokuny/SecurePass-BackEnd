import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class EraseDto {
  @ApiProperty({ description: "Password" })
  @ApiProperty({ example: "123456" })
  @IsString()
  password: string;
}
