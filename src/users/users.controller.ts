import { Controller, Body, Post, Res, HttpStatus } from "@nestjs/common";
import { Response } from "express";
import { UsersService } from "./users.service";
import { NewUserDto } from "./dtos/NewUserDto.dto";
import { ApiBody, ApiOperation, ApiTags, ApiResponse } from "@nestjs/swagger";

@ApiTags("Users controller")
@Controller("users")
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @ApiOperation({ summary: "Sign up" })
  @ApiBody({ type: NewUserDto })
  @ApiResponse({ status: 201, description: "Created" })
  @Post("sign-up")
  async signup(@Body() body: NewUserDto, @Res() res: Response) {
    await this.service.register(body);
    return res.sendStatus(HttpStatus.CREATED);
  }

  @ApiOperation({ summary: "Sign in" })
  @ApiBody({ type: NewUserDto })
  @ApiResponse({ status: 200, description: "Return user token" })
  @Post("sign-in")
  async login(@Body() body: NewUserDto, @Res() res: Response) {
    const token = await this.service.login(body);
    return res.status(HttpStatus.OK).json(token);
  }
}
