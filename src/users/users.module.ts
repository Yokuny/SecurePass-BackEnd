import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { UsersRepositories } from "./users.repositories";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.CRYPTO_SECRET,
      signOptions: { expiresIn: "3 day" },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepositories],
  exports: [UsersRepositories],
})
export class UsersModule {}
