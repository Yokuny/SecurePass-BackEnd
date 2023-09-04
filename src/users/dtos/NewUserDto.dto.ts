import { IsEmail, IsStrongPassword } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class NewUserDto {
  @ApiProperty({ description: "Email" })
  @IsEmail()
  email: string;

  @ApiProperty({ description: "Password" })
  @IsStrongPassword()
  password: string;
}
