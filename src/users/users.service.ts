import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";

// import { JwtService } from "@nestjs/jwt";
import { NewUserDto } from "./dtos/NewUserDto.dto";
import { UsersRepositories } from "./users.repositories";

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepositories) // private readonly jwt: JwtService
  {}

  async register(body: NewUserDto) {
    const hashPassword = await bcrypt.hash(body.password, 10);
    await this.repository.createUser(body.email, hashPassword);
  }

  async login(body: NewUserDto) {
    const user = await this.repository.userByEmail(body.email);
    if (!user) throw new UnauthorizedException("User not found!");

    const validPassword = await bcrypt.compare(body.password, user.password);
    if (!validPassword) throw new UnauthorizedException("Wrong password!");

    // return { token: await this.jwt.sign({ userId: user.id, email: user.email }) };
  }
}
