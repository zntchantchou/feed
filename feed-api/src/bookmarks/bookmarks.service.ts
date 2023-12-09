import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Article from 'db/models/Article';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectModel(Article)
    private articleModel: typeof Article,
  ) {}

  async getArticles() {
    return await this.articleModel.findAll();
  }

  async create(article) {
    console.log('CREATE', article);
    return await this.articleModel.create(article);
  }
}
