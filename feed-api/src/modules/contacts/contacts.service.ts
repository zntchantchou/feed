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
      return await this.redisClient.ft.search(`idx:u`, `@email:*${input}*`, {
        LIMIT: { from: 0, size: limit },
      });
    } catch (err) {
      console.log('[searchUsers] err', err);
    }
  }
}
