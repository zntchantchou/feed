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

@Controller()
export class AppController {
  @Get()
  async check() {
    console.log('[AppController] GET CHECK ------');
    return { check: 'ok' };
  }
}
