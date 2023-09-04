import { Module } from '@nestjs/common';
import { EraseController } from './erase.controller';
import { EraseService } from './erase.service';

@Module({
  controllers: [EraseController],
  providers: [EraseService]
})
export class EraseModule {}
