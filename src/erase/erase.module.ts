import { Module } from "@nestjs/common";
import { EraseController } from "./erase.controller";
import { EraseService } from "./erase.service";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [UsersModule],
  controllers: [EraseController],
  providers: [EraseService],
})
export class EraseModule {}
