import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Post,
  Req,
} from '@nestjs/common';
import { ArticlesService } from 'src/articles/articles/articles.service';
import { ArticleDto } from './dto/article.dto';
import auth from 'auth/firebase';

@Controller('bookmarks')
export class BookmarksController {
  constructor(private readonly articleService: ArticlesService) {}

  @Post()
  async createBookmark(@Body() article: ArticleDto, @Req() req) {
    try {
      console.log('[BookmarksController] CREATE BOOKMARKS ----  \n');
      console.log('[BookmarksController] articleDto ----  \n', article);
      console.log('[BookmarksController] articleDto UID ----  \n', req.uid);
      const existingArticle = await this.articleService.findByArticle(article);
      console.log('ARTICLE EXISTS');
      if (!existingArticle) {
        const savedArticle = await this.articleService.create(article);
        console.log('NEWLY SAVED ARTICLE \n', savedArticle);
      }

      return 'ok';
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

  // @Post()
  // async getBookmarks() {
  //   return [];
  // }

  @Delete()
  deleteBookmark() {
    console.log('[BookmarksController] DELETE BOOKMARKS ----  \n');
    return false;
  }
}
