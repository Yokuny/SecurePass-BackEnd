import { IsEmail, IsStrongPassword } from "class-validator";

export class NewUserDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
