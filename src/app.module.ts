import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [EnvironmentConfigModule, TypeOrmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
