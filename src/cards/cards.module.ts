import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { CardsRepositories } from "./cards.repositories";

@Module({
  controllers: [CardsController],
  providers: [CardsService, CardsRepositories],
})
export class CardsModule {}
