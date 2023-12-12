import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UsePipes,
} from '@nestjs/common';
import { Response } from 'express';
import { UpvotesService } from './upvotes.service';
import {
  createUpvoteDto,
  createUpvoteSchema,
  deleteUpvoteDto,
  deleteUpvoteSchema,
} from './upvote.schema';
import { ValidatorPipe } from '@common/pipes/validatorPipe';

@Controller('upvotes')
export class UpvotesController {
  constructor(private readonly upvoteService: UpvotesService) {}

  @Get()
  async getUpvotes(@Req() req, @Res() res: Response) {
    console.log('[UpvotesController] GET UPVOTES');
    try {
      console.log('[UpvotesController] GET UPVOTES USR ID');
      const upvotes = await this.upvoteService.getUpvotes();
      return res.status(HttpStatus.OK).send(upvotes);
    } catch (e) {
      console.log('[UpvotesController ] get upvotes error : \n', e);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }

  @Post()
  @UsePipes(new ValidatorPipe(createUpvoteSchema))
  async createUpvote(
    @Body() article: createUpvoteDto,
    @Req() req,
    @Res() res: Response,
  ) {
    try {
      const created = await this.upvoteService.create(article, req.userId);
      console.log('[UpvotesController] CREATED UPVOTE \n', created);
      return res.status(HttpStatus.OK).send();
    } catch (error) {
      console.log('[UpvotesController] CREATED ERROR \n', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }

  @Delete()
  @UsePipes(new ValidatorPipe(deleteUpvoteSchema))
  async deleteUpvote(
    @Body() article: deleteUpvoteDto,
    @Req() req,
    @Res() res: Response,
  ) {
    try {
      const deleted = await this.upvoteService.delete(article, req.userId);
      console.log('[UpvotesController] DELETED  \n', deleted);
      if (deleted) {
        return res.status(HttpStatus.OK).send();
      }
      return res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      console.log('[UpvotesController] DELETED ERROR \n', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
