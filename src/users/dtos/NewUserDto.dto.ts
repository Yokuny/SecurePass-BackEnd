import { IsEmail, IsStrongPassword } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class NewUserDto {
  @ApiProperty({ description: "Email" })
  @ApiProperty({ example: "Yokuny" })
  @IsEmail()
  email: string;

  @ApiProperty({ description: "Password" })
  @ApiProperty({ example: "123456" })
  @IsStrongPassword()
  password: string;
}
