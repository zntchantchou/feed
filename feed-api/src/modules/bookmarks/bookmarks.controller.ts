import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UsePipes,
} from '@nestjs/common';
import { ArticlesService } from '@modules/articles/articles.service';
import { ArticleDto } from '@modules/articles/article.dto';
import { ValidatorPipe } from '@common/pipes/validatorPipe';
import { BookmarkService } from './bookmarks.service';
import { createBookmarkSchema } from './bookmarks.schemas';

@Controller('bookmarks')
export class BookmarksController {
  constructor(
    private readonly bookmarkService: BookmarkService,
    private readonly articleService: ArticlesService,
  ) {}

  @Get()
  async getBookmarks(@Req() req) {
    try {
      console.log('[get bookmarks] userId => ', req.userId);
      return this.bookmarkService.getBookmarkedArticles(req.userId);
    } catch (e) {
      console.log('[getUserBookmarks] Error : ', e);
    }
  }

  @Post()
  @UsePipes(new ValidatorPipe(createBookmarkSchema))
  async createBookmark(@Body() article: ArticleDto, @Req() req) {
    try {
      let savedArticle = await this.articleService.findByArticle(article);
      if (!savedArticle) {
        savedArticle = await this.articleService.create(article);
      }
      const savedBookmark = await this.bookmarkService.create({
        userId: req?.userId,
        articleId: savedArticle.uid,
      });
      return 'success';
    } catch (e) {
      if (e?.errors) {
        const err = e?.errors[0];
        const errorMsg = err?.message;
        console.log('[getBookmarksByUserId] validation error: \n', err);
        console.log('[getBookmarksByUserId] validation error: \n', errorMsg);
      } else {
        console.log('getBookmarksByUserId \n', e);
      }
      throw new BadRequestException(e);
    }
  }

  @Delete()
  async deleteBookmark(@Body() article: ArticleDto, @Req() req) {
    try {
      console.log('[BookmarksController] DELETE BOOKMARKS ----  \n');
      console.log(article, req.userId);
      await this.bookmarkService.deleteBookmark(article, req.userId);
      return 'success';
    } catch (e) {
      return 'error';
    }
  }
}
