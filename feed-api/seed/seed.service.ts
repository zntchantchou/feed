import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';
import * as users from './users.json';

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
        users.map((u) => this.redisClient.json.set(`u:${u.uid}`, '$', u)),
      );
      console.log('[cacheSeederService] CACHED STATUSES => ', statuses);
      const stopTime = Date.now();
      console.log(
        'TOTAL CACHING TIME => ',
        ((stopTime - startTime) / 1000).toString(),
      );
    } catch (e) {
      console.log('[cacheSeederService] Error', e);
    }
  }
}
