import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class EraseDto {
  @ApiProperty({ description: "Password" })
  @IsString()
  password: string;
}
