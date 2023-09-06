import { IsString, IsUrl } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CredentialCreateDto {
  @ApiProperty({ description: "Title" })
  @ApiProperty({ example: "GitHub" })
  @IsString()
  title: string;

  @ApiProperty({ description: "Username" })
  @ApiProperty({ example: "john.doe" })
  @IsString()
  username: string;

  @ApiProperty({ description: "Password" })
  @ApiProperty({ example: "123456" })
  @IsString()
  password: string;

  @ApiProperty({ description: "URL" })
  @ApiProperty({ example: "https://github.com" })
  @IsUrl()
  url: string;
}
