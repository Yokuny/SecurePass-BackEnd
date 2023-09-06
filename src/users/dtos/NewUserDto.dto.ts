import { IsEmail, IsStrongPassword } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class NewUserDto {
  @ApiProperty({ description: "Email" })
  @ApiProperty({ example: "seu@email.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ description: "Password" })
  @ApiProperty({ example: "aaa@BBB1234" })
  @ApiProperty({ minLength: 10 })
  @IsStrongPassword()
  password: string;
}
