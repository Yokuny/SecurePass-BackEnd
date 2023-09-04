import { IsEmail, IsStrongPassword } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class NewUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsStrongPassword()
  password: string;
}
