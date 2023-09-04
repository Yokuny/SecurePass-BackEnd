import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
const Cryptr = require("cryptr");
import { CardCreateDto } from "./dto/CardCreate.dto";
import { CardUpdateDto } from "./dto/CardUpdate.dto";
import { CardsRepositories } from "./cards.repositories";

@Injectable()
export class CardsService {
  crypt = new Cryptr(process.env.CRYPTO_SECRET);
  constructor(private readonly repository: CardsRepositories) {}

  createCard(data: CardCreateDto, userId: number) {
    const cryptCvv = this.crypt.encrypt(data.cvv);
    const cryptPassword = this.crypt.encrypt(data.password);
    return this.repository.createCard({ ...data, cvv: cryptCvv, password: cryptPassword }, userId);
  }

  async findAllCards(userId: number) {
    const cards = await this.repository.findAllCards(userId);
    if (cards.length === 0) throw new NotFoundException("Cards not found");
    return cards;
  }

  private async checkCards(id: number, userId: number) {
    const card = await this.repository.findOneCard(id);
    if (!card) throw new NotFoundException("Card not Found");
    if (card.userId !== userId) throw new ForbiddenException();
    return card;
  }

  async findOneCard(id: number, userId: number) {
    return await this.checkCards(id, userId);
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
