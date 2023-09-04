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
} from "@nestjs/common";
import { CredentialsService } from "./credentials.service";
import { CredentialCreateDto } from "./dto/CredentialCreate.dto";
import { CredentialUpdateDto } from "./dto/CredentialUpdate.dto";
@Controller("credentials")
export class CredentialsController {
  constructor(private readonly service: CredentialsService) {}

  @Post()
  async createCredential(@Body() body: CredentialCreateDto, @Param() userId: number) {
    try {
      await this.service.createCredential(body, userId);
    } catch (err) {
      if (err.code == "P2002") throw new ConflictException("title already in use");
      throw new InternalServerErrorException();
    }
  }

  @Get()
  async findAllCredentials(@Param() userId: number) {
    return this.service.findAllCredentials(userId);
  }

  @Get(":id")
  findOneCredential(@Param("id") id: string, @Param() userId: number) {
    return this.service.findOneCredential(+id, userId);
  }

  @Patch(":id")
  async updateCredential(
    @Param("id") id: string,
    @Body() body: CredentialUpdateDto,
    @Param() userId: number
  ) {
    try {
      await this.service.updateCredential(+id, body, userId);
    } catch (err) {
      if (err.code == "P2002") throw new ConflictException("title already in use");
      throw new InternalServerErrorException();
    }
  }

  @Delete(":id")
  deleteCredential(@Param("id") id: string, @Param() userId: number) {
    this.service.deleteCredential(+id, userId);
  }
}
