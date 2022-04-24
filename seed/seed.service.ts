import { MasterDatabaseEnvironment } from 'src/config/database/environment-master';
import { createConnection } from 'typeorm';

export class SeedService {
  constructor(private readonly environment: MasterDatabaseEnvironment) {}
  async connected() {
    return createConnection({
      type: 'postgres',
      host: this.environment.databaseHost,
      port: this.environment.databasePort,
      username: this.environment.databaseUser,
      password: this.environment.databasePassword,
      database: this.environment.databaseName,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrationsRun: true,
      synchronize: false,
    });
  }
}
