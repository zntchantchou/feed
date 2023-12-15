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
        users.map((user, i) => this.redisClient.json.set(`u:${i}`, '$', user)),
      );
      console.log('[cacheSeederService] CACHED STATUSES => ', statuses);
      const stopTime = Date.now();
      const totalTime = ((stopTime - startTime) / 1000).toString();
      console.log('TOTAL CACHING TIME => ', totalTime);
    } catch (e) {
      console.log('[cacheSeederService] Error', e);
    }
  }

  async searchUsers() {
    try {
      // const result = await this.redisClient.ft.search(
      //   'idx:u',
      //   `@email:montgomeryjames@genmom.com`,
      // );

      const res = await this.redisClient.ft.search(`idx:u`, '*urr*', {
        LIMIT: { from: 0, size: 100 },
      });
      return res;
    } catch (err) {
      console.log('[searchUsers] err', err);
    }
  }
}
