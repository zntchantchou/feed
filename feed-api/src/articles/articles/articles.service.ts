import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Article from 'db/models/Article';
import { Optional } from 'sequelize';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article)
    private articleModel: typeof Article,
  ) {}

  async create(article: ArticleDto) {
    console.log('CREATE IN ARTICLE SERVICE AFTER ', article);
    const created = await this.articleModel.create(
      article as Optional<any, any>,
    );
    console.log('CREATED ', created);
    return created;
  }
}
