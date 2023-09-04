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
  UseGuards,
} from "@nestjs/common";
import { CardsService } from "./cards.service";
import { CardCreateDto } from "./dto/CardCreate.dto";
import { CardUpdateDto } from "./dto/CardUpdate.dto";
import { User } from "src/commons/decorators/users.decorator";
import { AuthGuard } from "src/commons/guards/auth.guard";

@Controller("cards")
@UseGuards(AuthGuard)
export class CardsController {
  constructor(private readonly service: CardsService) {}

  @Post()
  async createCard(@Body() body: CardCreateDto, @User() userId: number) {
    try {
      await this.service.createCard(body, userId);
    } catch (err) {
      if (err.code === "P2002") throw new ConflictException();
      throw new InternalServerErrorException();
    }
  }

  @Get()
  findAllCards(@User() userId: number) {
    return this.service.findAllCards(userId);
  }

  @Get(":id")
  findOneCard(@Param("id") id: string, @User() userId: number) {
    return this.service.findOneCard(+id, userId);
  }

  @Patch(":id")
  async cardUpdate(@Param("id") id: string, @Body() body: CardUpdateDto, @User() userId: number) {
    try {
      await this.service.cardUpdate(+id, body, userId);
    } catch (err) {
      if (err.code === "P2002") throw new ConflictException();
      throw new InternalServerErrorException();
    }
  }

  @Delete(":id")
  deleteCard(@Param("id") id: string, @User() userId: number) {
    this.service.deleteCard(+id, userId);
  }
}
