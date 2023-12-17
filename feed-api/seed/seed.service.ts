import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';
import * as users from './users.json';
import { shortenEmail } from '../src/common/utils/utils';

@Injectable()
export class cacheSeederService {
  constructor(
    @Inject('redis-client')
    private readonly redisClient: RedisClientType,
  ) {}

  async seedUsers() {
    console.log('[cacheSeederService] USERS => \n', users);
    console.log('[cacheSeederService] Seeding... ');
    const startTime = Date.now();
    try {
      const statuses = await Promise.all(
        users.map((user, i) => {
          const finalUser = { ...user, shortEmail: user.email } as {
            email?: string;
            shortEmail: string;
          };
          delete finalUser?.email;
          return this.redisClient.json.set(`u:${i}`, '$', {
            ...finalUser,
            shortEmail: shortenEmail(finalUser.shortEmail),
          });
        }),
      );
      console.log('[cacheSeederService] CACHED STATUSES => ', statuses);
      const stopTime = Date.now();
      const totalTime = ((stopTime - startTime) / 1000).toString();
      console.log('TOTAL CACHING TIME => ', totalTime);
    } catch (e) {
      console.log('[cacheSeederService] Error', e);
    }
  }
}
