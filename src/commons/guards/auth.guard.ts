import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization?.split(" ")[1];
    if (!token) throw new UnauthorizedException("Wrong token");

    try {
      const payload = await this.jwt.verifyAsync(token, {
        secret: process.env.CRYPTO_SECRET,
      });
      request["user"] = payload.userId;
    } catch (err) {
      throw new UnauthorizedException("Invalid token");
    }
    return true;
  }
}
