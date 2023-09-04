import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UsersRepositories {
  constructor(private readonly prisma: PrismaService) {}

  createUser(email: string, password: string) {
    return this.prisma.user.create({
      data: {
        email,
        password,
      },
    });
  }

  userByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  userById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  userDelete(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
