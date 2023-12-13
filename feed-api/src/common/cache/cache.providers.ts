import { RedisClientType, createClient } from 'redis';
import { userSchema } from './user.cache-shema';

export const cacheProviders = [
  {
    provide: 'redis-client',
    useFactory: async () => {
      const redisClient = await createClient({
        url: 'redis://' + process.env.REDIS_URL,
      }).on('error', (err) => console.log('REDIS CLIENT ERROR', err));
      try {
        await redisClient.connect();
        // Add user schema to store in redis as searchable JSON objects
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
