import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Request,
} from '@nestjs/common';
import { AppService } from './app.service';
import { RedisClientType } from 'redis';
import { listUsers } from '@auth/firebase';

@Controller()
export class AppController {
  constructor(
    @Inject('redis-client')
    private readonly redisClient: RedisClientType,
    private readonly appService: AppService,
  ) {}

  @Get()
  async check() {
    console.log('[AppController] GET CHECK ------');
    const users = await listUsers();
    const user = users[0];
    // const savedUser = await this.redisClient.ft.search({});
    console.log('SAVED USER => ', user);
    return { check: 'ok' };
  }
}
