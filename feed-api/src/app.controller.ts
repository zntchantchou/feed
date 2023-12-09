import { Controller, Get, HttpCode, HttpStatus, Request } from '@nestjs/common';
import {} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('check')
  @HttpCode(HttpStatus.OK)
  async checkAuth(@Request() req: any) {
    return { check: 'ok' };
  }
}
