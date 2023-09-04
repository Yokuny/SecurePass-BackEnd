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
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Credentials controller")
@Controller("credentials")
@UseGuards(AuthGuard)
export class CredentialsController {
  constructor(private readonly service: CredentialsService) {}

  @ApiOperation({ summary: "Create credential" })
  @ApiResponse({ status: 201, description: "Credential created" })
  @ApiBody({ type: CredentialCreateDto })
  @Post()
  async createCredential(@Body() body: CredentialCreateDto, @User() userId: number) {
    try {
      await this.service.createCredential(body, userId);
    } catch (err) {
      if (err.code == "P2002") throw new ConflictException("Title already exists");
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: "Find all credentials" })
  @ApiResponse({ status: 200, description: "Credentials found" })
  @Get()
  async findAllCredentials(@User() userId: number) {
    return this.service.findAllCredentials(userId);
  }

  @ApiOperation({ summary: "Find one credential" })
  @ApiResponse({ status: 200, description: "Credential found" })
  @ApiParam({ name: "id", type: "number" })
  @Get(":id")
  findOneCredential(@Param("id") id: string, @User() userId: number) {
    return this.service.findOneCredential(+id, userId);
  }

  @ApiOperation({ summary: "Update credential" })
  @ApiParam({ name: "id", type: "number" })
  @ApiBody({ type: CredentialUpdateDto })
  @ApiResponse({ status: 200, description: "Credential updated" })
  @Patch(":id")
  async updateCredential(@Param("id") id: string, @Body() body: CredentialUpdateDto, @User() userId: number) {
    try {
      await this.service.updateCredential(+id, body, userId);
    } catch (err) {
      if (err.code == "P2002") throw new ConflictException("Title already exists");
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: "Delete credential" })
  @ApiParam({ name: "id", type: "number" })
  @ApiResponse({ status: 200, description: "Credential deleted" })
  @Delete(":id")
  deleteCredential(@Param("id") id: string, @User() userId: number) {
    this.service.deleteCredential(+id, userId);
  }
}
