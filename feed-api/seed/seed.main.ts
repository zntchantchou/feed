import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seed.module';
import { cacheSeederService } from './seed.service';

async function bootstrap() {
  try {
    const appContext = await NestFactory.createApplicationContext(SeederModule);
    const cacheSeeder = appContext.get(cacheSeederService);
    // await cacheSeeder.seedUsers();
    const found = await cacheSeeder.searchUsers();
    console.log('found ===> \n', found);
    if (found?.documents) {
      found.documents.map((d) => console.log(d.value));
    }
  } catch (e) {
    console.log('Done ');
    console.log('[cacheSeeder] ERROR : ', e);
  }
}

bootstrap();
