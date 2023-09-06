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
  HttpStatus,
  Res,
} from "@nestjs/common";
import { CardsService } from "./cards.service";
import { CardCreateDto } from "./dto/CardCreate.dto";
import { CardUpdateDto } from "./dto/CardUpdate.dto";
import { User } from "src/commons/decorators/users.decorator";
import { AuthGuard } from "src/commons/guards/auth.guard";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";

@ApiTags("Cards controller")
@Controller("cards")
@UseGuards(AuthGuard)
export class CardsController {
  constructor(private readonly service: CardsService) {}

  @Get()
  @ApiOperation({ summary: "Find all cards" })
  @ApiResponse({ status: 200, description: "Cards found or empty array" })
  findAllCards(@User() userId: number) {
    return this.service.findAllCards(userId);
  }

  @Get(":id")
  @ApiOperation({ summary: "Find one card" })
  @ApiResponse({ status: 200, description: "Card found" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Wrong Card ID" })
  @ApiParam({ name: "id", type: "number" })
  findOneCard(@Param("id") id: string, @User() userId: number) {
    return this.service.findOneCard(+id, userId);
  }

  @ApiOperation({ summary: "Create card" })
  @ApiResponse({ status: 201, description: "Card created" })
  @ApiBody({ type: CardCreateDto })
  @Post()
  async createCard(@Body() body: CardCreateDto, @User() userId: number, @Res() res: Response) {
    try {
      await this.service.createCard(body, userId);
      return res.status(HttpStatus.CREATED).json({ message: "Card created" });
    } catch (err) {
      if (err.code === "P2002") {
        return res.status(HttpStatus.CONFLICT).json({ message: "Title already exists" });
      }
      throw new InternalServerErrorException();
    }
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update card" })
  @ApiParam({ name: "id", type: "number" })
  @ApiBody({ type: CardUpdateDto })
  @ApiResponse({ status: 200, description: "Card updated" })
  async cardUpdate(@Param("id") id: string, @Body() body: CardUpdateDto, @User() userId: number) {
    try {
      await this.service.cardUpdate(+id, body, userId);
    } catch (err) {
      if (err.code === "P2002") throw new ConflictException();
      throw new InternalServerErrorException();
    }
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete card" })
  @ApiResponse({ status: 200, description: "Card deleted" })
  @ApiParam({ name: "id", type: "number" })
  deleteCard(@Param("id") id: string, @User() userId: number) {
    this.service.deleteCard(+id, userId);
  }
}
