import {
  Controller,
  Res,
  Body,
  Param,
  Get,
  Post,
  Patch,
  Delete,
  UseGuards,
  HttpStatus,
  InternalServerErrorException,
} from "@nestjs/common";
import { Response } from "express";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CredentialsService } from "./credentials.service";
import { CredentialCreateDto } from "./dto/CredentialCreate.dto";
import { CredentialUpdateDto } from "./dto/CredentialUpdate.dto";

import { AuthGuard } from "src/commons/guards/auth.guard";
import { User } from "src/commons/decorators/users.decorator";

@ApiTags("Credentials controller")
@Controller("credentials")
@UseGuards(AuthGuard)
export class CredentialsController {
  constructor(private readonly service: CredentialsService) {}

  @ApiOperation({ summary: "Find all credentials" })
  @ApiBody({ type: CredentialCreateDto })
  @ApiResponse({ status: 200, description: "Credentials found or empty array" })
  @ApiBearerAuth()
  @Get()
  async findAllCredentials(@User() userId: number) {
    return this.service.findAllCredentials(userId);
  }

  @ApiOperation({ summary: "Find one credential" })
  @ApiParam({ name: "id", type: "number" })
  @ApiResponse({ status: 200, description: "Credential found" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Wrong Credential ID" })
  @ApiBearerAuth()
  @Get(":id")
  findOneCredential(@Param("id") id: string, @User() userId: number) {
    return this.service.findOneCredential(+id, userId);
  }

  @ApiOperation({ summary: "Create credential" })
  @ApiBody({ type: CredentialCreateDto })
  @ApiResponse({ status: 201, description: "Credential created" })
  @ApiResponse({ status: 409, description: "Title already exists" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  @ApiBearerAuth()
  @Post()
  async createCredential(@Body() body: CredentialCreateDto, @User() userId: number, @Res() res: Response) {
    try {
      await this.service.createCredential(body, userId);
      return res.status(HttpStatus.CREATED).json({ message: "Credential created" });
    } catch (err) {
      if (err.code == "P2002") {
        return res.status(HttpStatus.CONFLICT).json({ message: "Title already exists" });
      }
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: "Update credential" })
  @ApiParam({ name: "id", type: "number" })
  @ApiBody({ type: CredentialUpdateDto })
  @ApiResponse({ status: 200, description: "Credential updated" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Wrong Credential ID" })
  @ApiBearerAuth()
  @Patch(":id")
  async updateCredential(
    @Param("id") id: string,
    @Body() body: CredentialUpdateDto,
    @User() userId: number,
    @Res() res: Response
  ) {
    try {
      await this.service.updateCredential(+id, body, userId);
    } catch (err) {
      if (err.code == "P2002") {
        return res.status(HttpStatus.CONFLICT).json({ message: "Title already exists" });
      }
      if (err.status == 403) {
        return res.status(HttpStatus.FORBIDDEN).json(err.message);
      }
      if (err.status == 404) {
        return res.status(HttpStatus.NOT_FOUND).json(err.message);
      }
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: "Delete credential" })
  @ApiParam({ name: "id", type: "number" })
  @ApiResponse({ status: 200, description: "Credential deleted" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Wrong Credential ID" })
  @ApiBearerAuth()
  @Delete(":id")
  async deleteCredential(@Param("id") id: string, @User() userId: number, @Res() res: Response) {
    try {
      await this.service.deleteCredential(+id, userId);
      return res.status(HttpStatus.OK).json({ message: "Credential deleted" });
    } catch (err) {
      if (err.status == 403) {
        return res.status(HttpStatus.FORBIDDEN).json(err.message);
      }
      if (err.status == 404) {
        return res.status(HttpStatus.NOT_FOUND).json(err.message);
      }
      throw new InternalServerErrorException();
    }
  }
}
