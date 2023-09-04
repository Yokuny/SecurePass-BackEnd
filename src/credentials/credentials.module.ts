import { Module } from '@nestjs/common';
import { CredentialsController } from './credentials.controller';
import { CredentialsService } from './credentials.service';
import { CredentialsRepositories } from "./credential.repositories";

@Module({
  controllers: [CredentialsController],
  providers: [CredentialsService, CredentialsRepositories],
})
export class CredentialsModule {}
