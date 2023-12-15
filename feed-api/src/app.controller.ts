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
  @Get()
  async check() {
    console.log('[AppController] GET CHECK ------');
    return { check: 'ok' };
  }
}
