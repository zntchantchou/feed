import { ValidatorPipe } from '@common/pipes/validatorPipe';
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  Res,
  UsePipes,
} from '@nestjs/common';
import { Response } from 'express';
import { contactSearchDto, contactSearchSchema } from './contacts.schemas';

@Controller('contacts')
export class ContactsController {
  @Get()
  async sayHi() {
    console.log('HI');
    return 'hi';
  }

  @Post()
  @UsePipes(new ValidatorPipe(contactSearchSchema))
  async search(
    @Body() { input }: contactSearchDto,
    @Req() req,
    @Res() res: Response,
  ) {
    try {
      console.log('ContactsController input => ', input);
      return res.status(200).send('ok');
    } catch (e) {
      console.log('e', e);
    }
  }
}
