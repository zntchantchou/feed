import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seed.module';
import { cacheSeederService } from './seed.service';

async function bootstrap() {
  try {
    const appContext = await NestFactory.createApplicationContext(SeederModule);
    const cacheSeeder = appContext.get(cacheSeederService);
    await cacheSeeder.seedUsers();
  } catch (e) {
    console.log('[cacheSeeder] ERROR : ', e);
  }
}

bootstrap();
