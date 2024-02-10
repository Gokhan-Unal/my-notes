import { Module } from '@nestjs/common';
import { EnvironmentConfigService } from './environment-config.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [EnvironmentConfigService, ConfigService],
})
export class EnvironmentConfigModule {}
