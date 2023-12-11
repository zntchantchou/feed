import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Article from 'db/models/Article';
import { getUid } from './utils';
import { Op } from 'sequelize';
import { createArticleDto } from '@modules/bookmarks/bookmarks.schemas';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article)
    private articleModel: typeof Article,
  ) {}

  async create(article: createArticleDto) {
    console.log('CREATE IN ARTICLE SERVICE BEFORE ', article);
    const created = await this.articleModel.create({ ...article });
    console.log('CREATED ', created);
    return created;
  }

  /**
   * A new article is only created if it does not already exist
   * an article is not linked to a user but bookmarks are linked to a user and an article
   */
  async findByArticle(article: createArticleDto): Promise<Article | null> {
    const newUid = getUid(article);
    const existing = await this.articleModel.findOne({
      where: { uid: { [Op.like]: newUid } },
    });
    if (existing) return existing;
    return null;
  }
}
