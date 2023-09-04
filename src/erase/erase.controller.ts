import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { EraseService } from "./erase.service";
import { EraseDto } from "./dto/erase.dto";
import { AuthGuard } from "src/commons/guards/auth.guard";
import { User } from "src/commons/decorators/users.decorator";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Erase controller")
@Controller("erase")
@UseGuards(AuthGuard)
export class EraseController {
  constructor(private readonly eraseService: EraseService) {}

  @ApiOperation({ summary: "Delete user" })
  @ApiBody({ type: EraseDto })
  @Post()
  userDelete(@Body() eraseDto: EraseDto, @User() userId: number) {
    return this.eraseService.userDelete(eraseDto.password, userId);
  }
}
