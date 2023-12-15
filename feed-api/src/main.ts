import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import auth from 'src/auth/firebase';
// import { getAuth } from 'firebase-admin/auth';
// import { appCheck } from 'firebase-admin';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    cors: true,
  });
  const { PORT } = process?.env;
  if (PORT) await app.listen(PORT);

  const appCheck = { ...auth.appCheck()?.app?.options };
  delete appCheck.credential;

  console.log('-------- FIREBASE APPCHECK -------- \n \n', auth.appCheck());
  console.log(`Listening on port ${PORT} ..`);
}

bootstrap();
