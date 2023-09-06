import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("App controller")
@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @ApiOperation({ summary: "Get hello" })
  @Get()
  getHello(): string {
    return this.service.getHello();
  }

  @ApiOperation({ summary: "Get health" })
  @Get("health")
  getHealth(): string {
    return this.service.getHealth();
  }
}
