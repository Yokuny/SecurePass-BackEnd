import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersRepositories } from "src/users/users.repositories";
import * as bcrypt from "bcrypt";

@Injectable()
export class EraseService {
  constructor(private readonly repository: UsersRepositories) {}

  async userDelete(password: string, userId: number) {
    const user = await this.repository.userById(userId);
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new UnauthorizedException("No valid password");
    await this.repository.userDelete(userId);
  }
}
