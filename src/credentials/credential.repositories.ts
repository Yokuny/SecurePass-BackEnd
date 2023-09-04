import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CredentialCreateDto } from "./dto/CredentialCreate.dto";
import { CredentialUpdateDto } from "./dto/CredentialUpdate.dto";

@Injectable()
export class CredentialsRepositories {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CredentialCreateDto, userId: number) {
    return this.prisma.credential.create({
      data: { ...data, userId },
    });
  }

  findAll(userId: number) {
    return this.prisma.credential.findMany({
      where: { userId },
    });
  }

  findOne(id: number) {
    return this.prisma.credential.findUnique({ where: { id } });
  }

  deleteOne(id: number, userId: number) {
    return this.prisma.credential.delete({
      where: { id, userId },
    });
  }

  updateOne(id: number, data: CredentialUpdateDto) {
    return this.prisma.credential.update({
      where: { id },
      data: data,
    });
  }
}
