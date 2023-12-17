import { ValidatorPipe } from '@common/pipes/validatorPipe';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UsePipes,
} from '@nestjs/common';
import { Response } from 'express';
import {
  contactSearchDto,
  contactSearchSchema,
  createContactRequestDto,
  createContactRequestSchema,
} from './contacts.schemas';
import { ContactsService } from './contacts.service';
import { shortenEmail } from '@common/utils/utils';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactService: ContactsService) {}

  @Post()
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
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
  @Get()
  async getContacts(@Req() req, @Res() res) {
    try {
      const contacts = await this.contactService.getUserContacts(req?.userId);
      console.log('[getContacts] contacts -> ', contacts);
      return res.status(200).send({ contacts });
    } catch (e) {
      console.log('e', e);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }

  @Post('request')
  @UsePipes(new ValidatorPipe(createContactRequestSchema))
  async createContactRequest(
    @Req() req,
    @Res() res,
    @Body() { email }: createContactRequestDto,
  ) {
    try {
      console.log('[ContactsController] createContactRequest => ', email);
      const created = await this.contactService.createContactRequest(
        req?.userId,
        email,
      );
      return res.json({ created });
    } catch (e) {
      console.log('e', e);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
