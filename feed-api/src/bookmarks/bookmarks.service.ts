import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BookmarkDto } from './dto/bookmarks.dto';
import { ArticleDto } from './dto/article.dto';
import { Op } from 'sequelize';
import Bookmark from 'db/models/Bookmark';
import Article from 'db/models/Article';
import { getUid } from 'src/articles/articles/utils';

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

  async getBookmarkedArticles(userId: string): Promise<BookmarkedArticle[]> {
    try {
      const bookmarks = await this.bookmarkModel.findAll({
        where: {
          userId: { [Op.like]: userId },
        },
        include: [Article],
      });

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
    }
  }

  async deleteBookmark(article: ArticleDto, userId: string) {
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
