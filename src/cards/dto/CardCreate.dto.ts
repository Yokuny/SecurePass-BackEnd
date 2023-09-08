import {
  IsBoolean,
  IsCreditCard,
  IsIn,
  IsNumberString,
  IsString,
  Length,
  Matches,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CardCreateDto {
  @ApiProperty({ description: "Title" })
  @ApiProperty({ example: "Bradesco" })
  @IsString()
  title: string;

  @ApiProperty({ description: "Number" })
  @ApiProperty({ example: "5446 9804 5390 8711" })
  @IsCreditCard()
  number: string;

  @ApiProperty({ description: "Name" })
  @ApiProperty({ example: "John Doe" })
  @IsString()
  name: string;

  @ApiProperty({ description: "CVV" })
  @ApiProperty({ example: "123" })
  @IsNumberString()
  @Length(3)
  cvv: string;

  @ApiProperty({ description: "Expiration date" })
  @ApiProperty({ example: "12/22" })
  @Matches("^[0-9]{2}/[0-9]{2}$")
  expirationDate: string;

  @ApiProperty({ description: "Password" })
  @ApiProperty({ example: "123456" })
  @IsString()
  password: string;

  @ApiProperty({ description: "Is virtual" })
  @ApiProperty({ example: true })
  @IsBoolean()
  isVirtual: boolean;

  @ApiProperty({ description: "Type" })
  @ApiProperty({ example: "CREDIT" })
  @IsString()
  @IsIn(["CREDIT", "DEBT", "BOTH"])
  type: "CREDIT" | "DEBT" | "BOTH";
}
