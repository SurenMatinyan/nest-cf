import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from '@intrefaces';

@Injectable()
export class EnvironmentConfigService implements DatabaseConfig {
  constructor(private configService: ConfigService) {}

  get databaseHost(): string {
    return this.configService.get<string>('DATABASE_HOST');
  }

  get databasePort(): number {
    return this.configService.get<number>('DATABASE_PORT');
  }

  get databaseUser(): string {
    return this.configService.get<string>('DATABASE_USER');
  }

  get databasePassword(): string {
    return this.configService.get<string>('DATABASE_PASSWORD');
  }

  get databaseName(): string {
    return this.configService.get<string>('DATABASE_NAME');
  }

  get databaseSchema(): string {
    return this.configService.get<string>('DATABASE_SCHEMA');
  }

  get databaseSync(): boolean {
    return this.configService.get<boolean>('DATABASE_SYNCHRONIZE');
  }
}
