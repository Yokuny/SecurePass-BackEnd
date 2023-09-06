import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AppService } from "./app.service";

@ApiTags("App controller")
@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @ApiOperation({ summary: "Get hello" })
  @ApiResponse({ status: 200, description: "Hello world" })
  @Get()
  getHello(): string {
    return this.service.getHello();
  }

  @ApiOperation({ summary: "Get health" })
  @ApiResponse({ status: 200, description: "I'm okay!" })
  @Get("health")
  getHealth(): string {
    return this.service.getHealth();
  }
}
