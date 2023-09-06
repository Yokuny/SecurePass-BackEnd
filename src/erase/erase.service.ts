import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from "@nestjs/common";
import { UsersRepositories } from "src/users/users.repositories";
import * as bcrypt from "bcrypt";

@Injectable()
export class EraseService {
  constructor(private readonly repository: UsersRepositories) {}

  async userDelete(password: string, userId: number) {
    const user = await this.repository.userById(userId);
    if (!user) throw new NotFoundException("No valid user");

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new UnauthorizedException("No valid password");

    await this.repository.userDelete(userId);
  }
}
