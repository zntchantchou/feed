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
import { ArticlesService } from '@modules/articles/articles.service';
import { ValidatorPipe } from '@common/pipes/validatorPipe';
import { BookmarkService } from './bookmarks.service';
import { Response } from 'express';
import {
  createArticleDto,
  createBookmarkSchema,
  deleteBookmarkDto,
  deleteBookmarkSchema,
} from './bookmarks.schemas';

@Controller('bookmarks')
export class BookmarksController {
  constructor(
    private readonly bookmarkService: BookmarkService,
    private readonly articleService: ArticlesService,
  ) {}

  @Get()
  async getBookmarks(@Req() req, @Res() res: Response) {
    try {
      console.log('[get bookmarks] userId => ', req.userId);
      const bookmarks = await this.bookmarkService.getBookmarkedArticles(
        req.userId,
      );
      return res.status(200).send(bookmarks);
    } catch (e) {
      console.log('[getUserBookmarks] Error : ', e);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }

  @Post()
  @UsePipes(new ValidatorPipe(createBookmarkSchema))
  async createBookmark(
    @Body() article: createArticleDto,
    @Req() req,
    @Res() res: Response,
  ) {
    try {
      let savedArticle = await this.articleService.findByArticle(article);
      if (!savedArticle) {
        savedArticle = await this.articleService.create(article);
      }
      const savedBookmark = await this.bookmarkService.create({
        userId: req?.userId,
        articleId: savedArticle.uid,
      });
      return res.status(HttpStatus.CREATED).send();
    } catch (e) {
      if (e?.errors) {
        const err = e?.errors[0];
        const errorMsg = err?.message;
        console.log('[getBookmarksByUserId] validation error: \n', err);
        console.log('[getBookmarksByUserId] validation error: \n', errorMsg);
      } else {
        console.log('getBookmarksByUserId \n', e);
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }

  @Delete()
  @UsePipes(new ValidatorPipe(deleteBookmarkSchema))
  async deleteBookmark(
    @Body() article: deleteBookmarkDto,
    @Req() req,
    @Res() res: Response,
  ) {
    try {
      console.log('[BookmarksController] DELETE BOOKMARKS ----  \n');
      await this.bookmarkService.deleteBookmark(article, req.userId);
      return res.status(HttpStatus.OK).send();
    } catch (e) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
