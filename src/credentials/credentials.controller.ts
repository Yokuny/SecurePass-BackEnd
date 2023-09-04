import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
  ConflictException,
  UseGuards,
} from "@nestjs/common";
import { CredentialsService } from "./credentials.service";
import { CredentialCreateDto } from "./dto/CredentialCreate.dto";
import { CredentialUpdateDto } from "./dto/CredentialUpdate.dto";
import { AuthGuard } from "src/commons/guards/auth.guard";
import { User } from "src/commons/decorators/users.decorator";

@Controller("credentials")
@UseGuards(AuthGuard)
export class CredentialsController {
  constructor(private readonly service: CredentialsService) {}

  @Post()
  async createCredential(@Body() body: CredentialCreateDto, @User() userId: number) {
    try {
      await this.service.createCredential(body, userId);
    } catch (err) {
      if (err.code == "P2002") throw new ConflictException("Title already exists");
      throw new InternalServerErrorException();
    }
  }

  @Get()
  async findAllCredentials(@User() userId: number) {
    return this.service.findAllCredentials(userId);
  }

  @Get(":id")
  findOneCredential(@Param("id") id: string, @User() userId: number) {
    return this.service.findOneCredential(+id, userId);
  }

  @Patch(":id")
  async updateCredential(@Param("id") id: string, @Body() body: CredentialUpdateDto, @User() userId: number) {
    try {
      await this.service.updateCredential(+id, body, userId);
    } catch (err) {
      if (err.code == "P2002") throw new ConflictException("Title already exists");
      throw new InternalServerErrorException();
    }
  }

  @Delete(":id")
  deleteCredential(@Param("id") id: string, @User() userId: number) {
    this.service.deleteCredential(+id, userId);
  }
}
