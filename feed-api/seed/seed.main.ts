import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seed.module';
import { cacheSeederService } from './seed.service';

async function bootstrap() {
  NestFactory.createApplicationContext(SeederModule).then((appContext) => {
    const cacheSeeder = appContext.get(cacheSeederService);
    cacheSeeder
      .seedUsers()
      .then((r) => console.log('[cacheSeeder] DONE : ', r))
      .catch((err) => console.log('[cacheSeeder] ERROR : ', err));
  });
}

bootstrap();
