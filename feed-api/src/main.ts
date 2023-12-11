import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import auth from 'src/auth/firebase';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    cors: true,
  });
  const { PORT } = process.env;

  await app.listen(PORT);

  console.log(
    '-------- FIREBASE APPCHECK -------- \n \n',
    auth.appCheck()?.app?.options,
  );
  console.log(`Listening on port ${PORT} ..`);
}

bootstrap();
