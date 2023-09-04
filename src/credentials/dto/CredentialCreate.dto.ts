import { IsString, IsUrl } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CredentialCreateDto {
  @ApiProperty({ description: "Title" })
  @IsString()
  title: string;

  @ApiProperty({ description: "Username" })
  @IsString()
  username: string;

  @ApiProperty({ description: "Password" })
  @IsString()
  password: string;

  @ApiProperty({ description: "URL" })
  @IsUrl()
  url: string;
}
