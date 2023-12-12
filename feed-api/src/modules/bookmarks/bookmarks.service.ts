import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  createBookmarkDto,
  deleteBookmarkDto,
} from '@modules/bookmarks/bookmarks.schemas';
import { articleDto } from '@modules/articles/articles.schema';
import { getUid } from '@modules/articles/utils';
import { Op } from 'sequelize';
import Bookmark from 'db/models/Bookmark';
import Article from 'db/models/Article';
import { BookmarkDto } from './bookmarks.dto';

export interface BookmarkedArticle extends articleDto {
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

  async deleteBookmark(article: deleteBookmarkDto, userId: string) {
    try {
      console.log('[deleteBookmark]');
      const deleted = await this.bookmarkModel.destroy({
        where: {
          articleId: { [Op.like]: await getUid(article) },
          userId: userId,
        },
      });
      console.log('[DELETED]', deleted);
      return deleted;
    } catch (e) {}
  }
}
