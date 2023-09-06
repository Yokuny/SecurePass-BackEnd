import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { EraseService } from "./erase.service";
import { EraseDto } from "./dto/erase.dto";

import { AuthGuard } from "src/commons/guards/auth.guard";
import { User } from "src/commons/decorators/users.decorator";

@ApiTags("Erase controller")
@Controller("erase")
@UseGuards(AuthGuard)
export class EraseController {
  constructor(private readonly service: EraseService) {}

  @ApiOperation({ summary: "Delete user" })
  @ApiResponse({ status: 200, description: "User deleted" })
  @ApiResponse({ status: 401, description: "Invalid password" })
  @ApiResponse({ status: 404, description: "User not found" })
  @ApiBody({ type: EraseDto })
  @Post()
  userDelete(@Body() body: EraseDto, @User() userId: number) {
    return this.service.userDelete(body.password, userId);
  }
}
