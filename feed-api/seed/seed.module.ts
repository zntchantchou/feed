import { Module } from '@nestjs/common';
import { cacheProviders } from '../src/common/cache/cache.providers';
import { cacheSeederService } from './seed.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [...cacheProviders, cacheSeederService],
})
export class SeederModule {}
