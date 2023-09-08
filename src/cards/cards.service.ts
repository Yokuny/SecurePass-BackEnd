import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
const Cryptr = require("cryptr");
import { CardCreateDto } from "./dto/CardCreate.dto";
import { CardUpdateDto } from "./dto/CardUpdate.dto";
import { CardsRepositories } from "./cards.repositories";
import { Card } from "prisma/prisma-client";

@Injectable()
export class CardsService {
  crypt = new Cryptr(process.env.CRYPTO_SECRET);
  constructor(private readonly repository: CardsRepositories) {}

  private decryptedCard(card: Card) {
    const decryptedCard = { ...card };
    decryptedCard.cvv = this.crypt.decrypt(card.cvv);
    decryptedCard.password = this.crypt.decrypt(card.password);
    return decryptedCard;
  }

  async findAllCards(userId: number) {
    const cards = await this.repository.findAllCards(userId);
    if (!cards) throw new NotFoundException("Wrong User ID");

    const decryptedCards = cards.map((card) => this.decryptedCard(card));

    return decryptedCards;
  }

  async findOneCard(id: number, userId: number) {
    const card = await this.checkCards(id, userId);
    const decryptedCard = this.decryptedCard(card);

    return decryptedCard;
  }

  private async checkCards(id: number, userId: number) {
    const card = await this.repository.findOneCard(id);
    if (!card) throw new NotFoundException("Wrong Card ID");
    if (card.userId !== userId) throw new ForbiddenException();
    return card;
  }

  createCard(data: CardCreateDto, userId: number) {
    const cryptCvv = this.crypt.encrypt(data.cvv);
    const cryptPassword = this.crypt.encrypt(data.password);
    return this.repository.createCard(
      { ...data, cvv: cryptCvv, password: cryptPassword },
      userId,
    );
  }

  async cardUpdate(id: number, data: CardUpdateDto, userId: number) {
    await this.checkCards(id, userId);
    return this.repository.cardUpdate(id, data);
  }

  async deleteCard(id: number, userId: number) {
    await this.checkCards(id, userId);
    return this.repository.deleteCard(id);
  }
}
