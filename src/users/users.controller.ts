import { Controller, Body, Post, ConflictException, InternalServerErrorException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { NewUserDto } from "./dtos/NewUserDto.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post("sign-up")
  async signup(@Body() body: NewUserDto) {
    try {
      return await this.service.register(body);
    } catch (err) {
      if (err.code === "P2002") throw new ConflictException("Invalid email!");
      throw new InternalServerErrorException();
    }
  }

  @Post("sign-in")
  async login(@Body() body: NewUserDto) {
    return this.service.login(body);
  }
}
