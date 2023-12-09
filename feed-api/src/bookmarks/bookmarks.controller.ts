import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
} from '@nestjs/common';
import { ArticlesService } from 'src/articles/articles/articles.service';
import { ArticleDto } from './dto/article.dto';
import { BookmarkService } from './bookmarks.service';

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
  async createBookmark(@Body() article: ArticleDto, @Req() req) {
    try {
      let savedArticle = await this.articleService.findByArticle(article);
      console.log('ARTICLE EXISTS');
      if (!savedArticle) {
        savedArticle = await this.articleService.create(article);
        console.log('NEWLY SAVED ARTICLE \n', savedArticle);
      }
      const savedBookmark = await this.bookmarkService.create({
        userId: req?.userId,
        articleId: savedArticle.uid,
      });
      console.log('SavedBookmark \n', savedBookmark);
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
