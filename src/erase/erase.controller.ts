import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { EraseService } from "./erase.service";
import { EraseDto } from "./dto/erase.dto";

@Controller("erase")
export class EraseController {
  constructor(private readonly eraseService: EraseService) {}

  @Post()
  userDelete(@Body() eraseDto: EraseDto, @Param() userId: number) {
    return this.eraseService.userDelete(eraseDto.password, userId);
  }
}
