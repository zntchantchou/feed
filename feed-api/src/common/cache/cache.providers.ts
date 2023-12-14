import { RedisClientType, createClient } from 'redis';
import { userSchema } from './user.cache-shema';

export const cacheProviders = [
  {
    provide: 'redis-client',
    useFactory: async () => {
      const url = `redis://default:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;
      console.log('URL ', url);

      const redisClient = await createClient({ url })
        .on('error', (err) => console.log('REDIS CLIENT ERROR ', err))
        .on('connect', (c) => {
          console.log('Redis connected ', c);
        })
        .on('reconnecting', () => {
          console.log('Redis reconnecting');
        })
        .on('ready', () => {
          console.log('Redis ready!');
        });
      try {
        // Add user schema to store in redis as searchable JSON objects
        await redisClient.connect();
        await createUserIndex(redisClient as RedisClientType);
        return redisClient;
      } catch (e) {
        console.log('ERROR ----- \n ', e);
      }
    },
  },
];

const createUserIndex = async (redisClient: RedisClientType) => {
  try {
    // will throw if index already exists
    await redisClient.ft.create('idx:u', userSchema, {
      ON: 'JSON',
      PREFIX: 'u',
    });
  } catch (e) {
    console.log('[cacheProviders] error at index creation', e);
  }
};
