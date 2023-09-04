import { PartialType } from "@nestjs/mapped-types";
import { CardCreateDto } from "./CardCreate.dto";

export class CardUpdateDto extends PartialType(CardCreateDto) {}
