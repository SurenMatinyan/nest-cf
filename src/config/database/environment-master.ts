import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from '@intrefaces';

@Injectable()
export class MasterDatabaseEnvironment implements DatabaseConfig {
  constructor(private configService: ConfigService) {}

  get databaseHost(): string {
    return this.configService.get<string>('MASTER_DATABASE_HOST');
  }

  get databasePort(): number {
    return this.configService.get<number>('MASTER_DATABASE_PORT');
  }

  get databaseUser(): string {
    return this.configService.get<string>('MASTER_DATABASE_USER');
  }

  get databasePassword(): string {
    return this.configService.get<string>('MASTER_DATABASE_PASSWORD');
  }

  get databaseName(): string {
    return this.configService.get<string>('MASTER_DATABASE_NAME');
  }

  get databaseSchema(): string {
    return this.configService.get<string>('MASTER_DATABASE_SCHEMA');
  }

  get databaseSync(): boolean {
    return this.configService.get<boolean>('MASTER_DATABASE_SYNCHRONIZE');
  }
}
