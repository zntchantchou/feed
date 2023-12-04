import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import db from '../db/connection';
import auth from 'auth/firebase';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // test database connection
  await db.authenticate();

  // initialize firebase auth
  console.log(auth.appCheck());

  const { PORT } = process.env;
  await app.listen(PORT);

  console.log(`Listening on port ${PORT} ..`);
}

bootstrap();
