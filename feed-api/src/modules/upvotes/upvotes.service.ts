import { articleDto } from '@modules/articles/articles.schema';
import { getUid } from '@modules/articles/utils';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import Upvote from 'db/models/Upvote';
import Article from 'db/models/Article';
import { ArticlesService } from '@modules/articles/articles.service';

@Injectable()
export class UpvotesService {
  constructor(
    @InjectModel(Upvote) private upvoteModel: typeof Upvote,
    private articleService: ArticlesService,
  ) {}

  async findByUserId(userId: string) {
    return this.upvoteModel.findAll({
      where: { userId: { [Op.like]: { userId } } },
    });
  }

  async create(article: articleDto, userId: string) {
    const existingArticle = await this.articleService.findOrCreate(article);
    const saved = await this.upvoteModel.create({
      articleId: existingArticle.uid,
      userId,
    });
    console.log(
      '-------------- UpvotesService.Create saved ---------------- \n',
      saved,
    );
    return saved;
  }

  async delete(article: articleDto, userId: string) {
    const articleId = getUid(article);
    return this.upvoteModel.destroy({
      where: { userId: { [Op.like]: { userId, articleId } } },
    });
  }
}
