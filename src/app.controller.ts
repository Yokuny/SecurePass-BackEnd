import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

import { AppService } from "./app.service";

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
