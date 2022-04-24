import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DatabaseModule],
  providers: [],
})
export class DatabaseModule {}
