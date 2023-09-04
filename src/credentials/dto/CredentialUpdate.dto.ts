import { PartialType } from "@nestjs/mapped-types";
import { CredentialCreateDto } from "./CredentialCreate.dto";

export class CredentialUpdateDto extends PartialType(CredentialCreateDto) {}
