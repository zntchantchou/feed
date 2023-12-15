import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class ContactsService {
  constructor(
    @Inject('redis-client')
    private readonly redisClient: RedisClientType,
  ) {}
  async search(input: string, limit = 100) {
    try {
      const res = await this.redisClient.ft.search(
        `idx:u`,
        `@email:*${input}*`,
        {
          LIMIT: { from: 0, size: limit },
        },
      );
      return res;
    } catch (err) {
      console.log('[searchUsers] err', err);
    }
  }
}
