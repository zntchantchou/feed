import { Injectable } from '@nestjs/common';
import { createClient } from 'redis';

export const cacheProviders = [
  {
    provide: 'redis-client',
    useFactory: async () => {
      const redisClient = await createClient({
        url: 'redis://' + process.env.REDIS_URL,
      }).on('error', (err) => console.log('REDIS CLIENT ERROR', err));

      return redisClient.connect();
    },
  },
];
