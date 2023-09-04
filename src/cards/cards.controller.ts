import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ConflictException,
  InternalServerErrorException,
} from "@nestjs/common";
import { CardsService } from "./cards.service";
import { CardCreateDto } from "./dto/CardCreate.dto";
import { CardUpdateDto } from "./dto/CardUpdate.dto";

@Controller("cards")
export class CardsController {
  constructor(private readonly service: CardsService) {}

  @Post()
  async createCard(@Body() body: CardCreateDto, @Param() userId: number) {
    try {
      await this.service.createCard(body, userId);
    } catch (err) {
      if (err.code === "P2002") throw new ConflictException();
      throw new InternalServerErrorException();
    }
  }

  @Get()
  findAllCards(@Param() userId: number) {
    return this.service.findAllCards(userId);
  }

  @Get(":id")
  findOneCard(@Param("id") id: string, @Param() userId: number) {
    return this.service.findOneCard(+id, userId);
  }

  @Patch(":id")
  async cardUpdate(@Param("id") id: string, @Body() body: CardUpdateDto, @Param() userId: number) {
    try {
      await this.service.cardUpdate(+id, body, userId);
    } catch (err) {
      if (err.code === "P2002") throw new ConflictException();
      throw new InternalServerErrorException();
    }
  }

  @Delete(":id")
  deleteCard(@Param("id") id: string, @Param() userId: number) {
    this.service.deleteCard(+id, userId);
  }
}
