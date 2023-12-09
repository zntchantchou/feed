import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import auth from 'auth/firebase';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const { PORT } = process.env;

  await app.listen(PORT);

  console.log(
    '-------- AUTH APPCHECK -------- \n \n',
    auth.appCheck()?.app?.options,
  );
  console.log(`Listening on port ${PORT} ..`);
}

bootstrap();
