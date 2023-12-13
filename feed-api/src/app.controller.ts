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
    console.log('show redis !!!!!', this.redisClient);
    return { check: 'ok' };
  }
}
