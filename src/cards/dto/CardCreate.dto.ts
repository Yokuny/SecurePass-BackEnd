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
  @IsString()
  title: string;

  @ApiProperty({ description: "Number" })
  @IsCreditCard()
  number: string;

  @ApiProperty({ description: "Name" })
  @IsString()
  name: string;

  @ApiProperty({ description: "CVV" })
  @IsNumberString()
  @Length(3)
  cvv: string;

  @ApiProperty({ description: "Expiration date" })
  @Matches("^[0-9]{2}/[0-9]{2}$")
  expirationDate: string;

  @ApiProperty({ description: "Password" })
  @IsString()
  password: string;

  @ApiProperty({ description: "Is virtual" })
  @IsBoolean()
  isVirtual: boolean;

  @ApiProperty({ description: "Type" })
  @IsString()
  @IsIn(["CREDIT", "DEBT", "BOTH"])
  type: "CREDIT" | "DEBT" | "BOTH";
}
