import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import auth from 'src/auth/firebase';
import { getAuth } from 'firebase-admin/auth';
import { appCheck } from 'firebase-admin';
import { createClient } from 'redis';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    cors: true,
  });
  const { PORT } = process?.env;
  if (PORT) await app.listen(PORT);

  const appCheck = { ...auth.appCheck()?.app?.options };
  delete appCheck.credential;

  console.log('-------- FIREBASE APPCHECK -------- \n \n', appCheck);
  // const listAllUsers = () => {
  //   // List batch of users, 1000 at a time.
  //   getAuth()
  //     .listUsers(1000)
  //     .then((listUsersResult) => {
  //       listUsersResult.users.forEach(({ providerData }) => {
  //         console.log('user', providerData[0].toJSON());
  //       });
  //       // if (listUsersResult.pageToken) {
  //       //   // List next batch of users.
  //       //   listAllUsers(listUsersResult.pageToken);
  //       // }
  //     })
  //     .catch((error) => {
  //       console.log('Error listing users:', error);
  //     });
  // };
  // // Start listing users from the beginning, 1000 at a time.
  // listAllUsers();
  // console.log(`Listening on port ${PORT} ..`);

  // redis[s]://[[username][:password]@][host][:port][/db-number]

  const redisClient = await createClient({
    url: 'redis://' + process.env.REDIS_URL,
  })
    .on('error', (err) => console.log('REDIS CLIENT ERROR', err))
    .connect();
  console.log('CLIENT', redisClient);
}

bootstrap();
