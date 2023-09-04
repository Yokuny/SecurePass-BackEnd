import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CardCreateDto } from "./dto/CardCreate.dto";
import { CardUpdateDto } from "./dto/CardUpdate.dto";

@Injectable()
export class CardsRepositories {
  constructor(private readonly prisma: PrismaService) {}

  createCard(data: CardCreateDto, userId: number) {
    return this.prisma.card.create({
      data: {
        ...data,
        userId: userId,
        expirationDate: new Date(
          parseInt("20" + data.expirationDate.slice(-2)),
          parseInt(data.expirationDate.slice(0, 2)) - 1
        ),
      },
    });
  }

  findAllCards(userId: number) {
    return this.prisma.card.findMany({ where: { userId } });
  }

  findOneCard(id: number) {
    return this.prisma.card.findUnique({ where: { id } });
  }

  cardUpdate(id: number, data: CardUpdateDto) {
    if (data.expirationDate) {
      return this.prisma.card.update({
        where: { id },
        data: {
          ...data,
          expirationDate: new Date(
            parseInt("20" + data.expirationDate.slice(-2)),
            parseInt(data.expirationDate.slice(0, 2)) - 1
          ),
        },
      });
    }

    return this.prisma.card.update({
      where: { id },
      data: data,
    });
  }

  deleteCard(id: number) {
    return this.prisma.card.delete({ where: { id } });
  }
}
