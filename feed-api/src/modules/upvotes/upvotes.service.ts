import { createUpvoteDto, deleteUpvoteDto } from './upvote.schema';
import { ArticlesService } from '@modules/articles/articles.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { formatArticle, getUid } from '@modules/articles/utils';
import { Op } from 'sequelize';
import Upvote from 'db/models/Upvote';
import sequelize from 'sequelize';

@Injectable()
export class UpvotesService {
  constructor(
    @InjectModel(Upvote) private upvoteModel: typeof Upvote,
    private articleService: ArticlesService,
  ) {}

  /**
   * @param userId
   * @returns [{ articleId: string, upvotes: string }]
   */
  async getUpvotes() {
    console.log('GET UPVOTES ');
    const upvotes = await this.upvoteModel.findAll({
      attributes: [
        'articleId',
        [sequelize.fn('count', sequelize.col('articleId')), 'upvotes'],
      ],
      group: ['articleId'],
    });
    if (!upvotes) return [];
    return upvotes;
  }

  async getUpvotesByUserId(userId: string) {
    return this.upvoteModel.findAll({
      where: { userId: { [Op.like]: userId } },
      attributes: ['articleId', 'createdAt'],
    });
  }

  async create(article: createUpvoteDto, userId: string) {
    const existingArticle = await this.articleService.findOrCreate(
      formatArticle(article),
    );
    console.log('EXISTING ARTICLE', existingArticle);
    const saved = await this.upvoteModel.create({
      articleId: existingArticle.uid,
      userId,
    });
    console.log('saved', saved);
    return saved;
  }

  async delete(article: deleteUpvoteDto, userId: string) {
    const articleId = getUid(article);
    return this.upvoteModel.destroy({
      where: {
        userId: { [Op.like]: userId },
        articleId: { [Op.like]: articleId },
      },
    });
  }
}
