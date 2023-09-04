import { Controller, Body, Post, ConflictException, InternalServerErrorException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { NewUserDto } from "./dtos/NewUserDto.dto";
import { ApiBody, ApiOperation, ApiTags, ApiResponse } from "@nestjs/swagger";

@ApiTags("Users controller")
@Controller("users")
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @ApiOperation({ summary: "Sign up" })
  @ApiBody({ type: NewUserDto })
  @ApiResponse({ status: 201, description: "User created" })
  @Post("sign-up")
  async signup(@Body() body: NewUserDto) {
    try {
      return await this.service.register(body);
    } catch (err) {
      if (err.code === "P2002") throw new ConflictException("Wrong email!");
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: "Sign in" })
  @ApiBody({ type: NewUserDto })
  @ApiResponse({ status: 200, description: "User logged in" })
  @Post("sign-in")
  async login(@Body() body: NewUserDto) {
    return this.service.login(body);
  }
}
