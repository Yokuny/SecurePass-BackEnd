import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
import { CardsModule } from "./cards/cards.module";
import { CredentialsModule } from "./credentials/credentials.module";
import { NotesModule } from "./notes/notes.module";
import { EraseModule } from "./erase/erase.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    PrismaModule,
    CardsModule,
    CredentialsModule,
    NotesModule,
    EraseModule,
    UsersModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
