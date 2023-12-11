import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ArticleDto } from '@modules/articles/article.dto';
import { getUid } from '@modules/articles/utils';
import { Op } from 'sequelize';
import Bookmark from 'db/models/Bookmark';
import Article from 'db/models/Article';
import { BookmarkDto } from './bookmarks.dto';
import { deleteBookmarkDto } from './bookmarks.schemas';

export interface BookmarkedArticle extends ArticleDto {
  bookmarkedAt: string;
}

@Injectable()
export class BookmarkService {
  constructor(
    @InjectModel(Bookmark)
    private bookmarkModel: typeof Bookmark,
  ) {}

  async create(bookmark: BookmarkDto) {
    try {
      console.log('[BookmarkService] CREATE ');
      return await this.bookmarkModel.create({ ...bookmark });
    } catch (e) {
      console.log('[BookmarkService] CREATE ERROR ', e);
    }
  }

  async getBookmarkedArticles(
    userId: string,
  ): Promise<BookmarkedArticle[] | []> {
    try {
      const bookmarks = await this.bookmarkModel.findAll({
        where: {
          userId: { [Op.like]: userId },
        },
        include: [Article],
      });
      console.log('FOUND WITH USERID ', userId);
      console.log('bookmarks ', bookmarks);
      if (!bookmarks) return [];
      const articles = bookmarks
        .map((bookmark) => ({
          ...bookmark.toJSON()?.article,
          bookmarkedAt: bookmark.createdAt,
        }))
        // from most recent to oldest bookmark
        .reverse();
      return articles;
    } catch (e) {
      console.log('[getBookmarkedArticles] error', e);
      throw e;
    }
  }
  // zxPyzCYSNGgr6tQtN7oq2m2N1U33

  async deleteBookmark(article: deleteBookmarkDto, userId: string) {
    try {
      console.log('deleteBookmark \n');
      const deleted = await this.bookmarkModel.destroy({
        where: {
          articleId: { [Op.like]: await getUid(article) },
          userId: userId,
        },
      });
      console.log('DELETED', deleted);
      return deleted;
    } catch (e) {}
  }
}
