import { Inject, Injectable } from '@nestjs/common';
import * as users from './users.json';
import { RedisClientType } from 'redis';
import { shortenEmail } from '../src/common/utils/utils';

@Injectable()
export class cacheSeederService {
  constructor(
    @Inject('redis-client')
    private readonly redisClient: RedisClientType,
  ) {}

  async seedUsers() {
    console.log('[cacheSeederService] Seeding... ');
    const startTime = Date.now();
    try {
      const statuses = await Promise.all(
<<<<<<< HEAD
        users.map((user) => {
=======
        users.map((user, i) => {
>>>>>>> 0e8ffbea2e63be13349d55be2e5488e95ac672c0
          return this.redisClient.json.set(`u:${user.uid}`, '$', {
            ...user,
            shortEmail: shortenEmail(user.email),
          });
        }),
      );
      console.log('[cacheSeederService] Statuses => ', statuses);
      const stopTime = Date.now();
      const totalTime = ((stopTime - startTime) / 1000).toString();
      console.log('[cacheSeederService] Total caching time => ', totalTime);
    } catch (e) {
      console.log('[cacheSeederService] Error', e);
    }
  }
}
