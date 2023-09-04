import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
const Cryptr = require("cryptr");
import { CredentialCreateDto } from "./dto/CredentialCreate.dto";
import { CredentialUpdateDto } from "./dto/CredentialUpdate.dto";
import { CredentialsRepositories } from "./credential.repositories";

@Injectable()
export class CredentialsService {
  constructor(private readonly repository: CredentialsRepositories) {}
  cryptr = new Cryptr(process.env.CRYPTO_);

  async createCredential(data: CredentialCreateDto, userId: number) {
    const encryptPassword = this.cryptr.encrypt(data.password);
    return await this.repository.create({ ...data, password: encryptPassword }, userId);
  }

  async findAllCredentials(userId: number) {
    const credentials = await this.repository.findAll(userId);
    if (credentials.length === 0) throw new NotFoundException("Wrong User ID");
    const decryptCredentials = credentials.map((cred) => ({
      ...cred,
      password: this.cryptr.decrypt(cred.password),
    }));
    return decryptCredentials;
  }

  private async checkCredentials(id: number, userId: number) {
    const credential = await this.repository.findOne(id);
    if (!credential) throw new NotFoundException("Wrong Credential ID");
    if (credential.userId !== userId) throw new ForbiddenException();
    return credential;
  }

  async findOneCredential(id: number, userId: number) {
    const credential = await this.checkCredentials(id, userId);
    return {
      ...credential,
      password: this.cryptr.decrypt(credential.password),
    };
  }

  async updateCredential(id: number, data: CredentialUpdateDto, userId: number) {
    await this.checkCredentials(id, userId);
    if (data.password) data.password = this.cryptr.encrypt(data.password);
    return await this.repository.updateOne(id, data);
  }

  async deleteCredential(id: number, userId: number) {
    await this.checkCredentials(id, userId);
    return this.repository.deleteOne(id, userId);
  }
}
