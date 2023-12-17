import { ValidatorPipe } from '@common/pipes/validatorPipe';
import { Body, Controller, Get, Put, Req, Res, UsePipes } from '@nestjs/common';
import { Response } from 'express';
import { contactSearchDto, contactSearchSchema } from './contacts.schemas';
import { ContactsService } from './contacts.service';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactService: ContactsService) {}

  @Put()
  @UsePipes(new ValidatorPipe(contactSearchSchema))
  async search(
    @Body() { input }: contactSearchDto,
    @Req() req,
    @Res() res: Response,
  ) {
    try {
      // sanitize string
      const results = await this.contactService.search(input);
      console.log('SEARCH RESULTS => --------------- \n ', results);
      return res.status(200).send({ results });
    } catch (e) {
      console.log('e', e);
    }
  }
}
