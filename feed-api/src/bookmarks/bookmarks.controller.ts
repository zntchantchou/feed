import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { ArticlesService } from 'src/articles/articles/articles.service';

@Controller('bookmarks')
export class BookmarksController {
  constructor(private articleService: ArticlesService) {}

  @Post()
  async createBookmark(@Body() article: ArticleDto) {
    try {
      console.log('[BookmarksController] CREATE BOOKMARKS ----  \n');
      const article: ArticleDto = {
        source: 'source',
        title: 'tipe',
        description: 'description',
        urlToImage: 'urlToImage',
        url: 'url',
        publishedAt: '2023-12-08 23:15:03.306 +0100',
        content: 'content',
      };
      return await this.articleService.create(article);
    } catch (e) {
      console.log('getBookmarksByUserId \n', e);
      if (e?.errors) {
        const errorMsg = e?.errors[0]?.message;
        console.log('[getBookmarksByUserId] validation error: \n', errorMsg);
        return { error: errorMsg };
      }

      return { error: e };
    }
  }

  @Post()
  async getBookmarks() {
    return [];
  }

  @Delete()
  deleteBookmark() {
    console.log('[BookmarksController] DELETE BOOKMARKS ----  \n');
    return false;
  }
}
